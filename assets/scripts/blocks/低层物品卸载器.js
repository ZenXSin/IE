const 低层物品卸载器 = extend(Floor,"低层物品卸载器",0,{
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-低层建造区";
    }
})