/***********************************************************************************************************************
 * Redux action creators: common used functions called by containers
 **********************************************************************************************************************/
import store from '.';


export function startGame () {
    store.dispatch({
        type: 'GAME_START',
        gameState: 'play'
    });
}

export function shoot (x, y) {
    store.dispatch({
        type: 'SHOT',
        x: x,
        y: y
    });
}

