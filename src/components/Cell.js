/***********************************************************************************************************************
 * Cell of SVG Grid
 *
 * Props must be provided:
 * - x {Number}      - x coordinate of the cell
 * - y {Number}      - y coordinate of the cell
 * - scale {Number}  - scale number according styles
 **********************************************************************************************************************/
import React, { Component } from 'react';
import {sign} from "../game";

class Cell extends Component {
    render() {
        let cls = 'cell'
            + (this.props.point === sign.hit  ? ' hit'  : '')
            + (this.props.point === sign.miss ? ' miss' : '');

        return (
            <rect className={cls}
                  data-x={this.props.x}
                  data-y={this.props.y}
                  x={this.props.x * this.props.scale}
                  y={this.props.y * this.props.scale}
                  width={this.props.scale + 'px'}
                  height={this.props.scale + 'px'}
            />
        )
    }
}

export default Cell;