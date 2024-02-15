import arc.Events
import arc.func.Boolf
import arc.graphics.Color
import arc.scene.ui.layout.Table
import arc.struct.ObjectFloatMap
import arc.util.Scaling
import arc.util.Strings
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.Vars
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.mod.Mod
import mindustry.type.Item
import mindustry.ui.Styles
import mindustry.world.Block
import mindustry.world.meta.StatUnit
import mindustry.world.meta.StatValue
import world.getLiquid
import kotlin.math.max

class IE : Mod() {
    private var ok = false
    private val coroutineScope = CoroutineScope(Dispatchers.Default)
    override fun loadContent() {
        super.loadContent()
        Events.on(WorldLoadEvent::class.java) {
            ok = false
            coroutineScope.launch {
                while (ok) {
                    try {
                        getLiquid()
                    } catch (_: Exception) { }
                }
            }
        }
        Events.on(WorldLoadEndEvent::class.java) { ok = false }
    }
}

fun drillables(): StatValue {
    return StatValue { table: Table ->
        table.table { c: Table ->
        }.growX().colspan(table.columns)
        table.row()
    }
}