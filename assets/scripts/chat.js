"use strict";

var docProps = {
    menuOpened: false
}

window.addEventListener("load", ()=>{
    var headerButton = document.querySelector(".header-button");

    headerButton.addEventListener("click", menu)
})

function menu(){

    if(docProps.menuOpened){
        closeMenu();
        docProps.menuOpened = false;
    }else{
        openMenu();
        docProps.menuOpened = true;
    }

}

function openMenu(){
    var openButtonTopIcon = document.querySelectorAll(".open-button #first-btn"),
        openButtonMiddleicon = document.querySelectorAll(".open-button #second-btn"),
        openButtonBottomIcon = document.querySelectorAll(".open-button   #third-btn"),
        closeButton = document.querySelectorAll(".close-button"),
        closeButtonFirsticon = document.querySelectorAll(".close-button #first-btn"),
        closeButtonSecondicon = document.querySelectorAll(".close-button #second-btn"),
        menuContainer = document.querySelector(".chat-menu"),
        contactNameHeader = document.querySelector(".contact-name-header-info"),
        contactName = document.querySelector(".contact-chats");

    openButtonTopIcon.forEach(element => {
        element.style.marginLeft = "-100%";
        
    });

    openButtonBottomIcon.forEach(element => {
        element.style.marginLeft = "-100%";
        
    });

    openButtonMiddleicon.forEach(element => {
        element.style.marginLeft = "100%";
        
    });

    menuContainer.style.left = "0px";
    contactNameHeader.style.opacity = "0";
    contactName.style.opacity = "0";

    setTimeout(()=>{

        closeButton.forEach(element => {
            element.style.opacity = "1";
        })

        closeButtonFirsticon.forEach(element => {
            element.style.top = "50%";
            element.style.left = "50%";
            
        });

        closeButtonSecondicon.forEach(element => {
            element.style.top = "50%";
            element.style.left = "50%";
            
        });

        

    }, 400)

}

function closeMenu(){

    var openButtonTopIcon = document.querySelectorAll(".open-button #first-btn"),
        openButtonMiddleicon = document.querySelectorAll(".open-button #second-btn"),
        openButtonBottomIcon = document.querySelectorAll(".open-button   #third-btn"),
        closeButton = document.querySelectorAll(".close-button"),
        closeButtonFirsticon = document.querySelectorAll(".close-button #first-btn"),
        closeButtonSecondicon = document.querySelectorAll(".close-button #second-btn"),
        menuContainer = document.querySelector(".chat-menu"),
        contactNameHeader = document.querySelector(".contact-name-header-info"),
        contactName = document.querySelector(".contact-chats");

        

        closeButtonFirsticon.forEach(element => {
            element.style.top = "100%";
            element.style.left = "0%";
            
        });

        closeButtonSecondicon.forEach(element => {
            element.style.top = "100%";
            element.style.left = "100%";
            
        });


        menuContainer.style.left = "-350px";
        contactNameHeader.style.opacity = "1";
        contactName.style.opacity = "1";

        
        setTimeout(()=>{
            
            closeButton.forEach(element => {
                element.style.opacity = "0";
            })

            openButtonTopIcon.forEach(element => {
                element.style.marginLeft = "20%";
                
            });
        
            openButtonBottomIcon.forEach(element => {
                element.style.marginLeft = "20%";
                
            });
        
            openButtonMiddleicon.forEach(element => {
                element.style.marginLeft = "0%";
                
            });

    
    }, 300)

}