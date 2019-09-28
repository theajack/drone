import polyPhrases from './polyphone-phrase-simple.json'

let _ = {};// 工具方法

let arg = {origin:'origin'}

var _spell;

function _poly(...args){
    let str = args[0]; // 待处理的字符串
    args = args.splice(1);
    _.checkArgs('spell',args,true);
    let newArgs = [_.arg.array]; // 先用数组
    let tone = _.has(args,_.arg.tone);
    // // 多音字参数参数将被忽略
    // if(_.has(args,_.arg.poly))
    //     _._wran('多音字参数 poly 被忽略')
    if(tone){newArgs.push(_.arg.tone)} // 音调参数
    // 其他几个参数等获取到多音拼音之后在处理
    let res = _spell(str,...newArgs); // 获取
    for(var k in polyPhrases){
        let index = str.indexOf(k);
        if(index !== -1) { // 命中了多音词词库
            let pa = polyPhrases[k].split(' ');// 多音词拼音数组
            for(var i=0;i<pa.length;i++){
                res[index+i] = _.removeTone(pa[i],tone)
            }
        }
    }
    _.dealUpLowFirst(res,args);
    if(!_.has(args,_.arg.array)){
        res=res.join('');
    }
    return res;
}

function main(cnchar){
    if(cnchar._plugins.indexOf('poly')!==-1){
        return;
    }
    cnchar._plugins.push('poly');
    _spell = cnchar._origin.spell;
    _ = cnchar._;
    var _new = function(...args){
        if(_.has(args,arg.origin)){
            return _spell(...args)
        }
        return _poly(...args);
    };
    cnchar.spell = _new
    String.prototype.spell = function(...args){
        return _new(this,...args);
    }
    cnchar.type.spell.origin = arg.origin;
    cnchar._.poly = true;
    if(cnchar._reinitSpellPoly){
        cnchar._reinitSpellPoly();
        delete cnchar._reinitSpellPoly;
    }
}

function init(cnchar){
    if(typeof window==='object' && window.CnChar){
        main(window.CnChar)
    }else if(typeof cnchar!=='undefined'){
        main(cnchar)
    }else {
        // _._throw('必须先引入 cnchar: npm i cnchar')
        console.warn('请先引用 cnchar 或使用 cnchar.use() 加载poly插件')
    }
}


init();
export default init;