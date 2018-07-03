/***********************************************************************************************************************
 * Side panel of game area to display current game info and controls
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import './Control.css';


class Control extends Component {

    renderWantedShips = () => {
        // group names to calc count of each ship type
        let groups = new Map();
        this.props.wanted.forEach(name => {
            groups.set(name, (groups.has(name) ? groups.get(name) +1 : 1));
        });
        // render each name and count
        let ret = [];
        groups.forEach((count, ship) => ret.push(
            <li key={ship}><span className="name">{ship}</span><span className="count">{count}</span></li>
        ));
        return ret;
    }

    renderPlayState = () => {
        return (
            <div className="play-state">
                {this.props.turn && (
                    <div className="field">
                        <div className="label">YOURS TURN</div>
                        <p>Click any cell to check if enemy's ship is there.</p>
                    </div>
                )}
                {!this.props.turn && (
                    <div className="field">
                        <div className="label">ENEMY'S TURN</div>
                        <p>Pray until the enemy makes their insidious shot.</p>
                    </div>
                )}

                <div className="field">
                    <div className="label">SHOTS</div>
                    <div className="value">{this.props.shots}</div>
                </div>
                <div className="field">
                    <div className="label">HITS</div>
                    <div className="value">{this.props.hits}</div>
                </div>
                <div className="field">
                    <div className="label">Wanted</div>
                    <ul className="wanted-list">
                        {this.renderWantedShips()}
                    </ul>
                </div>
            </div>
        )
    }

    renderSetupState = () => {
        return (
            <div className="setup-state">
                <div className="field">
                    <div className="label">SETUP YOUR FLEET</div>
                    <p>Drag and drop your ships to adjust their position. Click them to rotate. Click Play to start a battle.</p>
                    <br/>
                    <button className="btn btn-default" onClick={actions.startGame} disabled={this.props.playDisabled}>Play</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="Control">
                {this.props.screen === 'setup' &&
                    this.renderSetupState()
                }
                {this.props.screen === 'play' &&
                    this.renderPlayState()
                }
                <div className="bottom">
                    <div className="btn cancel">
                        <a  onClick={actions.cancelGame}>Quit the game</a>
                    </div>
                </div>
            </div>
        );
    }

}

function calcPlayDisabled (ships) {
    return ships.some(ship => ship.invalid);
}

function calcHits (ships) {
    return ships.reduce((hits, ship) => hits + ship.hits, 0);
}

function calcWanted (ships) {
    return ships
        .filter(ship => ship.decks > ship.hits) // filter non-fired ships
        .map(ship => ship.name);                // extract names
}

export default connect(state => {
    let screen = state.gameState,
        turn   = state.turn;
    return {
        screen:       screen,
        turn:         turn,
        playDisabled: screen === 'setup' && calcPlayDisabled(state.player.ships),
        shots:        screen === 'play'  && (turn ? state.player.shots : state.enemy.shots),
        hits:         screen === 'play'  && (turn ? calcHits(state.enemy.ships)   : calcHits(state.player.ships)),
        wanted:       screen === 'play'  && (turn ? calcWanted(state.enemy.ships) : calcWanted(state.player.ships))
    }
})(Control);