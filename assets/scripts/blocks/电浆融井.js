//by zxs(转载勿删
function getDrill(xi, yi) {
    const x = xi - 2;
    const y = yi - 2;
    return [[x, y], [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2], [x + 1, y + 3], [x + 1, y + 4], [x + 2, y], [x + 2, y + 1], [x + 2, y + 2], [x + 2, y + 3], [x + 2, y + 4], [x + 3, y], [x + 3, y + 1], [x + 3, y + 2], [x + 3, y + 3], [x + 3, y + 4], [x + 4, y], [x + 4, y + 1], [x + 4, y + 2], [x + 4, y + 3], [x + 4, y + 4]];
}

function getOre(x, y) {
    const xy = getDrill(x, y);
    const str = ["copper", "lead", "titanium", "scrap", "工业拓展-铝", "beryllium", "tungsten", "sand"];
    let ore = [["null", 0]];
    xy.forEach(xy => {
        const x = xy[0];
        const y = xy[1];
        const tile = Vars.world.tile(x, y);
        if (tile.overlay() instanceof OreBlock) {
            if (str.includes(tile.overlay().itemDrop.name)) {
                ore.forEach(i => {
                    if (tile.overlay().itemDrop == i[0]) {
                        i[1]++;
                    } else {
                        ore[0] = [tile.overlay().itemDrop, 1];
                    }
                })
            }
        }
    })
    let ret = ["null", 0]
    ore.forEach(i => {
        if (i[1] > ret[1]) {
            ret = i
        }
    })
    if (ret[0] == null) {
        xy.forEach(xy => {
            const x = xy[0];
            const y = xy[1];
            const tile = Vars.world.tile(x, y);
            if (tile.Floor().itemDrop == Items.sand) {
                ret[0] == tile.Floor().itemDrop
                ret[1]++
            }
        })
    }
    return ret;
}

//copper，lead，titanium，scrap，工业拓展-铝，beryllium，tungsten
const 电浆融井 = extend(GenericCrafter, "电浆融井", {
    drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);

    }, canPlaceOn(tile, team, rotation) {
        return getOre(tile.x, tile.y)[0] !== "null"
    }
});
const eff = new Effect(160, e => {
    Draw.color(Color(117, 230, 211, 1));
    Draw.alpha(0.6);
    Fx.rand.setSeed(e.id);
    for (let i = 0; i < 3; i++) {
        let len = Fx.rand.random(6), rot = Fx.rand.range(40) + e.rotation;
        e.scaled(e.lifetime * Fx.rand.random(0.3, 1), b => {
            Fx.v.trns(rot, len * b.finpow());
            Fill.circle(e.x + Fx.v.x, e.y + Fx.v.y, 2 * b.fslope() + 0.2);
        });
    }
});

电浆融井.craftEffect = new RadialEffect(eff, 15, 90, 8);