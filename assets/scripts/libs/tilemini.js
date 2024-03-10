let tile = [];
function add(x, y, valueToAdd) {
    let have = false;
    for (let i = 0; i < tile.length; i++) {
        if (tile[i][0][0] === x && tile[i][0][1] === y) {
            tile[i][1].push(valueToAdd);
            have = true;
        }
    }
    return have;
}
function read(x,y) {
    let have = null
    for (let i = 0; i < tile.length; i++) {
        if (tile[i][0][0] === x && tile[i][0][1] === y) {
            have = tile[i][1]
        }
    }
    return have;
}
function write(x, y, value) {
    if (!add(x,y,value)) {
        tile.push([[x,y],value]);
    }
}