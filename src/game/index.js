/***********************************************************************************************************************
 * Base logic of the game.
 **********************************************************************************************************************/

import * as utils from '../utils';
import * as matrix from '../utils/matrix';

import DotShape from './ships/DotShape';
import Ishape from './ships/Ishape';
import Lshape from './ships/Lshape';

// size of battleground: indexes from 0 to the numbers (not included)
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
    /* initial signs */
    empty: 0,
    touch: 1,
    deck:  3,
    /* result of clicks */
    miss:  5,
    hit:   7
}

// Return shape function by ship name
function getShipShape (ship) {
    switch (ship.name) {
        case Lshape().name:   return Lshape;
        case Ishape().name:   return Ishape;
        case DotShape().name: return DotShape;
        default:              return undefined;
    }
}

/* Battle ships and matrix generation */

function generateShip(shape) {
    let ship = shape(),
        variant = utils.getRandomInt(0, ship.variants.length);
    return {
        name:   ship.name || 'Ship',
        decks:  ship.decks || 0,
        matrix: ship.variants[ variant ],
        frame:  ship.frames[ variant ],
        v:      variant,
        hits:   0
    }
}

/* Several validation rules to check a ship placement is valid */
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

/**
 * Return same matrix with double touch sign replaced to a single touch sign.
 * @param mtrx {Array} - source matrix
 * @returns {Array} - the same matrix with replaced values
 */
function removeDoubleTouchSign (mtrx) {
    return matrix.replaceValues(mtrx, sign.touch + sign.touch, sign.touch);
}


/**
 * Generate initial state of battle
 * @returns {{matrix: Array, ships: Array}}
 */
export function generateBattleMatrixAndShips () {
    let bg = matrix.generate(maxX, maxY),
        ships = [];

    for(let i=0; i<initialShipCount.length; i++) {
        let shape = initialShipCount[i][0],
              cnt = initialShipCount[i][1];

        // generate ships of the shape
        for(let j=0; j<cnt; j++) {
            let ship = generateShip(shape);
            ship.id = ships.length;
            ships.push(ship);

            // generate random x, y
            // then apply ship.matrix on battle ground
            // until the coordinates suite all the rules
            let bg_new = [];
            do {
                setShipRandomXY(ship);
                bg_new = matrix.apply(bg, ship.matrix, ship.x, ship.y);
            } while (!validPlacement(bg_new, ships));

            bg = removeDoubleTouchSign(bg_new);
        }
    }

    return {
        matrix: bg,
        ships: ships
    }
}

/**
 * Return a ship object from ships provided by x,y coordinates on a battle matrix
 * @param ships
 * @param x
 * @param y
 * @returns {Object|null}
 */
export function findShip (ships, x, y) {
    // place every ship on zero matrix then check if x,y points a deck
    let bg = matrix.generate(maxX, maxY);
    return ships.find(ship => {
        let bg_test = matrix.apply(bg, ship.matrix, ship.x, ship.y);
        return bg_test[y][x] === sign.deck;
    }) || null;
}

/**
 * Check point on matrix provided - if it's hit or miss.
 * In case it's hit, increment hits count of the appropriate ship from the ships provided.
 * Return new copy of the matrix and ships, and a boolean result of cheque.
 * @param mtrx {Array}  - matrix to check
 * @param ships {Array} - array of ships
 * @param x {Integer}  - x coordinate of the point
 * @param y {Integer}  - y coordinate of the point
 * @returns {{matrix: Array, hit: boolean}}
 */
export function checkPoint (mtrx, ships, x, y) {
    let bg = matrix.clone(mtrx),
        sh = utils.cloneObjects(ships),
        hit = (mtrx[y][x] === sign.deck);

    bg[y][x] = (hit ? sign.hit : sign.miss);
    if (hit) findShip(sh, x, y).hits++;
    return {
        matrix: bg,
        ships:  sh,
        hit:    hit
    }
}

/**
 * Return true if point has been checked on the matrix, that means it is marked as hit or miss.
 * @param mtrx
 * @param x {Integer}  - x coordinate of the point
 * @param y {Integer}  - y coordinate of the point
 * @returns {boolean}
 */
export function isPointChecked (mtrx, x, y) {
    let point = mtrx[y][x];
    return (point === sign.miss || point === sign.hit);
}

/**
 * Check if game is finished
 * @param ships {Array} - array of ships of the battle
 * @returns {boolean} - return true if the game is finished
 */
export function isGameFinished (ships) {
    return !ships.some((ship) => ship.decks > ship.hits);
}


/**
 * Return matrix built by ships provided
 * @param ships {Array} - array of ships of the battle
 * @returns {Array}
 */
export function generateMatrixByShips (ships) {
    let mtrx = matrix.generate(maxX, maxY);
    ships.forEach(ship => {
        mtrx = removeDoubleTouchSign(
            matrix.apply(mtrx, ship.matrix, ship.x, ship.y)
        );
    });
    return mtrx;
}


/**
 * Check position of all ships provided is valid.
 * @param ships {Array} - array of ships of the battle
 * @returns {boolean} - return true if position is correct
 */
export function validShipPlacement (ships) {
    return validPlacement(generateMatrixByShips(ships), ships);
}


/**
 * Return ship object updated with the next variant of the ship shape.
 * @param ship {Object} - source ship object
 * @returns {Object}
 */
export function rotateShip (ship) {
    let sh = getShipShape(ship)(),
        vn = (ship.v + 1 < sh.variants.length) ? ship.v + 1 : 0;

    ship.v = vn;
    ship.matrix = sh.variants[vn];
    ship.frame  = sh.frames[vn];
    return ship;
}

/**
 * AI of the game. Return random x, y coordinates of an enemy shot.
 * Params of the method are player's matrix and ships that may contain private info. The method doesn't take into
 * account position of ships that are not known to him
 * @param mtrx  {Array} - array of player's matrix
 * @param ships {Array} - array of player's ships
 * @returns {Object {x, y}} - coordinates of the shot
 */
export function calcEnemyShot (mtrx, ships) {

    let firedShips  = ships.filter(ship => ship.decks === ship.hits),
        knownMatrix = generateMatrixByShips (firedShips);

    const isPointValid = (x, y) => {
        return x >= 0 && x < maxX && y >= 0 && y < maxY
        && !isPointChecked(mtrx, x, y)          // do not shoot to checked cell
        && knownMatrix[y][x] !== sign.touch;    // do not shoot near known ship
    }

    let nonFinishedShipsExist = ships.filter(ship => ship.hits > 0 && ship.decks > ship.hits).length > 0;
    if (nonFinishedShipsExist) {
        // smart algorithm of shooting around non-finished ships
        let points = [];
        const addPoint = (x, y) => {
            if (isPointValid(x, y))
                points.push({x, y});
        }

        for (let i=0; i<mtrx.length; i++) {
            for (let j = 0; j < mtrx[i].length; j++) {
                if (mtrx[i][j] === sign.hit && knownMatrix[i][j] !== sign.deck) {
                    // non-finished ship found, add 4 points around to a list of likely points
                    addPoint(j   , i -1);
                    addPoint(j +1, i   );
                    addPoint(j   , i +1);
                    addPoint(j -1, i   );
                }
            }
        }

        return points[ utils.getRandomInt(0, points.length) ];
    }

    // silly algorithm of shooting at a random point
    let x, y;
    do {
        x = utils.getRandomInt(0, maxX);
        y = utils.getRandomInt(0, maxY);
    } while (!isPointValid(x, y));

    return {x, y}
}