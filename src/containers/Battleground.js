/***********************************************************************************************************************
 * Battle area
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import './Battleground.css';
import BattlegroundBack from '../components/BattlegroundBack';

import {maxX, maxY, sign} from '../game';
import * as matrix from '../utils/matrix'
import * as game from "../game";

class Battleground extends Component {

    componentDidMount() {
        store.registerReducer('SHOT', function(state, action){
            let mtrx  = matrix.clone(state.matrix);
            let result = (mtrx[action.y][action.x] === sign.deck ? 'hit' : 'miss');

            mtrx[action.y][action.x] = (result === 'hit' ? sign.hit : sign.miss);
            if (result === 'hit') {
                 // find hited ship
                let ship = game.findShip(state.ships, action.x, action.y);
                ship.hits++;
            }

            return Object.assign({}, state, {matrix: mtrx, shots: state.shots + 1});
        });
    }

    click = (e) => {
        e.stopPropagation();
        let x = Number.parseInt(e.target.getAttribute('data-x'), 10),
            y = Number.parseInt(e.target.getAttribute('data-y'), 10);
        if (Number.isInteger(x) && Number.isInteger(y)) {
            //console.log('click', x, y);
            let point = this.props.matrix[y][x];
            if (point !== sign.miss && point !== sign.hit) {
                actions.shoot(x, y);
            }
        }
    }

    render() {
        var scale = 50;

        // draw cells
        var cells = [];
        for (let i=0; i<maxY; i++) {
            for (let j=0; j<maxX; j++) {
                let s = this.props.matrix[j][i] || 0;
                let status = (s === sign.hit ? 'hit' : (s === sign.miss ? 'miss' : ''));
                cells.push(
                    <rect key={'cell_' + i + '_' + j} className={'cell ' + status} x={i * scale} y={j * scale} data-x={i} data-y={j}/>
                );
            }
        }

        // draw ships
        var shipFrames = [];
        this.props.ships.forEach(ship => {
            if (ship.frame && (ship.decks === ship.hits)) {
                let pointsScaled = ship.frame.reduce((acc, point) => {
                    let [x, y] = point;
                    x = (ship.x + x) * scale;
                    y = (ship.y + y) * scale;
                    return acc + ' ' + [x, y].join();
                }, "");
                shipFrames.push(
                    <polygon key={'ship_'+ship.x+'_'+ship.y} className="ship-frame" points={pointsScaled}/>
                );
            }
        });

        return (
            <div className="Battleground">
                <BattlegroundBack cols={maxX} rows={maxY}>
                    <svg className="grid" onClick={this.click}>
                        {cells}
                        {shipFrames}
                    </svg>
                </BattlegroundBack>
            </div>
        );
    }

}

export default connect(state => {
    return {
        matrix: state.matrix || [],
        ships:  state.ships || []
    }
})(Battleground);