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

    render() {
        return (
            <div className="Control">
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
        shots:  state.shots || 0,
        hits:   state.ships.reduce((hits, ship) => hits + ship.hits, 0),
        wanted: state.ships
            .filter(ship => ship.decks > ship.hits) // filter non-fired ships
            .map(ship => ship.name)                 // extract names
    }
})(Control);