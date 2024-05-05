package mindustry.entities.effect;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.util.*;
import mindustry.entities.*;
import mindustry.graphics.*;

/** 
 * 最基本的粒子效果类。可以以各种形状创建粒子。
 */
public class ParticleEffect extends Effect{
    private static final Rand rand = new Rand(); // 用于随机数生成
    private static final Vec2 rv = new Vec2(); // 用于存储旋转后的向量

    // 粒子的颜色范围
    public Color colorFrom = Color.white.cpy(), colorTo = Color.white.cpy();
    public int particles = 6; // 粒子数量
    public boolean randLength = true; // 是否随机化粒子长度
    // 粒子效果翻转兼容性，类似于弹壳效果
    public boolean casingFlip;
    public float cone = 180f, length = 20f, baseLength = 0f; // 粒子效果的锥角、长度和基础长度
    // 粒子大小/长度/半径插值方式
    public Interp interp = Interp.linear;
    // 粒子大小插值方式，如果为null则使用interp
    public @Nullable Interp sizeInterp = null;
    public float offsetX, offsetY; // 粒子生成偏移量
    public float lightScl = 2f, lightOpacity = 0.6f; // 光源缩放和透明度
    public @Nullable Color lightColor; // 光源颜色

    // 仅在区域内使用

    /** 每刻度旋转的度数 */
    public float spin = 0f;
    /** 控制初始和最终的精灵大小 */
    public float sizeFrom = 2f, sizeTo = 0f;
    /** 是否将旋转添加到父对象 */
    public boolean useRotation = true;
    /** 旋转偏移量 */
    public float offset = 0;
    /** 要绘制的精灵 */
    public String region = "circle";

    // 仅在线条上使用
    public boolean line;
    public float strokeFrom = 2f, strokeTo = 0f, lenFrom = 4f, lenTo = 2f;
    public boolean cap = true;

    private @Nullable TextureRegion tex; // 用于存储纹理区域

    @Override
    public void init(){
        // 初始化粒子效果的剪辑范围
        clip = Math.max(clip, length + Math.max(sizeFrom, sizeTo));
        // 如果没有指定大小插值，则使用默认插值
        if(sizeInterp == null) sizeInterp = interp;
    }

    @Override
    public void render(EffectContainer e){
        // 如果纹理区域未定义，则查找纹理区域
        if(tex == null) tex = Core.atlas.find(region);

        // 计算实际旋转角度和翻转因子
        float realRotation = (useRotation ? (casingFlip ? Math.abs(e.rotation) : e.rotation) : baseRotation);
        int flip = casingFlip ? -Mathf.sign(e.rotation) : 1;
        // 计算完成度插值
        float rawfin = e.fin();
        float fin = e.fin(interp);
        // 计算粒子大小
        float rad = sizeInterp.apply(sizeFrom, sizeTo, rawfin) * 2;
        // 计算粒子位置偏移
        float ox = e.x + Angles.trnsx(realRotation, offsetX * flip, offsetY), oy = e.y + Angles.trnsy(realRotation, offsetX * flip, offsetY);

        // 设置粒子颜色
        Draw.color(colorFrom, colorTo, fin);
        // 设置光源颜色
        Color lightColor = this.lightColor == null ? Draw.getColor() : this.lightColor;

        // 如果是线条效果
        if(line){
            // 设置线条宽度
            Lines.stroke(sizeInterp.apply(strokeFrom, strokeTo, rawfin));
            // 设置线条长度
            float len = sizeInterp.apply(lenFrom, lenTo, rawfin);

            // 设置随机种子以保证每次生成的粒子效果不同
            rand.setSeed(e.id);
            for(int i = 0; i < particles; i++){
                // 计算粒子长度
                float l = length * fin + baseLength;
                // 根据旋转角度和随机长度生成粒子位置
                rv.trns(realRotation + rand.range(cone), !randLength ? l : rand.random(l));
                float x = rv.x, y = rv.y;

                // 绘制线条
                Lines.lineAngle(ox + x, oy + y, Mathf.angle(x, y), len, cap);
                // 在粒子位置绘制光源效果
                Drawf.light(ox + x, oy + y, len * lightScl, lightColor, lightOpacity * Draw.getColor().a);
            }
        }else{
            // 如果不是线条效果
            rand.setSeed(e.id);
            for(int i = 0; i < particles; i++){
                // 计算粒子长度
                float l = length * fin + baseLength;
                // 根据旋转角度和随机长度生成粒子位置
                rv.trns(realRotation + rand.range(cone), !randLength ? l : rand.random(l));
                float x = rv.x, y = rv.y;

                // 绘制粒子纹理
                Draw.rect(tex, ox + x, oy + y, rad, rad, realRotation + offset + e.time * spin);
                // 在粒子位置绘制光源效果
                Drawf.light(ox + x, oy + y, rad * lightScl, lightColor, lightOpacity * Draw.getColor().a);
            }
        }
    }
}