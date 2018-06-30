/***********************************************************************************************************************
 * Battle area UI, includes clicks handler and shot result calculation.
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

    scale = 50; // magic constant according CSS styles (cell width or height in pixels)

    componentDidMount() {
        // Redux reducer on SHOT action to calculate shot results
        store.registerReducer('SHOT', function(state, action){
            state.shots++;
            let cheque = game.checkPoint(state.matrix, action.x, action.y);
            if (cheque.hit) {
                game.findShip(state.ships, action.x, action.y).hits++;
            }

            return Object.assign({}, state, {matrix: cheque.matrix});
        });
    }

    click = (e) => {
        e.stopPropagation();
        // throw SHOT action if user clicks non-checked cell
        let x = Number.parseInt(e.target.getAttribute('data-x'), 10),
            y = Number.parseInt(e.target.getAttribute('data-y'), 10);
        if (Number.isInteger(x) && Number.isInteger(y)) {
            if (!game.isPointChecked(this.props.matrix, x, y)) {
                actions.shoot(x, y);
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
})(Battleground);