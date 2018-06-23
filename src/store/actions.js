/***********************************************************************************************************************
 * Redux action creators: common used functions called by containers
 **********************************************************************************************************************/
import store from '.';
import * as game from "../game";


export function startGame () {
    let battle = game.generateBattleMatrixAndShips();
    store.dispatch({
        type: 'GAME_START',
        gameState: 'play',
        matrix: battle.matrix,
        ships:  battle.ships,
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

