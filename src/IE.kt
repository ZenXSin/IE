import mindustry.game.EventType.*
import arc.Events
import mindustry.mod.Mod
import kotlinx.coroutines.*
import world.getLiquid

class IE : Mod() {
    private var ok = false
    private val coroutineScope = CoroutineScope(Dispatchers.Default)
    override fun loadContent() {
        super.loadContent()
        Events.on(WorldLoadEvent::class.java) {
            ok = true
            coroutineScope.launch {
                while (true) {
                    try {
                        getLiquid()
                    } catch (_: Exception) { }
                }
            }
        }
        Events.on(WorldLoadEndEvent::class.java) { ok = false }
    }
}