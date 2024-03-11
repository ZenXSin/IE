import arc.Events
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import mindustry.Vars
import mindustry.game.EventType.WorldLoadEndEvent
import mindustry.game.EventType.WorldLoadEvent
import mindustry.mod.Mod
import world.基础空区
import world.电浆流
import java.util.*

//by zxs(转载勿删
class Ie : Mod() {
    private var ok = false
    private var coroutineScope = CoroutineScope(Dispatchers.Default)
    override fun loadContent() {
        super.loadContent()
        Events.on(WorldLoadEvent::class.java) {
            ok = true
            coroutineScope.launch {
                while (ok) {
                    基础空区()
                    电浆流()
                }
            }
        }
        Events.on(WorldLoadEndEvent::class.java) { ok = false }
    }
}
fun a() {

}