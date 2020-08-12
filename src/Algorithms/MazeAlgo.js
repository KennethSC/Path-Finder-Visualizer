export function genMaze(grid) {
    const nodes = [];
    const OG = grid.slice();
    for (let cols = 0; cols < 57; cols++) {
        for(let rows = 0; rows < getRandomArbitrary(4, 23); rows++){
            let row = getRandomInt(23)
            const node = OG[row][cols]
            if(node.isStart !== true && node.isFinish !== true){
                //node.isWall = true;
                nodes.push(node);
            }
        }
    }
    return nodes;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}