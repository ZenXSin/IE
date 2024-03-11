function addRecipe() {
    this.id = 0;//Don't set plans that have the same id!
    this.inputs = [];
    this.craftTime = 80;
    this.inputPower = 0;
    this.outputPower = 0;
    this.outputs = [];
    this.craftEffect = Fx.none;
    this.updateEffect = Fx.none;

    function setInputItems(input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i][0] instanceof String) input[i][0] == Vars.content.item(input[i][0])
        }
        this.inputs.push(["Item", input]);
    }

    function setInputLiquids(input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i][0] instanceof String) input[i][0] == Vars.content.liquid(input[i][0])
        }
        this.inputs.push(["Liquid", input]);
    }

    function setOutputItems(output) {
        for (let i = 0; i < input.length; i++) {
            if (input[i][0] instanceof String) input[i][0] == Vars.content.item(input[i][0])
        }
        this.outputs.push(["Item", output]);
    }

    function setOutputLiquids(output) {
        for (let i = 0; i < input.length; i++) {
            if (input[i][0] instanceof String) input[i][0] == Vars.content.liquid(input[i][0])
        }
        this.outputs.push(["Liquid", output]);
    }

    //setInputItem: [[item,amount],[item,amount,...]]
    //setInputLiquid: [[Liquid,amount],[Liquid,amount,...]]
    //setOutputItem,setOutputLiquid同理
    function load() {
    }
}

function ConplexCrafter(name, recipe) {
    this.block = extend(GenericCrafter, name, this);
    this.block.buildType = prov(() => {
        let work = [false, 0]
        return extend(GenericCrafter.GenericCrafterBuild, this.block, {
            updateTile() {
                //判断是否正在工作
                work[1] > 0 ? work[0] = true : false;
                recipe.forEach(function (i) {

                });
            }
        });
    });
}