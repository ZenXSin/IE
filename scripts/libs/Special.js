//by zxs(转载勿删
const setBuildingType = (block) => {
    const build = block.buildType.get()
        .getClass();
    block.buildType = prov(() => new JavaAdapter(build, {
        update() {
            this.super$update();
            if (this.liquids.get(Vars.content.liquid("ie-电浆流")) > 0.05) {
                this.killed();
            }
        }
    }, block));
}

Events.on(EventType.ClientLoadEvent, () => {
    Vars.content.blocks().each(cons(block => {
        if (block.hasLiquids && block.minfo.mod === null) {
            if (block instanceof Conduit || block instanceof LiquidRouter || block instanceof LiquidJunction || block instanceof LiquidBridge) {
                setBuildingType(block);
            }
        }
    }));
});

/*
function st(it) {
    const block = it.block;
    if (block.hasLiquids) {
        try {
            if (((block instanceof Conduit || block instanceof LiquidRouter || block instanceof LiquidJunction || block instanceof LiquidBridge) && it.liquids.get(Vars.content.getByName(ContentType.liquid, "ie-电浆流")) > 0.06) && !block.name.includes("磁约束")) {
                it.killed();
            }
        } catch (e) {}
    }
}
let i = 0
Events.run(Trigger.update, () => {
    if (i > 60) {
        i = 0;
        Groups.build.each(cons((it) => {
            st(it);
        }));
    }
    i++
});*/