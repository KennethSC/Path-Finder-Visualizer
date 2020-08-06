import React, {Component} from 'react';
import Node from '../Nodes/Node';
import NavBar from '../NavBar/NavBar';
import {dijkstra, getNodesInShortestPathOrder} from '../../PathFinding-Algorithms/DijkstraAlgo';

import './Visualizer.css';

const START_NODE_ROW = 12;
const START_NODE_COL = 6;
const END_NODE_ROW = 12;
const END_NODE_COL = 52;
let algorithm = "dijkstra";
let speed = 5;

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

    clear(){
        document.location.reload()
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

    setSpeed(velocity){
        speed = velocity;
    }

    setAlgorithm(Algo){
        algorithm = Algo;
    }

    visualizeAlgo(){
        if(algorithm === "dijkstra"){
            this.visualizeDijkstra();
        }
        else if(algorithm === ""){
            console.log("No Algo chose");
        }
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
        for(let i = 0; i <= visitedNodesInOrder.length; i++){
            if(i === visitedNodesInOrder.length){
                setTimeout(() =>{
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, speed * i);
                return;
            }

            if(i === 0){
                setTimeout(() => {
                    let node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node start keep-image';
                }, speed);
            } 

            setTimeout(() => {
                let node = visitedNodesInOrder[i];
                if(node.row === 12 && node.col === 52){
                    setTimeout(() => {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node keep-image finish';
                    }, 30);
                }
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, speed * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder){
        if(nodesInShortestPathOrder.length <= 1){
            setTimeout(() =>{
                this.animateNoPath(nodesInShortestPathOrder);
            }, 30);
            return;
        }

        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            if(i === 0){
                setTimeout(() => {
                    let node = nodesInShortestPathOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node SSP-image start';
                }, 30);
            }

            setTimeout(() => {
                let node = nodesInShortestPathOrder[i];
                if(node.row === 12 && node.col === 52){
                    setTimeout(() => {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node SSP-image finish';
                    }, 30);
                }
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 25 * i);
        }
        console.log(nodesInShortestPathOrder.length);

    }


    animateNoPath(nodesInShortestPathOrder){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[0];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node No-Path';
        }, 30);
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
            
            <div>
                <NavBar
                    onVisiualizePressed={() => this.visualizeAlgo()}
                    onClearPressed={() => this.clear()}
                    AdjustSlow={() => this.setSpeed(80)}
                    AdjustAverage={() => this.setSpeed(35)}
                    AdjustFast={() => this.setSpeed(5)}
                    setDijkstra={() => this.setAlgorithm("dijkstra")}
                />


                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return(
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={() => this.handleMouseUp()}
                                        row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}


const getInitialGrid = () => {
    const grid = []
    for(let row = 0; row < 24; row++){
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

    if(node.isStart || node.isFinish){
        const newNode = {
            ...node,
            isWall: false,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
