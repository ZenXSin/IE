function BlockStack(block, amount) {
    this.block = Vars.content.block(block);
    this.amount = amount;
}

function Recipe(load) {
    this.blockCapacity = 1;

    this.inputItems = [];
    this.inputLiquids = [];
    this.inputBlocks = [];
    this.inputPower = 0;

    this.craftTime = 80;

    this.outputItems = [];
    this.outputLiquids = [];
    this.outputBlocks = [];
    this.outputPower = 0;

    this.updateEffect = Fx.none;

    this.setInputItems = function(items /*[item,amount]*/ ) {
        for (let i = 0; i < items.length; i++) {
            this.inputItems[i] = new ItemStack(Vars.content.item(items[i][0]), items[i][1]);
        }
    }

    this.setInputLiquids = function(liquids) {
        for (let i = 0; i < liquids.length; i++) {
            this.inputLiquids[i] = new LiquidStack(Vars.content.liquid(liquids[i][0]), liquids[i][1]);
        }
    }

    this.setInputBlocks = function(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            this.inputBlocks[i] = new BlockStack(blocks[i][0], blocks[i][1]);
        }
    }

    this.setoutputItems = function(items) {
        for (let i = 0; i < items.length; i++) {
            this.outputItems[i] = new ItemStack(Vars.content.item(items[i][0]), items[i][1]);
        }
    }

    this.setoutputLiquids = function(liquids) {
        for (let i = 0; i < liquids.length; i++) {
            this.outputLiquids[i] = new LiquidStack(Vars.content.liquid(liquids[i][0]), liquids[i][1]);
        }
    }

    this.setOutputBlocks = function(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            this.outputBlocks[i] = new BlockStack(Vars.content.block(blocks[i][0]), blocks[i][1]);
        }
    }

    load(this);
}

function RecipeExample(recipe) {
    this.recipe = recipe;
    this.progress = 0;
    this.update = function(build) {
        if (this.progress >= recipe.craftTime) {
            build.items.add()
        }
    }
}

function MultiFactory(name, recipes) {
    this.recipes = () => recipes;
    this.block = extend(PayloadBlock, name, {})
    this.block.buildType = prov(() => {
        return extend(PayloadBlock.PayloadBlockBuild, this.block, {
            acceptPayload(building, payload) {
                for (let i = 0; i < recipes.length; i++) {
                    for (let ii = 0; ii < recipes[i].inputBlocks.length; ii++) {
                        if (recipes[i].inputBlocks[ii].block === payload.build.block) return true;
                    }
                }
                return false;
            }
        });
    });
}

var a = new Recipe(function(t) {
    t.setInputBlocks([
        ["mechanical-drill", 1]
    ]);
});
const aa = new MultiFactory("aaa", [a]);
aa.block.size = 4