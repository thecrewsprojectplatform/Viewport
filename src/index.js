import {initConvIntroSection} from './convIntro/main';
import {init_cnn_vis, resize_cnn_vis} from './cnn_vis';
import {init_real_cnn, resize_real_cnn} from './real_cnn';
import {initMultiConvSection, resizeMultiConv} from './multi-conv';
import {initAnimateMathSection, resizeAnimateMath} from './animateMath';
import {initAnimateRGBSection, resizeAnimateRGB} from './animateRGB';
import {recalculateConfig} from './config';
import {resizeIntroConv} from './convIntro/initSVG';
import * as config from "./config";

function loadSections() {
    recalculateConfig();
    
    initAnimateRGBSection();
    initAnimateMathSection();
    initMultiConvSection();
    initConvIntroSection();
    init_cnn_vis();
    init_real_cnn();
}

function onResize() {
    recalculateConfig();
    
    resizeAnimateRGB();
    resizeAnimateMath();
    resizeIntroConv();

    resizeMultiConv()

    resize_cnn_vis()
    resize_real_cnn()
}

window.onload = loadSections;

window.onresize = onResize;
