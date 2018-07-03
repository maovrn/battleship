/***********************************************************************************************************************
 * Ship SVG frame with Drag-and-Drop ability
 *
 * Props must be provided:
 * - ship {Object}       - ship object
 * - scale {Number}      - scale number according styles
 * - draggable {Boolean} - is the frame can be dragged
 * - stickiness {Float}  - (Optional) a number from 0 to 1 to express sticky characteristic.
 * - validate { function(ship, dx, dy) } - callback function to validate movement
 * - moveShip { function(ship, dx, dy) } - callback function to commit movement
 **********************************************************************************************************************/
import React, { Component } from 'react';
import {DragSource} from "react-dnd";


class Ship extends Component {
    /* internal state for drag-and-drop process */
    state = {
        dragging: false,
        valid: true,
        translate: 0,
        preventClick: false
    }

    // it's an ugly workaround to stop propagation of mouse's click event
    // caused by react-dnd-touch-backend issue:
    // https://github.com/yahoo/react-dnd-touch-backend/issues/13
    preventClick = (e) => {
        if (this.state.preventClick) {
            e.stopPropagation();
            this.setState({preventClick: false});
        }
    }

    render() {
        const {connectDragSource, ship, scale} = this.props;
        let cls = 'ship-frame'
            + (this.props.draggable  ? ' draggable' : '')
            + (this.state.dragging   ? ' dragging' : '')
            + (this.props.ship.invalid || !this.state.valid ? ' invalid' : '')
            + (this.props.ship.decks === this.props.ship.hits ? ' lost' : '');

        let points = this.props.ship.frame.reduce((acc, point) => {
            let [x, y] = point;
            x = (x + ship.x) * scale;
            y = (y + ship.y) * scale;
            return acc + ' ' + [x, y].join();
        }, '');

        const transform = 'translate(' + (this.state.translate ? this.state.translate : '0') +')';

        return connectDragSource(
            <polygon className={cls}
                     points={points}
                     transform={transform}
                     data-id={this.props.ship.id}
                     onClick={this.preventClick}
            />
        )
    }
}

/* --- Drag-and-Drop of ships --- */

const shipSource = {

    canDrag(props, monitor) {
        return props.draggable;
    },

    beginDrag(props, monitor, component) {
        component.setState({ dragging: true });
        return {
            ship: props.ship,
            component: component
        };
    },

    isDragging(props, monitor) {
        let item = monitor.getItem(),
            diff = monitor.getDifferenceFromInitialOffset(),
            dxf = diff.x / props.scale,
            dyf = diff.y / props.scale,
            dx  = Math.round(dxf),
            dy  = Math.round(dyf);

        if (props.stickiness) {
            // stick coordinates
            if (props.stickiness >= Math.abs(dxf - dx))
                diff.x = dx * props.scale;
            if (props.stickiness >= Math.abs(dyf - dy))
                diff.y = dy * props.scale;
        }

        item.component.setState({
            translate: diff.x + ',' + diff.y,
            valid: props.validate(item.ship, dx, dy)
        });

        return true;
    },

    endDrag(props, monitor, component) {
        let item = monitor.getItem(),
            diff = monitor.getDifferenceFromInitialOffset(),
            dx = Math.round(diff.x / props.scale),
            dy = Math.round(diff.y / props.scale);

        if (props.validate(item.ship, dx, dy)) {
            props.moveShip(item.ship, dx, dy);
        }

        // in any case restore default state
        component.setState({
            dragging: false,
            translate: 0,
            valid: true,
            preventClick: (!hasTouch()) // prevent click event for mouse
        });
        return true;
    }
};

// To detect touch capability cross-browser:
// see https://stackoverflow.com/questions/7838680/detecting-that-the-browser-has-no-mouse-and-is-touch-only
function hasTouch() {
    return (('ontouchstart' in window) ||   // html5 browsers
        (navigator.maxTouchPoints > 0) ||   // future IE
        (navigator.msMaxTouchPoints > 0));  // current IE10
}

function connectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export default DragSource('SHIP', shipSource, connectSource)( Ship );