import Drone from "./drone";
import event from '../util/event'

let droneCount=0;
let drones = [];
let mapSize = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.setTarget=()=>{
    for(var i=0;i<drones.length;i++){
        drones[i].setTarget();
    }
}

window.cancelTarget=()=>{
    for(var i=0;i<drones.length;i++){
        drones[i].cancelTarget();
    }
}

let flag = true;
setInterval(function(){
    flag = !flag;
    flag?cancelTarget():setTarget()
},3000)


function init({count,size = 10}){
    droneCount = count;
    for(var i=0;i<count;i++){
        drones.push(new Drone({
            id:i,
            map:mapSize,
            size,
        }));
    }
    event.regist('resize',(size)=>{
        mapSize.width = size.width;
        mapSize.height = size.height;
    })
}

function render(ctx){
    for(var i=0;i<drones.length;i++){
        drones[i].act();
        drones[i].render(ctx);
    }
}
function act(){
    // for(var i=0;i<drones.length;i++){
    //     drones[i].act();
    // }
}

export default {
    render,
    // act,
    init,
};