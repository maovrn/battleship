/***********************************************************************************************************************
 * Battle area for the player - show enemy's matrix, includes clicks handler and shot result calculation.
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import * as game from "../game";

import GridBack from '../components/GridBack';
import Grid from '../components/Grid';
import Cell from '../components/Cell';
import Ship from '../components/Ship';
import './Battleground.css';


class Battleground extends Component {

    scale = 48; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        // Redux reducer on SHOT action of player to calculate shot results at enemy's matrix
        store.registerReducer('PLAYER_SHOT', function(state, action){
            let newState = Object.assign({}, state);
            newState.player.shots++;
            let cheque = game.checkPoint(newState.enemy.matrix, action.x, action.y);
            newState.enemy.matrix = cheque.matrix;
            if (cheque.hit) {
                game.findShip(newState.enemy.ships, action.x, action.y).hits++;
            }
            return newState;
        });
    }

    shoot = (e) => {
        e.stopPropagation();
        // throw SHOT action if user clicks non-checked cell
        let x = Number.parseInt(e.target.getAttribute('data-x'), 10),
            y = Number.parseInt(e.target.getAttribute('data-y'), 10);
        if (Number.isInteger(x) && Number.isInteger(y)) {
            if (!game.isPointChecked(this.props.matrix, x, y)) {
                actions.playerShoot(x, y);
            }
        }
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
                          point={this.props.matrix[i][j]}
                    />
                );
            }
        }
        return ret;
    }

    renderShips = () => {
        return this.props.ships
            .filter(ship => ship.decks === ship.hits) // render only the ships that have been fired
            .map(ship => (
                <Ship key={'comp_ship_'+ship.id}
                      ship={ship}
                      scale={this.scale}
                      draggable={false}
                />
            ))
    }

    render() {
        return (
            <div className="Battleground">
                <GridBack cols={game.maxX} rows={game.maxY}>
                    <Grid onClick={this.shoot} width={game.maxX * this.scale} height={game.maxY * this.scale}>
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
        matrix: state.enemy.matrix || [],
        ships:  state.enemy.ships  || []
    }
})(Battleground);