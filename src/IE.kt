import arc.Events
import com.sun.tools.javac.util.List
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.game.EventType
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.mod.Mod
import org.tensorflow.Session.Run
import world.getLiquid

//by zxs(转载勿删
class Ie : Mod() {
    private var runs: Array<(EventType.WorldLoadEvent) -> Unit> = emptyArray()
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
    fun start(worldLoadEvent: WorldLoadEvent) {
        CoroutineScope(Dispatchers.Default).launch {
            while (ok) {
                runs.forEach {
                    it(worldLoadEvent)
                }
            }
        }
    }
    fun addRun(add: (EventType.WorldLoadEvent) -> Unit) {
        runs += arrayOf(add)
    }
}
