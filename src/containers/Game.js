/***********************************************************************************************************************
 * Game area with common logic.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import './Game.css';

import * as game from '../game';

import Welcome from '../components/Welcome';
import Battleground from './Battleground';
import Statistics from './Control';

class Game extends Component {

    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {

    }


    onStart = () => {
        console.log('Game starts');
        actions.startGame();
        let battle = game.generateBattleMatrixAndShips()
        console.log('battle generated', battle);
    }


    render() {
        if (this.props.gameState === 'welcome') {
            return (
                <Welcome onStart={this.onStart} />
            )
        }
        if (this.props.gameState === 'play') {
            return (
                <div className="Game">
                    <div className="panels">
                        <Statistics/>
                        <Battleground/>
                    </div>
                </div>
            )
        }
    }

}

export default connect(state => {
    return {
        gameState: state.gameState || 'welcome'
    }
})(Game);