package world

import arc.func.Prov
import mindustry.Vars
import mindustry.content.Blocks
import mindustry.content.Items
import mindustry.content.Liquids
import mindustry.ctype.ContentType
import mindustry.gen.Icon
import mindustry.world.Block
import mindustry.world.blocks.liquid.*
import mindustry.world.blocks.production.GenericCrafter

fun getLiquid() {
    Vars.world.tiles.eachTile {
        val block = it.block()
        if (it.build != null && it.build.liquids != null) {
            if (((block is Conduit || block is ArmoredConduit || block is LiquidRouter || block is LiquidJunction || block is LiquidBridge) && it.build.liquids.get(
                    Vars.content.getByName(ContentType.liquid, "工业拓展-电浆流")
                ) > 0.06f) && !block.name.contains("磁约束")
            ) {
                try {
                    it.build.kill()
                } catch (_: Exception) { }
            }
        }
    }/*
    var aaa = object: GenericCrafter("hhh") {}
    //Not enough information to infer type variable T
    Items.metaglass
    aaa.GenericCrafterBuild()*/
}

