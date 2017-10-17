$(function() {
    console.log('login');
    var login = {
        init:function() {
            this.bind();
        },
        submit:function() {
            var $this = $(this);
            $this.prop('disabled',true);
            $.ajax({
                type:"POST",
                url:'/login/login',
                data:{
                    name:$('input[name="name"]').val(),
                    password:$('input[name="password"]').val()
                },
                success:function(res){
                    $this.prop('disabled',false);
                    console.log(res);
                    if(res.state === 0){
                        $('.error').html('').hide();
                        $('.success').show();
                    }else{
                        $('.error').html(res.msg).show();
                        $('.success').hide();
                    }
                },
                error:function(){
                    $this.prop('disabled',false);
                }
            })
        },
        bind:function(){
            var t = this;
            $('.J-submit').click(function(e) {
                e.preventDefault();
                t.submit.call(this);
            })
        }
    };
    login.init();
})