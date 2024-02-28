import arc.Events
import arc.graphics.Color
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.Vars
import mindustry.ctype.ContentType
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.game.Team
import mindustry.mod.Mod
import world.getLiquid
//by zxs(转载勿删
class Ie : Mod() {
    private var ok = false
    private val coroutineScope = CoroutineScope(Dispatchers.Default)
    override fun loadContent() {
        super.loadContent()
        Events.on(WorldLoadEvent::class.java) {
            ok = true
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
