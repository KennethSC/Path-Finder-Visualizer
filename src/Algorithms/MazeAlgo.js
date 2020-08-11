import tumult from 'tumult';

export function genPerlinNoise(grid, perlinState) {
    const OG = grid.slice();
    const perlinNodes = [];
    const perlinConfig = perlinState;
    const perlin = new tumult.PerlinN()
    for(let row = 0; row < 23; row++) {
        for(let col = 0; col < 57; col++) {
            const node = OG[row][col]
            if(node.isStart !== true && node.isFinish !== true){
                if(node.row === 10 && node.col === 5) continue;
                const val = Math.abs(perlin.gen(col/10*perlinConfig.density, row/10*perlinConfig.density))
                if(val > perlinConfig.threshhold) {
                    node.isWall = true;
                    perlinNodes.push(node);
                }
            }
        }
    }
    return perlinNodes
}

