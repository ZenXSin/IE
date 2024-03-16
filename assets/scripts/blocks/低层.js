const 低层建造区 = extend(Floor, "低层建造区", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-基础空区"
    },
    hasSurface() {
        return false;
    }
});
const 低层物品卸载器 = extend(Floor, "低层物品卸载器", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层建造区";
    },
    updateRender(tile) {
        return true;
    },
    hasSurface() {
        return false;
    },
    renderUpdate(tile) {
        try {
            if (getByXY(tile.tile.x, tile.tile.y)) {
                this.rer = Object.assign(resources, {
                    load() {
                        this.id = 0;
                        this.x = tile.tile.x;
                        this.y = tile.tile.y;
                        this.hasItems = true;
                        this.itemsCapacity = 10;
                    }
                })
                this.rer.load();
            }
        } catch (e) {
        }
    }
});
const 低层物品导管 = extend(Floor, "低层物品导管", 0, {
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层建造区";
    },
    updateRender(tile) {
        return true;
    },
    hasSurface() {
        return false;
    },
    renderUpdate(tile) {
    }
});


function a() {
    this.b = 0
    this.c = function () {
    }
}
var d = Object.assign(a, {
    c() {
        this.b = 5;
    }
})
d.c()
d.b












