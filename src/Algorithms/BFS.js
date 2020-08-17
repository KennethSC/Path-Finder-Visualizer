export function bfs(grid, startNode, targetNode){
    const visitedNodes = [];
    let stack = [startNode];
    while (stack.length) {
        const currNode = stack.shift();
        if (currNode === targetNode){
            return visitedNodes;
        }

        if(currNode.isWall === false && (currNode.isStart || !currNode.isVisited)){
            currNode.isVisited = true;
            visitedNodes.push(currNode);
            const {col, row} = currNode;
            let neighbor;

            if(row > 0){
                neighbor = grid[row - 1][col];
                if(!neighbor.isVisited){
                    neighbor.previousNode = currNode;
                    stack.push(neighbor);
                }
            }

            if(row < grid.length - 1){
                neighbor = grid[row + 1][col];

                if(!neighbor.isVisited){
                    neighbor.previousNode = currNode;
                    stack.push(neighbor);
                }
            }

            if(col > 0){
                neighbor = grid[row][col - 1];

                if(!neighbor.isVisited){
                    neighbor.previousNode = currNode;
                    stack.push(neighbor);
                }
            } 

            if(col < grid[0].length - 1){
                neighbor = grid[row][col + 1];

                if(!neighbor.isVisited){
                    neighbor.previousNode = currNode;
                    stack.push(neighbor);
                }
            }
        }
    }
    return visitedNodes;
}
