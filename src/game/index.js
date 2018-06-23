/***********************************************************************************************************************
 * Base logic of the game.
 **********************************************************************************************************************/

import * as utils from '../utils';
import * as matrix from '../utils/matrix';

import DotShape from './ships/DotShape';
import Ishape from './ships/Ishape';
import Lshape from './ships/Lshape';

// size of battleground
export const maxX = 10,
             maxY = 10;

// count of each type battle ships
export const initialShipCount = [
    [Lshape, 1],
    [Ishape, 1],
    [DotShape, 2]
];

// codes of ships and statuses in matrix
export const sign = {
    empty: 0,
    touch: 1,
    deck:  3,
    /* result of clicks */
    miss: 5,
    hit: 7
}


/* Battle ships and matrix generation */

function generateShip(shape) {
    let ship = shape();
    return {
        name: ship.name || 'Ship',
        decks: ship.decks || 0,
        matrix: ship.variants[ utils.getRandomInt(0, ship.variants.length) ]
    }
}

function checkDeckCount (mtrx, ships) {
    let decks = ships.reduce((acc, ship) => {return acc + ship.decks}, 0);
    return matrix.countValues(mtrx, sign.deck) === decks;
}

function checkNoIntersection (mtrx) {
    return matrix.countValues(mtrx, sign.deck + sign.deck) === 0;
}

function checkNoNearPlacement (mtrx) {
    return matrix.countValues(mtrx, sign.deck + sign.touch) === 0;
}

function validPlacement (mtrx, ships) {
    return checkDeckCount(mtrx, ships)
        && checkNoIntersection(mtrx)
        && checkNoNearPlacement(mtrx);
}

/**
 * Set random x and y coordinates to the ship object.
 * Pay attention, a ship can be partially out of the playground.
 * @param ship
 * @returns {Object}
 */
function setShipRandomXY (ship) {
    let ylength = ship.matrix.length,
        xlength = ship.matrix[0].length;
    ship.y = utils.getRandomInt(-1, maxY - ylength +2);
    ship.x = utils.getRandomInt(-1, maxX - xlength +2);
    return ship;
}

export function generateBattleMatrixAndShips () {
    let bg = matrix.generate(maxX, maxY),
        ships = [];

    for(let i=0; i<initialShipCount.length; i++) {
        let shape = initialShipCount[i][0],
              cnt = initialShipCount[i][1];

        // generate ships of the shape
        for(let j=0; j<cnt; j++) {
            let ship = generateShip(shape);
            ships.push(ship);

            // generate random x, y
            // then apply ship.matrix on battle ground
            // until the coordinates suite all the rules
            do {
                setShipRandomXY(ship);
                var bg_new = matrix.apply(bg, ship.matrix, ship.x, ship.y);
            } while (!validPlacement(bg_new, ships));

            bg = bg_new;
        }
    }

    return {
        matrix: bg,
        ships: ships
    }
}
