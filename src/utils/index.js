/***********************************************************************************************************************
 * Common functions to manage data structures and calculation.
 **********************************************************************************************************************/

/**
 * Return sequence of letters from start to end.
 * @param start
 * @param end
 * @returns {string[]}
 */
export function generateLetters (start, end) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(start, end).split('');
}

/**
 * Return sequence of numbers from start to end.
 * @param start {Integer}
 * @param end {Integer}
 * @returns {Array}
 */
export function generateNumbers (start, end) {
    let ret = [];
    for (let i=start; i<=end; i++){
        ret.push(i);
    }
    return ret;
}

/**
 * Return random integer number from min to max, including both numbers.
 * @param min {Integer}
 * @param max {Integer}
 * @returns {Integer}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max +1 - min)) + min;
}

/**
 * Return matrix (two-dimensional array) which size is x * y. Each item = value.
 * @param x {Integer}
 * @param y {Integer}
 * @param value {any}
 * @returns {Array}
 */
export function generateMatrix (x, y, value = 0) {
    let ret = [];
    for (let i=0; i<y; i++){
        let row = [];
        for (let j=0; j<x; j++) {
            row.push(value);
        }
        ret.push(row);
    }
    return ret;
}

/**
 * Return a copy of source matrix.
 * @param src {Array}
 * @returns {Array}
 */
export function cloneMatrix (src) {
    return src.map(arr => arr.slice());
}

/**
 * Return a copy of source matrix on which target matrix is added.
 * Example:
 * src = [
 *   [0, 0, 0, 0],
 *   [0, 0, 0, 0],
 *   [0, 0, 0, 0],
 *   [0, 0, 0, 0]
 * ]
 *
 * tgt = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 *
 * applyMatrix(src, tgt)
 * [
 *   [1, 2, 3, 0],
 *   [4, 5, 6, 0],
 *   [7, 8, 9, 0],
 *   [0, 0, 0, 0]
 * ]
 *
 * applyMatrix(src, tgt, 1, 1)
 * [
 *   [0, 0, 0, 0],
 *   [0, 1, 2, 3],
 *   [0, 4, 5, 6],
 *   [0, 7, 8, 9]
 * ]
 *
 * applyMatrix(src, tgt, -1, -1)
 * [
 *   [5, 6, 0, 0],
 *   [8, 9, 0, 0],
 *   [0, 0, 0, 0],
 *   [0, 0, 0, 0]
 * ]
 *
 * @param src {Array} - source matrix which copy with applied target is returned.
 * @param tgt {Array} - target matrix which values are
 * @param x {Integer} - x-shift of target matrix, default 0.
 * @param y {Integer} - y-shift of target matrix, default 0.
 * @returns {Array}   - copy of source matrix
 */
export function applyMatrix (src, tgt, x = 0, y = 0) {
    if (!src) return [];
    let ret = cloneMatrix(src);
    let ylength = src.length,
        xlength = src[0].length;

    for (let i=0; i<tgt.length; i++) {
        let ys = i+y;
        if (ys >= 0 && ys < ylength) {
            for (let j = 0; j < tgt[i].length; j++) {
                let xs = j + x;
                if (xs >= 0 && xs < xlength) {
                    ret[ys][xs] += tgt[i][j];
                }
            }
        }
    }
    return ret;
}


window.generateMatrix = generateMatrix;
window.applyMatrix = applyMatrix;
window.cloneMatrix = cloneMatrix;
