/***********************************************************************************************************************
 * Wrapper component - Grid SVG with DragAndDrop backend
 *
 * Props must be provided:
 * - width {Number or String} - width attribute
 * - height {Number or String} - height attribute
 * - onClick { function } - click callback
 **********************************************************************************************************************/
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import TouchBackend from "react-dnd-touch-backend";

class Grid extends Component {
    render() {
        return (
            <svg className="grid" onClick={this.props.onClick} width={this.props.width} height={this.props.height}>
                {this.props.children}
            </svg>
        )
    }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true, enableKeyboardEvents: true }))(Grid);