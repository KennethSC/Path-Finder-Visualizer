import React, {Component} from 'react';
import Node from './Nodes/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../PathFinding-Algorithms/DijkstraAlgo';

import './Visualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 8;
const END_NODE_ROW = 10;
const END_NODE_COL = 50;

export default class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col){
        if(!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid}); 
    }

    handleMouseUp(){
        this.setState({mouseIsPressed: false});
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
        for(let i = 0; i <= visitedNodesInOrder.length; i++){
            if(i === visitedNodesInOrder.length){
                setTimeout(() =>{
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }

            if(i == 0){
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node start-animate';
                }, 10 * 1);
                
            }

            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder){
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 25 * i);

        }
    }

    visualizeDijkstra(){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }


    render(){
        const {grid, mouseIsPressed} = this.state;

        return (
            <>  
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstras's Algorithm
                </button>
                <div className="grid">
                    {grid.map((row, rowId) => {
                        return(
                        <div key={rowId}>
                            {row.map((node, nodeId) => {
                                const {row, col, isStart, isFinish, isWall} = node;
                                return (
                                    <Node
                                        key={nodeId}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => 
                                            this.handleMouseEnter(row, col)
                                        }
                                        onMouseUp={() => this.handleMouseUp()}
                                        row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}


const getInitialGrid = () => {
    const grid = []
    for(let row = 0; row < 20; row++){
        const currRow = [];
        for(let col = 0; col < 59; col++){
            currRow.push(createNode(col, row));
        }
        grid.push(currRow);
    }
    return grid;
};


const createNode = (col, row) => {
    return{
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
