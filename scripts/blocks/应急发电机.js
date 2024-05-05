//by zxs(转载勿删
let tilemini = [];

let auto = 0;
const 应急发电机 = extend(GenericCrafter, "应急发电机", {
    setStats() {
        this.super$setStats();
        this.stats.remove(Stat.output);
        this.stats.remove(Stat.productionTime);
        this.stats.add(new Stat("阈值", new StatCat("自启动")), function(table) {
            let tex = TextField(auto / 1000)
                .update(() => {
                try {
                    if (Number(tex.text) > 0) auto = Number(tex.text) * 1000;
                } catch (e) {}
            })
            table.add(tex);
            table.add("K");
            table.background(Tex.whiteui.tint(Pal.darkestGray))
            table.row();
        });
    },
    setBars() { //
        this.super$setBars();
        this.removeBar("power")
        this.addBar("发电", e => new Bar(
        () => e.getPowerProduction() === 0 ? "-0.06K" : "+5.69K", () => Pal.powerBar, () => e.getPowerProduction() === 0 ? 0 : 1, ));
    }
}); //express
应急发电机.configurable = true;
应急发电机.saveConfig = true;
应急发电机.drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawLiquidTile(Vars.content.liquid("ie-电浆流")), new DrawDefault())
应急发电机.buildType = prov(() => {
    let autoopen = auto;
    let start = false;
    let prepare = false;
    let o = 0
    return extend(GenericCrafter.GenericCrafterBuild, 应急发电机, {
        buildConfiguration(table) {
            this.super$buildConfiguration(table);
            if (start) table.add("状态：[red]运行中!");
            else if (prepare) table.add("状态：[green]准备就绪!");
            else table.add("状态：[grey]未就绪!")
            table.row();
            table.add("当前检查阈值：" + auto / 1000 + "K");
            table.row();
            table.button(prepare ? start ? "[grey]启动" : "[green]启动" : "[grey]启动", () => {
                if (prepare) start = true
            });
            table.background(Tex.whiteui.tint(Pal.darkestGray))
            table.row();
        },
        updateTile() {
            this.super$updateTile();
            if (o > 60) {
                o = 0
                if (this.liquids.get(Vars.content.liquid("ie-电浆流")) > 1990) prepare = true;
                if (!start) this.block.liquidFilter[Vars.content.liquid("ie-电浆流")
                    .id] = true;
                else this.block.liquidFilter[Vars.content.liquid("ie-电浆流")
                    .id] = false;
                if (this.power.graph.getLastCapacity() < auto && prepare) start = true;
                if (start && this.liquids.get(Vars.content.liquid("ie-电浆流")) < 1) this.kill();
                if (start) this.liquids.set(Vars.content.liquid("ie-电浆流"), this.liquids.get(Vars.content.liquid("ie-电浆流")) - 2);
            }
            o++
        },
        getPowerProduction() {
            return start ? 100 : 0
        },
        canBreak(tile) {
            return start ? false : true;
        },
        write(w) {
            this.super$write(w);
            w.f(auto);
            w.bool(start);
        },
        read(r, revision) {
            this.super$read(r, revision);
            auto = r.f();
            start = r.bool();
        }
    });
});