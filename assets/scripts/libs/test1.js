const 范围 = 10;
const block = extend(GenericCrafter, "name", {});
//改上面就行
function 向量长度(x, y) {
    return Math.sqrt(x * x + y * y);
}

function getblock(x, y) {
    let ret = []
    const 辅助块 = Vars.content.getByName(ContentType.block, "modname-blockname");
    Vars.world.tiles.eachTile(function (tile) {
        if (向量长度(tile.x, tile.y) <= 范围 && tile.block() === 辅助块) {
            ret.push(向量长度(tile.x, tile.y));
        }
    })
    return ret;
}

function signa(tick, input, run, ret = 0) {
    for (let i = 0; i < tick; i++) {
        input = run(input,i);
        ret += input;
    }
}

function getbonus(x, y, t = getblock(x, y)) {
    return 1 + signa(t, 1, (input,tick) => 2 / t);
}

block.buildType = prov(() => {
    return extend(GenericCrafter.GenericCrafterBuild, block, {
        updateTile() {
            const boots = getbonus(this.tile.x, this.tile.y)
            this.applyBoost(boots, boots)
        }
    })
});