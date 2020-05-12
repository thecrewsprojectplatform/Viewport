import * as d3 from "d3";
import * as config from "./config";

import puppy from "../Images/dog.png";
import puppySobel from "../Images/puppySobel.png";
import puppySobelConv from "../Images/puppySobelConv.png";
import puppyOutput from "../Images/puppyOutput.png";

/**
 * State of the visualization. Number of layers
 */
let numLayers = 0;

/**
 * Proportions of the SVG
 */
let svgWidth = config.svgWidth;
let svgHeight = svgWidth / 4;

/**
 * Proportions for image
 */
let imageSectionWidth = svgWidth;
let imageSectionHeight = svgHeight / 2;

let imageSectionX = 0;
let imageSectionY = 0;

let groupWidth = 0.2 * imageSectionWidth;
let groupHeight = 0.5 * imageSectionHeight;

// Image
let imageWidth = 0.4 * groupWidth;
let imageHeight = imageWidth;

let imageX = 0.6 * groupWidth;
let imageY = 0.2 * groupHeight;

// Image Text
let imageTextX = imageX + imageWidth / 2;
let imageTextY = imageY - 0.1 * imageHeight;

// Arrow
let arrowLength = 0.35 * groupWidth;
let arrowX1 = 0.1 * groupWidth;
let arrowX2 = arrowX1 + arrowLength;
let arrowY = 0.7 * groupHeight;

// Arrowhead
let arrowSize = 0.04 * groupHeight;
let arrowPoints = [[0, 0], [0, arrowSize * 2], [arrowSize * 3, arrowSize]];

let arrowMarkerWidth = groupHeight / 5;
let arrowMarkerHeight = groupHeight / 5;

// Arrow Text
let arrowTextX = arrowX1 + arrowLength / 2;
let arrowTextY = arrowY - 0.1 * groupHeight;

// Start Image
let startImageX = 0.15 * imageSectionWidth;
let startImageY = imageSectionY + (0.3 * imageSectionHeight) + imageY;

let startImageTextX = startImageX + imageWidth / 2;
let startImageTextY = startImageY - 0.1 * imageHeight;

/**
 * Proportions of the description text
 */
let textSectionWidth = svgWidth;
let textSectionHeight = svgHeight / 3.5;

let textSectionX = 0;
let textSectionY = svgHeight / 2;

let textX = textSectionX + textSectionWidth / 2;
let textY = textSectionY + textSectionHeight / 2;

/**
 * Proportions of the buttons
 */
let buttonSectionWidth = svgWidth;
let buttonSectionHeight = textSectionHeight;

let buttonSectionX = 0;
let buttonSectionY = (3 / 4) * svgHeight;

let buttonWidth = buttonSectionWidth / 15;
let buttonHeight = buttonSectionHeight / 2;

let nextButtonX = buttonSectionX + buttonSectionWidth / 2;
let nextButtonY = buttonSectionY + buttonSectionHeight / 4;

let nextButtonTextX = nextButtonX + buttonWidth / 2;
let nextButtonTextY = nextButtonY + buttonHeight / 2;

let prevButtonX = nextButtonX - buttonWidth;
let prevButtonY = nextButtonY;

let prevButtonTextX = prevButtonX + buttonWidth / 2;
let prevButtonTextY = prevButtonY + buttonHeight / 2;

/**
 * Font Size
 */
let fontSize = svgWidth / 40;
let imageTextFontSize = fontSize / 3;
let arrowFontSize = imageTextFontSize;
let descriptionTextFontSize = fontSize / 2;
let buttonTextFontSize = fontSize / 2;

let arrowStrokeWidth = fontSize / 30;

export function initMultiConvSection() {
    initSVG();
    drawInputImage();
    drawConvLayers();
    drawButtons();
    drawText();
}

/**
 * Initialize the SVG.
 */
export function initSVG() {
    d3.select("#multiConvSection")
        .append("svg")
        .attr("id", "multiConvSvg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // arrow
    d3.select("#multiConvSvg").append("svg:defs").append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 0)
        .attr("refY", arrowSize)
        .attr("markerWidth", arrowMarkerWidth)
        .attr("markerHeight", arrowMarkerHeight)
        .attr("orient", "auto")
        .append("path")
        .attr("d", d3.line()(arrowPoints))
        .style("stroke", "black");
}

/**
 * Draws the ConvLayers
 */
export function drawConvLayers() {
    // Make Layers

    const data = [];

    for (let i = 0; i < 3; i++) {
        data.push(`Layer ${i + 1}`);
    }
    
    const convLayerWrappers = d3.select("#multiConvSvg")
        .selectAll(".convLayerWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (_, i) => `translate(${imageWidth + startImageX + (groupWidth * i)}, ${imageSectionY + (0.3 * imageSectionHeight)})`)
        .attr("opacity", 0.0)
        .classed("convLayerWrapper", true);
    
    //line              
    convLayerWrappers.append("line")
        .attr("x1", arrowX1)
        .attr("y1", arrowY)
        .attr("x2", arrowX2)
        .attr("y2", arrowY)          
        .attr("stroke-width", arrowStrokeWidth)
        .attr("stroke", "black")
        .attr("marker-end", "url(#triangle)");

    //text
    convLayerWrappers.append("text")
        .attr("x", arrowTextX)
        .attr("y", arrowTextY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", arrowFontSize)
        .attr("pointer-events", "none")
        .text("Convolution")
        .classed("arrowCaption", true);

    //image
    convLayerWrappers.append("svg:image")
        .attr("id", (_,i) => "image" + (i + 1))
        .attr("x", imageX)
        .attr("y", imageY)
        .attr("width", imageWidth)
        .attr("height", imageHeight)
        .attr("stroke", "black")
        .attr("image-rendering", "pixelated")
        .attr('xlink:href', (_, i) => {
            let img;
            if (i+1 == 1) {
                img = puppySobel;
            } else if (i+1 == 2) {
                img = puppySobelConv;
            } else if (i+1 == 3) {
                img = puppyOutput;
            }
            return img;
        })
        .classed("image", true);

    //text
    convLayerWrappers.append("text")
        .attr("x", imageTextX)
        .attr("y", imageTextY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", imageTextFontSize)
        .attr("pointer-events", "none")
        .text((_, i) => `Layer ${i+1}`)
        .classed("imageCaption", true);

    d3.select("#multiConvSvg")
        .selectAll(".convLayerText")
        .data(data)
        .text((d) => d);

    d3.select("#multiConvSvg")
        .selectAll(".convLayerWrapper")
        .data(data)
        .exit()
        .remove();
}

export function drawButtons() {
    // This is the Add Layer Button
    const addButtonWrapper = d3.select("#multiConvSvg")
        .append("g")
        .attr("id", "addButtonWrapper");
    addButtonWrapper.append("rect")
        .attr("x", nextButtonX)
        .attr("y", nextButtonY)
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .attr("fill", config.nextColor)
        .style("cursor", "pointer")
        .on("click", () => updateState(actions.ADD));
    addButtonWrapper.append("text")
        .attr("x", nextButtonTextX)
        .attr("y", nextButtonTextY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", buttonTextFontSize)
        .attr("pointer-events", "none")
        .text("Next");

    // This is the Remove Layer Button
    const removeButtonWrapper = d3.select("#multiConvSvg")
        .append("g")
        .attr("id", "removeButtonWrapper")
        .attr("visibility", "hidden");
    removeButtonWrapper.append("rect")
        .attr("x", prevButtonX)
        .attr("y", prevButtonY)
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .attr("fill", config.prevColor)
        .style("cursor", "pointer")
        .on("click", () => updateState(actions.REMOVE));
    removeButtonWrapper.append("text")
        .attr("x", prevButtonTextX)
        .attr("y", prevButtonTextY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", buttonTextFontSize)
        .attr("pointer-events", "none")
        .text("Prev");
}

/**
 * Draws the image and text
 */
export function drawInputImage() {
    
    const imageWrapper = d3.select("#multiConvSvg")
        .append("g")
        .attr("id", "imageWrapper");
    imageWrapper.append("svg:image")
        .attr("id", "image0")
        .attr("x", startImageX)
        .attr("y", startImageY)
        .attr("width", imageWidth)
        .attr("height", imageHeight)
        .attr('xlink:href', puppy)
        .attr("stroke", "black");
    imageWrapper.append("text")
        .attr("x", startImageTextX)
        .attr("y", startImageTextY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", imageTextFontSize)
        .attr("pointer-events", "none")
        .text("Input");
}

/**
 * Draws the desciption text
 */
export function drawText() {
    
    const textWrapper = d3.select("#multiConvSvg")
        .append("g")
        .attr("id", "textWrapper");
    textWrapper.append("text")
        .attr("x", textX)
        .attr("y", textY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", descriptionTextFontSize)
        .attr("pointer-events", "none")
        .attr("dy", "0em")
        .text("Here is the puppy image.")
        .classed("descriptionText", true);
    textWrapper.append("text")
        .attr("x", textX)
        .attr("y", textY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", descriptionTextFontSize)
        .attr("pointer-events", "none")
        .attr("dy", "1em")
        .text("Lets apply a convolution to it!")
        .classed("descriptionText2", true);
}

const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

/**
 * Updates the states of the layers
 */
export function updateState(action) {
    const convLayerWrappers = d3.select("#multiConvSvg");

    switch (action) {
        case 'ADD':
            if (numLayers <= 2) {
                numLayers++;
            }
            if (numLayers > 0) {
                d3.select("#removeButtonWrapper")
                    .attr("visibility", "visible")
            }
            if (numLayers >= 3) {
                d3.select("#addButtonWrapper")
                    .attr("visibility", "hidden");
            }

            convLayerWrappers.selectAll(".convLayerWrapper")
                .transition()
                .style("opacity", (_,i) => {
                    if (i < numLayers) {
                        return 1.0;
                    } else {
                        return 0.0;
                    };
                })
                .duration(500);

            break;
        case 'REMOVE':
            if (numLayers > 0) {
                numLayers--;
            }
            if (numLayers < 3) {
                d3.select("#addButtonWrapper")
                    .attr("visibility", "visible")
            }
            if (numLayers <= 0) {
                d3.select("#removeButtonWrapper")
                    .attr("visibility", "hidden");
            }
            
            convLayerWrappers.selectAll(".convLayerWrapper")
                .transition()
                .style("opacity", (_,i) => {
                    if (i >= numLayers) {
                        return 0.0;
                    } else {
                        return 1.0;
                    };
                })
                .duration(500);
            break;
        default:
    }

    let txt;
    let txt2;
    if (numLayers == 1) {
        txt = "Certain features of the puppy are being highlighted.";
        txt2 = "Let's apply another convolution!";
    } else if (numLayers == 2) {
        txt = "The eyes seem to have a lot more prominence with a";
        txt2 = "little bit of noise around the feet. Let's apply another convolution!";
    } else if (numLayers == 3) {
        txt = "The region most prominent corresponds to the eyes of the puppy.";
        txt2 = "Our network seems to be searching for these kinds of features...";
    } else {
        txt = "Here is the puppy image.";
        txt2 = "Let's apply a convolution to it!";
    }
    d3.select("#textWrapper")
        .select(".descriptionText")
        .text(txt);
    d3.select("#textWrapper")
        .select(".descriptionText2")
        .text(txt2);

    drawConvLayers();
}

export function resizeMultiConv() {
    /**
     * Proportions of the SVG
     */
    svgWidth = config.svgWidth;
    svgHeight = svgWidth / 4;

    /**
     * Proportions for image
     */
    imageSectionWidth = svgWidth;
    imageSectionHeight = svgHeight / 2;

    imageSectionX = 0;
    imageSectionY = 0;

    groupWidth = 0.2 * imageSectionWidth;
    groupHeight = 0.5 * imageSectionHeight;

    // Image
    imageWidth = 0.4 * groupWidth;
    imageHeight = imageWidth;

    imageX = 0.6 * groupWidth;
    imageY = 0.2 * groupHeight;

    // Image Text
    imageTextX = imageX + imageWidth / 2;
    imageTextY = imageY - 0.1 * imageHeight;

    // Arrow
    arrowLength = 0.35 * groupWidth;
    arrowX1 = 0.1 * groupWidth;
    arrowX2 = arrowX1 + arrowLength;
    arrowY = 0.7 * groupHeight;

    // Arrowhead
    arrowSize = 0.04 * groupHeight;
    arrowPoints = [[0, 0], [0, arrowSize * 2], [arrowSize * 3, arrowSize]];

    arrowMarkerWidth = groupHeight / 5;
    arrowMarkerHeight = groupHeight / 5;

    // Arrow Text
    arrowTextX = arrowX1 + arrowLength / 2;
    arrowTextY = arrowY - 0.1 * groupHeight;

    // Start Image
    startImageX = 0.15 * imageSectionWidth;
    startImageY = imageSectionY + (0.3 * imageSectionHeight) + imageY;

    startImageTextX = startImageX + imageWidth / 2;
    startImageTextY = startImageY - 0.1 * imageHeight;

    /**
     * Proportions of the description text
     */
    textSectionWidth = svgWidth;
    textSectionHeight = svgHeight / 3.5;

    textSectionX = 0;
    textSectionY = svgHeight / 2;

    textX = textSectionX + textSectionWidth / 2;
    textY = textSectionY + textSectionHeight / 2;

    /**
     * Proportions of the buttons
     */
    buttonSectionWidth = svgWidth;
    buttonSectionHeight = textSectionHeight;

    buttonSectionX = 0;
    buttonSectionY = (3 / 4) * svgHeight;

    buttonWidth = buttonSectionWidth / 15;
    buttonHeight = buttonSectionHeight / 2;

    nextButtonX = buttonSectionX + buttonSectionWidth / 2;
    nextButtonY = buttonSectionY + buttonSectionHeight / 4;

    nextButtonTextX = nextButtonX + buttonWidth / 2;
    nextButtonTextY = nextButtonY + buttonHeight / 2;

    prevButtonX = nextButtonX - buttonWidth;
    prevButtonY = nextButtonY;

    prevButtonTextX = prevButtonX + buttonWidth / 2;
    prevButtonTextY = prevButtonY + buttonHeight / 2;

    /**
     * Font Size
     */
    fontSize = svgWidth / 40;
    imageTextFontSize = fontSize / 3;
    arrowFontSize = imageTextFontSize;
    descriptionTextFontSize = fontSize / 2;
    buttonTextFontSize = fontSize / 2;

    arrowStrokeWidth = fontSize / 30;

    // console.log("SVG width is " + svgWidth);

    // SVG
    const root = d3.select("#multiConvSection")
        .select("#multiConvSvg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    root.select("#triangle")
        .attr("refX", 0)
        .attr("refY", arrowSize)
        .attr("markerWidth", arrowMarkerWidth)
        .attr("markerHeight", arrowMarkerHeight)
        .attr("orient", "auto")
        .attr("d", d3.line()(arrowPoints))
    
    // Visualization section
    const convLayerWrappers = root.selectAll(".convLayerWrapper")
        .attr("transform", (_, i) => `translate(${imageWidth + startImageX + (groupWidth * i)}, ${imageSectionY + (0.3 * imageSectionHeight)})`);
              
    convLayerWrappers.selectAll("line")
        .attr("x1", arrowX1)
        .attr("y1", arrowY)
        .attr("x2", arrowX2)
        .attr("y2", arrowY)          
        .attr("stroke-width", arrowStrokeWidth)
        .attr("marker-end", "url(#triangle)");

    convLayerWrappers.selectAll(".arrowCaption")
        .attr("x", arrowTextX)
        .attr("y", arrowTextY)
        .attr("font-size", arrowFontSize);

    convLayerWrappers.selectAll(".image")
        .attr("x", imageX)
        .attr("y", imageY)
        .attr("width", imageWidth)
        .attr("height", imageHeight);

    convLayerWrappers.selectAll(".imageCaption")
        .attr("x", imageTextX)
        .attr("y", imageTextY)
        .attr("font-size", imageTextFontSize);
    
    // Buttons
    // This is the Add Layer Button
    const addButtonWrapper = root.select("#addButtonWrapper");
    addButtonWrapper.select("rect")
        .attr("x", nextButtonX)
        .attr("y", nextButtonY)
        .attr("width", buttonWidth)
        .attr("height", buttonHeight);
    addButtonWrapper.select("text")
        .attr("x", nextButtonTextX)
        .attr("y", nextButtonTextY)
        .attr("font-size", buttonTextFontSize);

    // This is the Remove Layer Button
    const removeButtonWrapper = root.select("#removeButtonWrapper");
    removeButtonWrapper.select("rect")
        .attr("x", prevButtonX)
        .attr("y", prevButtonY)
        .attr("width", buttonWidth)
        .attr("height", buttonHeight);
    removeButtonWrapper.select("text")
        .attr("x", prevButtonTextX)
        .attr("y", prevButtonTextY)
        .attr("font-size", buttonTextFontSize);

    
    // Input Image
    const imageWrapper = root.select("#imageWrapper");
    imageWrapper.select("#image0")
        .attr("x", startImageX)
        .attr("y", startImageY)
        .attr("width", imageWidth)
        .attr("height", imageHeight);
    imageWrapper.select("text")
        .attr("x", startImageTextX)
        .attr("y", startImageTextY)
        .attr("font-size", imageTextFontSize);


    // Description text
    const textWrapper = root.select("#textWrapper");
    textWrapper.select(".descriptionText")
        .attr("x", textX)
        .attr("y", textY)
        .attr("font-size", descriptionTextFontSize);
    textWrapper.select(".descriptionText2")
        .attr("x", textX)
        .attr("y", textY)
        .attr("font-size", descriptionTextFontSize);
}