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
 * Return random integer number from min (include) to max (not include).
 * @param min {Integer}
 * @param max {Integer}
 * @returns {Integer}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
