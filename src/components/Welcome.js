/***********************************************************************************************************************
 * Welcome screen
 *
 * Props must be provided:
 * - onStart - callback function on
 **********************************************************************************************************************/

import React, { Component } from 'react';
import './Welcome.css';


class Welcome extends Component {

    render() {
        return (
            <div className="Welcome">
                <h1>Battle ships</h1>
                <p>There is a square 10 by 10 cells battleground which hides one L shaped, one I shaped and two dot shaped battle ships.
                   Initial they cannot overlap and must not touch one another so there is at least a single cell between them.
                   Any battle ship rotation and position are random.
                   Good luck in the search!
                </p>
                <button className="btn btn-default" onClick={this.props.onStart}>Start game</button>
            </div>
        );
    }

}

export default Welcome;