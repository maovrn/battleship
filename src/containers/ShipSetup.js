/***********************************************************************************************************************
 * Setup ships on battle area.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";

import './ShipSetup.css';
import BattlegroundBack from '../components/BattlegroundBack';

import {maxX, maxY, sign} from '../game';
import * as game from "../game";


class ShipSetup extends Component {

    componentDidMount() {

    }

    click = (e) => {
        e.stopPropagation();

    }

    renderCells = (scale) => {
        let ret = [];
        for (let i=0; i<maxY; i++) {
            for (let j=0; j<maxX; j++) {
                ret.push(
                    <rect key={'cell_' + i + '_' + j} className="cell"
                          x={i * scale} y={j * scale} width={scale+'px'} height={scale+'px'}
                          data-x={i} data-y={j}/>
                );
            }
        }
        return ret;
    }

    renderShips = (scale) => {
        let ret = [];
        this.props.ships.forEach(ship => {
            let points = ship.frame.reduce((acc, point) => {
                let [x, y] = point;
                x = (ship.x + x) * scale;
                y = (ship.y + y) * scale;
                return acc + ' ' + [x, y].join();
            }, "");

            ret.push(
                <polygon key={'ship_'+ship.x+'_'+ship.y} className="ship-frame" points={points}/>
            );
        });
        return ret;
    }

    render() {
        const scale = 50; // magic value according CSS styles

        return (
            <div className="ShipSetup">
                <BattlegroundBack cols={maxX} rows={maxY}>
                    <svg className="grid" onClick={this.click} width={maxX * scale} height={maxY * scale}>
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
})(ShipSetup);