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
        // init new game parameters for the player and enemy
        let battle = {
            player: game.generateBattleMatrixAndShips(),
            enemy:  game.generateBattleMatrixAndShips()
        };
        actions.setupGame(battle);
    }

    render() {
        if (this.props.screen === 'welcome') {
            return (
                <Welcome onStart={this.onStart}/>
            )
        } else {
            return (
                <div className="Game">
                    <div className="panels">
                        <Control/>
                        {this.props.screen === 'setup' && (
                            <ShipSetup/>
                        )}
                        {this.props.screen !== 'setup' && (
                            <Battleground/>
                            /* TODO add Battleground for enemy here */
                        )}
                    </div>
                    {this.props.screen === 'win' && (
                        <WinScreen onStart={this.onStart} shots={this.props.shots}/>
                    )}
                    {this.props.screen === 'lost' && (
                        /* TODO replace WinScreen to LostScreen */
                        <WinScreen onStart={this.onStart} shots={this.props.shots}/>
                    )}
                </div>
            )
        }
    }

}

export default connect(state => {
    let screen = state.gameState || 'welcome',
        shots  = 0;

    // check condition of game win or lost
    if (state.gameState === 'play') {
        if (game.isGameFinished(state.enemy.ships)) {
            screen = 'win';
            shots  = state.player.shots;
        }
        if (game.isGameFinished(state.player.ships)) {
            screen = 'lost';
            shots  = state.enemy.shots;
        }
    }

    return {
        screen: screen,
        shots:  shots
    }
})(Game);