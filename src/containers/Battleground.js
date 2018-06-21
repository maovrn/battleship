/***********************************************************************************************************************
 * Battle area
 **********************************************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from "../store/actions";
import './Battleground.css';


class Battleground extends Component {

    componentDidMount() {

    }

    click = (e) => {
        let x = e.target.getAttribute('data-x'),
            y = e.target.getAttribute('data-y');
        console.log('click', x, y);
        actions.shoot(x, y);
    }

    render() {
        var cells = [];
        for (let i=0; i<10; i++) {
            for (let j=0; j<10; j++) {
                cells.push(
                    <rect key={'cell_' + i + '_' + j} className="cell" x={i * 50} y={j * 50} data-x={i} data-y={j}/>
                );
            }
        }

        return (
            <div className="Battleground">

                <svg className="grid" onClick={this.click}>
                    {cells}
                </svg>
            </div>
        );
    }

}

export default connect(state => {
    return {

    }
})(Battleground);