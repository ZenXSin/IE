const 低层建造区 = extend(Floor,"低层建造区", 0,{
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-基础空区"
    },
    hasSurface() {
        return false;
    }
});
const 低层物品卸载器 = extend(Floor,"低层物品卸载器",0,{
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
const 低层物品导管= extend(Floor,"低层物品导管",0,{
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
低层物品卸载器.configurable = true;