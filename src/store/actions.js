/***********************************************************************************************************************
 * Redux action creators: common used functions called by containers
 **********************************************************************************************************************/
import store from '.';

export function startGame (params) {
    store.dispatch({
        type: 'GAME_START',
        gameState: 'play',
        matrix: params.matrix,
        ships:  params.ships,
        shots:  0
    });
}

export function cancelGame () {
    store.dispatch({
        type: 'GAME_CANCEL',
        gameState: 'welcome',
        matrix: [],
        ships: []
    });
}

export function shoot (x, y) {
    store.dispatch({
        type: 'SHOT',
        x, y
    });
}

