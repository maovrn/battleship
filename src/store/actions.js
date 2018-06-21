/***********************************************************************************************************************
 * Redux action creators: common used functions called by containers
 **********************************************************************************************************************/
import store from '.';


export function startGame () {
    store.dispatch({
        type: 'GAME_START',
        game_mode: 'start'
    });
}

