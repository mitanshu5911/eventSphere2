// const { response } = require("express");

$(document).ready(function(){
    // Signup Part
    $("#btnSignup").click(function(){
        let email=$("#signupTxtEmail").val();
        let password=$("#signupTxtPwd").val();;
        let usertype=$("#userType").val();

        let errEmail=$("#singupEmailErr").html();
        let errPwd=$("#signupPwdErr").html();

        if(errEmail==="Its Valid" && errPwd==="Strong" && usertype!="none"){
            let OBJ = {
                type:"get",
                url:"/checkUser",
                data:{
                    txtEmail:email,
                }
            }
            $.ajax(OBJ).done(function(response){
                if(response === "Not"){
                    let obj = {
                        type:"get",
                        url:"/signup",
                        data:{
                            txtEmail:email,
                            txtPwd:password,
                            userType:usertype
                        }
                    }
                    $.ajax(obj).done(function(respose){
                        alert(respose);
                    }).fail(function(err){
                        alert("Server error :" + err.message)
                    });
                }
                else{
                    alert(response);
                    return;
                }


            }).fail(function(err){
                console.log(err);
                alert("Server error :" + err.message)
            });
            
        }
        else{
            alert("Please fill the form correctly");
        }
        
    });

    $("#signupTxtEmail").blur(function(){
        let email = $("#signupTxtEmail").val().toLowerCase();
        $("#signupEmailErr").val(email);

        let eexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(eexp.test(email)==false){
            $("#singupEmailErr").html("Not Valid").addClass("notOk").removeClass("ok");
        }
        else{
            $("#singupEmailErr").html("Its Valid").addClass("ok").removeClass("notOk");

        }
    })

    $("#signupTxtPwd").keyup(function(){
        let password=$(this).val();
        let numeric=/\d/.test(password);
        let character=/[!@#$%^&*(),.?":{}|<>]/.test(password);
        let alpha=/[A-Z]/.test(password);
        if(password.length<8){
            $("#signupPwdErr").html("Less than 8 char.").addClass("notOk").removeClass("ok");
        }
        else if(numeric==false){
            $("#signupPwdErr").html("easy").addClass("notOk").removeClass("ok");

        }
        else if(character==false){
            $("#signupPwdErr").html("Medium").addClass("notOk").removeClass("ok");

        }
        else if(alpha==false){
            $("#signupPwdErr").html("Medium").addClass("notOk").removeClass("ok");
            
        }
        else{
            $("#signupPwdErr").html("Strong").addClass("ok").removeClass("notOk");

        }
    })

    
    $("#signupBtnEye").mousedown(function(){
        $("#signupTxtPwd").prop("type","text");
        $("#signupIconEye").removeClass("fa-eye-slash").addClass("fa-eye");
    })
    $("#signupBtnEye").mouseup(function(){
        $("#signupTxtPwd").prop("type","password");
        $("#signupIconEye").addClass("fa-eye-slash").removeClass("fa-eye");
    })



    // Login Part
    $("#btnLogin").click(function(){
        let email=$("#loginTxtEmail").val();
        let password=$("#loginTxtPwd").val();

        let obj = {
            type:"get",
            url:"/login",
            data:{
                txtEmail:email,
                txtPwd:password
            }
        }
        $.ajax(obj).done(function(response){
            if(response === "Organizer"){
                location.href="./organizer/index.html";
                localStorage.setItem("activeUser",email);
            }
            else if(response === "Customer"){
                location.href="./customer/index.html";
                localStorage.setItem("activeUser",email);
            }
            else{
                alert(response);
            }
        }).fail(function(err){
            alert("Server error :" + err.message)
        });
    })

    $("#loginTxtEmail").blur(function(){
        let email=$("#loginTxtEmail").val().toLowerCase();
        $("#loginTxtEmail").val(email);

        let eexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(eexp.test(email)==false){
            $("#loginEmailErr").html("Not Valid").addClass("notOk").removeClass("ok");
        }
        else{
            $("#loginEmailErr").html("Its Valid").addClass("ok").removeClass("notOk");

        }
    })

    $("#loginTxtPwd").keyup(function(){
        let password=$(this).val();

        if(password.length<8){
            $("#loginPwdErr").html("Less than 8 char.").addClass("notOk").removeClass("ok");
        }
        else{
            $("#loginPwdErr").html("");

        }
    })

    $("#loginBtnEye").mousedown(function(){
        $("#loginTxtPwd").prop("type","text");
        $("#loginIconEye").removeClass("fa-eye-slash").addClass("fa-eye");
    })
    $("#loginBtnEye").mouseup(function(){
        $("#loginTxtPwd").prop("type","password");
        $("#loginIconEye").addClass("fa-eye-slash").removeClass("fa-eye");
    })
});