//by zxs(转载勿删
const 磁约束容器 = extend(LiquidRouter,"磁约束容器",{
    setStats() {
    this.super$setStats();
    this.stats.add(new Stat("修复立场", new StatCat("能力")), xf());
}
});
磁约束容器.buildType = prov(() => {
    return extend(LiquidRouter.LiquidRouterBuild, 磁约束容器, {
        updateTile() {
            this.super$updateTile();
            if (this.power.status >= 0.8) {
                this.health += (this.maxHealth - this.health) * 0.001;
            }
        }
    });
});
function xf() {
    return function(table) {
        table.add("每Tick修复0.1%损失血量")
        table.row();
    };
}
