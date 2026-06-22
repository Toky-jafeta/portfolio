"""
Refined background removal script with lower luminance threshold for neutral colors to remove shadows.
"""
from PIL import Image, ImageFilter
import numpy as np

INPUT  = "src/assets/img/profil.jpg"
OUTPUT = "src/assets/img/profil_nobg.png"

img = Image.open(INPUT).convert("RGBA")
data = np.array(img, dtype=np.float32)

R, G, B = data[:, :, 0], data[:, :, 1], data[:, :, 2]

# Calculate luminance and saturation metrics
luminance = (R + G + B) / 3.0
max_val = np.maximum(np.maximum(R, G), B)
min_val = np.minimum(np.minimum(R, G), B)
# Saturation metric (difference between max and min color channels)
saturation = max_val - min_val

# Let's define background based on:
# 1. Very bright areas (luminance > 175) with moderate saturation (< 45)
# 2. Shadow areas of the wall (luminance > 120) with very low saturation (< 20)
is_bg = ((luminance > 175) & (saturation < 45)) | ((luminance > 115) & (saturation < 18))

h, w = is_bg.shape
visited = np.zeros((h, w), dtype=bool)

# Flood fill to ensure we only remove connected background from the borders
def flood_fill_all_borders():
    stack = []
    # Add top and bottom borders
    for x in range(w):
        if is_bg[0, x]:
            stack.append((0, x))
        if is_bg[h-1, x]:
            stack.append((h-1, x))
    # Add left and right borders
    for y in range(h):
        if is_bg[y, 0]:
            stack.append((y, 0))
        if is_bg[y, w-1]:
            stack.append((y, w-1))
            
    while stack:
        y, x = stack.pop()
        if visited[y, x]:
            continue
        visited[y, x] = True
        
        # Check 4-neighbors
        for ny, nx in [(y+1, x), (y-1, x), (y, x+1), (y, x-1)]:
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_bg[ny, nx]:
                    stack.append((ny, nx))

flood_fill_all_borders()

# Convert visited mask to image
mask_img = Image.fromarray((~visited * 255).astype(np.uint8), mode="L")

# Apply morphological operations to clean up
# MinFilter erodes the white mask (shrinks the subject slightly to eat away white borders)
mask_img = mask_img.filter(ImageFilter.MinFilter(5))
# GaussianBlur softens the edges
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=2))

result = img.copy()
result.putalpha(mask_img)
result.save(OUTPUT, "PNG")

print("✅ Refined background removal completed.")
