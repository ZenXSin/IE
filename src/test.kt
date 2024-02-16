/*import arc.Core
import arc.graphics.Color
import arc.math.Mathf
import arc.struct.Seq
import arc.util.Nullable
import arc.util.Strings
import mindustry.content.Fx
import mindustry.entities.Effect
import mindustry.type.ItemStack
import mindustry.type.LiquidStack
import mindustry.ui.ItemDisplay
import mindustry.ui.LiquidDisplay
import mindustry.ui.Styles
import mindustry.world.consumers.Consume
import mindustry.world.consumers.ConsumeItems
import mindustry.world.consumers.ConsumeLiquids
import mindustry.world.meta.Stat

class ComplexCrafter(name: String?) : UpgradableCrafter(name) {
    var craftPlans: Seq<CraftPlan?>? = Seq(16)

    fun setStats() {
        super.setStats()
        stats.remove(Stat.productionTime)
        stats.remove(Stat.output)
        stats.remove(Stat.input)
        stats.add(AlloyStat.craftPlan) { table ->
            table.row()
            table.table(Styles.grayPanel) { t ->
                if (craftPlans != null) {
                    for (plan in craftPlans!!) {
                        t.add(
                            Strings.autoFixed(
                                plan!!.craftTime / 60f,
                                1
                            ) + " " + Core.bundle["unit.seconds"]
                        ).color(Color.lightGray)
                        t.row()
                        t.add(Core.bundle["stat.input"]).color(Color.lightGray)
                        for (consumer in plan.consumers) {
                            if (consumer is ConsumeItems) {
                                for (stack in consumer.items) {
                                    t.add(ItemDisplay(stack.item, stack.amount)).padRight(5)
                                }
                            }
                            if (consumer is ConsumeLiquids) {
                                for (stack in consumer.liquids) {
                                    table.add(LiquidDisplay(stack.liquid, stack.amount * 60f, true)).padRight(5)
                                }
                            }
                        }
                        t.row()
                        t.add(Core.bundle["stat.output"]).color(Color.lightGray)
                        if (plan.outputItems != null) {
                            for (stack in plan.outputItems) {
                                t.add(ItemDisplay(stack!!.item, stack.amount)).padRight(5)
                            }
                        }
                        if (plan.outputLiquids != null) {
                            for (stack in plan.outputLiquids) {
                                table.add(LiquidDisplay(stack!!.liquid, stack.amount * 60f, true)).padRight(5)
                            }
                        }
                        t.row()
                    }
                }
            }.right().growX().pad(5)
        }
    }

    fun setBars() {
        super.setBars()
        for (plan in craftPlans!!) {
            if (plan!!.outputLiquids != null && plan.outputLiquids.size > 0) {
                removeBar("liquid")
                for (stack in plan.outputLiquids) {
                    addLiquidBar(stack!!.liquid)
                }
            }
        }
        removeBar("doubleProduct")
    }

    fun init() {
        super.init()
        for (plan in craftPlans!!) {
            if (plan!!.outputItems == null && plan.outputItem != null) {
                plan.outputItems = arrayOf(plan.outputItem)
            }
            if (plan.outputLiquids == null && plan.outputLiquid != null) {
                plan.outputLiquids = arrayOf(plan.outputLiquid)
            }

            if (plan.outputLiquid == null && plan.outputLiquids != null && plan.outputLiquids.size > 0) {
                plan.outputLiquid = plan.outputLiquids[0]
            }
            outputsLiquid = plan.outputLiquids != null

            if (plan.outputItems != null) hasItems = true
            if (plan.outputLiquids != null) hasLiquids = true
            for (consumer in plan.consumers) {
                if (consumer is ConsumeItems) {
                    for (itemStack in consumer.items) {
                        this.itemFilter.get(itemStack.item.id.toInt()) = true
                    }
                }
            }
        }
        if (craftPlans!![0] != null) {
            val plan = craftPlans!![0]
            outputItems = plan!!.outputItems
            outputLiquids = plan.outputLiquids
        }
    }

    class CraftPlan {
        //Do not set plans that have the same id!
        var id: Int = 0
        var consumers: Array<Consume>
        var craftTime: Float = 60f

        @Nullable
        var outputItem: ItemStack? = null

        @Nullable
        var outputItems: Array<ItemStack?>

        @Nullable
        var outputLiquid: LiquidStack? = null

        @Nullable
        var outputLiquids: Array<LiquidStack?>

        var craftEffect: Effect = Fx.none
        var updateEffect: Effect = Fx.none
        var updateEffectChance: Float = 0.04f
        var warmupSpeed: Float = 0.019f
    }

    inner class ComplexCrafterBuild : UpgradableCrafterBuild() {
        var craftTimer: FloatArray = FloatArray(16)

        fun shouldConsume(): Boolean {
            for (plan in craftPlans!!) {
                if (plan!!.outputItems != null) {
                    for (output in plan.outputItems) {
                        if (items.get(output!!.item) + output.amount > itemCapacity) {
                            return false
                        }
                    }
                }
                if (plan.outputLiquids != null && !ignoreLiquidFullness) {
                    var allFull = true
                    for (output in plan.outputLiquids) {
                        if (liquids.get(output!!.liquid) >= liquidCapacity - 0.001f) {
                            if (!dumpExtraLiquid) {
                                return false
                            }
                        } else {
                            allFull = false
                        }
                    }

                    if (allFull) {
                        return false
                    }
                }
            }
            return enabled
        }

        fun updateTile() {
            for (plan in craftPlans!!) {
                if (efficiency > 0) {
                    var produce = true
                    for (consumer in plan!!.consumers) {
                        if (consumer is ConsumeItems) {
                            for (itemStack in consumer.items) {
                                if (items.get(itemStack.item) < itemStack.amount) produce = false
                            }
                        }
                    }
                    if (!produce) continue
                    craftTimer[plan.id] += getProgressIncrease(plan.craftTime)
                    warmup = Mathf.approachDelta(warmup, warmupTarget(), warmupSpeed)

                    if (plan.outputLiquids != null) {
                        val inc: Float = getProgressIncrease(1f)
                        for (output in plan.outputLiquids) {
                            handleLiquid(
                                this, output!!.liquid, Math.min(
                                    output.amount * inc, liquidCapacity - liquids.get(
                                        output.liquid
                                    )
                                )
                            )
                        }
                    }

                    if (wasVisible && Mathf.chanceDelta(plan.updateEffectChance.toDouble())) {
                        plan.updateEffect.at(x + Mathf.range(size * 4f), y + Mathf.range(size * 4))
                    }
                } else {
                    warmup = Mathf.approachDelta(warmup, 0f, warmupSpeed)
                }
                if (craftTimer[plan!!.id] > 1f) {
                    craft(plan)
                }
                dumpOutputs(plan)
            }
        }

        fun craft(plan: CraftPlan?) {
            for (cons in plan!!.consumers) {
                cons.trigger(this)
            }

            if (plan.outputItems != null) {
                for (output in plan.outputItems) {
                    for (i in 0 until output!!.amount) {
                        offload(output.item)
                    }
                }
            }

            if (wasVisible) {
                plan.craftEffect.at(x, y)
            }
            craftTimer[plan.id] %= 1f
        }

        fun dumpOutputs(plan: CraftPlan?) {
            if (plan!!.outputItems != null && timer(timerDump, dumpTime / timeScale)) {
                for (output in plan.outputItems) {
                    dump(output!!.item)
                }
            }

            if (plan.outputLiquids != null) {
                for (i in plan.outputLiquids.indices) {
                    val dir = if (liquidOutputDirections.length > i) liquidOutputDirections.get(i) else -1

                    dumpLiquid(plan.outputLiquids[i]!!.liquid, 2f, dir)
                }
            }
        }
    }
}*/