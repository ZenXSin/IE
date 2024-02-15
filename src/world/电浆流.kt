package world

import mindustry.Vars
import mindustry.ctype.ContentType
import mindustry.world.blocks.liquid.*

fun getLiquid() {
    Vars.world.tiles.eachTile {
        val block = it.block()
        if (((block is Conduit || block is ArmoredConduit || block is LiquidRouter || block is LiquidJunction || block is LiquidBridge) && it.build.liquids.get(Vars.content.getByName(ContentType.liquid,"工业拓展-电浆流")) > 0.06f) && !block.name.contains("磁约束")) {
                try {
                    if (it.build != null){
                        it.build.kill()
                    }
                } catch (a:Exception) {}
        }
    }
}
//Conduit,ArmoredConduit,LiquidRouter,LiquidJunction,LiquidBridge