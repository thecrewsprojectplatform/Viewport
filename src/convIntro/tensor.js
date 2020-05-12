import * as tf from "@tensorflow/tfjs";

/**
 * Return a tensor of random floats. Output shape is [1, w, h, c].
 * 
 * @param {number} w width
 * @param {number} h height
 * @param {number} c channels
 */
export function randImgTensor(w, h, c) {
    return tf.tensor([[...Array(w)].map(() => [...Array(h)].map(() => [...Array(c)].map(() => Math.random())))]);
}

/**
 * Returns the given image(an array) but with reduced dimensionality.
 * 
 * @param {tf.Tensor} a
 */
export function flattenImg(a) {
    return a.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Returns a convolution layer. To apply the convolution, call .apply(<image>).
 * 
 * @param {number[]} inShape [width, height, channels]
 * @param {number[][]} kernel 
 * @param {number} stride 
 * @param {number} dialation
 * @param {boolean} padded When true, will be zero-padded.
 * 
 * @throws If stride != 1 and dialation != 1
 */
export function createConv(inShape, kernel, stride, dialation, padded) {
    let paddingMode = padded ? "same" : "valid";
    
    //const kernelTensor = tf.reshape(tf.tensor([kernel, kernel, kernel]), [kernel[0].length, kernel.length, 1, 3])
    const kernelTensor = tf.reshape(tf.tensor(kernel), [kernel[0].length, kernel.length, 1, 1])

    return tf.layers.conv2d({
        inputShape: inShape,
        kernelSize: [kernel[0].length, kernel.length],
        activation: "relu",
        filters: 1,
        strides: stride,
        dilationRate: dialation,
        trainable: false,
        useBias: false,
        padding: paddingMode,
        weights: [kernelTensor]
    });
}

export function create_max_pool_2d(size) {
    return tf.layers.maxPooling2d({poolSize : size})
}

export function create_average_pool_2d(size) {
    return tf.layers.averagePooling2d({poolSize : size})
}