import tensorflow as tfpyth
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
        'C:\\Users\\achrafoo\\Documents\\train',  # train directory path
        target_size=(256, 256),
        batch_size=32,
        class_mode='categorical')

test_datagen = ImageDataGenerator(rescale=1./255)
validation_generator = test_datagen.flow_from_directory(
        'C:\\Users\\achrafoo\\Documents\\validation',  # test directory path
        target_size=(256, 256),
        batch_size=32,
        class_mode='categorical')

model = Sequential([
    # Convolutional layers
    Conv2D(32, (3, 3), activation='relu', input_shape=(256, 256, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    
    # Dense layers
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(3, activation='softmax') # 3 classes
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
history = model.fit(
      train_generator,
      steps_per_epoch=100,  
      epochs=4,
      validation_data=validation_generator,
      validation_steps=30)  
model.save('covid_pneumonia_classification_model.h5')

