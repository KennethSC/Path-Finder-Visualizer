import React, {Component} from 'react';
import Node from './Nodes/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount(){
        const nodes = [];
        for(let row = 0; row < 15; row++){
            const currRow = [];
            for(let col = 0; col < 50; col++){
                currRow.push([]);
            }
            nodes.push(currRow);
        }
        this.setState({nodes});
    }

    render(){
        const {nodes} = this.state;
        console.log(nodes)
        return(
            <div className="grid">
                {nodes.map((row, rowIdx) =>{
                    return <div>
                        {row.map((node, nodeIdx) => <Node></Node>)}
                    </div>
                })}
            </div>
        );
    }
}