const 伤害 = 10;

const 聚爆压缩硅炉 = extend(HeatProducer, "聚爆压缩硅炉", {});
聚爆压缩硅炉.buildType = prov(() => {
    return extend(HeatProducer.HeatProducerBuild, 聚爆压缩硅炉, {
        updateTile() {
            if (!enabled) this.progress = 0;
        }, craft() {
            this.super$craft();
            火焰(this.tile.x, this.tile.y);
        }
    });
});

function 火焰(x, y) {
    Vars.world.tiles.eachTile(function (tile) {
        if (向量长度(x, tile.x, y, tile.y) <= 6) {
            if (tile.build.health <= 伤害) {
                tile.build.health -= 3;
            }
        }
    })
}

function 向量长度(x, x1, y, y1) {
    return Math.sqrt(x * x1 + y * y1);
}