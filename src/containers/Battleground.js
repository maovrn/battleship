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


class Battleground extends Component {

    componentDidMount() {
        store.registerReducer('SHOT', function(state, action){
            let mtrx  = matrix.clone(state.matrix);
            let result = (mtrx[action.y][action.x] === sign.deck ? 'hit' : 'miss');

            mtrx[action.y][action.x] = (result === 'hit' ? sign.hit : sign.miss);
            let hits = state.hits + (result === 'hit' ? 1 : 0);

            return Object.assign({}, state, {matrix: mtrx, shots: state.shots + 1, hits: hits});
        });
    }

    click = (e) => {
        e.stopPropagation();
        let x = Number.parseInt(e.target.getAttribute('data-x')),
            y = Number.parseInt(e.target.getAttribute('data-y'));
        if (Number.isInteger(x) && Number.isInteger(y)) {
            //console.log('click', x, y);
            let point = this.props.matrix[y][x];
            if (point !== sign.miss && point !== sign.hit) {
                actions.shoot(x, y);
            }
        }
    }

    render() {
        var cells = [];
        for (let i=0; i<maxY; i++) {
            for (let j=0; j<maxX; j++) {
                let s = this.props.matrix[j][i] || 0;
                let status = (s === sign.hit ? 'hit' : (s === sign.miss ? 'miss' : ''));
                cells.push(
                    <rect key={'cell_' + i + '_' + j} className={'cell ' + status} x={i * 50} y={j * 50} data-x={i} data-y={j}/>
                );
            }
        }

        return (
            <div className="Battleground">
                <BattlegroundBack cols={maxX} rows={maxY}>
                    <svg className="grid" onClick={this.click}>
                        {cells}
                    </svg>
                </BattlegroundBack>
            </div>
        );
    }

}

export default connect(state => {
    return {
        matrix: state.matrix || []
    }
})(Battleground);