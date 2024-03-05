import arc.Events
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.mod.Mod
import world.getLiquid

//by zxs(转载勿删
class Ie : Mod() {
    private var runs: Array<(WorldLoadEvent) -> Unit> = emptyArray()
    private var ok = false
    override fun loadContent() {
        super.loadContent()
        addRun {
            getLiquid()
        }
        Events.on(WorldLoadEvent::class.java) {
            ok = true
            start(it)
        }
        Events.on(WorldLoadEndEvent::class.java) { ok = false }
    }
    private fun start(worldLoadEvent: WorldLoadEvent) {
        CoroutineScope(Dispatchers.Default).launch {
            while (ok) {
                runs.forEach {
                    it(worldLoadEvent)
                }
            }
        }
    }
    private fun addRun(add: (WorldLoadEvent) -> Unit) {
        runs += arrayOf(add)
    }
}
