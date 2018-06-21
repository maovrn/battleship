/***********************************************************************************************************************
 * Common functions to manage data structures and calculation.
 **********************************************************************************************************************/

export function generateLetters (start, end) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(start, end).split('');
}

export function generateNumbers (start, end) {
    let ret = [];
    for (let i=start; i<=end; i++){
        ret.push(i);
    }
    return ret;
}

