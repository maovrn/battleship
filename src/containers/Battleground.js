/***********************************************************************************************************************
 * Battle area UI, includes clicks handler and shot result calculation.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";

import './Battleground.css';
import BattlegroundBack from '../components/BattlegroundBack';

import {maxX, maxY, sign} from '../game';
import * as game from "../game";


class Battleground extends Component {

    componentDidMount() {
        // Redux reducer on SHOT action to calculate shot results
        store.registerReducer('SHOT', function(state, action){
            state.shots++;
            let cheque = game.checkPoint(state.matrix, action.x, action.y);
            if (cheque.hit) {
                game.findShip(state.ships, action.x, action.y).hits++;
            }

            return Object.assign({}, state, {matrix: cheque.matrix});
        });
    }

    click = (e) => {
        e.stopPropagation();
        // throw SHOT action if user clicks non-checked cell
        let x = Number.parseInt(e.target.getAttribute('data-x'), 10),
            y = Number.parseInt(e.target.getAttribute('data-y'), 10);
        if (Number.isInteger(x) && Number.isInteger(y)) {
            let point = this.props.matrix[y][x];
            if (point !== sign.miss && point !== sign.hit) {
                actions.shoot(x, y);
            }
        }
    }

    renderCells = (scale) => {
        let ret = [];
        for (let i=0; i<maxY; i++) {
            for (let j=0; j<maxX; j++) {
                let point = this.props.matrix[j][i];
                let status = (point === sign.hit ? 'hit' : (point === sign.miss ? 'miss' : ''));
                ret.push(
                    <rect key={'cell_' + i + '_' + j} className={'cell ' + status} x={i * scale} y={j * scale} data-x={i} data-y={j}/>
                );
            }
        }
        return ret;
    }

    renderShips = (scale) => {
        let ret = [];
        this.props.ships.forEach(ship => {
            // draw only the ships that are fired
            if (ship.decks === ship.hits) {
                let points = ship.frame.reduce((acc, point) => {
                    let [x, y] = point;
                    x = (ship.x + x) * scale;
                    y = (ship.y + y) * scale;
                    return acc + ' ' + [x, y].join();
                }, "");

                ret.push(
                    <polygon key={'ship_'+ship.x+'_'+ship.y} className="ship-frame" points={points}/>
                );
            }
        });
        return ret;
    }

    render() {
        const scale = 50; // magic value according CSS styles

        return (
            <div className="Battleground">
                <BattlegroundBack cols={maxX} rows={maxY}>
                    <svg className="grid" onClick={this.click}>
                        {this.renderCells(scale)}
                        {this.renderShips(scale)}
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