import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component{

    render(){
        const {col, 
              isFinish,
              isStart,
              isWall,
              onMouseDown,
              onMouseEnter,
              onMouseUp,
              row} = this.props;

        const extraClassName = isFinish ? 'finish' : isStart ? 'start' : isWall ? 'node-wall' : '';

        return (
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}