export function greedyBFS(grid, startNode, targetNode) {
    const visitedNodes = [];
    const queue = [];
    const processing = []; 
    queue.push(startNode);

    while(queue.length > 0){
        let lowBound = 0;
        
        for(let i=0; i<queue.length; i++){
            if(queue[i].hCost < queue[lowBound].hCost) lowBound = i;
        }

        const currNode = queue[lowBound];
        visitedNodes.push(currNode);

        if(currNode.row === targetNode.row && currNode.col === targetNode.col){
            return visitedNodes;
        }

        queue.splice(lowBound, 1);
        processing.push(currNode);
        const neighbors = getNeighbors(grid, currNode);

        for(let i=0; i<neighbors.length; i++){
            const neighbor = neighbors[i];
            if(processing.indexOf(neighbor) !== -1 || neighbor.isWall || queue.indexOf(neighbor) !== -1){
                continue;
            }

            neighbor.hCost = Heuristic(neighbor, targetNode);
            queue.push(neighbor);
            neighbor.previousNode = currNode;
        }
    }
    return visitedNodes;
}

function getNeighbors(grid, node){
    let neighbors = [];
    const row = node.row;
    const col = node.col;

    if (grid[row-1] && grid[row-1][col]) neighbors.push(grid[row-1][col]);
    if(grid[row+1] && grid[row+1][col]) neighbors.push(grid[row+1][col]);
    if (grid[row][col-1] && grid[row][col-1]) neighbors.push(grid[row][col-1]);
    if (grid[row][col+1] && grid[row][col+1]) neighbors.push(grid[row][col+1]);

    return neighbors;
}

function Heuristic(node1, node2){
    return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
}