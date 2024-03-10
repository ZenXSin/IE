function ConplexCrafter(name) {
    function addRecipe() {
        this.inputs = [];
        this.craftTime = 80;
        this.inputPower = 0;
        this.outputPower
        this.outputs = [];
        this.craftEffect = Fx.none;
        this.updateEffect = Fx.none;

        function setInputItems(input) {
            this.inputs.push(["Item", input]);
        }

        function setInputLiquids(input) {
            this.inputs.push(["Liquid", input]);
        }

        function setOutputItems(output) {
            this.outputs.push(["Item", output]);
        }

        function setOutputLiquids(output) {
            this.outputs.push(["Liquid", output]);
        }

        //setInputItem: [[item,amount],[item,amount,...]]
        //setInputLiquid: [[Liquid,amount],[Liquid,amount,...]]
        //setOutputItem,setOutputLiquid同理
        function load() {
        }
    }

    this.block = extend(GenericCrafter, name, this);
    this.block.buildType = prov(() => {
        return extend(GenericCrafter.GenericCrafterBuild, this.block, {});
    });
}