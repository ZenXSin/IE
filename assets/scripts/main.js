//by zxs(转载勿删
require("blocks/电浆转存器");
require("blocks/磁约束导管");
require("blocks/磁约束容器");
require("blocks/电浆融井");
require("blocks/小型应急发电机");
require("blocks/低层")
require("blocks/试车平台")
const 钢化铝冶炼炉 = extend(GenericCrafter,"钢化铝冶炼炉",{})
const re = extend(RadialEffect,Fx.surgeCruciSmoke, 4, 45, 5, {
    create(x, y, rotation, color, data) {
        if (this.shouldCreate()) {
            {
                let newX = x + Math.cos(rotation) * this.lengthOffset - 2;
                let newY = y + Math.sin(rotation) * this.lengthOffset - 4;
                this.effect.create(newX, newY, rotation, color, data);
            }
            {
                let newX = x + Math.cos(rotation) * this.lengthOffset - 10;
                let newY = y + Math.sin(rotation) * this.lengthOffset - 4;
                this.effect.create(newX, newY, rotation, color, data);
            }
            {
                let newX = x + Math.cos(rotation) * this.lengthOffset - 10;
                let newY = y + Math.sin(rotation) * this.lengthOffset + 4;
                this.effect.create(newX, newY, rotation, color, data);
            }
            {
                let newX = x + Math.cos(rotation) * this.lengthOffset - 2;
                let newY = y + Math.sin(rotation) * this.lengthOffset + 4;
                this.effect.create(newX, newY, rotation, color, data);
            }
        }
    }
})
钢化铝冶炼炉.craftEffect = new MultiEffect(re);
