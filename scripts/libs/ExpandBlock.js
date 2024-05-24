function ExpandBlock(name) {
    this.optimize = false; //优化方案: true为同时处理所有任务，false为分步处理任务
    this.timeTask = []; //[time,run]定时任务
    this.task = [];
    this.superUpdate = true; //是否继承原type的updateTile
    this.addTimeTask = function(time, run) {
        this.timeTask[this.timeTask.length] = [time, this.timeTask.length];
        return this.timeTask.length;
    }
    this.addTask = run => this.task.push(run);
    this.deleteTimeTask = id => this.timeTask.splice(id, 1);
    this.getMaxTime = function() {
        let max = 0;
        for (let i = 0; i < this.timeTask.length; i++) {
            if (this.timeTask[i][0] > max) max = this.timeTask[i][0];
        }
    }
    this.block = extend(GenericCrafter, name, {});
    this.block.buildType = prov(() => {
        let tps = 0;
        let tps1 = 0;
        let tps2 = 0;
        return new JavaAdapter(this.block.buildType.get()
            .getClass(), {
            updateTile() {
                this.task[tps2](this)
                if (this.superUpdate) this.super$updateTile();
                if (this.optimize) {
                    for (let i = 0; i < this.timeTask; i++) {
                        if (this.timeTask[i][0] <= i) this.timeTask[i][1](this);
                    }
                } else {
                    if (tps1 > this.timeTask) tps1 = 0;
                    this.timeTask[tps1][1](this)
                    tps1++;
                }
                if (tps > this.getMaxTime()) tps = 0;
                tps++;
                if (tps2 > this.task.length) tps2 = 0;
                tps2++;
            }
        });
    });
}

const a = new ExpandBlock("a")
a.optimize = true;
a.timeTask = [50,function(b) {print("a");}];