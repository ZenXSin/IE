//by zxs(转载勿删
function getDrill(xi, yi) {
    const x = xi - 2;
    const y = yi - 2;
    return [[x, y], [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2], [x + 1, y + 3], [x + 1, y + 4], [x + 2, y], [x + 2, y + 1], [x + 2, y + 2], [x + 2, y + 3], [x + 2, y + 4], [x + 3, y], [x + 3, y + 1], [x + 3, y + 2], [x + 3, y + 3], [x + 3, y + 4], [x + 4, y], [x + 4, y + 1], [x + 4, y + 2], [x + 4, y + 3], [x + 4, y + 4]];
}

function getOre(x, y) {
    const xy = getDrill(x, y);
    const str = ["copper", "lead", "titanium", "scrap", "工业拓展-铝", "beryllium", "tungsten"];
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
    });
    let ret = ["null", 0]
    ore.forEach(i => {
        if (i[1] > ret[1]) {
            ret = i
        }
    });
    if (ret[0] == "null") {
        xy.forEach(xy => {
            const x = xy[0];
            const y = xy[1];
            const tile = Vars.world.tile(x, y);
            if (tile.floor().itemDrop == Items.sand) {
                ret[0] = tile.floor().itemDrop
                ret[1]++
            }
        });
    }
    return ret;
}

const 电浆融井 = extend(GenericCrafter, "电浆融井", {
    drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);
        const ore = getOre(x, y);
        this.drawPlaceText(ore[0].name + "*" + ore[1], x, y, valid);
    }, canPlaceOn(tile, team, rotation) {
        return getOre(tile.x, tile.y)[0] !== "null"
    }, setStats() {
        this.super$setStats();
        this.stats.remove(Stat.output);
        this.stats.add(Stat.output, jz(this.craftTime));
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
电浆融井.buildType = prov(() => {
    let ore = null;
    return extend(GenericCrafter.GenericCrafterBuild, 电浆融井, {
        craft() {
            this.super$craft();
            if (ore === null) {
                ore = getOre(this.tile.x, this.tile.y);
            }
            if (ore[0] == Items.sand) {
                this.items.add(Items.metaglass, Math.floor(Math.random() * ore[1] + 1) / 4);
                this.items.add(Items.silicon, Math.floor(Math.random() * ore[1] + 1) / 4);
                this.items.add(Items.scrap, Math.floor(Math.random() * ore[1] + 1) / 2);
            } else {
                this.items.add(ore[0], ore[1]);
                this.items.add(Items.scrap, ore[1] / 2);
            }
        },
        drawSelect() {
            if (ore !== null) {
                this.drawPlaceText(ore[0].name + "*" + ore[1], x, y, valid);
            }
        }
    });
});

function geticon(name) {
    return Vars.content.getByName(ContentType.block, name).uiIcon;
}

function jz(craftTime) {
    return function (table) {
        table.background(Tex.whiteui.tint(Pal.darkestGray))
        table.row();
        const resources = [
            {icon: "ore-copper", item: Items.copper},
            {icon: "ore-lead", item: Items.lead},
            {icon: "ore-scrap", item: Items.scrap},
            {icon: "ore-titanium", item: Items.titanium},
            {icon: "ore-beryllium", item: Items.beryllium},
            {icon: "ore-tungsten", item: Items.tungsten},
            {icon: "工业拓展-铝矿", item: Vars.content.getByName(ContentType.item, "工业拓展-铝")}
        ];

        resources.forEach((resource) => {
            table.add(Image(geticon(resource.icon)));
            table.add(Image(Icon.right));
            table.add(new ItemDisplay(resource.item, 25, craftTime, true)).padRight(5);
            table.add("[red](满载速度)");
            table.row();
        });
        table.row();
        table.add(Image(geticon("sand-floor")));
        table.add(Image(geticon("darksand")));
        table.add(Image(Icon.right));
        table.add(new ItemDisplay(Items.metaglass, 25 / 4, craftTime, true)).padRight(5);
        table.add(new ItemDisplay(Items.silicon, 25 / 4, craftTime, true)).padRight(5);
        table.add(new ItemDisplay(Items.scrap, 25 / 2, craftTime, true)).padRight(5);
        table.add("[red](满载速度)");
        table.row();
    };
}