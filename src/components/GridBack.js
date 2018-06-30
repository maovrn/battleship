/***********************************************************************************************************************
 * Wrapper component - Background for the battleground grid, that is a table to display column and row names.
 *
 * Props must be provided:
 * - cols {Integer} - number of columns
 * - rows {Integer} - number of rows
 **********************************************************************************************************************/

import React, { Component } from 'react';
import './GridBack.css';
import * as utils from '../utils';

class GridBack extends Component {

    render() {
        const columns = utils.generateLetters(0, this.props.cols);
        const rows = utils.generateNumbers(2, this.props.rows);

        return (
            <table className="GridBack" cols={this.props.cols + 1}><tbody>
                <tr key={'row0'}>
                    <td className="header-column"></td>
                    {columns.map(column => <td key={'column'+column} className="header-column">{column}</td> )}
                </tr>
                <tr key={'row1'}>
                    <td className="header-row">1</td>
                    <td colSpan={this.props.cols} rowSpan={this.props.rows}>
                        {this.props.children}
                    </td>
                </tr>
                {rows.map(row => <tr key={'row'+row}><td className="header-row">{row}</td></tr>)}
            </tbody></table>
        );
    }

}

export default GridBack;