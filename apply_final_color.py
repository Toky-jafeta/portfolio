"""
Final robust shirt recoloring script.

Strategy:
  1. Build the shirt mask from the ORIGINAL profil.jpg where colors are cleanest.
     - The shirt is pink/magenta: R high, G medium-low, B medium
     - The background is near-white or beige: R,G,B all high and nearly equal
     - Skin is: R > G > B with a big R-B gap
  2. Dilate the mask with a simple kernel to close small holes / gaps.
  3. Apply that cleaned mask to profil_nobg.png and recolor shirt → indigo blue.
"""
import numpy as np
from PIL import Image

def dilate_mask(mask, radius=8):
    """Simple binary dilation using a square kernel."""
    from scipy.ndimage import binary_dilation
    struct = np.ones((radius * 2 + 1, radius * 2 + 1), dtype=bool)
    return binary_dilation(mask, structure=struct)

def rgb_to_hsv(r, g, b):
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    df = mx - mn

    h = np.zeros_like(mx)
    nz = df != 0
    h = np.where((mx == r) & nz, (60 * ((g - b) / df) + 360) % 360, h)
    h = np.where((mx == g) & nz, (60 * ((b - r) / df) + 120) % 360, h)
    h = np.where((mx == b) & nz, (60 * ((r - g) / df) + 240) % 360, h)

    s = np.where(mx != 0, df / mx, 0.0)
    v = mx
    return h, s, v

def hsv_to_rgb(h, s, v):
    c = v * s
    x = c * (1 - np.abs((h / 60.0) % 2 - 1))
    m = v - c

    r = g = b = np.zeros_like(h)
    for (lo, hi), rv, gv, bv in [
        ((0, 60),   c, x, 0), ((60, 120),  x, c, 0),
        ((120, 180), 0, c, x), ((180, 240), 0, x, c),
        ((240, 300), x, 0, c), ((300, 360), c, 0, x),
    ]:
        cond = (h >= lo) & (h < hi)
        r = np.where(cond, rv, r)
        g = np.where(cond, gv, g)
        b = np.where(cond, bv, b)

    return (
        np.clip((r + m) * 255, 0, 255).astype(np.uint8),
        np.clip((g + m) * 255, 0, 255).astype(np.uint8),
        np.clip((b + m) * 255, 0, 255).astype(np.uint8),
    )

def build_shirt_mask_from_original():
    """
    Build a precise shirt mask using profil.jpg (original, white/beige background).
    The shirt is pink-magenta, easily separated from:
      - background (near-white, all channels > 200 and similar)
      - skin (R >> G >> B)
    """
    orig = Image.open("src/assets/img/profil.jpg").convert("RGB")
    orig_arr = np.array(orig, dtype=np.float32) / 255.0
    h_img, w_img = orig_arr.shape[:2]

    r = orig_arr[:, :, 0]
    g = orig_arr[:, :, 1]
    b = orig_arr[:, :, 2]

    # Background detector: near-white / beige wall
    # all channels high (> 0.72) and relatively similar
    is_bg = (r > 0.72) & (g > 0.67) & (b > 0.58) & ((r - b) < 0.28)

    # Skin detector: R > G > B with a meaningful gap
    is_skin = (r > g) & (g > b) & ((r - b) > 0.12) & ((g - b) > 0.04) & (r > 0.30)

    # Dark detector (hair, dark features, shadows below threshold)
    is_dark = (r < 0.20) & (g < 0.20) & (b < 0.20)

    # White/button detector
    is_white = (r > 0.80) & (g > 0.80) & (b > 0.80)

    # Spatial constraint: only below face line
    y_grid = np.arange(h_img)[:, None]
    is_below_face = y_grid >= int(h_img * 0.38)

    # Shirt = visible, not background, not skin, not very dark, not white, below face
    is_shirt = is_below_face & ~is_bg & ~is_skin & ~is_dark & ~is_white

    print(f"Raw shirt pixels from original: {np.sum(is_shirt)}")

    # Dilate mask to fill holes (shadows, texture gaps, button holes)
    try:
        shirt_mask = dilate_mask(is_shirt, radius=10)
        print("Dilation applied via scipy.")
    except ImportError:
        # Fallback: simple manual 3x3 dilation
        shirt_mask = is_shirt.copy()
        for _ in range(8):
            shifted = np.zeros_like(shirt_mask)
            shifted[1:, :] |= shirt_mask[:-1, :]
            shifted[:-1, :] |= shirt_mask[1:, :]
            shifted[:, 1:] |= shirt_mask[:, :-1]
            shifted[:, :-1] |= shirt_mask[:, 1:]
            shirt_mask = shifted
        print("Dilation applied via manual fallback.")

    # Re-apply spatial constraint after dilation so mask doesn't grow into face
    shirt_mask &= is_below_face

    print(f"Dilated shirt pixels: {np.sum(shirt_mask)}")
    return shirt_mask

def recolor_shirt(shirt_mask):
    """Apply the shirt mask to profil_nobg.png and recolor to indigo blue."""
    nobg = Image.open("src/assets/img/profil_nobg.png").convert("RGBA")
    nobg_arr = np.array(nobg, dtype=np.uint8)

    # Only act on visible pixels (alpha > 10)
    alpha = nobg_arr[:, :, 3]
    final_mask = shirt_mask & (alpha > 10)

    r = nobg_arr[:, :, 0].astype(float) / 255.0
    g = nobg_arr[:, :, 1].astype(float) / 255.0
    b = nobg_arr[:, :, 2].astype(float) / 255.0

    h_chan, s_chan, v_chan = rgb_to_hsv(r, g, b)

    # Extract shirt pixels
    h_s = h_chan[final_mask]
    s_s = s_chan[final_mask]
    v_s = v_chan[final_mask]

    # Remap to indigo (239°), keep original lightness pattern
    new_h = np.full_like(h_s, 239.0)
    new_s = np.clip(s_s * 0.82, 0.0, 1.0)   # slightly desaturate
    new_v = np.clip(v_s * 0.88, 0.0, 1.0)   # slightly darken to fit dark theme

    r_out, g_out, b_out = hsv_to_rgb(new_h, new_s, new_v)

    nobg_arr[final_mask, 0] = r_out
    nobg_arr[final_mask, 1] = g_out
    nobg_arr[final_mask, 2] = b_out

    out = Image.fromarray(nobg_arr, "RGBA")
    out.save("src/assets/img/profil_nobg.png")
    print(f"✅ Done. Recolored {np.sum(final_mask)} pixels to indigo blue.")

if __name__ == "__main__":
    print("Step 1: Building shirt mask from original photo...")
    mask = build_shirt_mask_from_original()
    print("Step 2: Applying indigo recoloring to profil_nobg.png...")
    recolor_shirt(mask)
