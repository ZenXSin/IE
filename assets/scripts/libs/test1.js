const 范围 = 10;

function 向量长度(x, y) {
    return Math.sqrt(x * x + y * y);
}

function getblock(x, y) {
    let ret = []
    const 辅助块 = Vars.content.getByName(ContentType.block, "modname-blockname")
    Vars.world.tiles.eachTile(function (tile) {
        if (向量长度(tile.x, tile.y) <= 范围 && tile.block() === 辅助块) {
            ret.push([向量长度(tile.x, tile.y)])
        }
    })
}

function signA(tick, input, run){
    let ret = []
    function signa(tick, input, run) {
        if (tick !== 0) {
            ret.push(input)
            return signa(tick - 1, run(input), run, run(input));
        }
        return ret;
    }
    let retu = 0
    for (let i = 0;i<ret.length;i++) {
        retu += ret[i]
    }
    return retu;
}
signa(5,1,function(i) {
    return i +10
})

const block = extend(GenericCrafter, "name", {});