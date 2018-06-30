/***********************************************************************************************************************
 * Cell of SVG Grid
 *
 * Props must be provided:
 * - x {Number}      - x coordinate of the cell
 * - y {Number}      - y coordinate of the cell
 * - scale {Number}  - scale number according styles
 **********************************************************************************************************************/
import React, { Component } from 'react';

class Cell extends Component {
    render() {
        return (
            <rect className="cell"
                  data-x={this.props.x}
                  data-y={this.props.y}
                  x={this.props.x * this.props.scale}
                  y={this.props.y * this.props.scale}
                  width={this.props.scale + 'px'}
                  height={this.props.scale + 'px'} />
        )
    }
}

export default Cell;