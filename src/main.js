import event from './util/event'
import dom from './dom'
import canvas from './canvas'
import object from './object'


function render(){
    canvas.renderBackground();
    object.render(canvas.ctx)
}

function main(){
    event.initEvent();
    dom.init('main');
    canvas.init('canvas');
    object.init({
        count:500,
    })
    loop();
}

function loop(){
    requestAnimationFrame(function(){
        render()
        loop();
    })  
}

export default main;