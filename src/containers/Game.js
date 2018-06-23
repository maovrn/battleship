/***********************************************************************************************************************
 * Game area with common logic.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import './Game.css';

import Welcome from '../components/Welcome';
import WinScreen from '../components/WinScreen';
import Battleground from './Battleground';
import Statistics from './Control';

import * as game from "../game";

class Game extends Component {

    /*
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {

    }
    */


    onStart = () => {
        console.log('Game starts');
        actions.startGame();
    }


    render() {
        if (this.props.gameState === 'welcome') {
            return (
                <Welcome onStart={this.onStart}/>
            )
        } else {
            return (
                <div className="Game">
                    <div className="panels">
                        <Statistics/>
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
        gameState: (state.gameState === 'play' && game.checkGameWin(state.ships)) ? 'win' : state.gameState || 'welcome',
        shots: state.shots
    }
})(Game);