let auto = 5000;
const 小型应急发电机 = extend(GenericCrafter, "小型应急发电机", {
    setStats() {
        this.super$setStats();
        this.stats.remove(Stat.output);
        this.stats.remove(Stat.productionTime);
        this.stats.add(new Stat("自动开机", new StatCat("触发条件")), function (table) {
            auto = setPower(table,auto)
        });
    }
});
小型应急发电机.configurable = true;
小型应急发电机.buildType = prov(() => {
    let autoState = auto;
    return extend(GenericCrafter.GenericCrafterBuild, 小型应急发电机, {
        buildConfiguration(table) {
            this.super$buildConfiguration(table);
            autoState = setPower(table,autoState);
        }
    });
});

function setPower(table,t) {
    let aut = 0;
    const text = TextField(t / 1000).update(() => {
        try {
            aut = text.text * 1000
        } catch (e) {
        }
    });
    table.add(text);
    table.add("K");
    table.row();
    if(aut <= 0) {
        return t;
    } else {
        return aut;
    }
}