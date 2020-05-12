import * as d3 from "d3";
import * as tf from "@tensorflow/tfjs";
import * as config from "./config";
import {load_img_channels} from "./cnn_vis"
import "babel-polyfill"

let classes = ["Plane", "Car", "Bird", "Cat", "Deer", "Dog", "Frog", "Horse", "Ship", "Truck"]
let real_class_map = {"Plane" : "Airplane", "Car" : "Automobile"}

let model = null

let num_classes = 10
let imgs_per_class = 32

let selected_img_idx =Math.floor(Math.random() * (num_classes * imgs_per_class))
let current_pred_data = [...Array(num_classes)].map((_, i) => [0, i])

let tf_model_url = "https://raw.githubusercontent.com/UW-CSE442-WI20/FP-convolutional-neural-networks/master/src/cifar10/tfjs_model/model.json"
let cifar_10_images_url = "https://raw.githubusercontent.com/UW-CSE442-WI20/FP-convolutional-neural-networks/master/src/cifar10/images/"

async function load_model() {
    model = await tf.loadLayersModel(tf_model_url)
    predict()
}

function get_cifar10_classname_from_idx(idx) {
    let row = Math.floor(idx / imgs_per_class)

    let class_name = classes[row]
    if (class_name in real_class_map) {
        class_name = real_class_map[class_name]
    }

   return class_name.toLowerCase()
}

function get_cifar10_img_url(idx) {
    let img_idx = idx % imgs_per_class
    let class_name = get_cifar10_classname_from_idx(idx)
    return cifar_10_images_url + `${class_name}_${img_idx}.png`
}

function predict() {
    console.assert(model != null, "Model still loading. Please wait a few seconds.")

    load_img_channels(d3.select("#selected-img-big").attr("href"), img => {
        let tensor_img = tf.div(tf.tensor(img), 255.0).transpose([1, 2, 0]).expandDims(0)
        let pred = tf.softmax(model.predict(tensor_img), 1).squeeze(0)
        let pred_ranked = tf.topk(pred, 10, true)
        pred_ranked["indices"] = pred_ranked["indices"].arraySync()
        pred_ranked["values"] = pred_ranked["values"].arraySync()
        
        let probabilities = pred_ranked["values"].map(p => Math.min(Math.round(p * 100), 100))
        let pred_data = probabilities.map((p, i) => [p, pred_ranked["indices"][i]])

        let correct_index = Math.floor(selected_img_idx / imgs_per_class)
        
        update_probability_display(pred_data, correct_index)
    })
}

function update_probability_display(pred_data, correct_index) {
    current_pred_data = pred_data
    d3.select("#real-cnn-vis").selectAll(".net-pred")
        .data(pred_data)
        .text(d => `${(d[0] < 10 ? " " : "")}${d[0]}% - ${classes[d[1]]}`)
        .attr("fill", (d, i) => i == 0 ? (d[1] == correct_index ? "green" : "red") : null)
        .style("visibility", "visible")
}

function update_real_cnn() {
    let indices = [...Array(num_classes * imgs_per_class).keys()]

    let w = config.svgWidth

    let img_space = w / (imgs_per_class+1)
    let img_block_height = img_space * num_classes
    let offset = img_space
    let img_size = w/(imgs_per_class+5)
    let border_size = img_space - img_size
    
    let h = 2 * img_block_height + 3 * offset

    d3.select("#realCnnSection > *").remove()

    d3.select("#realCnnSection")
        .append("svg")
        .attr("width", w)
        .attr("height", h + offset)
        .attr("id", "real-cnn-vis")
        .selectAll("image")
        .data(indices)
        .enter()
        .append("image")
        .attr("x", d => img_space / 2 + (d % imgs_per_class) * img_space)
        .attr("y", d => Math.floor(d / imgs_per_class) * img_space)
        .attr("href", d => get_cifar10_img_url(d))
        .attr("width", img_size)
        .attr("height", img_size)
        .attr("transform", `translate(${0}, ${offset})`)
        .attr("image-rendering", "pixelated")
        .style("cursor", "pointer")
        .on("click", d => {
            d3.select("#img-select-rect")
                .data([d])
                .attr("x", d => (d % imgs_per_class) * img_space - border_size / 2)
                .attr("y", d => (Math.floor(d / imgs_per_class) + 1) * img_space - border_size / 2)
            selected_img_idx = d
            d3.select("#selected-img-big").attr("href", get_cifar10_img_url(selected_img_idx))
            
            predict()
            // // Reset probabilities
            // let pred_data = [...Array(num_classes)].map((_, i) => [0, i])
            // d3.select("#real-cnn-vis").selectAll(".net-pred")
            //     .data(pred_data)
            //     .text(d => `${(d[0] < 10 ? " " : "")}${d[0]}% - ${classes[d[1]]}`)
            //     .classed("net-pred", true)
            //     .style("visibility", "visible")
        })

    let svg = d3.select("#real-cnn-vis")

    svg.selectAll("rect")
        .data([selected_img_idx])
        .enter()
        .append("rect")
        .attr("x", d => (d % imgs_per_class) * img_space - border_size / 2)
        .attr("y", d => (Math.floor(d / imgs_per_class) + 1) * img_space - border_size / 2)
        .attr("width", img_space)
        .attr("height", img_space)
        .attr("transform", `translate(${img_space / 2}, ${0})`)
        .style("fill-opacity", "0")
        .style("stroke", "red")
        .style("stroke-width", border_size)
        .attr("id", "img-select-rect")
    
    svg.append("image")
        .attr("x", w / 2 - w / 4)
        .attr("y", 0)
        .attr("width", img_block_height)
        .attr("height", img_block_height)
        .attr("href", get_cifar10_img_url(selected_img_idx))
        .attr("transform", `translate(${offset}, ${img_block_height + 2 * offset})`)
        .attr("image-rendering", "pixelated")
        .attr("id", "selected-img-big")

    svg.selectAll("rect")
        .data([selected_img_idx])
        .enter()
        .append("rect")
        .attr("x", d => (d % imgs_per_class) * img_space - border_size / 2)
        .attr("y", d => Math.floor(d / imgs_per_class) * img_space - border_size / 2)
        .attr("width", img_space)
        .attr("height", img_space)
        .attr("transform", `translate(${offset}, ${offset})`)
        .style("fill-opacity", "0")
        .style("stroke", "red")
        .style("stroke-width", border_size)
        .attr("id", "img-select-rect")

    // svg.append("rect").attr("id", "predict-button")
    //                     .attr("x", w / 2 + img_space + config.spaceBetween / 4)
    //                     .attr("y", img_block_height / 2 - config.spaceBetween / 16)
    //                     .attr("width", config.spaceBetween / 4)
    //                     .attr("height", config.spaceBetween / 8)
    //                     .attr("transform", `translate(${offset}, ${img_block_height + 2 * offset})`)
    //                     .attr("fill", config.nextColor)
    //                     .style("cursor", "pointer")
    //                     .on("click", predict)
    // svg.append("text")
    //     .attr("id", "predict-button-text")
    //     .attr("x", w / 2 + img_space + config.spaceBetween / 4 + config.spaceBetween / 8)
    //     .attr("y", img_block_height / 2)
    //     .attr("transform", `translate(${offset}, ${img_block_height + 2 * offset})`)
    //     .attr("pointer-events", "none")
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "central")
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", config.fontSize)
    //     .text("Predict");

    svg.selectAll(".net-pred")
        .data(current_pred_data)
        .enter()
        .append("text")
        .attr("x", w / 2 + img_space + config.spaceBetween / 4 + config.spaceBetween / 4 + img_space)
        .attr("y", (_, i) => (i + 1/2) * img_space)
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .attr("font-weight", (d, i) => i == 0 ? "bold" : "normal")
        .attr("transform", `translate(${offset}, ${img_block_height + 2 * offset})`)
        .attr("dominant-baseline", "hanging")
        .classed("net-pred", true)
        .style("visibility", "hidden")
    
    update_probability_display(current_pred_data, selected_img_idx)
}

export function init_real_cnn() {
    update_real_cnn()
    load_model()
}

export function resize_real_cnn() {
    update_real_cnn()
}