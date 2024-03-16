let tilemini = [];

function getxy(x, y) {
    return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
}

const 低层建造区 = extend(Floor, "低层建造区", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-基础空区"
    }, hasSurface() {
        return false;
    }
});
const 低层物品接收器 = extend(Floor, "低层物品接收器", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层建造区";
    }, updateRender(tile) {
        return true;
    }, hasSurface() {
        return false;
    }, renderUpdate(tile) {
        try {
            //注册
            if (getByXY(tile.tile.x, tile.tile.y)) {
                this.rer = Object.assign(resources, {
                    load() {
                        this.x = tile.tile.x;
                        this.y = tile.tile.y;
                        this.hasItems = true;
                        this.itemsCapacity = 10;
                    }
                })
                this.rer.load();
                register(this.rer);
            }
            //转存
            getxy(tile.tile.x, tile.tile.y).forEach(function (i) {
                const ite = getitem(this.rer.items);
                if (ite !== null) {
                    const tilemini = getByXY(i[0], i[1]);
                    if (!tilemini) {
                        if (tilemini.items.length < tilemini.itemsCapacity) {
                            tilemini.items.push(ite);
                        }
                    }
                }
            });
        } catch (e) {
            print(e);
        }
    }
});
const 上层物品传输器 = extend(StorageBlock, "上层物品传输器", {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层物品接收器";
    }
})
上层物品传输器.buildType = prov(() => {
    return extend(StorageBlock.StorageBuild, 上层物品传输器, {
        updateTile() {

        }
    })
})
const 低层物品导管 = extend(Floor, "低层物品导管", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层建造区";
    }, updateRender(tile) {
        return true;
    }, hasSurface() {
        return false;
    }, renderUpdate(tile) {
    }
});
低层物品导管.rotate = true;

function getitem(items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== null) {
            const a = items[i];
            items[i] = null;
            return a;
        }
        return null;
    }
}

function resources() {
    this.x = null;
    this.y = null;
    this.hasItems = false;//[item]
    this.hasLiquids = false;
    this.hasPower = false;
    this.team = null;
    this.itemsCapacity = 0;
    this.liquidsCapacity = 0;
    if (this.hasItems) this.items = [];
    if (this.hasLiquids) this.liquids = [];
    if (this.hasPower) this.power = 0;
    this.load = function () {
    };
}

function register(add) {
    try {
        if (!getByXY(add.x, add.y)) {
            tilemini.push(add)
        }
    } catch (e) {
    }
}

function getByXY(x, y) {
    try {
        tilemini.forEach(function (tile) {
            if (tile.x === x && tile.y === y) return tile;
        });
    } catch (e) {
    }
    return false
}