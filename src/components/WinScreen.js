/***********************************************************************************************************************
 * Win screen
 *
 * Props must be provided:
 * - onStart - callback function on start
 * - shots - number of shots made
 **********************************************************************************************************************/

import React, { Component } from 'react';
import './WinScreen.css';


class WinScreen extends Component {

    render() {
        return (
            <div className="WinScreen">
                <div className="content">
                    <h1>Congratulations!</h1>
                    <p>All the ships were destroyed by just {this.props.shots} shots!</p>
                    <button className="btn btn-default" onClick={this.props.onStart}>Start again</button>
                </div>
            </div>
        );
    }

}

export default WinScreen;