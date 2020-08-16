// Runs Dijkstra's algorithm and returns all the 
// visited nodes in the order that they were visited.
export function dijkstra(grid, startNode, targetNode){
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If the node is a wall, then it 
        // does not get processed.
        if(closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // then there must be no possible path.
        if(closestNode.distance === Infinity){
            return visitedNodes;
        }

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        // If the closest node is the target node, then
        // we have found a possible path.
        if(closestNode === targetNode){
            return visitedNodes;
        }

        updateNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid){
    const unvisitedNeighbors = getNeighbors(node, grid);

    for(const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid){
    const nodes = [];

    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

// Gets the shortest possible path by iterating through
// each nodes previous node starting from the target node
export function getNodesInShortestPath(targetNode){
    const nodesInShortestPath = [];
    let currentNode = targetNode;

    while (currentNode !== null) {
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPath;
}