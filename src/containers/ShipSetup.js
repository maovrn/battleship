/***********************************************************************************************************************
 * Setup ships on battle area.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import { findDOMNode } from 'react-dom';
//import HTML5Backend from 'react-dnd-html5-backend';
import MouseBackend from 'react-dnd-mouse-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import store from '../store';
import * as actions from "../store/actions";

import './ShipSetup.css';
import BattlegroundBack from '../components/BattlegroundBack';
import Cell from '../components/Cell';
import Ship from '../components/Ship';

import {maxX, maxY, sign} from '../game';
import * as game from "../game";


class ShipSetup extends Component {

    componentDidMount() {

    }

    click = (e) => {
        //e.stopPropagation();

    }

    renderCells = (scale) => {

        let ret = [];
        for (let i=0; i<maxY; i++) {
            for (let j=0; j<maxX; j++) {
                ret.push( <Cell key={'cell_' + j + '_' + i} x={j} y={i} scale={scale} /> );
            }
        }
        return ret;
    }

    renderShips = (scale) => {
        //const {connectDragSource, isDragging} = this.props;
        let ret = [];
        this.props.ships.forEach(ship => {
            let points = ship.frame.reduce((acc, point) => {
                let [x, y] = point;
                x = (ship.x + x) * scale;
                y = (ship.y + y) * scale;
                return acc + ' ' + [x, y].join();
            }, "");

            ret.push( <Ship key={'ship_'+ship.x+'_'+ship.y} points={points} name={ship.name} draggable={true}/> );
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
})( DragDropContext(TouchBackend({ enableMouseEvents: true }))(ShipSetup) );