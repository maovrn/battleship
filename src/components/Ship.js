//import React from 'react';
import React, { Component } from 'react';
import {DragSource} from "react-dnd";

/*
const Ship = () => (
    <polygon key={'ship_' + this.props.x + '_' + this.props.y}
             points={this.props.points}
             className="ship-frame"/>
);
*/

class Ship extends Component {
    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(
            <polygon className="ship-frame"
                     points={this.props.points} />
        )
    }
}

/* --- Drag-and-Drop of ships --- */

const shipSource = {
    canDrag(props, monitor) {
        return props.draggable;
    },
    beginDrag(props) {
        console.log('Ship beginDrag', props);
        return {
            ship: props.name
        };
    },
    endDrag(props, monitor) {
        // actually nothing to do here as moving is
        //const draggedNotice = monitor.getItem().notice;
        //const didDrop = monitor.didDrop();
    }
};

function connectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}


export default DragSource('SHIP', shipSource, connectSource)( Ship );