"use strict";

var docProps = {
    menuOpened: false,
    otherChatOptionOpened: false,
    mediaBoxOpened: false,
    mediaBoxOpenedNum: 0
}

window.addEventListener("load", ()=>{
    var headerButton = Ele(".header-button"),
        otherThingsButton = document.getElementById("add-item"),
        mediaImage = All(".media-content-cards .media .media-image img"),
        showCaseImageCloseButton = Ele(".image-show-case .image-show-case-header #close-image-show-case-btn"),
        counterContainer = Ele(".image-show-case .image-show-case-footer .stats .total-count"),
        prevImageBtn = document.getElementById("prev-image-btn"),
        nextImageBtn = document.getElementById("next-image-btn");

    headerButton.addEventListener("click", menu);
    otherThingsButton.addEventListener("click", openContent);
    showCaseImageCloseButton.addEventListener("click", closeImageShowCase);
    prevImageBtn.addEventListener("click", showPrevImage);
    nextImageBtn.addEventListener("click", showNextImage);

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
    }else{
        openMenu();
    }

}

function openMenu(){
    var openButtonTopIcon = All(".open-button #first-btn"),
        openButtonMiddleicon = All(".open-button #second-btn"),
        openButtonBottomIcon = All(".open-button   #third-btn"),
        closeButton = All(".close-button"),
        closeButtonFirsticon = All(".close-button #first-btn"),
        closeButtonSecondicon = All(".close-button #second-btn"),
        menuContainer = Ele(".chat-menu"),
        contactNameHeader = Ele(".contact-name-header-info"),
        contactName = Ele(".contact-chats");

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
    docProps.menuOpened = true;

}

function closeMenu(){

    var openButtonTopIcon = All(".open-button #first-btn"),
        openButtonMiddleicon = All(".open-button #second-btn"),
        openButtonBottomIcon = All(".open-button   #third-btn"),
        closeButton = All(".close-button"),
        closeButtonFirsticon = All(".close-button #first-btn"),
        closeButtonSecondicon = All(".close-button #second-btn"),
        menuContainer = Ele(".chat-menu"),
        contactNameHeader = Ele(".contact-name-header-info"),
        contactName = Ele(".contact-chats");

        

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


    docProps.menuOpened = false;

}

function openContent(){
    var addItemButton = document.getElementById("add-item"),
        defaultButton = All(".default-chat-content"),
        otherButton = All(".other-chat-content");

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
    var showCaseContainer = Ele(".image-show-case"),
        showCaseImage = Ele(".image-show-case .image-show-case-content img"),
        showCaseLoader = Ele(".image-show-case .image-show-case-content .loader"),
        counterContainer = Ele(".image-show-case .image-show-case-footer .stats .present-count"),
        imageNameContainer = Ele(".image-show-case .image-show-case-header .image-name"),
        splittedName = imageDir.split("/");

    showCaseContainer.style.display = "block";
    counterContainer.innerText = (count + 1);
    docProps.mediaBoxOpenedNum = count;

    imageNameContainer.innerText = splittedName[(splittedName.length - 1)];

    // console.log(splittedName)

    
    setTimeout(()=>{
        showCaseContainer.style.opacity = "1"
        showCaseImage.src = imageDir;
        hideChat()

        showCaseImage.addEventListener("load", ()=>{
            // console.log("worked");
            showCaseLoader.style.opacity = "0";
            showCaseImage.style.opacity = "1";
        })

        // console.log(docProps.mediaBoxOpenedNum);
    }, 50)


}

function closeImageShowCase(){

    var showCaseContainer = Ele(".image-show-case"),
        showCaseImage = Ele(".image-show-case .image-show-case-content img"),
        showCaseLoader = Ele(".image-show-case .image-show-case-content .loader");

        showCaseContainer.style.opacity = "0";
        showChat();

        setTimeout(()=>{
            showCaseContainer.style.display = "none";
            showCaseImage.src = "",
            showCaseLoader.style.opacity = "1";
            showCaseImage.style.opacity = "0";
            docProps.mediaBoxOpenedNum = 0;
        }, 1000)



}

function hideChat(){
    var chatHeader = Ele(".chats .contact-header"),
        chatContent = Ele(".chats .chat-content"),
        chatForm = Ele(".chats .chat-form");

        chatHeader.style.opacity = "0";
        chatContent.style.opacity = "0";
        chatForm.style.opacity = "0";
}

function showChat(){

    var chatHeader = Ele(".chats .contact-header"),
        chatContent = Ele(".chats .chat-content"),
        chatForm = Ele(".chats .chat-form");

        chatHeader.style.opacity = "1";
        chatContent.style.opacity = "1";
        chatForm.style.opacity = "1";

}

function showNextImage(){
    var mediaImage = All(".media-content-cards .media .media-image img"),
        imageContainer = Ele(".image-show-case .image-show-case-content img"),
        counterContainer = Ele(".image-show-case .image-show-case-footer .stats .present-count"),
        newNum = (docProps.mediaBoxOpenedNum  + 1),
        imageNum = (docProps.mediaBoxOpenedNum + 1),
        pageNum = (docProps.mediaBoxOpenedNum + 2),
        imageNameContainer = Ele(".image-show-case .image-show-case-header .image-name"),
        splittedName;

        if(docProps.mediaBoxOpenedNum >= (mediaImage.length - 1)){
            imageNum = 0;
            newNum = 0;
            pageNum = 1;

        }

        if(docProps.mediaBoxOpenedNum === mediaImage.length){

            imageNum = 1;
            newNum = 1;
            pageNum = 2;

        }


    imageContainer.src = mediaImage[imageNum].src;
    splittedName = mediaImage[imageNum].src.split("/");
    imageNameContainer.innerText = splittedName[(splittedName.length - 1)];

    counterContainer.innerText = (pageNum);
    

    docProps.mediaBoxOpenedNum = parseInt(newNum);

    if((newNum + 1) === (mediaImage.length)){
        docProps.mediaBoxOpenedNum = -1;

    }

    // console.log(newNum);

    

}

function showPrevImage(){

    var mediaImage = All(".media-content-cards .media .media-image img"),
        imageContainer = Ele(".image-show-case .image-show-case-content img"),
        counterContainer = Ele(".image-show-case .image-show-case-footer .stats .present-count"),
        newNum = (docProps.mediaBoxOpenedNum  - 1),
        imageNum = (docProps.mediaBoxOpenedNum - 1),
        pageNum = docProps.mediaBoxOpenedNum,
        imageNameContainer = Ele(".image-show-case .image-show-case-header .image-name"),
        splittedName;

        if(docProps.mediaBoxOpenedNum <= 0){
            imageNum = (mediaImage.length - 1);
            newNum = (mediaImage.length - 1);
            pageNum = mediaImage.length;

        }
        
        if(docProps.mediaBoxOpenedNum === -1){

            imageNum = (mediaImage.length - 2);
            newNum = (mediaImage.length - 2);
            pageNum = (mediaImage.length - 1);

        }

    imageContainer.src = mediaImage[imageNum].src;
    splittedName = mediaImage[imageNum].src.split("/");
    imageNameContainer.innerText = splittedName[(splittedName.length - 1)]

    counterContainer.innerText = (pageNum);
    

    docProps.mediaBoxOpenedNum = parseInt(newNum);

    if(newNum === 0){
        docProps.mediaBoxOpenedNum = parseInt(mediaImage.length);

    }

    // console.log(newNum);

}

