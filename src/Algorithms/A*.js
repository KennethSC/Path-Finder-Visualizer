export function AStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  const openList = [];
  const closeList = []; 
  openList.push(startNode);
  while (openList.length > 0) {
      let lowInd = 0;
      for (let i=0; i<openList.length; i++) {
          if (openList[i].fCost < openList[lowInd].fCost) { lowInd = i; }
      }
      const currentNode = openList[lowInd];
      visitedNodesInOrder.push(currentNode);

      if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
          return visitedNodesInOrder;
      }

      openList.splice(lowInd, 1);
      closeList.push(currentNode);

      const neighbors = getNeighbors(grid, currentNode);
      for (let i=0; i<neighbors.length; i++) {
          const neighbor = neighbors[i];
          if (closeList.indexOf(neighbor) !== -1 || neighbor.isWall) {
              continue;
          }

          const gScore = currentNode.gCost + 1;
          let gScoreIsBest = false;

          if (openList.indexOf(neighbor) === -1) {
              gScoreIsBest = true;
              neighbor.hCost = computeHeuristic(neighbor, finishNode);
              openList.push(neighbor);
          } else if (gScore < neighbor.gCost) {
              gScoreIsBest = true;
          }

          if (gScoreIsBest) {
              neighbor.previousNode = currentNode;
              neighbor.gCost = gScore;
              neighbor.fCost = neighbor.gCost + neighbor.hCost;
          }
      }
  }
  return visitedNodesInOrder;
}

function getNeighbors(grid, node) {
  let ret = [];
  const row = node.row;
  const col = node.col;

  if (grid[row-1] && grid[row-1][col]) 
      ret.push(grid[row-1][col]);
  if(grid[row+1] && grid[row+1][col])
      ret.push(grid[row+1][col]);
  if (grid[row][col-1] && grid[row][col-1])
      ret.push(grid[row][col-1]);
  if (grid[row][col+1] && grid[row][col+1])
      ret.push(grid[row][col+1]);
  return ret;
}

function computeHeuristic(node1, node2) {
  return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
}






/*export function AStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid); // Q: different from using grid or slice of grid???
  
    while (unvisitedNodes.length) {
      sortByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (!closestNode.isWall) {
        // If the closest node is at a distance of infinity,
        // we must be trapped and should stop.
        if (closestNode.distance === Infinity){
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode){
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighbors(closestNode, grid);
      }
    }
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1 + neighbor.distanceToFinishNode;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.fCostilter(neighbor => !neighbor.isVisited);
  }

  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }*/