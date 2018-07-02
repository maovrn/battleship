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

    scale = 48; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        store.registerReducer('PLAYER_SHIP_UPDATE', function(state, action){
            let ships = utils.cloneObjects(state.player.ships);
            Object.assign(ships[action.ship.id], action.ship);
            let player = {
                ships:  ships,
                matrix: game.generateMatrixByShips(ships)
            }
            return Object.assign({}, state, {player: player});
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

    renderShips = () => {
        return this.props.ships
            .map(ship => (
                <Ship key={'player_ship_'+ship.id}
                      ship={ship}
                      scale={this.scale}
                      draggable={true}
                      stickiness={0.1}
                      validate={this.validateShipMovement}
                      moveShip={this.moveShip}
                />
            ));
    }

    // validate ship position along with the others ships, do not update current state.
    validateShipMovement = (ship, dx, dy) => {
        let ships = utils.cloneObjects(this.props.ships);
        ships[ship.id].x += dx;
        ships[ship.id].y += dy;
        return game.validShipPlacement(ships);
    }

    // update ship position - throw SHIP_UPDATE action.
    moveShip = (ship, dx, dy) => {
        ship.x += dx;
        ship.y += dy;
        ship.invalid = false; // position is validated just before the dropping
        actions.updatePlayerShip(ship);
    }

    // rotate ship when user clicks a ship - throw SHIP_UPDATE action.
    rotateShip = (e) => {
        e.stopPropagation();
        let id = Number.parseInt(e.target.getAttribute('data-id'), 10);
        if (Number.isInteger(id)) {
            let ship = game.rotateShip(this.props.ships[id]);
            ship.invalid = !game.validShipPlacement(this.props.ships);
            actions.updatePlayerShip(ship);
        }
    }

    render() {
        return (
            <div className="ShipSetup">
                <GridBack cols={game.maxX} rows={game.maxY}>
                    <Grid onClick={this.rotateShip} width={game.maxX * this.scale} height={game.maxY * this.scale}>
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
        matrix: state.player.matrix || [],
        ships:  state.player.ships  || []
    }
})(ShipSetup);