/***********************************************************************************************************************
 * Side panel of game area to display current game info and controls
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import './Control.css';
import * as game from "../game";


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

    play = (e) => {
        let battle = game.generateBattleMatrixAndShips();
        actions.startGame(battle);
    }

    renderSetupState = () => {
        return (
            <div className="setup-state">
                <div className="field">
                    <div className="label">SETUP YOUR FLEET</div>
                    <p>Drag and drop your ships to adjust their position. Click them to rotate. Click Play to start a battle.</p>
                    <br/>
                    <button className="btn btn-default" onClick={this.play} disabled={this.props.playDisabled}>Play</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="Control">
                {this.props.gameState === 'setup' &&
                    this.renderSetupState()
                }
                {this.props.gameState === 'play' &&
                    this.renderPlayState()
                }
                <div className="buttons">
                    <div className="btn cancel">
                        <a  onClick={actions.cancelGame}>Quit the game</a>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(state => {
    return {
        gameState: state.gameState,
        playDisabled: state.ships.some(ship => ship.invalid),
        shots:  state.shots || 0,
        hits:   state.ships.reduce((hits, ship) => hits + ship.hits, 0),
        wanted: state.ships
            .filter(ship => ship.decks > ship.hits) // filter non-fired ships
            .map(ship => ship.name)                 // extract names
    }
})(Control);