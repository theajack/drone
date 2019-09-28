import version from './version'
import {spell, stroke, arg, has, _throw, _wran, dealUpLowFirst, removeTone, sumStroke,isCnChar,checkArgs} from './tool';
import dict from './dict'

function _spell(...args){
    return spell(dict.spell, args);
}
function _stroke(...args){
    return stroke(dict.stroke, args);
}

function init(){
    String.prototype.spell = function(...args){
        return _spell(this,...args);
    }
    String.prototype.stroke = function(...args){
        return _stroke(this,...args);
    }
}
function use(initPlugin){
    if(typeof initPlugin === 'function'){
        initPlugin(cnchar);
    }
}
init();

let cnchar = {
    version,
    spell:_spell,
    stroke:_stroke,
    _origin:{
        spell:_spell,
        stroke:_stroke,
    },
    _plugins:[],
    use,
    _:{arg, has, _throw, _wran, dealUpLowFirst, removeTone, sumStroke, isCnChar,checkArgs},
    type:{
        spell:arg,
        stroke:{
            array:arg.array
        }
    }
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = cnchar;
} else if(typeof window !== 'undefined'){
    window.cnchar = window.CnChar = cnchar;
}
export default cnchar;