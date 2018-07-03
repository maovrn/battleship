/***********************************************************************************************************************
 * Redux action creators: common used functions called by containers
 **********************************************************************************************************************/
import store from '.';

export function setupGame (params) {
    // init whole Redux store data
    store.dispatch({
        type: 'GAME_SETUP',
        gameState: 'setup',
        turn: true,  /* true - player's turn, false - enemy's turn */
        player: {
            matrix: params.player.matrix,
            ships:  params.player.ships,
            shots:  0
        },
        enemy: {
            matrix: params.enemy.matrix,
            ships:  params.enemy.ships,
            shots:  0
        }
    });
}

export function startGame () {
    store.dispatch({
        type: 'GAME_START',
        gameState: 'play'
    });
}

export function cancelGame () {
    // reset store data
    store.dispatch({
        type: 'GAME_CANCEL',
        gameState: 'welcome',
        player: {
            matrix: [],
            ships:  [],
            shots:  0
        },
        enemy: {
            matrix: [],
            ships:  [],
            shots:  0
        }
    });
}

export function updatePlayerShip (ship) {
    store.dispatch({
        type: 'PLAYER_SHIP_UPDATE',
        ship
    });
}

export function playerShoot (x, y) {
    store.dispatch({
        type: 'PLAYER_SHOT',
        x, y
    });
}

export function enemyShoot (x, y) {
    store.dispatch({
        type: 'ENEMY_SHOT',
        x, y
    });
}