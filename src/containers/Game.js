/***********************************************************************************************************************
 * Whole game area with the logic corresponded to game state.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as game from "../game";
import * as actions from "../store/actions";
import './Game.css';

import Welcome from '../components/Welcome';
import WinScreen from '../components/WinScreen';
import ShipSetup from './ShipSetup';
import Battleground from './Battleground';
import Control from './Control';


class Game extends Component {

    onStart = () => {
        // init new game parameters
        let battle = game.generateBattleMatrixAndShips();
        //actions.startGame(battle);
        actions.setupGame(battle);
    }

    render() {
        if (this.props.gameState === 'welcome') {
            return (
                <Welcome onStart={this.onStart}/>
            )
        } else if (this.props.gameState === 'setup') {
            return (
                <div className="Game">
                    <Control/>
                    <ShipSetup/>
                </div>
            )
        } else {
            return (
                <div className="Game">
                    <div className="panels">
                        <Control/>
                        <Battleground/>
                    </div>
                    {this.props.gameState === 'win' &&
                        <WinScreen onStart={this.onStart} shots={this.props.shots}/>
                    }
                </div>
            )
        }
    }

}

export default connect(state => {
    return {
        gameState: (state.gameState === 'play' && game.isGameWin(state.ships)) ? 'win' : state.gameState || 'welcome',
        shots: state.shots
    }
})(Game);