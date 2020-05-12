import * as d3 from "d3";
import * as tf from "@tensorflow/tfjs";

import * as config from "../config";

import {initSVG, initInputImg, initKernelImg, initOutputImg, initEffects, initAnnotations, updateAnnotation, initControls} from "./initSVG";
import {drawInputData, drawKernelData, drawOutputData, drawEffects, removeEffects, grayToFloat, drawOutputDataPoint} from "./updateSVG";
import {createConv} from "./tensor";
import {Slide} from "./Slide"

// Image data
export let image = [[]];
export let resultImg = [[]];
export let visibleImg = [[]];
export let kernel = [[]];

export let slide_idx = 0
let slides = [
    new Slide("Bird", "demo", "Convolution simply takes two matrics of the same size, multiplies corresponding entries and adds them together. \n \n " +
        "Mouse over the left input matrix to convolve small patches with the kernel below! (Or use one of 'Auto Conv' and 'Conv All') \n \n Click 'Next' once " + 
        "you understand how the math works.", 0, 0),
    new Slide("Bird", "edge_detection", "Usually convolution is applied to images, where the numbers represent colors. \n \n " +
        "The kernel is applied to each color channel (r, g, b). \n \n " + 
        "The kernel below is an edge detection filter. Use it to highlight the edges of the bird. ", 0, 0),       
    new Slide("Dog", "sharpen", "Convolution is often used for image processing in photo editing tools. \n \n " +
        "The kernel below sharpens the image. See the kernel values: it amplifies the middle pixel and subtracts the surrounding pixels. \n \n " + 
        "Use it to sharpen the puppy!", 0, 0),
    new Slide("Dog", "box_blur", "We can also blur images in a similar way. \n \n " +
        "The box blur kernel below averages the surrounding pixels, thus blurring the image. \n \n " + 
        "Use it to blur the puppy!", 0, 0),
    new Slide("Plane", "x_sobel", "This kernel is called 'Horizontal Sobel'. It picks up color changes in the horizontal direction. \n \n " +
        "Note the high response along the edges of the plane, since there the color transitions from plane to sky.", 0, 0),
    new Slide("Plane", "y_sobel", "Similarly to the previous kernel, this one is called 'Vertical Sobel'. It picks up color changes in the vertical direction. \n \n " +
        "Note the high response along the body of the plane, since there the color change from dark to light.", 0, 0),
    new Slide(null, null, "Now try convolving images on your own! Choose an image and filter from above.", 0, 0)]

/**
 * Given a url to an image, displays the image as a matrix of pixels.
 * 
 * @param {String} url 
 */
function loadImage(url) {
    const canvas = document.getElementById('input-image');
    const context = canvas.getContext('2d');

    const pixelValues = [];

    const base_image = new Image();
    base_image.onload = () => {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        
        for (let i = 0; i < canvas.height; i++) {
            pixelValues[i] = [];
        }

        context.drawImage(base_image, 0, 0);

        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            let x = (i / 4) % canvas.width;
            let y = Math.floor((i / 4) / canvas.width);

            let color = [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]];

            if (slide_idx == 0) { // Just do 0's and 1's for this one
                let gray = (0.3 * imgData.data[i] + 0.59 * imgData.data[i + 1] + 0.11 * imgData.data[i + 2]) / 255;
                color[0] = (gray <= 0.7) | 0;
            }
            pixelValues[y][x] = color;
        }

        image = pixelValues;

        refreshData();
    }

    base_image.crossOrigin = "Anonymous";
    base_image.src = url;
}

function initKernelPreviews() {
    const previewContainer = document.getElementById("kernels");
    let first = true;
    for(let kernelName of Object.keys(config.kernels)) {
        let kernel = config.kernels[kernelName];
        let kernelTable = getKernelTable(kernel, config.kernelPrettyNames[kernelName]);
        previewContainer.appendChild(kernelTable);
        kernelTable.dataset.name = kernelName;
        kernelTable.setAttribute("title", config.kernelBlurbs[kernelName])
        kernelTable.addEventListener("click", () => {
            let selected = document.getElementsByClassName("kselected");
            selected[0].setAttribute("class", "kernel");
            kernelTable.setAttribute("class", "kernel kselected");
            updateData();    
        });
        if(first) {
            kernelTable.setAttribute("class", "kselected kernel")
            first = false;
        }
    }
}

function getKernelTable(kernel, name) {
    const table = document.createElement("table");
    table.setAttribute("class", "kernel");
    table.setAttribute("border", "1");
    const caption = document.createElement("caption");
    caption.innerHTML = name
    table.appendChild(caption);
    for(let row of kernel) {
        const tRow = document.createElement("tr");
        for(let val of row) {
            const tCell = document.createElement("td");
            tCell.setAttribute("class", "kernelThumbCell");
            tCell.innerHTML = Number( val.toFixed(1) );

            tRow.appendChild(tCell);
        }
        table.appendChild(tRow);
    }
    return table;
}

/**
 * Begin iterating through the result image, displaying the traversed pixels.
 */
function animateConv() {
    let stop_anim = false

    d3.select("#convIntroSection").select("#prevButtonWrapper").attr("visibility", "hidden");
    d3.select("#convIntroSection").select("#nextButtonWrapper").attr("visibility", "hidden");
    d3.select("#convIntroSection").select("#convAllButtonWrapper").attr("visibility", "hidden");

    d3.select("#convIntroSection").select("#selectionWrapper").node().style.visibility = "hidden";

    let default_val = slide_idx == 0 ? 0 : 255;
    visibleImg = [...Array(config.outputWidth)].map(() => [...Array(config.outputHeight)].map(() => [default_val, default_val, default_val]));

    drawInputData(true);
    drawOutputData(true);


    d3.select("#convIntroSection").select("#convButtonColor")
        .on("click", () => { stop_anim = true; })
        .attr("fill", config.stopColor);
    d3.select("#convIntroSection").select("#convButtonText").text("Stop");

    let pixel = 0;
    const interval = d3.interval(() => {
        const row = pixel % resultImg[0].length;
        const col = Math.floor(pixel / resultImg[0].length);
 
        visibleImg[col][row] = resultImg[col][row];

        drawEffects(row, col);
        drawOutputDataPoint(pixel);
        
        if (stop_anim || pixel >= resultImg.length * resultImg[0].length - 1) {
            interval.stop();
            drawInputData(false);
            drawOutputData(false);
            removeEffects()

            d3.select("#convIntroSection").select("#convButtonColor").attr("fill", config.convolveColor).on("click", animateConv);
            d3.select("#convIntroSection").select("#convButtonText").text("Convolve");
            if (slide_idx > 0) {
                d3.select("#convIntroSection").select("#prevButtonWrapper")
                    .attr("visibility", "visible");
            }
            if (slide_idx < slides.length - 1) {
                d3.select("#convIntroSection").select("#nextButtonWrapper")
                    .attr("visibility", "visible");
            }
            d3.select("#convIntroSection").select("#convAllButtonWrapper").attr("visibility", "visible");

            if (slide_idx == slides.length - 1) {
               d3.select("#convIntroSection").select("#selectionWrapper").node().style.visibility = "visible";
            }
        } else {
            ++pixel;
        }
    }, config.timePerLine / resultImg[0].length);
}

function conv_all() {
    visibleImg = resultImg;
    drawOutputData(false)
}

/**
 * Updates display and data with new filter and image choice.
 */
function updateData() {
    let kernel_name = null;
    let kernel_description = null;
    let img_url = null;

    if (slide_idx == slides.length - 1) {
        img_url = document.getElementsByClassName("selected")[0].getAttribute("src");
        kernel_name = document.getElementsByClassName("kselected")[0].dataset.name;
        
        // Get description
        kernel_description = config.kernelBlurbs[kernel_name];
    }
    else {
        img_url = config.imageUrls[slides[slide_idx].img];

        kernel_name = slides[slide_idx].kernel;
    }
    if (slide_idx == 0) {
        kernel = [[0,1,0],[1,5,1],[0,1,0]];
    } else {
        kernel = config.kernels[kernel_name];
    }
    update_slide(kernel_description)
    loadImage(img_url);
}

/**
 * Refreshes the data display.
 */
function refreshData() {
    const convLayer = createConv([image[0].length, image.length, 1], kernel, 1, 1, config.PADDED);

    const r = image.map(row => row.map(v => v[0]));
    const g = image.map(row => row.map(v => v[1]));
    const b = image.map(row => row.map(v => v[2]));

    resultImg = tf.concat([
        convLayer.apply(tf.reshape(tf.tensor(r), [1, image[0].length, image.length, 1])),
        convLayer.apply(tf.reshape(tf.tensor(g), [1, image[0].length, image.length, 1])),
        convLayer.apply(tf.reshape(tf.tensor(b), [1, image[0].length, image.length, 1]))
        ], 3).arraySync()[0];

    let default_val = slide_idx == 0 ? 0 : 255;
    visibleImg = [...Array(resultImg[0].length)].map(() => [...Array(resultImg.length)].map(() => [default_val, default_val, default_val]));

    drawInputData(false);
    drawOutputData(false);
    drawKernelData();
}

function update_slide(kernel_description=null) {
    d3.select("#annotation")
        .style("visibility", "visible");

    let annotation = slides[slide_idx].annotation;
    if (kernel_description != null) {
        annotation += " \n \n \n \n \n \n " + kernel_description;
    }

    updateAnnotation(annotation)

    if (slide_idx == 0) {
        d3.select('#rootDisplay')
            .select("#prevButtonWrapper")
            .attr("visibility", "hidden");
    } else if (slide_idx == slides.length - 1) {
        d3.select('#rootDisplay')
            .select("#nextButtonWrapper")
            .attr("visibility", "hidden");
    } else {
        d3.select('#rootDisplay')
            .select("#prevButtonWrapper")
            .attr("visibility", "visible");
        d3.select('#rootDisplay')
            .select("#nextButtonWrapper")
            .attr("visibility", "visible");
    }
        


    if (slide_idx == slides.length - 1) {
        d3.select("#selectionWrapper").node().style.visibility = "visible";
    } else {
        d3.select("#selectionWrapper").node().style.visibility = "hidden";
    }
}

function prev_slide() {
    if (slide_idx == 0)
        return

    --slide_idx;

    updateData();
}

function next_slide() {
    if (slide_idx == slides.length - 1)
        return

    ++slide_idx;

    updateData();
}

export function initButtons() {
    const convAllButton = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "convAllButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight})`);

    convAllButton.append("rect")
        .attr("id", "convAllButtonColor")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", config.spaceBetween / 2)
        .attr("height", config.spaceBetween / 8)
        .style("cursor", "pointer")
        .on("click", conv_all)
        .attr("fill", config.convolveColor);
    convAllButton.append("text")
        .attr("id", "convAllButtonText")
        .attr("x", config.spaceBetween / 4)
        .attr("y", config.spaceBetween / 16)
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Convolve All");

    const convButton = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "convButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight * 2 + config.spaceBetween / 8})`);
    convButton.append("rect")
        .attr("id", "convButtonColor")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", config.spaceBetween / 2)
        .attr("height", config.spaceBetween / 8)
        .style("cursor", "pointer")
        .on("click", animateConv)
        .attr("fill", config.convolveColor);
    convButton.append("text")
        .attr("id", "convButtonText")
        .attr("x", config.spaceBetween / 4)
        .attr("y", config.spaceBetween / 16)
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Convolve");

    const prevButton = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "prevButtonWrapper")
        .attr("visibility", "hidden")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                  ${config.cellHeight * 3 + config.spaceBetween / 4})`);
    const nextButton = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "nextButtonWrapper")
        .attr("visibility", "visible")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                  ${config.cellHeight * 3 + config.spaceBetween / 4})`);

    prevButton.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("id", "prevButtonColor")
        .attr("width", config.spaceBetween / 4)
        .attr("height", config.spaceBetween / 8)
        .style("cursor", "pointer")
        .on("click", prev_slide)
        .attr("fill", config.prevColor);
    prevButton.append("text")
        .attr("id", "prevButtonText")
        .attr("x", config.spaceBetween / 8)
        .attr("y", config.spaceBetween / 16)
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Prev");

    nextButton.append("rect")
        .attr("id", "nextButtonColor")
        .attr("x", config.spaceBetween / 4)
        .attr("y", 0)
        .attr("width", config.spaceBetween / 4)
        .attr("height", config.spaceBetween / 8)
        .style("cursor", "pointer")
        .on("click", next_slide)
        .attr("fill", config.nextColor);
    nextButton.append("text")
        .attr("id", "nextButtonText")
        .attr("x", config.spaceBetween * 3 / 8)
        .attr("y", config.spaceBetween / 16)
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Next");
}


/**
 * This function will run when the document has loaded.
 */
export function initConvIntroSection() {
    const selectionWrapper = d3.select("#convIntroSection")
        .append("div")
        .attr("id", "selectionWrapper")
        .style("display", "flex")
        .style("padding", 0)
        .style("visibility", "hidden");
    selectionWrapper.append("div")
        .attr("id", "firstSpacing")
        .style("width", "9%");
    const thumbs = selectionWrapper.append("div")
        .attr("id", "thumbs")
        .style("width", config.img_width);
    const hiddenPadding = thumbs.append("div");
    hiddenPadding.append("p")
        .style("font-size", "var(--kernelThumbFont")
        .style("margin-block-start", 0)
        .style("margin-block-end", 0)
        .style("visibility", "hidden")
        .text("-");
    hiddenPadding.append("p")
        .style("font-size", "var(--kernelThumbFont")
        .style("margin-block-start", 0)
        .style("margin-block-end", 0)
        .style("visibility", "hidden")
        .text("-");
    const imgUrls = Object.values(config.imageUrls);
    for (let i = 0; i < imgUrls.length; ++i) {
        const img = thumbs.append("img")
            .classed("thumbnail", true)
            .attr("src", imgUrls[i]);
        if (i === 0) {
            img.classed("selected", true);
        }
    }
    selectionWrapper.append("div")
        .attr("id", "secondSpacing")
        .style("width", config.spaceBetween);
    selectionWrapper.append("div")
        .attr("id", "kernels")
        .style("width", config.img_width);

    for(let thumbnail of document.getElementsByClassName("thumbnail")) {
        thumbnail.addEventListener("click", (a, b) => {
            let selected = document.getElementsByClassName("selected");
            selected[0].setAttribute("class", "thumbnail");
            thumbnail.setAttribute("class", "thumbnail selected");
            updateData();    
        })
    }

    initSVG();
    initKernelImg();
    initInputImg();
    initOutputImg();
    initEffects();
    initAnnotations();

    update_slide();
    initKernelPreviews();
    updateData();

    initButtons();
}
