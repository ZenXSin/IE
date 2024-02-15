const 磁约束容器 = extend(LiquidRouter,"磁约束容器",{});
磁约束容器.buildType = prov(() => {
    return extend(LiquidRouter.LiquidRouterBuild, 磁约束容器, {
        updateTile() {
            this.super$updateTile();
            if (this.power.status >= 0.8) {
                this.health += (this.maxHealth - this.health) * 0.001;
            } else {
                try {
                    if (this.liquids.current()
                        .temperature >= 2) {
                        this.kill();
                    }
                } catch (e) {}
            }
        },
        setStats() {
            this.super$setStats();
            this.stats.add(new Stat("修复立场"), 0);
        }
    });
});