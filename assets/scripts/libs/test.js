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

function loadRecipes(recipe) {
    let recipes = [];
    recipe.forEach(function (i) {
        //[[item]]
    });
}

function ConplexCrafter(name, recipe) {
    this.block = extend(GenericCrafter, name, this);
    this.block.buildType = prov(() => {
        let workitems = [false, 0];
        let worksitems = [];
        let workliquids = [false, 0];
        let worksliquids = [];
        return extend(GenericCrafter.GenericCrafterBuild, this.block, {
            updateTile() {
                {//判断是否正在工作(items
                    let tc = [];
                    let wks = 0;
                    recipe.forEach(function (i) {
                        i.inputs.forEach(function (re) {
                            tc[re.id] = [re.id, this.items.get(re[0]) >= re[1]]
                        })
                    });
                    worksitems = tc;
                    worksitems.forEach(function (i) {
                        if (i[1]) workitems[1]++;
                    })
                    workitems[1] > 0 ? workitems[0] = true : false;
                    this.efficiency = workitems[0] ? 1 : 0;
                }
                {//判断是否正在工作(liquids
                    let tc = [];
                    let wks = 0;
                    recipe.forEach(function (i) {
                        i.inputs.forEach(function (re) {
                            tc[re.id] = [re.id, this.items.get(re[0]) >= re[1]]
                        })
                    });
                    worksliquids = tc;
                    worksliquids.forEach(function (i) {
                        if (i[1]) workitems[1]++;
                    })
                    workliquids[1] > 0 ? workliquids[0] = true : false;
                    this.efficiency = workliquids[0] ? 1 : 0;
                }
                //判断是否生产
            }
        });
    });
}

//efficiency