import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Game from './Game';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Game/>
                </div>
            </Provider>
        );
    }
}

export default App;
