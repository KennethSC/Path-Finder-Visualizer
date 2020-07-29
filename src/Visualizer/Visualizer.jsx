import React, {Component} from 'react';
import Node from './Nodes/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }


    render(){
        return(
            <div>
                What the hell
                <Node></Node>
            </div>
        );

    }
}