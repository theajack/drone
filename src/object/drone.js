import util from '../util/util'
import math from '../util/math'
import ctx from '../canvas/util'

let colors = ['red','blue','green','block']

let degChangeMax = 10;

export default class Drone{
    constructor({id,size,map,speed = 5}){
        this.id = id;
        this.size = size;
        this.map = map; // 地图尺寸
        this.speed = speed;
        this.pos = {
            x: math.ramdom(0,this.map.width - this.size),
            y: math.ramdom(0,this.map.height - this.size)
        }
        this.color = colors[math.ramdom(0,colors.length-1)];
        this.toTarget = true; // 是否向目标点前进 否则随机运动
        this.toTarget = false; // 是否向目标点前进 否则随机运动
        this.moveType = 'frame'; // frame：同时到达 speed：速度都一样 
        this.frames = 30;// moveType=frame 时规定到达用到的帧数
        this.frame = 0;
        this.target = this.defaultTarget();
        // this.toTarget = false
        // this.deg = math.countDeg(this.pos,this.target)
        this.deg = math.ramdom(0,360);
        this.initMoveDis();
    }
    defaultTarget(){
        let line = 30,m = 10;
        let y = Math.floor(this.id/line);
        let x = this.id%line;
        return {
            x:x*(this.size+m),
            y:y*(this.size+m),
        }
        // {
        //     x:this.id*10,
        //     y:this.id*10,
        // }
    }
    cancelTarget(){
        this.toTarget = false;
    }
    setTarget(target){
        this.frame = 0;
        this.target = target||this.defaultTarget()
        this.initMoveDis();
        this.toTarget = true;
    }
    initMoveDis(){
        if(this.moveType === 'frame'){
            this.dx = (this.target.x - this.pos.x)/this.frames
            this.dy = (this.target.y - this.pos.y)/this.frames
        }
    }
    render(){
        // if(this.id!==20){
        //     return;
        // }
        ctx.color(this.color)
            .rect(this.pos,this.size);
    }
    act(){
        // if(this.id!==20){
        //     return;
        // }
        if(this.toTarget){
            this.moveToTarget();
        }else{
            this.moveRandom();
        }
    }
    moveToTarget(){
        if(this.moveType === 'frame' && this.frame < this.frames){
            this.move(this.dx,this.dy);
            this.frame++;
        }
    }
    moveRandom(){
        this.deg += this.getRandomChangeDeg();
        let dx = this.speed * (math.cos(this.deg))
        let dy = this.speed * (math.sin(this.deg))
        // if(this.pos.x + dx < 100){
        //     console.log(this.deg)
        //     this.deg = -180 - this.deg;
        //     // this.pos.x = 100;
        // }else if(this.pos.x + dx > this.map.width-100){
        //     this.deg = -180 - this.deg;
        //     // this.pos.x = this.map.width-100;
        // }else{
        //     this.pos.x += dx;
        // }
        // if(this.pos.y + dy < 100){
        //     console.log(this.deg)
        //     this.deg =  - this.deg;
        //     // this.pos.y = 100;
        // }else if(this.pos.y + dy > this.map.height-100){
        //     this.deg =  - this.deg;
        //     // this.pos.y = this.map.height-100;
        // }else{
        //     this.pos.y += dy;
        // }

        let res = math.inRect({
            x:this.pos.x+dx,
            y:this.pos.y+dy
        },{x:0,y:0},this.map.width-this.size,this.map.height-this.size)
        if(res === math.DIREC.horizontal){
            this.deg =  - this.deg;
        }else if(res === math.DIREC.vertical){
            this.deg = -180 - this.deg;
        }else{
            this.move(dx,dy);
        }
    }
    move(dx,dy){
        this.pos.x += dx;
        this.pos.y += dy;
    }
    getRandomChangeDeg(){
        return math.ramdom(-degChangeMax,degChangeMax)
    }
}