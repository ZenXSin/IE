/*import mindustry.content.Items
import mindustry.content.Liquids
import mindustry.type.ItemStack
import mindustry.type.LiquidStack
import mindustry.world.blocks.production.GenericCrafter
import mindustry.world.consumers.ConsumePower

class ModBuild {
    var YourGenericCraftertName: GenericCrafter? = null
    fun load() {
        YourGenericCraftertName = object : GenericCrafter("YorGenericCrafterName") {
            init {
                requirements = ItemStack.with(Items.copper,5,Items.scrap,10)//建造消耗
                consPower = ConsumePower(5f/*消耗*/,5f/*容量*/,true/*缓冲*/)//耗电
                consumeItems(ItemStack(Items.copper,5),ItemStack(Items.scrap,10))//物品消耗
                consumeLiquids(LiquidStack(Liquids.slag,1f),LiquidStack(Liquids.oil,1f))//液体消耗
                outputItems = ItemStack.with(Items.copper,5,Items.scrap,10)//输出物品
                outputLiquids = LiquidStack.with(Liquids.slag,1f,Liquids.oil,1f)//输出液体
                craftTime = 80f//生产时间
                size = 1//大小
            }
        }
    }
}


/*
class YourModName : Mod() {
    override fun loadContent() {
        //mod被加载时运行的内容
    }
}
//by zxs(转载勿删*/
*/