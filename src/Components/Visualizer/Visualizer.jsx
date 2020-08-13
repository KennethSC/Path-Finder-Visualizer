import React, {Component} from 'react';
import Node from '../Nodes/Node';
import NavBar from '../NavBar/NavBar';
import SnackBar from '../SnackBars/Success';
import Error from '../SnackBars/Error';
import {genNoiseMap} from '../../Algorithms/NoiseMapAlgo';
import {genMaze} from '../../Algorithms/MazeAlgo';
import {dijkstra, getNodesInShortestPathOrder} from '../../Algorithms/DijkstraAlgo';

import './Visualizer.css';

const START_NODE_ROW = 11;
const START_NODE_COL = 5;
const END_NODE_ROW = 11;
const END_NODE_COL = 51;
let speed = 8;

export default class Visualizer extends Component {
    constructor(props){
        super(props);

        this.SnackElement = React.createRef();
        this.ErrorElement = React.createRef();

        this.state = {
            grid: [],
            mouseIsPressed: false,
            enabled: false,
            choose: "Visualize",
            algorithm: "",
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col){
        if(!this.state.enabled){
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({grid: newGrid, mouseIsPressed: true});
        }
    }

    handleMouseEnter(row, col){
        if(!this.state.enabled){
            if(!this.state.mouseIsPressed) return;
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({grid: newGrid});
        }
    }

    handleMouseUp(){
        if(!this.state.enabled){
            this.setState({mouseIsPressed: false});
        }
    }

    setSpeed(velocity){
        speed = velocity;
    }

    setAlgorithm(Algo){
        this.setState({algorithm: Algo});
        this.setState({choose: "Visualize"})
    }

    setButtons(bool, timed){
        if(timed){
            setTimeout(() => {
                this.setState({enabled: bool})
            }, 2800)
        }
        else{
            this.setState({enabled: bool})
        }
    }

    visualizeAlgo(){
        if(this.state.algorithm === "dijkstra"){
            this.visualizeDijkstra();
        }
        else{
            this.setState({choose: "Pick an Algorithm"});
        }
    }

    clear() {
        this.setState({ grid: [] });
        const grid = getInitialGrid();
        for(let row = 0; row < 23; row++){
            for(let col = 0; col < 57; col++){
                document.getElementById(`node-${row}-${col}`).classList.remove('node-visited');
                document.getElementById(`node-${row}-${col}`).classList.remove('node-shortest-path');
                document.getElementById(`node-${row}-${col}`).classList.remove('keep-image');
                document.getElementById(`node-${row}-${col}`).classList.remove('SSP-image');
                document.getElementById(`node-${row}-${col}`).classList.remove('maze-wall');
            }
        }
        this.setState({ grid });
    }

    clearPath(){
        let grid = this.state.grid.slice();
        for(let row = 0; row < 23; row++){
            for(let col = 0; col < 57; col++){
                let node = grid[row][col];
                node.distance = Infinity;
                node.isVisited = false
                node.previousNode = null;
                document.getElementById(`node-${row}-${col}`).classList.remove('node-visited');
                document.getElementById(`node-${row}-${col}`).classList.remove('node-shortest-path');
                document.getElementById(`node-${row}-${col}`).classList.remove('keep-image');
                document.getElementById(`node-${row}-${col}`).classList.remove('SSP-image');
            }
        }
    }

    clearMaze(){
        let grid = this.state.grid.slice();
        for(let row = 0; row < 23; row++){
            for(let col = 0; col < 57; col++){
                let node = grid[row][col];
                node.isWall = false;
                document.getElementById(`node-${row}-${col}`).classList.remove('maze-wall');
            }
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
                }, 40);
            } 

            setTimeout(() => {
                let node = visitedNodesInOrder[i];
                if(node.isFinish){
                    setTimeout(() => {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node keep-image finish';
                    }, 40);
                }
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, speed * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder){
        if(nodesInShortestPathOrder.length <= 1){
            setTimeout(() =>{
                this.animateNoPath(nodesInShortestPathOrder);
            }, 40);
            return;
        }

        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            if(i === 0){
                setTimeout(() => {
                    let node = nodesInShortestPathOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node SSP-image start';
                }, 40);
            }

            setTimeout(() => {
                let node = nodesInShortestPathOrder[i];
                if(node.isFinish){
                    setTimeout(() => {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node SSP-image finish';
                    }, 40);
                }
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 40 * i);
        }
        this.setButtons(false, 1);
        this.SnackElement.current.message(nodesInShortestPathOrder.length);
        this.SnackElement.current.openState();
    }

    animateNoPath(nodesInShortestPathOrder){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[0];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node No-Path';
        }, 40);
        this.setButtons(false, 1);
        this.ErrorElement.current.openState();
    }

    animateWalls(nodes){
        for(let i = 0; i < nodes.length; i++){
            const node = nodes[i];
            setTimeout(() => {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node maze-wall';
            }, 5 * i);
        }
        this.setButtons(false, 1);
    }

    visaulizeMaze(MazeType){
        this.clearMaze();
        this.clearPath();
        this.setButtons(true, 0);
        const {grid} = this.state;
        const MazeNodes = MazeType(grid);
        this.animateWalls(MazeNodes);

    }

    visualizeDijkstra(){
        this.clearPath();
        this.setButtons(true, 0);
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const {visitedNodesInOrder, time} = dijkstra(grid, startNode, finishNode);
        if(time) this.SnackElement.current.setTime(time);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, time);
    }

    render(){
        const {grid, mouseIsPressed} = this.state;

        return (
          <>
          <div>
            <NavBar
              AdjustSlow={() => this.setSpeed(70)}
              AdjustAverage={() => this.setSpeed(30)}
              AdjustFast={() => this.setSpeed(8)}
              setDijkstra={() => this.setAlgorithm("dijkstra")}
              settest={() => this.setAlgorithm("coolio")}
              RandomMaze={() => this.visaulizeMaze(genMaze)}
              NoiseMap={() => this.visaulizeMaze(genNoiseMap)}
            />

            <button disabled={this.state.enabled} className={this.state.choose.replace(/ /g, '-')} onClick={() => this.visualizeAlgo()}>
              {this.state.choose}
            </button>
            <button disabled={this.state.enabled} className="Clear" onClick={() => this.clear()}>
                Clear All
            </button>
            <button disabled={this.state.enabled} className="ClearPath" onClick={() => this.clearPath()}>
                Clear Path
            </button>

            <SnackBar ref={this.SnackElement} ></SnackBar>
            <Error ref={this.ErrorElement} ></Error>

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
      </>
    );
  }
}


const getInitialGrid = () => {
    const grid = []
    for(let row = 0; row < 23; row++){
        const currRow = [];
        for(let col = 0; col < 57; col++){
            currRow.push(createNode(row, col));
        }
        grid.push(currRow);
    }
    return grid;
};


const createNode = (row, col) => {
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