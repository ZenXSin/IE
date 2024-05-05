//by zxs(转载勿删
function addRecipe(id) {
    this.id = id; //Don't set plans that have the same id!
    this.inputItems = [
        []
    ];
    this.outputItems = [
        []
    ];
    this.craftTime = 80;
    this.setInputItems = function(input) {
        for (let i = 0; i < input.length; i++) {
            input[i][0] = Vars.content.item(input[i][0]);
        }
        this.inputItems = input;
    }

    this.setOutputItems = function(input) {
        for (let i = 0; i < input.length; i++) {
            input[i][0] = Vars.content.item(input[i][0]);
        }
        this.outputItems = input;
    }
}

function readRecipe(re) {
    this.id = re.id;
    this.inputItems = re.inputItems;
    this.craftTime = re.craftTime;
    this.outputItems = re.outputItems;
    this.craft = 0;
    this.enable = true;
    this.update = function(building) {
        let oooo = 0;
        this.outputItems.forEach(function(o) {
            if (building.items.get(o[0]) + o[1] < building.block.itemCapacity) oooo++;
            building.dump(o[0]);
        });
        if (oooo === this.outputItems.length) {
            this.enable = true;
        } else {
            this.enable = false
        }
        if (this.craft === this.craftTime) {
            this.craft = 0;
            this.outputItems.forEach(function(o) {
                building.items.add(o[0], o[1]);
            });
            this.inputItems.forEach(function(o) {
                building.items.add(o[0], -o[1]);
            })
        }
        let ok = 0;
        this.inputItems.forEach(function(i) {
            if (building.items.get(i[0]) >= i[1]) ok++;
        })

        if (ok === this.inputItems.length && this.enable) this.craft++;
    }
}

function loadRecipe(recipes, block) {
    let ret = [];
    recipes.forEach(function(i) {
        ret.push(new readRecipe(i));
        i.inputItems.forEach(function(o) {
            block.itemFilter[o[0].id] = true;
        });
    });
    return ret;
}

function update(recipes, building) {
    if (building.efficiency > 0) {
        recipes.forEach(function(r) {
            r.update(building);
        });
    }
}

function ConplexCrafter(name, recipes) {
    this.block = extend(GenericCrafter, name, {});
    this.block.buildType = prov(() => {
        const rps = loadRecipe(recipes, this.block);
        return extend(GenericCrafter.GenericCrafterBuild, this.block, {
            updateTile() {
                this.super$updateTile();
                update(rps, this)
            }
        });
    });
}

const p1 = new addRecipe(0);
p1.setInputItems([
    ["copper", 5]
]);
p1.setOutputItems([
    ["ie-精炼铜", 5]
]);
p1.craftTime = 40;

const p2 = new addRecipe(1);
p2.setInputItems([
    ["titanium", 5]
]);
p2.setOutputItems([
    ["ie-精炼钛", 5]
]);
p2.craftTime = 40;

const p3 = new addRecipe(2);
p3.setInputItems([
    ["ie-铝", 5]
]);
p3.setOutputItems([
    ["ie-精炼铝", 5]
]);
p3.craftTime = 40;

const block = new ConplexCrafter("电浆重融炉", [p1, p2, p3]);