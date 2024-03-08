const 低层建造区 = extend(Floor,"低层建造区", 0,{
    canPlaceOn(tile, team, rotation) {
        return tile.floor().name === "ie-基础空区"
    },
});