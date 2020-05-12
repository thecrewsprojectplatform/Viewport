import * as d3 from "d3";

import * as config from "../config";

/**
 * Initialize the root SVG.
 */
export function initSVG() {
    d3.select("#convIntroSection")
        .append("svg")
        .attr("id", "rootDisplay")
        .attr("width", 2 * config.img_width + config.spaceBetween + config.borderWidth)
        .attr("height", config.img_height + config.borderWidth);
}

/**
 * Initialize the container for the image of the input.
 */
export function initInputImg() {
    // g element containing all of the image contents
    const inputImg = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "inputImg")
        .attr("transform", `translate(${config.cellWidth + config.borderWidth / 2},
                                      ${config.cellHeight + config.borderWidth / 2})`);
}

/**
 * Initialize the container for the image of the output.
 */
export function initOutputImg() {
    // g element containing all of the image contents
    const outputImg = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "outputImg")
        .attr("transform", `translate(${config.img_width + config.spaceBetween + config.cellWidth + config.borderWidth / 2},
                                      ${config.inputHeightLoss * config.cellHeight + config.cellHeight + config.borderWidth / 2})`);
}

/**
 * Initialize the container for the image of the kernel.
 */
export function initKernelImg() {
    // g element containing all of the image contents
    const kernelImg = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "kernelImg")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4 + config.borderWidth},
                                      ${config.img_height - config.kernelCellHeight * config.kernelHeight - config.cellHeight + config.borderWidth / 2})`);
}

/**
 * Initialize the effects(lines, highlighting).
 */
export function initEffects() {
    const effects = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "effectsLayer")
        .attr("visibility", "hidden");
    
    const inputHighlight = effects.append("g")
        .attr("id", "inputHighlight")
        .attr("pointer-events", "none");
    inputHighlight.selectAll(".highlightCell")
        .data([...Array(config.kernelHeight * config.kernelWidth)])
        .enter()
        .append("rect")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.cellWidth;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth) * config.cellHeight);
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("fill-opacity", 0)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth)
        .classed("highlightCell", true);
    inputHighlight.append("rect")
        .attr("id", "inputHighlightOutline")
        .attr("width", config.cellWidth * config.kernelWidth)
        .attr("height", config.cellHeight * config.kernelHeight)
        .attr("fill-opacity", 0)
        .attr("stroke", config.highlightColorIn)
        .attr("stroke-width", config.highlightOutlineWidth);
    
    const outputHighlight = effects.append("g")
        .attr("id", "outputHighlight")
        .attr("pointer-events", "none");
    outputHighlight.append("rect")
        .attr("id", "outputHighlightOutline")
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("fill-opacity", 0)
        .attr("stroke", config.highlightColorOut)
        .attr("stroke-width", config.highlightOutlineWidth);

    // Need a total of 8 connecting lines, 4 for each corner of the input to kernel lines
    // and 4 for the kernel to output lines
    const lines = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "lineWrapper");
    for (let i = 0; i < 8; ++i) {
        const connectingLine = effects.append("line")
            .attr("id", `connectingLine-${i}`)
            .attr("pointer-events", "none")
            .attr("stroke-opacity", 1)
            .attr("stroke-dasharray", 4)
            .attr("stroke", i < 4 ? config.highlightColorIn : config.highlightColorOut)
            .attr("stroke-width", config.borderWidth);
    }
}

// https://stackoverflow.com/questions/24784302/wrapping-text-in-d3/24785497
// Slightly modified to allow \n characters
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(" ").reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            let is_lf = word == "\n";
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width || is_lf) {
                line.pop();
                tspan.text(line.join(" "));
                line = is_lf ? [] : [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

let text_area_w = config.spaceBetween * 9/10;
let text_area_h = config.spaceBetween * 7/10;

export function initAnnotations() {
    const annotation = d3.select("#rootDisplay")
        .append("g")
        .attr("id", "annotationWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 2 - text_area_w / 2 + config.borderWidth / 2},
                                      ${config.img_height - config.cellHeight - text_area_h - config.kernelCellHeight * (config.kernelHeight + 1/2) + config.borderWidth / 2})`);
    
    const g = annotation.append("g")
        .attr("id", "annotation")
        .attr("pointer-events", "none")
    const rect = g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", text_area_w)
        .attr("height", text_area_h)
        .attr("fill-opacity", 0)
        // .attr("stroke", config.highlightColorIn)
        // .attr("stroke-width", config.highlightOutlineWidth);

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .attr("pointer-events", "none")
        .attr("x", text_area_w / 2)
        .attr("y", "1em")
        .text("")
        .call(wrap, text_area_w)
        .attr("id", "annotation-text");
}

let orig_text = ""
// TOOD: move to other file
export function updateAnnotation(text) {
    orig_text = text
    d3.select("#annotation-text").text(text).call(wrap, text_area_w);
}

export function resizeIntroConv() {
    const root = d3.select("#convIntroSection")
        .select("#rootDisplay")
        .attr("width", 2 * config.img_width + config.spaceBetween + config.borderWidth)
        .attr("height", config.img_height + config.borderWidth);

    root.select("#inputImg")
        .attr("transform", `translate(${config.cellWidth + config.borderWidth / 2},
                                      ${config.cellHeight + config.borderWidth / 2})`);
    root.select("#inputImg")
        .selectAll(".cellColor")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.inputHeight)
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.inputHeight))
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth);
    root.select("#inputImg")
        .selectAll(".cellText")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.inputWidth) + config.cellWidth / 2;
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.inputWidth)) + config.cellHeight / 2;
        })
        .attr("font-size", config.fontSize);

    root.select("#outputImg")
        .attr("transform", `translate(${config.img_width + config.spaceBetween + config.cellWidth + config.borderWidth / 2},
                                      ${config.inputHeightLoss * config.cellHeight + config.cellHeight + config.borderWidth / 2})`);
    root.select("#outputImg")
        .selectAll(".cellColor")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.outputHeight)
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.outputHeight))
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth);
    root.select("#outputImg")
        .selectAll(".cellText")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.outputWidth) + config.cellWidth / 2;
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.outputWidth)) + config.cellHeight / 2;
        })
        .attr("font-size", config.fontSize);

    root.select("#kernelImg")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4 + config.borderWidth},
                                      ${config.img_height - config.kernelCellHeight * config.kernelHeight - config.cellHeight + config.borderWidth / 2})`);
    root.select("#kernelImg")
        .selectAll(".cellColor")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.kernelCellWidth;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth) * config.kernelCellHeight);
        })
        .attr("width", config.kernelCellWidth)
        .attr("height", config.kernelCellHeight)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth);
    root.select("#kernelImg")
        .selectAll(".cellText")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.kernelCellWidth + config.kernelCellWidth / 2;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth)) * config.kernelCellHeight + config.kernelCellHeight / 2;
        })
        .attr("font-size", config.kernelFontSize);

    const inputHighlight = root.select("#inputHighlight");
    inputHighlight.selectAll(".highlightCell")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.cellWidth;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth) * config.cellHeight);
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight);
    inputHighlight.select("#inputHighlightOutline")
        .attr("width", config.cellWidth * config.kernelWidth)
        .attr("height", config.cellHeight * config.kernelHeight);
    
    const outputHighlight = root.select("#outputHighlight");
    outputHighlight.select("#outputHighlightOutline")
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight);

    text_area_w = config.spaceBetween * 9/10;
    text_area_h = config.spaceBetween * 7/10;

    root.select("#annotationWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 2 - text_area_w / 2 + config.borderWidth / 2},
                                      ${config.img_height - config.cellHeight - text_area_h - config.kernelCellHeight * (config.kernelHeight + 1/2) + config.borderWidth / 2})`);
        
    root.select("#annotation")
        .select("rect")
        .attr("width", text_area_w)
        .attr("height", text_area_h);

    root.select("#annotation-text")
        .attr("font-size", config.fontSize)
        .attr("x", text_area_w / 2)
        .attr("y", "1em")
        .text(orig_text)
        .call(wrap, text_area_w);
    
    const convAllButton = root.select("#convAllButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight})`);
    convAllButton.select("#convAllButtonColor")
        .attr("width", config.spaceBetween / 2)
        .attr("height", config.spaceBetween / 8);
    convAllButton.select("#convAllButtonText")
        .attr("x", config.spaceBetween / 4)
        .attr("y", config.spaceBetween / 16)
        .attr("font-size", config.fontSize);

    const convButton = root.select("#convButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight * 2 + config.spaceBetween / 8})`);
    convButton.select("#convButtonColor")
        .attr("width", config.spaceBetween / 2)
        .attr("height", config.spaceBetween / 8);
    convButton.select("#convButtonText")
        .attr("x", config.spaceBetween / 4)
        .attr("y", config.spaceBetween / 16)
        .attr("font-size", config.fontSize);

    const prevButton = root.select("#prevButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight * 3 + config.spaceBetween / 4})`);
    prevButton.select("#prevButtonColor")
        .attr("width", config.spaceBetween / 4)
        .attr("height", config.spaceBetween / 8);
    prevButton.select("#prevButtonText")
        .attr("x", config.spaceBetween / 8)
        .attr("y", config.spaceBetween / 16)
        .attr("font-size", config.fontSize);
        
    const nextButton = root.select("#nextButtonWrapper")
        .attr("transform", `translate(${config.img_width + config.spaceBetween / 4},
                                      ${config.cellHeight * 3 + config.spaceBetween / 4})`);
    nextButton.select("#nextButtonColor")
        .attr("x", config.spaceBetween / 4)
        .attr("width", config.spaceBetween / 4)
        .attr("height", config.spaceBetween / 8);
    nextButton.select("#nextButtonText")
        .attr("x", config.spaceBetween * 3 / 8)
        .attr("y", config.spaceBetween / 16)
        .attr("font-size", config.fontSize);

    const selectionWrapper = d3.select("#convIntroSection")
        .select("#selectionWrapper");
    //selectionWrapper.select("#firstSpacing")
    //    .style("width", config.cellWidth);
    selectionWrapper.select("#thumbs")
        .style("width", config.img_width);
    selectionWrapper.select("#secondSpacing")
        .style("width", config.spaceBetween);
    selectionWrapper.select("#kernels")
        .style("width", config.img_width);
    selectionWrapper.select("#thirdSpacing")
        .style("width", config.cellWidth);
}
