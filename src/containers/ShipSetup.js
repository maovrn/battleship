/***********************************************************************************************************************
 * Setup ships on battle area.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import { findDOMNode } from 'react-dom';
//import HTML5Backend from 'react-dnd-html5-backend';
//import MouseBackend from 'react-dnd-mouse-backend';
import TouchBackend from 'react-dnd-touch-backend';

import store from '../store';
import * as actions from "../store/actions";

import './ShipSetup.css';
import BattlegroundBack from '../components/BattlegroundBack';
import Grid from '../components/Grid';
import Cell from '../components/Cell';
import Ship from '../components/Ship';

import {maxX, maxY, sign} from '../game';
import * as game from "../game";
import * as utils from "../utils";


class ShipSetup extends Component {

    componentDidMount() {
        store.registerReducer('SHIP_MOVE', function(state, action){
            let ship = state.ships[action.ship.id];
            ship.x += action.dx;
            ship.y += action.dy;
            return Object.assign({}, state);
        });

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
        //console.log('renderShips',this.props.ships);

        const validMovement = (ship, dx, dy) => {
            let ships = utils.cloneObjects(this.props.ships);
            ships[ship.id].x += dx;
            ships[ship.id].y += dy;
            return game.validShipPlacement(ships);
        }

        let ret = [];
        this.props.ships.forEach(ship => {
            ret.push(
                <Ship key={'player_ship_'+ship.id}
                      ship={ship}
                      scale={scale}
                      draggable={true}
                      stickiness={0.1}
                      validMovement={validMovement}
                      moveShip={actions.moveShip}
                />
            );
        });
        return ret;
    }

    render() {
        const scale = 50; // magic value according CSS styles

        return (
            <div className="ShipSetup">
                <BattlegroundBack cols={maxX} rows={maxY}>
                    <Grid onClick={this.click} width={maxX * scale} height={maxY * scale}>
                        {this.renderCells(scale)}
                        {this.renderShips(scale)}
                    </Grid>
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
})( DragDropContext(TouchBackend({ enableMouseEvents: true, enableKeyboardEvents: true }))(ShipSetup) );