from PIL import Image
import os

def resize_images(input_folder, output_folder, target_size=(256, 256)):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    files = os.listdir(input_folder)

    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_folder, file)
            output_path = os.path.join(output_folder, file)

            with Image.open(input_path) as img:
                
                resized_img = img.resize(target_size)
                resized_img.save(output_path)

if __name__ == "__main__":
    input_folder = 'uploads'
    output_folder = 'uploads'
    target_size = (256, 256)

    resize_images(input_folder, output_folder, target_size)
