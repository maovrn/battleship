/***********************************************************************************************************************
 * Game area with common logic.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import './Game.css';

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
    }


    render() {
        return (
            <div className="Game">
                {this.props.gameState === 'welcome' &&
                    <Welcome onStart={this.onStart} />
                }
                {this.props.gameState === 'play' &&
                    <div className="panels">
                        <Statistics />
                        <Battleground />
                    </div>
                }


            </div>
        );
    }

}

export default connect(state => {
    return {
        gameState: state.gameState || 'welcome'
    }
})(Game);