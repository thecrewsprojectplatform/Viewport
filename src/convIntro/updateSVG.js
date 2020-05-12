import * as d3 from "d3";

import * as config from "../config";
import {flattenImg} from "./tensor";
import {image, resultImg, visibleImg, kernel, slide_idx} from "./main";

const color_scale = d3.scaleLinear()
            .domain([0, 1])
            .range([1, 0])

/**
 * Returns an RGB color of gray accosiated with the floated gray value.
 * 
 * @param {number} f A value [0, 1] representing a shade of gray
 */
export function floatToGray(f) {
    return d3.rgb(f * 255, f * 255, f * 255);
}
/**
 * Returns a float [0, 1] representing the shade of gray passed in.
 * 
 * @param {RGBColor} rgb A d3 rgb representing a shade of gray
 */
export function grayToFloat(rgb) {
    return ((rgb.r * 0.3) + (rgb.g * 0.59) + (rgb.b * 0.11)) / 255.0;
}

/**
 * Draw the input data onto the image of the input.
 */
export function drawInputData(disableMouseover) {
    let text_only = slide_idx == 0;

    const updateSet = d3.select("#inputImg")
        .selectAll(".cellWrapper")
        .data(flattenImg(image));
    // ENTER
    const enterSet = updateSet.enter()
        .append("g")
        .classed("cellWrapper", true);
    enterSet.append("rect")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.inputHeight)
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.inputHeight))
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth)
        .classed("cellColor", true);
    enterSet.append("text")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.inputWidth) + config.cellWidth / 2;
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.inputWidth)) + config.cellHeight / 2;
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .attr("pointer-events", "none")
        .classed("cellText", true);
    // UPDATE
    d3.select("#inputImg")
        .selectAll(".cellColor")
        .data(flattenImg(image))
        .attr("fill", d => d3.rgb(d[0], d[1], d[2]))
        .attr("fill-opacity", text_only ? 0 : 1)
        .on("mouseover", (_, i) => {
            if (!disableMouseover) {
                const x = i % config.outputHeight + config.inputWidthLoss;
                const y = Math.floor(i / config.outputHeight) + config.inputHeightLoss;
                visibleImg[y][x] = resultImg[y][x]
                drawOutputDataPoint(i)
                drawEffects(x, y);
            }
        })
        .on("mouseout", () => {
            if (!disableMouseover) {
                removeEffects();
            }
        });
    d3.select("#inputImg")
        .selectAll(".cellText")
        .data(flattenImg(image))
        .text(d => (text_only && d[0] >= 0) ? d[0] : "");
}

/**
 * Draw the output data onto the image of the output.
 */
export function drawOutputData(disableMouseover) {
    let text_only = slide_idx == 0

    const updateSet = d3.select("#outputImg")
        .selectAll(".cellWrapper")
        .data(flattenImg(visibleImg));
    // ENTER
    const enterSet = updateSet.enter()
        .append("g")
        .classed("cellWrapper", true);
    enterSet.append("rect")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.outputHeight)
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.outputHeight))
        })
        .attr("width", config.cellWidth)
        .attr("height", config.cellHeight)
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth)
        .classed("cellColor", true);
    enterSet.append("text")
        .attr("x", function(_, i) {
            return config.cellWidth * (i % config.outputWidth) + config.cellWidth / 2;
        })
        .attr("y", function(_, i) {
            return config.cellHeight * (Math.floor(i / config.outputWidth)) + config.cellHeight / 2;
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .attr("pointer-events", "none")
        .classed("cellText", true);
    // UPDATE
    d3.select("#outputImg")
        .selectAll(".cellColor")
        .data(flattenImg(visibleImg))
        .attr("fill", d => d3.rgb(d[0], d[1], d[2]))
        .attr("fill-opacity", text_only ? 0 : 1)
        .on("mouseover", (_, i) => {
            if (!disableMouseover) {
                const x = i % config.outputHeight + config.inputWidthLoss;
                const y = Math.floor(i / config.outputHeight) + config.inputHeightLoss;
                visibleImg[y][x] = resultImg[y][x];
                drawOutputDataPoint(i)
                drawEffects(x, y);
            }
        })
        .on("mouseout", () => {
            if (!disableMouseover) {
                removeEffects();
            }
        });
    d3.select("#outputImg")
        .selectAll(".cellText")
        .data(flattenImg(visibleImg))
        .text(d => (text_only && d[0] >= 0) ? d[0] : "");
}

/**
 * Draw the output data onto the image of the output.
 */
export function drawOutputDataPoint(i) {
    let text_only = slide_idx == 0

    const cell = d3.select(
        d3.select("#outputImg")
            .selectAll(".cellWrapper")
            .nodes()[i]
        );
    // UPDATE
    
    if (!text_only) {
        cell.selectAll(".cellColor")
        .data([flattenImg(visibleImg)[i]])
        .attr("fill", d => d3.rgb(d[0], d[1], d[2]))
    }
    else {
        cell.selectAll(".cellText")
        .data([flattenImg(visibleImg)[i]])
        .text(d => (text_only && d[0] >= 0) ? d[0] : "");
    }
}

/**
 * Draw the kernel data onto the image of the kernel.
 */
export function drawKernelData() {
    const updateSet = d3.select("#kernelImg")
        .selectAll(".cellWrapper")
        .data(flattenImg(kernel));
    // ENTER
    const enterSet = updateSet.enter()
        .append("g")
        .classed("cellWrapper", true);
    enterSet.append("rect")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.kernelCellWidth;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth) * config.kernelCellHeight);
        })
        .attr("width", config.kernelCellWidth)
        .attr("height", config.kernelCellHeight)
        .attr("fill", "white")
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth)
        .classed("cellColor", true);
    enterSet.append("text")
        .attr("x", function(_, i) {
            return (i % config.kernelWidth) * config.kernelCellWidth + config.kernelCellWidth / 2;
        })
        .attr("y", function(_, i) {
            return (Math.floor(i / config.kernelWidth)) * config.kernelCellHeight + config.kernelCellHeight / 2;
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.kernelFontSize)
        .attr("pointer-events", "none")
        .classed("cellText", true);
    // UPDATE
    d3.select("#kernelImg")
        .selectAll(".cellColor")
        .data(flattenImg(kernel));
    d3.select("#kernelImg")
        .selectAll(".cellText")
        .data(flattenImg(kernel))
        .text(d => (Math.round(d * 10) / 10));
}

function calc_offset(sign, kernel_size, cell_size) {
    return (1 + sign) * cell_size / 2 + sign * (kernel_size - 1) / 2 * cell_size
}

/**
 * Draw the effects(lines, highlights) onto the page. Because the effects need to be on top, a reference
 * to the real effect is deleted and then recreated every time in case new shapes have
 * been added to the SVG.
 */
export function drawEffects(selectionX, selectionY) {
    removeEffects();

    d3.select("#inputHighlight")
        .attr("transform", `translate(${config.cellWidth * (selectionX - 1)},
                                      ${config.cellHeight * (selectionY - 1)})`);
    d3.select("#outputHighlight")
        .attr("transform", `translate(${config.cellWidth * (selectionX)},
                                      ${config.cellHeight * (selectionY)})`);

    for (let i = 0; i < 4; ++i) {
        // Trick to do all of this in one loop. Generates -1 -1; -1, 1; 1, -1; 1, 1.
        // These are used to calculate the offsets to the corners from the center of the cell
        let sign_x = 2 * (i & 1) - 1
        let sign_y = 2 * ((i >> 1) & 1) - 1

        let x_offset = calc_offset(sign_x, config.kernelWidth, config.cellWidth)
        let y_offset = calc_offset(sign_y, config.kernelHeight, config.cellHeight)

        let x_offset_kernel = calc_offset(sign_x, config.kernelWidth, config.kernelCellWidth)
        let y_offset_kernel = calc_offset(sign_y, config.kernelHeight, config.kernelCellHeight)

        // Connect input with kernel
        d3.select(`#connectingLine-${i}`)
            .attr("x1", config.cellWidth * (selectionX + 1) + x_offset)
            .attr("y1", config.cellHeight * (selectionY + 1) + y_offset)
            .attr("x2", config.img_width + config.spaceBetween / 2 - config.kernelCellWidth / 2 + x_offset_kernel)
            .attr("y2", config.img_height - config.cellHeight - config.kernelCellHeight * (config.kernelHeight + 1) / 2 + y_offset_kernel);

        // Connect kernel with output
        d3.select(`#connectingLine-${i + 4}`)
            .attr("x1", config.img_width + config.spaceBetween / 2 - config.kernelCellWidth / 2 + x_offset_kernel)
            .attr("y1", config.img_height - config.cellHeight - config.kernelCellHeight * (config.kernelHeight + 1) / 2 + y_offset_kernel)
            .attr("x2", config.img_width + config.spaceBetween + config.cellWidth * (selectionX + 1) + (sign_x + 1) / 2 * config.cellWidth)
            .attr("y2", config.cellHeight * (selectionY + 1) + + (sign_y + 1) / 2 * config.cellHeight);
    }

    d3.select("#inputImg")
        .append("use")
        .classed("effectDisplay", true)
        .attr("xlink:href", "#inputHighlight");

    d3.select("#outputImg")
        .append("use")
        .classed("effectDisplay", true)
        .attr("xlink:href", "#outputHighlight");
    
    for (let i=0; i < 8; ++i) {
        d3.select("#lineWrapper")
            .append("use")
            .classed("effectDisplay", true)
            .attr("xlink:href", "#connectingLine-" + i);
    }
}

/**
 * Remove the effects(lines, highlights) from the SVG.
 */
export function removeEffects() {
    d3.selectAll(".effectDisplay")
        .remove();
}
