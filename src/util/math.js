export default {
    DIREC:{
        in:-1,
        horizontal:0,
        vertical:1,
    },
    ramdom(a,b){
        return (a + Math.round(Math.random() * (b - a)))
    },
    // 求两个点之间的角度
    countDeg(p1,p2){
        return Math.atan((p1.y-p2.y)/(p1.x-p2.x));
    },
    // 角度转弧度
    toRad(deg){
        return (Math.PI/180)*deg
    },
    // 弧度转角度
    toDeg(rad){
        return (180/Math.PI)*rad
    },
    cos(deg){
        return Math.cos(this.toRad(deg))
    },
    sin(deg){
        return Math.sin(this.toRad(deg))
    },
    inRect(pos,p,width,height){
        if(pos.x > p.x + width || pos.x < p.x){
            return this.DIREC.vertical;
        }
        if(pos.y > p.y + height || pos.y < p.y){
            return this.DIREC.horizontal;
        }
        return this.DIREC.in;
    }
}