import tumult from 'tumult';

export function genNoiseMap(grid) {
    const OG = grid.slice();
    const Nodes = [];
    const perlin = new tumult.PerlinN()
    for(let row = 0; row < 23; row++) {
        for(let col = 0; col < 57; col++) {
            const node = OG[row][col]
            if(node.isStart !== true && node.isFinish !== true){
                if(node.row === 10 && node.col === 5) continue;
                const val = Math.abs(perlin.gen(col/10 * 1.3, row/10 * 1.3))
                if(val > .2) {
                   // node.isWall = true;
                    Nodes.push(node);
                }
            }
        }
    }
    return Nodes
}

