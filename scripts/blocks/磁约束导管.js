//by zxs(转载勿删
const 磁约束导管 = extend(ArmoredConduit, "磁约束导管", {
    setStats() {
        this.super$setStats();
        this.stats.add(new Stat("修复立场", new StatCat("能力")), xf());
    }
});
磁约束导管.buildType = prov(() => {
    return extend(ArmoredConduit.ArmoredConduitBuild, 磁约束导管, {
        updateTile() {
            this.super$updateTile();
            if (this.power.status >= 0.8) {
                this.health += (this.maxHealth - this.health) * 0.05;
            } else {
                try {
                    if (this.liquids.current()
                        .temperature >= 2) {
                        this.kill()
                    }
                } catch (e) {}
            }
        }
    });
});
function xf() {
    return function(table) {
        table.add("每Tick修复5%损失血量")
        table.row();
    };
}