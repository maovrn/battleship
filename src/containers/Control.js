/***********************************************************************************************************************
 * Side panel of game area to display current game info and controls
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import './Control.css';


class Control extends Component {

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
        shots: state.shots || 0,
        hits: state.hits || 0
    }
})(Control);