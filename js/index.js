window.onload=function(){
    //开始禁用框
    disabled(true);
    //获取keyCode对象
    var keyCode=document.querySelector('.keyCode');
    //验证码
    var code=null;
    //获取复选框对象
    var ck=document.querySelector('[type=checkbox]');
    ck.addEventListener('click',function(){
        //判断是否勾选
        if(this.checked){
            disabled(false);
            code=getKode();
        }else{
            disabled(true);
            //重置表单与验证码
            keyCode.innerHTML='';
            document.querySelector('form').reset();
            //清空提示
            prompt();
            //清空图标
            icon();
        }
    });
    //自动创建年月日
    var year=document.querySelector('[name=year]');
    var month=document.querySelector('[name=month]');
    var day=document.querySelector('[name=day]');
    var date=new Date().getFullYear();
    year.innerHTML=creatOption(date-10,date-20);
    month.innerHTML=creatOption(12);
    month.addEventListener('focusout',function(){
       day.innerHTML=creatOption(getDay(year.value,month.value));
    });
    //昵称、密码、邮箱校验
    var username=document.querySelector('[name=username]');
    username.addEventListener('keyup',function(){
        var usernameValue=this.value;
        if(!usernameValue){
            prompt('.userName .prompt','昵称不能为空!');
            icon('.userName .icon','fales');
            return false;
        }
        if(!(/^[\u4e00-\u9fa5]{2,6}$/.test(usernameValue))){
            prompt('.userName .prompt','昵称为2-6位且必须为中文');
            icon('.userName .icon','fales');
            return false;
        }
        prompt('.userName .prompt','');
        icon('.userName .icon','true');
    });
    var password=document.querySelector('[name=password1]');
    password.addEventListener('keyup',function(){
        var passwordValue=this.value;
        if(!passwordValue){
            prompt('.password1 .prompt','请输入密码!');
            icon('.password1 .icon','fales');
            return false;
        }
        if(!(/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).(?=.*?[a-z]).*$/.test(passwordValue))){
            prompt('.password1 .prompt','密码至少有一个大写字母及小写字母与数字成!');
            icon('.password1 .icon','fales');
            return false;
        }
        prompt('.password1 .prompt','');
        icon('.password1 .icon','true');
    });
    var password2=document.querySelector('[name=password2]');
    password2.addEventListener('keyup',function(){
        var passwordValue=this.value;
        if(!passwordValue){
            prompt('.password2 .prompt','密码不能为空！');
            icon('.password2 .icon','fales');
            return false;
        }
        if(!(passwordValue==password.value)){
            prompt('.password2 .prompt','密码不一致！');
            icon('.password2 .icon','fales');
            return false;
        }
        prompt('.password2 .prompt','');
        icon('.password2 .icon','true');
    });
    var mail=document.querySelector('[name=mail]');
    mail.addEventListener('keyup',function(){
        var mailValue=this.value;
        if(!mailValue){
            prompt('.mail .prompt','请输入邮箱！');
            icon('.mail .icon','fales');
            return false;
        }
        if(!(/^([a-zAZ])([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(mailValue))){
            prompt('.mail .prompt','邮箱格式不正确！');
            icon('.mail .icon','fales');
            return false;
        }
        prompt('.mail .prompt','');
        icon('.mail .icon','true');
    });
    //验证码校验
    var codeInput=document.querySelector('[name=code]');
    codeInput.addEventListener('keydown',function(e){
        if(e.keyCode==13){
           var codeValue=this.value;
            if(!codeValue){
                prompt('.code .prompt','请输入验证码！');
                return false;
            }
            if(!(codeValue==code)){
                prompt('.code .prompt','验证码错误！');
                icon('.code .icon','fales');
                disabled(true,this);
                return false;
            }
            icon('.code .icon','true');
            this.blur();
        }
    });
    //刷新按钮注册点击事件
    document.querySelector('.refresh').onclick=function(){
        if(!ck.checked){
            return false;
        }
        code=getKode();
        disabled(false,codeInput);
        prompt('.code .prompt','');
        icon('.code .icon','');
    };
    //以下为函数封装
    //禁用文本框;第一个参数为布尔值，必传；第二个参数为dom对象，不传则禁用所有文本框
    function disabled(boolean,dom){
        if(dom){
            dom.disabled=boolean;
        }else {
            var input=document.querySelectorAll('form input');
            for (var i=0; i<input.length; i++){
                input[i].disabled=boolean;
            }
            var select=document.querySelectorAll('.sel select');
            for(var k=0;k<select.length;k++){
                select[k].disabled=boolean;
            }
        }
    }
    // 根据年月获取天数
    function getDay(year,month){
        return new Date(parseInt(year),parseInt(month),0).getDate();
    }
    //动态创建option
    function creatOption(num1,num2){
        var html='';
        num2=num2?num2:1;
        for(var i=num2;i<=num1;i++){
            html+='<option>'+i+'</option>';
        }
        return html;
    }
    //产生验证码的函数
    function getKode(){
        var resut=null;
        var arr=['+','-','*'];
        //随机获取0-9之间的数字
        function rdm(){
            return Math.floor((Math.random()*9+1));
        }
        var num1=rdm();
        var num2=rdm();
        //随机获取运算符
        var i=arr[Math.floor((Math.random()*arr.length))];
        if(i=='-'){
            if(num1<num2){
                var tmp=num1;
                num1=num2;
                num2=tmp;
            }
            resut=num1-num2;
        }else if(i=='*'){
            resut=num1*num2;
        }else {
            resut=num1+num2;
        }
        console.log(num1+i+num2);
        keyCode.innerHTML=num1+i+num2+'=?';
        console.log(resut);
        return resut;
    }
    //校验提示函数,没有传参，所有提示清空；
    function prompt(select,value){
        if(!select){
            var dom=document.querySelectorAll('.prompt');
            for(var i=0;i<dom.length;i++){
                dom[i].innerHTML='';
            }
        }else{
            document.querySelector(select).innerHTML=value;
        }
    }
    //显示隐藏图标函数
    function icon(select,imgName){
        if(!select){
            var icons=document.querySelectorAll('.icon');
            for(var i=0;i<icons.length;i++){
                icons[i].style.display='none';
            }
        }else {
            var icon=document.querySelector(select);
            icon.style.display='block';
            icon.querySelector('img').src='images/'+imgName+'.png';
        }
    }
};
