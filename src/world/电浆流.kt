package world

import mindustry.Vars
import mindustry.ctype.ContentType
import mindustry.world.blocks.liquid.*

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
    }
}
//by zxs(转载勿删
