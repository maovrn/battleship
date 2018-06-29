import React, { Component } from 'react';
import {DragSource} from "react-dnd";
import { findDOMNode } from 'react-dom';


class Ship extends Component {
    state = {
        translate: 0
    }

    render() {
        const {connectDragSource, isDragging} = this.props;
        console.log('isDragging='+isDragging)
        const transform = 'translate(' + (this.state.translate ? this.state.translate : '0') +')';
        const cls = 'ship-frame ' + (this.state.translate ? 'dragging' : '');
        return connectDragSource(
            <polygon className={cls} points={this.props.points} transform={transform} />
        )
    }
}

/* --- Drag-and-Drop of ships --- */

const shipSource = {
    canDrag(props, monitor) {
        return props.draggable;
    },
    beginDrag(props, monitor, component) {
        console.log('Ship beginDrag', props);
        return {
            ship: props.name,
            component: component
        };
    },
    isDragging(props, monitor) {
        console.log('isDragging', props);
        console.log('component',  monitor.getItem().component);

        console.log('getClientOffset()', monitor.getClientOffset());
        console.log('getInitialClientOffset()', monitor.getInitialClientOffset());
        console.log('getDifferenceFromInitialOffset()', monitor.getDifferenceFromInitialOffset());

        console.log('getSourceClientOffset()', monitor.getSourceClientOffset());

        let dif = monitor.getDifferenceFromInitialOffset();
        monitor.getItem().component.setState({ translate: dif.x + ',' + dif.y })

        window.elem = findDOMNode(monitor.getItem().component);
        //window.elem.translate(monitor.getDifferenceFromInitialOffset());
        return true;
    },
    endDrag(props, monitor) {
        console.log('endDrag', props);
        console.log('getDifferenceFromInitialOffset()', monitor.getDifferenceFromInitialOffset());
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