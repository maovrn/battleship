//import React from 'react';
import React, { Component } from 'react';
import {findDOMNode} from "react-dom";
import {DropTarget} from "react-dnd";

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