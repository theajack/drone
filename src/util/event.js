
let events = {

}

function _checkEvent(name){
    if(events[name]){
        return true;
    }else{
        console.warn('错误的事件：'+name)
        return false;
    }
}

function init(name){
    events[name] = new _event(name);
}
function regist(name,listener){
    if(_checkEvent(name)){
        events[name].regist(listener);
    }
}
function emit(name,data){
    if(_checkEvent(name)){
        events[name].emit(data);
    }
}

class _event{
    constructor(name){
        this.name = name;
        this.listeners = []; 
    }
    regist(listener){
        this.listeners.push(listener)
    }
    emit(data){
        this.listeners.forEach(listener=>{
            listener(data);
        })
    }
}

function initEvent(){
    initResize();
}

function initResize(){
    init('resize');
    let flag = false;
    window.addEventListener('resize',()=>{
        if(flag){
            return;
        }
        flag = true;
        setTimeout(()=>{
            setTimeout(()=>{
                emit('resize',{
                    width:window.innerWidth,
                    height:window.innerHeight
                })
            },50)
            flag = false;
        },500)
    })
}

export default {
    initEvent,
    init,
    emit,
    regist
}
