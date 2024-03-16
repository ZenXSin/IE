let tilemini = [];

function resources() {
    this.id = 0;
    this.x = null;
    this.y = null;
    this.hasItems = false;
    this.hasLiquids = false;
    this.hasPower = false;
    this.team = null;
    this.itemsCapacity = 0;
    this.liquidsCapacity = 0;
    if (this.hasItems) this.items = null;
    if (this.hasLiquids) this.liquids = null;
    if (this.hasPower) this.power = 0;
    this.load = function () {};
}

function read(id) {
    return tilemini[id];
}
function register(add) {
    tilemini[add.id] = add;
}
function getByXY(x,y) {
    tilemini.forEach(function (tile) {
        if (tile.x === x && tile.y === y) return tile;
    })
    return false
}