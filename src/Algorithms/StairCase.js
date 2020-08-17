export function staircase(grid) {
    let newGrid = grid.slice();
    let nodes = [];
    let currentIdX = 22 - 1;
    let currentIdY = 0;

    while (currentIdX > 0 && currentIdY < 55 ) {
        let node = newGrid[currentIdX][currentIdY];
        if(currentIdX === 1){
            currentIdX--;
            currentIdY++;
            continue;
        }

        if(node.isStart !== true && node.isFinish !== true){
            nodes.push(node);
        }
        currentIdX--;
        currentIdY++;
    }

    while (currentIdX < 22 -2 && currentIdY < 55 ) {
        let node = newGrid[currentIdX][currentIdY]; 

        if (node.isStart !== true && node.isFinish !== true){
            nodes.push(node);
        }
        currentIdX++;
        currentIdY++;
    }

    while (currentIdX > 0 && currentIdY < 55 - 1) {
        let node = newGrid[currentIdX][currentIdY]; 
        if (node.isStart !== true && node.isFinish !== true){
            nodes.push(node);
        }

        currentIdX--;
        currentIdY++;
    }
    return nodes;
}