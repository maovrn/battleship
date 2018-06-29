//import React from 'react';
import React, { Component } from 'react';
import {findDOMNode} from "react-dom";
import {DropTarget} from "react-dnd";


class Grid extends Component {
    render() {
        //return this.props.connectDropTarget(
        return (
            <svg className="grid" onClick={this.props.onClick} width={this.props.width} height={this.props.height}>
                {this.props.children}
            </svg>
        )
    }
}

/* --- Drag-and-Drop of ships on the cell --- */

const gridTarget = {
    hover(props, monitor, component) {
        console.log('hover', props);
        const hoverCell = {x: props.x, y: props.y};
        const draggedShip = monitor.getItem().ship;

        console.log('draggedShip', draggedShip);
        console.log('hoverCell', hoverCell);

        if (draggedShip && hoverCell) {


            /*
                        // Determine rectangle on screen
                        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

                        // Get horizontal middle
                        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

                        // Determine mouse position
                        const clientOffset = monitor.getClientOffset();

                        // Get pixels to the left
                        const hoverClientX = clientOffset.x - hoverBoundingRect.left;
                        */

            // Only perform the move when the mouse has crossed half of the items width
            // When dragging rightwards, only move when the cursor is after 50%
            // When dragging leftwards, only move when the cursor is before 50%

            //const isDraggingRightwards = draggedNotice.position < hoverNotice.position;
            //const isHoverAfterMiddle = hoverClientX > hoverMiddleX;
            //const draggingRightwardsFilter = item =>
            //    item.position > draggedNotice.position && item.position <= hoverNotice.position;

            //const isDraggingLeftwards = draggedNotice.position > hoverNotice.position;
            //const isHoverBeforeMiddle = hoverClientX < hoverMiddleX;
            //const draggingLeftwardsFilter = item =>
            //    item.position < draggedNotice.position && item.position >= hoverNotice.position;

            //if ((isDraggingRightwards && isHoverAfterMiddle) || (isDraggingLeftwards && isHoverBeforeMiddle)) {
            //    let flt = isDraggingRightwards ? draggingRightwardsFilter : draggingLeftwardsFilter;
            //    let shift = isDraggingRightwards ? -1 : 1;

            //const noticesToMove = props.getNotices().filter(flt);

            // actually perform the action which updates multiple notices
            //actions.startMovingNotice();
            //Promise.all([
            //    moveNotice(draggedNotice, hoverNotice.position),
            //    noticesToMove.map(item => moveNotice(item, item.position + shift))
            //]).then(actions.finishMovingNotice);
            //}
        }
    }
};

function connectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

//export default DropTarget('GRID', gridTarget, connectTarget)( Grid );
export default Grid ;