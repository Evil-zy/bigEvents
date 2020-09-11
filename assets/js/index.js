$(function () {
    // 调用函数获取用户基本信息
    gutUserInfo()

    var layer = layui.layer
    //退出功能
    $('#btnLogout').on('click', function (index) {
        layer.confirm('确定退出吗?', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                //do something
                //1.清空本地存储中的token
                localStorage.removeItem('token')

                //2.重新跳转到登陆页
                location.href = '/login.html'

                //3.关闭询问框 
                layer.close(index)

            });
    })

})

// 获取用户的基本信息
function gutUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象（有权限的接口）
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar函数渲染用户头像
            renderAvatar(res.data)
        },

        //无论成功还是失败，最终都会调用complete回掉函数
        // complete: function (res) {
        //     //在complete回调函数中，可以使用responseJSON拿到服务器相应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登陆页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户用户头像
    if (user.user_pic !== null) {
        //3-1.渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        //3-2.渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }


}