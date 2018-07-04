/***********************************************************************************************************************
 * Win or Lost screen
 *
 * Props must be provided:
 * - result {String} - 'win' or 'lost' that means final status of the game.
 * - shots {Number} - number of shots made (player's or enemy's)
 * - onStart - callback function to start new game
 **********************************************************************************************************************/

import React, { Component } from 'react';
import './GameOverScreen.css';


class GameOverScreen extends Component {

    render() {
        return (
            <div className="GameOverScreen">
                <div className="content">
                    {this.props.result === 'win' &&
                        <div className="win">
                            <h1>Congratulations!</h1>
                            <p>All the enemy's ships were found by just {this.props.shots} shots!</p>
                        </div>
                    }
                    {this.props.result === 'lost' &&
                        <div className="lost">
                            <h1>Game over</h1>
                            <p>You lost all your ships but held out as much as {this.props.shots} shots. Another try?</p>
                        </div>
                    }

                    <button className="btn btn-default" onClick={this.props.onStart}>Start again</button>
                </div>
            </div>
        );
    }

}

export default GameOverScreen;