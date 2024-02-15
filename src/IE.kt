import arc.Events
import arc.scene.ui.Image
import arc.scene.ui.layout.Table
import arc.util.Scaling
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.Vars
import mindustry.content.Blocks
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.mod.Mod
import mindustry.world.meta.StatValue
import world.getLiquid

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
//by zxs(转载勿删
