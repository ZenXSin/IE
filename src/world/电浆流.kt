package world

import arc.func.Cons
import arc.func.Prov
import arc.graphics.Color
import mindustry.Vars
import mindustry.content.Planets
import mindustry.ctype.ContentType
import mindustry.game.Rules
import mindustry.game.Team
import mindustry.graphics.g3d.HexMesh
import mindustry.maps.planet.TantrosPlanetGenerator
import mindustry.type.Planet
import mindustry.world.blocks.liquid.Conduit
import mindustry.world.blocks.liquid.LiquidBridge
import mindustry.world.blocks.liquid.LiquidJunction
import mindustry.world.blocks.liquid.LiquidRouter
import mindustry.world.meta.Env
//by zxs(转载勿删
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
}/*
var aaa = object : GenericCrafter("hhh") {
    init {
        configurable = true
        buildType = Prov {
            object : GenericCrafter.GenericCrafterBuild() {
                override fun getPowerProduction(): Float {
                    return super.getPowerProduction()
                }

                override fun buildConfiguration(table: Table?) {
                    super.buildConfiguration(table)
                    table.button()
                }
                override fun update() {
                    super.update()
                    this.power.graph.batteryCapacity
                    ConsumePower
                    Vars.state.teams.get(this.team).core().items.each { item, amount ->
                        if (amount >= 2000f) {
                            Vars.state.teams.get(this.team).core().items.add(item,2000 - amount)
                        }
                    }
                }
            }
        }
    }
}*/