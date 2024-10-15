// Lokesh Dhakar's color-thief module modified to work with GJS.
// Original project: https://github.com/lokesh/color-thief

/*
The MIT License (MIT)

Copyright (c) 2015 Lokesh Dhakar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import GdkPixbuf from 'gi://GdkPixbuf'
import quantize from './quantize.js'

function createPixelArray(imgData, pixelCount, quality) {
    const pixels = imgData;
    const pixelArray = [];

    for (let i = 0, offset, r, g, b; i < pixelCount; i = i + quality) {
        offset = i * 3;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];

        // If pixel is not white
        if (!(r > 250 && g > 250 && b > 250)) {
            pixelArray.push([r, g, b]);
        }
    }
    return pixelArray;
}

function getPalette(sourceImage, colorCount = 2, quality = 1) {
    const image = GdkPixbuf.Pixbuf.new_from_file(sourceImage)
    const imageData = image.get_pixels()
    for (let i = 0; i < 6; i++) {
    	console.log('Image data [' + i + ']: ' + imageData[i])
    }
    const pixelCount = image.get_width() * image.get_height()
    console.log('Pixel count: ' + pixelCount)
    const pixels = createPixelArray(imageData, pixelCount, quality)

    // Send array to quantize function which clusters values
    // using median cut algorithm
    const cmap = quantize(pixels, colorCount);
    const palette = cmap? cmap.palette() : null;

    return palette;
};

export default getPalette
