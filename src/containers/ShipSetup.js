/***********************************************************************************************************************
 * Setup ships on battle area.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from "../store/actions";

import './ShipSetup.css';
import BattlegroundBack from '../components/BattlegroundBack';
import Grid from '../components/Grid';
import Cell from '../components/Cell';
import Ship from '../components/Ship';

import * as game from "../game";
import * as utils from "../utils";


class ShipSetup extends Component {

    scale = 50; // magic constant according CSS styles

    componentDidMount() {
        store.registerReducer('SHIP_MOVE', function(state, action){
            let ship = state.ships[action.ship.id];
            ship.x += action.dx;
            ship.y += action.dy;
            return Object.assign({}, state);
        });
    }

    click = (e) => {
        e.stopPropagation();
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
        // validate ship position along with other ships
        let ships = utils.cloneObjects(this.props.ships);
        ships[ship.id].x += dx;
        ships[ship.id].y += dy;
        return game.validShipPlacement(ships);
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
                <BattlegroundBack cols={game.maxX} rows={game.maxY}>
                    <Grid onClick={this.click} width={game.maxX * this.scale} height={game.maxY * this.scale}>
                        {this.renderCells()}
                        {this.renderShips()}
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
})(ShipSetup);