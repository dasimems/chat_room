"use strict";

window.addEventListener("load", ()=>{
    var loginButton,
        signupButton;

        if(document.getElementById("login-button")){
            loginButton = document.getElementById("login-button");
            loginButton.addEventListener("click", loginUser);
        }
        
        if(document.getElementById("signup-button")){
            signupButton = document.getElementById("signup-button");
            signupButton.addEventListener("click", signupUser);
            
        }
    
})

function checkLoginDetails(){
    var username = document.getElementById("login-username"),
        password = document.getElementById("login-password"),
        loginButton = document.getElementById("login-button");

    if(username.value.trim() !== "" && password.value.trim() !== ""){
        loginButton.removeAttribute("disabled")
        
    }else{
        loginButton.setAttribute("disabled", "true")


    }
}

function loginUser(){
    var username = document.getElementById("login-username"),
        password = document.getElementById("login-password"),
        
        loginButton = document.getElementById("login-button");
        
    loginButton.innerHTML = '<i class="fa-solid fa-spinner"></i> Verifying'
    loginButton.setAttribute("disabled", "true");
    username.setAttribute("readonly", "true");
    password.setAttribute("readonly", "true");

    setTimeout(()=>{

    
        if(username.value.trim() === "user" && password.value.trim() === "password"){
    
            showMessage({
                type: "success",
                message: "Login Successful"
            }).then(()=>{

                setTimeout(()=>{
                    window.location = "./chat.html"
        
                }, 1000)
            })
    
    
    
        }else{
    
            showMessage({
                type: "error",
                message: "Wrong username or password"
            })
    
            loginButton.innerHTML = "Sign in"
            loginButton.removeAttribute("disabled");
            username.removeAttribute("readonly");
            password.removeAttribute("readonly");
        }


    }, 2000)
    
}


function checkSignupDetails(e){
    var username = document.getElementById("signup-username"),
        password = document.getElementById("signup-password"),
        passwordTwo = document.getElementById("signup-password-two"),
        terms = document.getElementById("signup-terms"),
        signupButton = document.getElementById("signup-button"),
        usernameErr = document.getElementById("username-err"),
        passwordErr = document.getElementById("password-err"),
        passwordTwoErr = document.getElementById("password-two-err");
        // console.dir(e)
        
    if(username.value.trim() !== "" && password.value.trim() !== "" && password.value.trim().length > 7 && passwordTwo.value.trim() !== "" && passwordTwo.value.trim() === password.value.trim() && terms.checked){

        signupButton.removeAttribute("disabled");

    }else{

        signupButton.setAttribute("disabled", "true");

    }

    if(e.id === "signup-username"){

        if(e.value.trim() === ""){
            
            usernameErr.innerText = "Please input your username";
            usernameErr.style.animationName = "shake"

        }else{

            usernameErr.innerText = "";
            usernameErr.style.animationName = ""

        }
        
    }

    if(e.id === "signup-password"){

        if(e.value.trim() === ""){
            
            passwordErr.innerText = "Please input your password";
            passwordErr.style.animationName = "shake"

        }else if(e.value.trim().length < 8){
            
            passwordErr.innerText = "Password must not be less than 8 characters";
            passwordErr.style.animationName = "shake"

        }else{

            passwordErr.innerText = "";
            passwordErr.style.animationName = ""

        }
        
    }

    if(e.id === "signup-password-two"){

        if(password.value.trim() === ""){
            passwordTwo.value = "";
            passwordTwoErr.innerText = "Please fill the first password field";
            passwordTwoErr.style.animationName = "shake"
            
        }else if(e.value.trim() === ""){
            
            passwordTwoErr.innerText = "Please input your password";
            passwordTwoErr.style.animationName = "shake"

        }else if(e.value.trim() !== password.value.trim()){

            passwordTwoErr.innerText = "Password doesn't match";
            passwordTwoErr.style.animationName = "shake"

        }else{

            passwordTwoErr.innerText = "";
            passwordTwoErr.style.animationName = ""

        }
        
    }
}


function signupUser(){

    var username = document.getElementById("signup-username"),
        password = document.getElementById("signup-password"),
        passwordTwo = document.getElementById("signup-password-two"),
        terms = document.getElementById("signup-terms"),
        signupButton = document.getElementById("signup-button");

    if(username.value.trim() !== "" && password.value.trim() !== "" && password.value.trim().length > 7 && passwordTwo.value.trim() !== "" && passwordTwo.value.trim() === password.value.trim() && terms.checked){

        signupButton.setAttribute("disabled", "true");
        signupButton.innerText = "Please wait...";

        setTimeout(()=>{

            showMessage({
                type: "success",
                message: "Signup successful"
            }).then(()=>{
                setTimeout(()=>{

                    window.location = "./chat.html";

                }, 1000)
            })

        }, 2000)


    }else{

        showMessage({
            type: "error",
            message: "Please fill all form"
        })
    }


}