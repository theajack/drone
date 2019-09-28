J.ready(function(){
  J.class("func-img").tip([
    "获取汉字的拼音|音调",
    "支持多音字词",
    "获取汉字的笔画数|笔画顺序",
    "支持繁简体转换|繁体拼音笔画"
  ]);
  J.id('_year').txt((new Date()).getFullYear())
  J.id('tryInput').on('input',function(){
    var str=this.val();
    if(str==''){
      J.id('spell').txt('')
      J.id('stroke').txt('')
      J.id('strokeOrder').txt('')
      J.id('trad').txt('')
      J.id('spark').txt('')
    }else{
      J.id('spell').txt(str.spell('array','tone').join(' '))
      J.id('stroke').txt('共 '+str.stroke()+' 笔')
      J.id('strokeOrder').txt('笔画顺序：' + JSON.stringify(str.stroke('order','shape')).replace(/"/g,'').replace(/null/g,'无'))
      J.id('trad').txt('繁体字：'+str.convert('trad'))
      J.id('spark').txt('火星文： '+str.convert('spark'))
    }
  })
});