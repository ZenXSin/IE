package world

import mindustry.Vars
import mindustry.world.blocks.liquid.*

fun getLiquid() {
    Vars.world.tiles.eachTile {
        val block = it.block()
        if ((block is Conduit || block is ArmoredConduit || block is LiquidRouter || block is LiquidJunction || block is LiquidBridge) && !block.name.contains("磁约束")) {
            it.build.kill()
        }
    }
}
//Conduit,ArmoredConduit,LiquidRouter,LiquidJunction,LiquidBridge