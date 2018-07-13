$(function(){
    var $registerBox=$('#registerBox');
    var $loginBox=$('#loginBox');
    $registerBox.find('a').on('click',function(){
        $loginBox.show();
        $registerBox.hide();
    });
    $loginBox.find('a').on('click',function(){
        $registerBox.show();
        $loginBox.hide();
    });
    $registerBox.find('button').on('click',function(){
       $.ajax({
           url:'/api/user/register',
           type:'post',
           data:{
               username:$registerBox.find('[name="username"]').val(),
               password:$registerBox.find('[name="password"]').val(),
               password1:$registerBox.find('[name="password1"]').val()
           },
           dataType:'json',
           success:function(result){
                $registerBox.find('.ischeckregister').html(result.message);
                if(!result.code){
                    setTimeout(function(){
                        $loginBox.show();
                        $registerBox.hide();
                    },1000);
                }
           }
       })
    });
})