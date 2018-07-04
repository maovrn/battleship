/***********************************************************************************************************************
 * Whole game area with the logic corresponded to game state.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as game from "../game";
import * as actions from "../store/actions";
import './Game.css';

import Welcome from '../components/Welcome';
import GameOverScreen from '../components/GameOverScreen';
import ShipSetup from './ShipSetup';
import PlayerBattleground from './PlayerBattleground';
import EnemyBattleground from './EnemyBattleground';
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
                        {this.props.screen === 'play' && (
                            <div className='battle-container'>
                                <EnemyBattleground/>
                                <PlayerBattleground/>
                            </div>
                        )}
                    </div>
                    {this.props.result && (
                        <GameOverScreen onStart={this.onStart} result={this.props.result} shots={this.props.shots}/>
                    )}
                </div>
            )
        }
    }

}

export default connect(state => {
    let screen = state.gameState || 'welcome',
        result = '',
        shots  = 0;

    // check condition of game win or lost
    if (state.gameState === 'play') {
        if (game.isGameFinished(state.enemy.ships)) {
            result = 'win';
            shots  = state.player.shots;
        }
        if (game.isGameFinished(state.player.ships)) {
            result = 'lost';
            shots  = state.enemy.shots;
        }
    }

    return {
        screen: screen,
        result: result,
        shots:  shots
    }
})(Game);