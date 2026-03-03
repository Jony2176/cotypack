import os
import subprocess

images = [
    'bolsa-riñon-15x20.jpg',
    'bolsa-riñon-20x30.jpg',
    'bolsa-riñon-25x35.jpg',
    'bolsa-riñon-35x45.jpg',
    'bolsa-riñon-40x50.jpg',
    'bolsa-riñon-50x60.jpg'
]

base_dir = '/root/projects/cotypack/public/images/products/'

for img in images:
    in_path = os.path.join(base_dir, img)
    out_name = img.replace('.jpg', '-nobg.png')
    out_path = os.path.join(base_dir, out_name)
    
    print(f"Processing {img}...")
    subprocess.run(['rembg', 'i', in_path, out_path])
    print(f"Done: {out_name}")

