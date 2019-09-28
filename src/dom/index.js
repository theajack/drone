import $ from './util'

export default {
    init(main){
        var canvas = $.create('canvas')
        $.attr(canvas,"id",'canvas');
        $.append($.id(main),canvas)
        
    }
}