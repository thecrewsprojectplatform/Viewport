import tensorflow as tf
import numpy as np
from tensorflow.keras import datasets, Sequential, Model
from tensorflow.keras.layers import Conv2D, Layer, BatchNormalization, LeakyReLU, MaxPool2D, Input, Reshape, AvgPool2D
import tensorflowjs as tfjs

(train_images, train_labels), (test_images, test_labels) = datasets.cifar10.load_data()

classes = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

# For each class, save 64 random images as png
for i in range(10):
    class_i = np.squeeze(test_labels == i, axis=-1)
    images = test_images[class_i]

    images = tf.constant(images[np.random.choice(len(images), 64, False)])
    for j in range(64):
        png = tf.image.encode_png(images[j], compression=0)
        name = "{}_{}.png".format(classes[i], j)
        tf.io.write_file(name, png)

# Normalize pixel values to be between 0 and 1
train_images, test_images = train_images / 255.0, test_images / 255.0

val_indices = np.random.choice(len(train_images), len(train_images) // 5, False)

val_images = train_images[val_indices]
val_labels = train_labels[val_indices]

train_images = np.delete(train_images, val_indices, axis=0)
train_labels = np.delete(train_labels, val_indices, axis=0)

img_input = Input(shape=(32, 32, 3))
x = Conv2D(32, 3, strides=1, padding="same")(img_input)
x = BatchNormalization(axis=3, momentum=0.9, epsilon=1e-5)(x)
x = LeakyReLU(0.1)(x)
x = Conv2D(32, 3, strides=1, padding="same")(x)
x = BatchNormalization(axis=3, momentum=0.9, epsilon=1e-5)(x)
x = LeakyReLU(0.1)(x)
x = MaxPool2D(2, 2)(x)
x = Conv2D(64, 3, strides=1, padding="same")(x)
x = BatchNormalization(axis=3, momentum=0.9, epsilon=1e-5)(x)
x = LeakyReLU(0.1)(x)
x = Conv2D(64, 3, strides=1, padding="same")(x)
x = BatchNormalization(axis=3, momentum=0.9, epsilon=1e-5)(x)
x = LeakyReLU(0.1)(x)
x = MaxPool2D(2, 2)(x)
x = Conv2D(128, 3, strides=1, padding="same")(x)
x = BatchNormalization(axis=3, momentum=0.9, epsilon=1e-5)(x)
x = LeakyReLU(0.1)(x)
x = MaxPool2D(2, 2)(x)
x = Conv2D(10, 1, strides=1, padding="same", use_bias=False)(x)
x = AvgPool2D(4, 4)(x)
x = Reshape((10,))(x)

model = Model(inputs=img_input, outputs=[x])
model.summary()

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train
# cp_callback = tf.keras.callbacks.ModelCheckpoint(filepath="checkpoints\\cp-{epoch:04d}.ckpt",
#                                                  verbose=1)
#
# model.fit(train_images, train_labels, verbose=2, epochs=32, validation_data=(val_images, val_labels),
#           callbacks=[cp_callback])

model = tf.keras.models.load_model("checkpoints\\cp-0016.ckpt")
tfjs.converters.save_keras_model(model, "tfjs_model")