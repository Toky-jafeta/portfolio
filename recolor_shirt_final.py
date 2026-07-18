"""
Definitive shirt recoloring via HSV hue detection.

Approach:
  - Work entirely on profil_nobg.png (same dimensions as original)
  - Convert to HSV
  - Identify "pink/magenta/salmon" pixels: hue in [300°-360°] or [0°-30°]
    with saturation > 0.08 (to exclude near-white/grey buttons)
    and value > 0.15 (to exclude near-black shadows)
  - Spatial constraint: y >= face_line (38% of height)
  - Recolor matched pixels to indigo (239°), preserving original lightness
  - Run a second pass with a slightly tighter threshold in case some
    warm orange pixels remain in the cross-arm zone
"""
import numpy as np
from PIL import Image


def rgb_to_hsv_arr(r, g, b):
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    df = mx - mn

    h = np.zeros_like(mx)
    nz = df > 1e-8
    h = np.where((mx == r) & nz, (60 * ((g - b) / np.where(nz, df, 1)) + 360) % 360, h)
    h = np.where((mx == g) & nz, (60 * ((b - r) / np.where(nz, df, 1)) + 120) % 360, h)
    h = np.where((mx == b) & nz, (60 * ((r - g) / np.where(nz, df, 1)) + 240) % 360, h)

    s = np.where(mx > 1e-8, df / mx, 0.0)
    v = mx
    return h, s, v


def hsv_to_rgb_arr(h, s, v):
    c = v * s
    x = c * (1 - np.abs((h / 60.0) % 2 - 1))
    m = v - c

    r = g = b = np.zeros_like(h)
    for (lo, hi), rv, gv, bv in [
        ((0,   60),  c, x, 0), ((60,  120), x, c, 0),
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


def recolor():
    img = Image.open("src/assets/img/profil_nobg.png").convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    h_img, w_img = data.shape[:2]

    r = data[:, :, 0].astype(float) / 255.0
    g = data[:, :, 1].astype(float) / 255.0
    b = data[:, :, 2].astype(float) / 255.0
    alpha = data[:, :, 3]

    hue, sat, val = rgb_to_hsv_arr(r, g, b)

    # ── Spatial constraint: below the face ──────────────────────────────────
    y_grid = np.arange(h_img)[:, None]
    face_line = int(h_img * 0.38)   # ~38% from top
    is_below_face = y_grid >= face_line

    # ── Visible pixels ───────────────────────────────────────────────────────
    is_visible = alpha > 10

    # ── Pink / magenta / salmon hue range ───────────────────────────────────
    # The original shirt spans hue ~300°-360° (magenta-pink)
    # Also catch some light pinkish-orange: 0°-30°
    is_pink_hue = ((hue >= 300) | (hue < 30))

    # ── Saturation & value guards ────────────────────────────────────────────
    is_saturated = sat > 0.07   # exclude near-grey/white buttons/shadows
    is_not_dark  = val > 0.15   # exclude near-black shadow pixels
    is_not_skin  = ~((r > g) & (g > b) & ((r - b) > 0.18) & (sat > 0.25))

    # ── PASS 1: strict pink mask ─────────────────────────────────────────────
    mask = is_visible & is_below_face & is_pink_hue & is_saturated & is_not_dark & is_not_skin
    print(f"Pass 1 — pink shirt pixels to recolor: {np.sum(mask)}")

    # ── PASS 2: catch warm-orange residuals in the cross-arm zone ────────────
    # orange: hue 10°-40°, saturation moderate, NOT strongly skin
    is_orange_hue = (hue >= 10) & (hue < 50)
    is_orange_sat  = (sat > 0.15) & (sat < 0.85)
    extra_mask = is_visible & is_below_face & is_orange_hue & is_orange_sat & is_not_dark & is_not_skin & ~mask
    print(f"Pass 2 — warm orange residual pixels: {np.sum(extra_mask)}")

    combined = mask | extra_mask
    print(f"Total pixels to recolor: {np.sum(combined)}")

    # ── Recolor: fix hue to indigo 239°, preserve lightness ─────────────────
    h_sel = hue[combined]
    s_sel = sat[combined]
    v_sel = val[combined]

    new_h = np.full_like(h_sel, 239.0)
    new_s = np.clip(s_sel * 0.80, 0.0, 1.0)    # slightly desaturate
    new_v = np.clip(v_sel * 0.88, 0.0, 1.0)    # slightly darken

    r_out, g_out, b_out = hsv_to_rgb_arr(new_h, new_s, new_v)

    data[combined, 0] = r_out
    data[combined, 1] = g_out
    data[combined, 2] = b_out

    out = Image.fromarray(data, "RGBA")
    out.save("src/assets/img/profil_nobg.png")
    print("✅ All warm shirt tones converted to indigo blue successfully.")


if __name__ == "__main__":
    recolor()
