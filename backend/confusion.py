import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report,accuracy_score
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator

# Load the trained model
model = load_model('covid_pneumonia_classification_model.h5')

# Set up an image data generator for your data
data_generator = ImageDataGenerator(rescale=1./255)  # You may need to adjust this based on your preprocessing steps

# Specify the path to your data
data_path = 'C:\\Users\\achrafoo\\Documents\\validation'

# Create a generator for your data
data_generator = data_generator.flow_from_directory(
    data_path,
    target_size=(256, 256),
    batch_size=32,
    class_mode='categorical',
    shuffle=False  # Important: Set shuffle to False to maintain class order
)
# Get predictions for your data
y_pred = model.predict(data_generator)

# Convert predictions to class labels
y_pred_labels = np.argmax(y_pred, axis=1)

# Get true class labels
y_true_labels = data_generator.classes

# Calculate confusion matrix
conf_matrix = confusion_matrix(y_true_labels, y_pred_labels)

accuracy = accuracy_score(y_true_labels, y_pred_labels)
# Display the confusion matrix
print("Confusion Matrix:")
print(conf_matrix)
print("Accuracy:", accuracy)
# Plot the confusion matrix
plt.imshow(conf_matrix, interpolation='nearest', cmap=plt.cm.Blues)
plt.title('Confusion Matrix')
plt.colorbar()
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.show()

# Print classification report
print("Classification Report:")
print(classification_report(y_true_labels, y_pred_labels))
