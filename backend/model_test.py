from keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
import numpy as np

def classify(imgname: str) -> (str, int):
    img_path = f"uploads/{imgname}" 
    img = load_img(img_path, target_size=(256, 256))

    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    loaded_model = load_model("covid_pneumonia_classification_model.h5")
    predictions = loaded_model.predict(img_array)
    class_labels = ['COVID', 'NORMAL', 'PNEUMONIA']  

    predicted_class = class_labels[np.argmax(predictions)]
    confidence = np.max(predictions)
    return (predicted_class, confidence)

if __name__ == "__main__":
    print(classify("00000002_000.png"))