package world

import mindustry.Vars
import mindustry.content.Blocks
import mindustry.ctype.ContentType
import mindustry.world.blocks.liquid.Conduit
import mindustry.world.blocks.liquid.LiquidBridge
import mindustry.world.blocks.liquid.LiquidJunction
import mindustry.world.blocks.liquid.LiquidRouter


fun 基础空区() {
    Vars.world.tiles.eachTile {
        if (it.overlay() != Blocks.air && it.floor().name == "ie-基础空区") {
            it.setOverlay(Blocks.air)
        }
    }
}
fun 电浆流() {
    Vars.world.tiles.eachTile {
        val block = it.block()
        if (it.build != null && it.build.liquids != null) {
            if (((block is Conduit || block is LiquidRouter || block is LiquidJunction || block is LiquidBridge) && it.build.liquids.get(
                    Vars.content.getByName(ContentType.liquid, "ie-电浆流")
                ) > 0.06f) && !block.name.contains("磁约束")
            ) {
                    it.build.killed()
            }
        }
    }
}