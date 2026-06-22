import numpy as np
from PIL import Image
from collections import deque

def apply_color_grade():
    img_path = "src/assets/img/profil_nobg.png"
    output_path = "src/assets/img/profil_nobg.png"
    
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    h, w, _ = data.shape
    
    # Normalized RGB for mask computation
    r = data[:, :, 0].astype(float) / 255.0
    g = data[:, :, 1].astype(float) / 255.0
    b = data[:, :, 2].astype(float) / 255.0
    a = data[:, :, 3]
    
    visited = np.zeros((h, w), dtype=bool)
    
    # Seeds for the shirt
    seeds = [
        (700, 640),
        (600, 300),
        (600, 980),
        (1000, 200),
        (1000, 1100),
        (1200, 350),
        (1200, 900),
        (550, 520),
        (550, 760)
    ]
    
    queue = deque()
    for sy, sx in seeds:
        if 0 <= sy < h and 0 <= sx < w:
            if a[sy, sx] > 100:
                queue.append((sy, sx))
                visited[sy, sx] = True
                
    def is_skin(y, x):
        # 1. Spatial exclusion of the neck skin box under the chin (y: 500-600, x: 575-705)
        if 500 <= y < 600 and 575 <= x <= 705:
            return True
            
        # 2. General skin color check in center (350 <= x <= 920)
        if 350 <= x <= 920:
            pixel_r = r[y, x]
            pixel_g = g[y, x]
            pixel_b = b[y, x]
            # Skin condition
            return (pixel_r > pixel_g) & (pixel_g > pixel_b) & ((pixel_r - pixel_b) > 0.05) & ((pixel_g - pixel_b) > 0.02)
        return False
        
    # Flood fill
    while queue:
        cy, cx = queue.popleft()
        
        for ny, nx in [(cy+1, cx), (cy-1, cx), (cy, cx+1), (cy, cx-1)]:
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and a[ny, nx] > 100 and ny >= 500:
                    if is_skin(ny, nx):
                        continue
                    
                    diff = np.sqrt(
                        (r[ny, nx] - r[cy, cx])**2 + 
                        (g[ny, nx] - g[cy, cx])**2 + 
                        (b[ny, nx] - b[cy, cx])**2
                    )
                    
                    if diff < 0.12 or (b[ny, nx] > g[ny, nx] and diff < 0.2):
                        visited[ny, nx] = True
                        queue.append((ny, nx))
                        
    # Modifying the matched shirt pixels
    r_s = r[visited]
    g_s = g[visited]
    b_s = b[visited]
    
    mx = np.maximum(np.maximum(r_s, g_s), b_s)
    mn = np.minimum(np.minimum(r_s, g_s), b_s)
    df = mx - mn
    
    h_s = np.zeros_like(mx)
    df_nonzero = df != 0
    
    h_s = np.where((mx == r_s) & df_nonzero, (60 * ((g_s - b_s) / df) + 360) % 360, h_s)
    h_s = np.where((mx == g_s) & df_nonzero, (60 * ((b_s - r_s) / df) + 120) % 360, h_s)
    h_s = np.where((mx == b_s) & df_nonzero, (60 * ((r_s - g_s) / df) + 240) % 360, h_s)
    
    s_s = np.zeros_like(mx)
    s_s = np.where(mx != 0, df / mx, s_s)
    v_s = mx
    
    # Target hue (239.0 degrees) for cybersecurity indigo-blue
    target_h = 239.0
    
    # We shift the hue while preserving details
    new_h = target_h + (h_s - 340) * 0.15
    new_h = np.clip(new_h, 235.0, 243.0)
    
    # Slightly decrease saturation and value to fit the dark cybersecurity theme
    new_s = s_s * 0.80
    new_v = v_s * 0.85
    
    # Convert HSV back to RGB
    c = new_v * new_s
    x = c * (1 - np.abs((new_h / 60.0) % 2 - 1))
    m = new_v - c
    
    r_new = np.zeros_like(h_s)
    g_new = np.zeros_like(h_s)
    b_new = np.zeros_like(h_s)
    
    conds = [
        (new_h >= 0) & (new_h < 60),
        (new_h >= 60) & (new_h < 120),
        (new_h >= 120) & (new_h < 180),
        (new_h >= 180) & (new_h < 240),
        (new_h >= 240) & (new_h < 300),
        (new_h >= 300) & (new_h < 360)
    ]
    
    r_vals = [c, x, 0.0, 0.0, x, c]
    g_vals = [x, c, c, x, 0.0, 0.0]
    b_vals = [0.0, 0.0, x, c, c, x]
    
    for cond, rv, gv, bv in zip(conds, r_vals, g_vals, b_vals):
        r_new = np.where(cond, rv, r_new)
        g_new = np.where(cond, gv, g_new)
        b_new = np.where(cond, bv, b_new)
        
    r_out = np.clip((r_new + m) * 255.0, 0, 255).astype(np.uint8)
    g_out = np.clip((g_new + m) * 255.0, 0, 255).astype(np.uint8)
    b_out = np.clip((b_new + m) * 255.0, 0, 255).astype(np.uint8)
    
    # Save back
    data[visited, 0] = r_out
    data[visited, 1] = g_out
    data[visited, 2] = b_out
    
    # Write output
    out_img = Image.fromarray(data, "RGBA")
    out_img.save(output_path)
    print("✅ Completed final color grading using flood-fill and neck exclusion.")

if __name__ == "__main__":
    apply_color_grade()
