/***********************************************************************************************************************
 * Side panel of game area to display current game info
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistics.css';


class Statistics extends Component {

    render() {
        return (
            <div className="Statistics">
                <div className="field">
                    <div className="label">SHOTS</div>
                    <div className="value">{this.props.shots}</div>
                </div>
            </div>
        );
    }

}

export default connect(state => {
    return {
        shots: state.shots || 0
    }
})(Statistics);