from rembg import remove
from PIL import Image
import os

input_path = "src/assets/img/profil.jpg"
output_path = "src/assets/img/profil_nobg.png"

if not os.path.exists(input_path):
    print(f"Error: Input file {input_path} does not exist.")
    exit(1)

print("Opening image...")
input_image = Image.open(input_path)

print("Removing background using rembg...")
# rembg will download the u2net model automatically on first run
output_image = remove(input_image)

print("Saving results...")
output_image.save(output_path)
print("✅ Background removed successfully and saved to:", output_path)
