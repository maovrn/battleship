/***********************************************************************************************************************
 * Setup player's ships on battle area.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from "../store/actions";
import * as game from "../game";
import * as utils from "../utils";

import GridBack from '../components/GridBack';
import Grid from '../components/Grid';
import Cell from '../components/Cell';
import Ship from '../components/Ship';
import './ShipSetup.css';


class ShipSetup extends Component {

    scale = 50; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        store.registerReducer('SHIP_MOVE', function(state, action){
            let ship = state.ships[action.ship.id];
            ship.x += action.dx;
            ship.y += action.dy;
            return Object.assign({}, state);
        });

        store.registerReducer('SHIP_UPDATE', function(state, action){
            let ships = utils.cloneObjects(state.ships);
            Object.assign(ships[action.ship.id], action.ship);
            return Object.assign({}, state, {ships: ships});
        });
    }

    renderCells = () => {
        let ret = [];
        for (let i=0; i<game.maxY; i++) {
            for (let j=0; j<game.maxX; j++) {
                ret.push(
                    <Cell key={'cell_' + j + '_' + i}
                          x={j}
                          y={i}
                          scale={this.scale}
                    />
                );
            }
        }
        return ret;
    }

    validShipMovement = (ship, dx, dy) => {
        // validate ship position along with the others ships
        let ships = utils.cloneObjects(this.props.ships);
        ships[ship.id].x += dx;
        ships[ship.id].y += dy;
        return game.validShipPlacement(ships);
    }

    click = (e) => {
        e.stopPropagation();
        // throw SHIP_UPDATE action with rotated ship if user clicks a ship
        let id = Number.parseInt(e.target.getAttribute('data-id'), 10);
        if (Number.isInteger(id)) {
            let ship = game.rotateShip(this.props.ships[id]);
            actions.updateShip(ship);
        }
    }

    renderShips = () => {
        return this.props.ships
            .map(ship => (
                <Ship key={'player_ship_'+ship.id}
                      ship={ship}
                      scale={this.scale}
                      draggable={true}
                      stickiness={0.1}
                      validate={this.validShipMovement}
                      moveShip={actions.moveShip}
                />
            ));
    }

    render() {
        return (
            <div className="ShipSetup">
                <GridBack cols={game.maxX} rows={game.maxY}>
                    <Grid onClick={this.click} width={game.maxX * this.scale} height={game.maxY * this.scale}>
                        {this.renderCells()}
                        {this.renderShips()}
                    </Grid>
                </GridBack>
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