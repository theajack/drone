import $ from '../dom/util'
import event from '../util/event'

function initSize(size){
    main.canvas.width = size.width;
    main.canvas.height = size.height;
}
var style;
let main = {
    canvas:null,
    ctx:null,
    init(id){
        this.canvas = $.id(id);
        this.ctx = this.canvas.getContext("2d");
        initSize({
            width:window.innerWidth,
            height:window.innerHeight
        });
        event.regist('resize',(size)=>{
            initSize(size);
        })
        $.addStyle(style)
    },
    renderBackground(){
        this.color('white');
        this.rect({x:0,y:0},this.canvas.width,this.canvas.height);
    },
    color(color){
        this.ctx.fillStyle = color;
        return this;
    },
    rect(pos,width,height){
        this.ctx.fillRect(pos.x,pos.y,width,height||width);
        return this;
    }
}
style = /*css*/`
#canvas{
    position:fixed;
    top:0;
    left:0;
}
`
export default main