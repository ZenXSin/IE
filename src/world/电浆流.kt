package world

import arc.func.Prov
import mindustry.Vars
import mindustry.ctype.ContentType
import mindustry.world.blocks.liquid.Conduit
import mindustry.world.blocks.liquid.LiquidBridge
import mindustry.world.blocks.liquid.LiquidJunction
import mindustry.world.blocks.liquid.LiquidRouter
import mindustry.world.blocks.production.GenericCrafter

fun getLiquid() {
    Vars.world.tiles.eachTile {
        val block = it.block()
        if (it.build != null && it.build.liquids != null) {
            if (((block is Conduit || block is LiquidRouter || block is LiquidJunction || block is LiquidBridge) && it.build.liquids.get(
                    Vars.content.getByName(ContentType.liquid, "工业拓展-电浆流")
                ) > 0.06f) && !block.name.contains("磁约束")
            ) {
                try {
                    it.build.kill()
                } catch (_: Exception) {
                }
            }
        }
    }
    /*
    var aaa = object : GenericCrafter("hhh") {
        init {
            buildType = Prov {
                object : GenericCrafter.GenericCrafterBuild() {
                    override fun getPowerProduction(): Float {
                        return super.getPowerProduction()
                    }
                }
            }
        }
    }
    */
}

