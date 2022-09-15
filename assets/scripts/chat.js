"use strict";

var docProps = {
    menuOpened: false,
    otherChatOptionOpened: false,
    mediaBoxOpened: false
}

window.addEventListener("load", ()=>{
    var headerButton = document.querySelector(".header-button"),
        otherThingsButton = document.getElementById("add-item"),
        mediaImage = document.querySelectorAll(".media-content-cards .media .media-image img"),
        showCaseImageCloseButton = document.querySelector(".image-show-case .image-show-case-header #close-image-show-case-btn"),
        counterContainer = document.querySelector(".image-show-case .image-show-case-footer .stats .total-count");

    headerButton.addEventListener("click", menu);
    otherThingsButton.addEventListener("click", openContent);
    showCaseImageCloseButton.addEventListener("click", closeImageShowCase)

    counterContainer.innerText = mediaImage.length;

    mediaImage.forEach((images, index)=>{
        images.addEventListener("click", (e)=>{
            // console.log(e.target.src);
            showImageShowCase(e.target.src, index);
        })
    })




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

function openContent(){
    var addItemButton = document.getElementById("add-item"),
        defaultButton = document.querySelectorAll(".default-chat-content"),
        otherButton = document.querySelectorAll(".other-chat-content");

    if(docProps.otherChatOptionOpened){

        addItemButton.style.transform = "rotateZ(0deg)";
        docProps.otherChatOptionOpened = false;

        otherButton.forEach((element) =>{
                element.style.opacity = "0";
        })

        setTimeout(()=>{
            otherButton.forEach(element =>{
                element.style.display = "none";
                element.style.animationName = "";
                element.style.animationDelay = "0s";
            })

            defaultButton.forEach(element => {
                element.style.display = "block";
            })
    
        }, 500)

    }else{
        
        addItemButton.style.transform = "rotateZ(-315deg)";
        docProps.otherChatOptionOpened = true;

        defaultButton.forEach(element => {
            element.style.display = "none";
        })

        
        otherButton.forEach(element =>{
            element.style.display = "block";
        })

        setTimeout(()=>{

            otherButton.forEach((element, index) =>{
                element.style.animationName = "pushAnimate";
                element.style.animationDelay = (index * 0.1) + "s";
                element.style.opacity = "1";
            })

        }, 10)

    }

}

function showImageShowCase(imageDir, count){
    var showCaseContainer = document.querySelector(".image-show-case"),
        showCaseImage = document.querySelector(".image-show-case .image-show-case-content img"),
        showCaseLoader = document.querySelector(".image-show-case .image-show-case-content .loader"),
        counterContainer = document.querySelector(".image-show-case .image-show-case-footer .stats .present-count");

    showCaseContainer.style.display = "block";
    counterContainer.innerText = (count + 1);
    
    setTimeout(()=>{
        showCaseContainer.style.opacity = "1"
        showCaseImage.src = imageDir;
        hideChat()

        showCaseImage.addEventListener("load", ()=>{
            // console.log("worked");
            showCaseLoader.style.opacity = "0";
            showCaseImage.style.opacity = "1";
        })
    }, 50)


}

function closeImageShowCase(){

    var showCaseContainer = document.querySelector(".image-show-case"),
        showCaseImage = document.querySelector(".image-show-case .image-show-case-content img"),
        showCaseLoader = document.querySelector(".image-show-case .image-show-case-content .loader");

        showCaseContainer.style.opacity = "0";
        showChat();

        setTimeout(()=>{
            showCaseContainer.style.display = "none";
            showCaseImage.src = "",
            showCaseLoader.style.opacity = "1";
            showCaseImage.style.opacity = "0";
        }, 1000)

}

function hideChat(){
    var chatHeader = document.querySelector(".chats .contact-header"),
        chatContent = document.querySelector(".chats .chat-content"),
        chatForm = document.querySelector(".chats .chat-form");

        chatHeader.style.opacity = "0";
        chatContent.style.opacity = "0";
        chatForm.style.opacity = "0";
}

function showChat(){

    var chatHeader = document.querySelector(".chats .contact-header"),
        chatContent = document.querySelector(".chats .chat-content"),
        chatForm = document.querySelector(".chats .chat-form");

        chatHeader.style.opacity = "1";
        chatContent.style.opacity = "1";
        chatForm.style.opacity = "1";

}

