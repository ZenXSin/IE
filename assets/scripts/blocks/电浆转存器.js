//by zxs(转载勿删
function ipo(x, y) {
    return [[x + 2, y], [x - 2, y], [x, y + 2], [x, y - 2]];
}

function getIR(x, y) {
    let ir = ["null"];
    let n = 0;
    let f = 0;
    const a = ipo(x, y);
    for (let i = 0; i < a.length; i++) {
        if (Vars.world.tile(a[i][0], a[i][1])
            .block() instanceof ImpactReactor) {
            ir[n] = Vars.world.tile(a[i][0], a[i][1]);
            n++;
            if (Vars.world.tile(a[i][0], a[i][1]).build.productionEfficiency > 0.8) {
                f++;
            }
        }
    }
    ir[4] = f;
    return ir;
}

function getpower(x, y, sideLength) {
    var halfSide = Math.floor(sideLength / 2);
    let xy = ["null"];
    let io = 0;
    for (var i = x - halfSide; i <= x + halfSide; i++) {
        for (var j = y - halfSide; j <= y + halfSide; j++) {
            try {
                if (Vars.world.tile(i, j)
                    .block().hasPower) {
                    xy[io] = Vars.world.tile(i, j);
                    io++;
                }
            } catch (e) {
            }
        }
    }
    return xy;
}

const 电浆转存器 = extend(GenericCrafter, "电浆转存器", {
    drawPlace(x, y, rotation, valid) {
        Drawf.dashSquare(Color.white, x * 8, y * 8, 5 * 8);
    }, canPlaceOn(tile, team, rotation) {
        return !getIR(tile.x, tile.y)
            .includes("null");
    }, setBars() {
        this.super$setBars();
        this.addBar("效率", entity => new Bar(() => "效率", () => Color.red, () => getIR(entity.tile.x, entity.tile.y)[4] / 4));
    }, setStats() {
        this.super$setStats();
        this.stats.add(new Stat("建造", new StatCat("建造")), jz());
    }
});
电浆转存器.buildType = prov(() => {
    let i = 0;
    return extend(GenericCrafter.GenericCrafterBuild, 电浆转存器, {
        updateTile() {
            this.super$updateTile();
            if (i > 200) {
                const n = getIR(this.tile.x, this.tile.y);
                if (n[4] > 1) {
                    this.applyBoost(n[4], n[4]);
                    this.enabled = true;
                } else if (n[4] > 0) {
                    this.enabled = true;
                } else {
                    this.enabled = false;
                }
            } else {
                i++;
            }
        }, killed() {
            var ip = getpower(this.tile.x, this.tile.y, 100);
            for (let i = 0; i < ip.length; i++) {
                try {
                    if (Math.floor(Math.random() * (1 + 1)) === 0) {
                        ip[i].kill();
                    } else {
                        ip[i].build.enabled = false;
                    }
                } catch (e) {
                }
            }
            this.super$killed();
        }
    });
});

function jz() {
    return function (table) {
        table.add("需建造在反应堆边上");
        table.add(Image(Blocks.impactReactor.uiIcon).setScaling(Scaling.fit)).size(30);
        table.row();
    };
}