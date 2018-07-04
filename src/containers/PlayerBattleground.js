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
import './PlayerBattleground.css';


class PlayerBattleground extends Component {

    scale = 48; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        // Redux reducer on SHOT action of player to calculate shot results at enemy's matrix
        store.registerReducer('PLAYER_SHOT', function(state, action){
            let player = Object.assign({}, state.player);
            let enemy  = Object.assign({}, state.enemy);
            let cheque = game.checkPoint(enemy.matrix, enemy.ships, action.x, action.y);
            player.shots++;
            enemy.matrix = cheque.matrix;
            enemy.ships  = cheque.ships;
            return Object.assign({}, state, {player: player, enemy: enemy, turn: cheque.hit});
        });
    }

    shoot = (e) => {
        e.stopPropagation();
        if (!this.props.turn) return false;

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
                <Ship key={'enemy_ship_'+ship.id}
                      ship={ship}
                      scale={this.scale}
                      draggable={false}
                />
            ))
    }

    render() {
        return (
            <div className={"PlayerBattleground" + (this.props.turn ? '' : ' hidden')}>
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
        ships:  state.enemy.ships  || [],
        turn:   state.turn
    }
})(PlayerBattleground);