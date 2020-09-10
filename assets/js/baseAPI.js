//注意每次调用$.get() $.post $.ajax的时候，会先调用这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根目录
    options.url = 'http://ajax.frontend.itheima.net' + options.url

})