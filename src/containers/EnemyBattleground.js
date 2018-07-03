/***********************************************************************************************************************
 * Battle area for the enemy - show player's matrix with the ships opened. Mark enemy's shots.
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
import './EnemyBattleground.css';


class EnemyBattleground extends Component {

    scale = 48; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        // Redux reducer on SHOT action of player to calculate shot results at enemy's matrix
        store.registerReducer('ENEMY_SHOT', function(state, action){
            let player = Object.assign({}, state.player);
            let enemy  = Object.assign({}, state.enemy);
            let cheque = game.checkPoint(player.matrix, player.ships, action.x, action.y);
            enemy.shots++;
            player.matrix = cheque.matrix;
            player.ships  = cheque.ships;
            return Object.assign({}, state, {player: player, enemy: enemy, turn: !cheque.hit});
        });
    }

    componentWillReceiveProps (props) {
        if (!props.turn) {
            // enemy's turn
            setTimeout(function() {
                let point = game.calcEnemyShot(props.matrix, props.ships);
                console.log(point);
                actions.enemyShoot(point.x, point.y);
            }.bind(this), 1500) // After 1.5 second, make a shot
        }

    }

    click = (e) => {
        e.stopPropagation();
        // nothing to do at enemy's battleground
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
            .map(ship => (
                <Ship key={'player_ship_'+ship.id}
                      ship={ship}
                      scale={this.scale}
                      draggable={false}
                />
            ))
    }

    render() {
        return (
            <div className={"EnemyBattleground" + (this.props.turn ? ' hidden' : '')}>
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
        matrix: state.player.matrix || [],
        ships:  state.player.ships  || [],
        turn:   state.turn
    }
})(EnemyBattleground);