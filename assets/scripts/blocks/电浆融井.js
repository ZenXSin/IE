//by zxs(转载勿删
function getDrill(x, y) {
    const xi = x - 2;
    const yi = y - 2;
    return [[x, y], [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2], [x + 1, y + 3], [x + 1, y + 4], [x + 2, y], [x + 2, y + 1], [x + 2, y + 2], [x + 2, y + 3], [x + 2, y + 4], [x + 3, y], [x + 3, y + 1], [x + 3, y + 2], [x + 3, y + 3], [x + 3, y + 4], [x + 4, y], [x + 4, y + 1], [x + 4, y + 2], [x + 4, y + 3], [x + 4, y + 4]];
}

function getOre(x, y) {
    const xy = getDrill(x, y);
    let ore = ["null"];
    let n = 0;
    const str = ["copper", "lead", "titanium", "scrap", "工业拓展 - 铝", "beryllium", "tungsten", "sand"];
    for (let i = 0; i < xy.length; i++) {
        const tile = Vars.world.tile(xy[i][0], xy[i][1]);
        if (tile.block() instanceof OreBlock && str.includes(tile.block().name)) {
            let nt = false;
            for (let i = 0; i < ore.length; i++) {
                if (ore[i][0] === tile.block()) {
                    ore[i][1]++;
                    nt = true;
                }
            }
            if (!nt) {
                ore[n] = [tile.block(), 1];
            }
        }
    }
    let oRe = ["null",0];
    for(let i = 0;i<ore.length;i++) {
        if (ore[i][1] > oRe[1]) {
            oRe = ore[i];
        }
    }
    return oRe;
}

//copper，lead，titanium，scrap，工业拓展-铝，beryllium，tungsten
const 电浆融井 = extend(GenericCrafter, "电浆融井", {
    drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);

    },
    canPlaceOn(tile, team, rotation) {
        return getOre(tile.x,tile.y)[0] !== "null"
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