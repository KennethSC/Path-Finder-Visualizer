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
        for(let row = 0; row < 20; row++){
            const currRow = [];
            for(let col = 0; col < 59; col++){
                const currNode = {
                    col,
                    row,
                    isStart: row === 10 && col === 9,
                    isFinish: row === 10 && col === 49,
                };
                currRow.push(currNode);
            }
            nodes.push(currRow);
        }
        this.setState({nodes});
    }

    render(){
        const {nodes} = this.state;
        console.log(nodes)
        return (
            <div className="grid">
                {nodes.map((row, rowId) => {
                    return(
                     <div key={rowId}>
                        {row.map((node, nodeId) => {
                            const {isStart, isFinish} = node;
                            return (
                                <Node
                                    key={nodeId}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    test={'foo'}
                                    test={'kappa'}></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}