const 磁约束导管 = extend(ArmoredConduit, "磁约束导管", {
    setStats() {
        this.super$setStats();
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