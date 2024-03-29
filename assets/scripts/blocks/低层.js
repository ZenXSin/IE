let tilemini = [];

function getxy(x, y) {
    return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
}
const 基础空区 = extend(Floor, "基础空区", 0, {})
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
        let rer = getByXY(tile.tile.x, tile.tile.y);
        try {
            //注册
            if (rer === false) {
                rer = Object.assign(resources, {
                    load() {
                        this.x = tile.tile.x;
                        this.y = tile.tile.y;
                        this.hasItems = true;
                        this.itemsCapacity = 10;
                    }
                })
                rer.load();
                register(rer);
            }
            //转存
            getxy(tile.tile.x, tile.tile.y).forEach(function (i) {
                const ite = getitem(rer.items);
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
        try {
            let rer = getByXY(tile.tile.x, tile.tile.y)
            //注册
            if (rer === false) {
                rer = Object.assign(resources, {
                    load() {
                        this.x = tile.tile.x;
                        this.y = tile.tile.y;
                        this.hasItems = true;
                        this.itemsCapacity = 100;
                    }
                })
                rer.load();
                register(rer);
            }
            //转存
            const ite = getitem(rer.items);
            if (ite !== null) {
                const tilemini = getByXY(tile.tile.x + 1, tile.tile.y);
                if (!tilemini) {
                    if (tilemini.items.length < tilemini.itemsCapacity) {
                        tilemini.items.push(ite);
                    }
                }
            }
        } catch (e) {
            //print(e);
        }
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
    this.hasItems = false;
    this.hasLiquids = false;
    this.hasPower = false;
    this.team = null;
    this.itemsCapacity = 0;
    this.liquidsCapacity = 0;
    this.items = [];
    this.liquids = [];
    this.power = 0;
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