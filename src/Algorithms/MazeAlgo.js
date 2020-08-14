export function genMaze(grid) {
    const nodes = [];
    const OG = grid.slice();

    for(let cols = 0; cols < 57; cols++) nodes.push(OG[0][cols]);
    for(let rows = 1; rows < 23; rows++) nodes.push(OG[rows][0]);
    for(let rows = 1; rows < 22; rows++) nodes.push(OG[rows][56]);
    for(let cols = 1; cols < 57; cols++) nodes.push(OG[22][cols]);

    for (let cols = 1; cols < 56; cols++) {
        for(let rows = 1; rows < getRandomArbitrary(4, 22); rows++){
            let row = getRandomInt(22)
            const node = OG[row][cols]
            if(node.isStart !== true && node.isFinish !== true){
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