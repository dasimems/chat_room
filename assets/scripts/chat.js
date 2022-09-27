"use strict";

var docProps = {
    menuOpened: false,
    otherChatOptionOpened: false,
    mediaBoxOpened: false,
    mediaBoxOpenedNum: 0,
    selectedChats: [],
    selectActive: false,
    contextMenuActive: false,
    contextMenuTimeout: 10
}

window.addEventListener("load", ()=>{
    var headerButton = Ele(".header-button"),
        otherThingsButton = document.getElementById("add-item"),
        mediaImage = All(".media-content-cards .media .media-image img"),
        showCaseImageCloseButton = Ele(".image-show-case .image-show-case-header #close-image-show-case-btn"),
        counterContainer = Ele(".image-show-case .image-show-case-footer .stats .total-count"),
        prevImageBtn = document.getElementById("prev-image-btn"),
        nextImageBtn = document.getElementById("next-image-btn"),
        chatElement = All(".chat-element"),
        emojiReaction = All(".reaction-emoji"),
        emojiOpenBtn = Ele(".emoji-btn"),
        linkButtons = All(".menu-links"),
        friendListOpenCloseBtn = All(".friend-list-container .container-title");

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
        });
    })

    friendListOpenCloseBtn.forEach((element)=>{
        element.addEventListener("click", ()=>{
            if(element.hasAttribute("data-link")){
                var linkName = element.getAttribute("data-link");
                openFriends(linkName)
                
            }
        })
    })

    linkButtons.forEach((element)=>{
        element.addEventListener("click", ()=>{
            if(element.hasAttribute("data-url")){

                var linkName = element.getAttribute("data-url");
                openLink(linkName);


            }

        })
    })

    window.addEventListener("contextmenu", (e)=>{
        e.preventDefault();

    })


    

    chatElement.forEach((element)=>{

        
        element.addEventListener("click", (e)=>{
            // console.dir(element)
            var posX = (e.x + 10),
                posY = (e.y + 10);

            // var posX = e.layerX,
            //     posY = element.offsetTop;
        


            if(props.selectActive){

                docProps.selectedChats.push(element);

            }else{

                docProps.selectedChats = [element];

                
                if(docProps.contextMenuActive){
                    chatElement.forEach((el)=>{
                        el.style.background = "transparent";
        
                    })

                    emojiReaction.forEach((element, index) => {
                        element.style.animationName = "";
                        element.style.animationDelay = "unset";
                    })
                    hideContextMenu();
                    
                }else{

                    emojiReaction.forEach((element, index) => {
                        element.style.animationName = "pushAnimate";
                        element.style.animationDelay = (0.04 * index) + "s";
                    })
                    
                    element.style.background = "rgba(0, 0, 0, .1)"
                    showContextMenu(posX, posY);
                }
            }



            // console.log(docProps.selectActive);


        })

    })

    emojiOpenBtn.addEventListener("click", ()=>{
        hideContextMenu();
    })




})

function menu(){

    if(docProps.menuOpened){
        closeMenu();
    }else{
        openMenu();
    }

}

function openLink(linkName){

    // console.log(linkName);
    var containers = All(".contact-name-container"),
        linkContainer,
        defaultContainer = Ele(".side-container-recent");


        
    if(linkName !== "logout"){

        containers.forEach(element => {
            element.style.display = "none";
        })

        linkContainer = Ele(".side-container-" + linkName);

        if(linkContainer){
            linkContainer.style.display = "block"

        }else{
            defaultContainer.style.display = "block";
        }
    }else{

        window.location = "./index.html";

    }

    closeMenu();

}

function openFriends(friendContainerType){
    // console.log(friendContainerType);

    var containers = All(".friend-list-container .container-content"),
    containerTitle = All(".friend-list-container .container-title"),
        containerToOPenOrClose;

    if(friendContainerType){
        containerToOPenOrClose = Ele(".friend-list-container .app-friends-" + friendContainerType);

        if(containerToOPenOrClose){

            if(containerToOPenOrClose.clientHeight > 0){

                containerToOPenOrClose.style.height = "0px";

                containerTitle.forEach(element => {
                    // console.log(element);

                    if(element.getAttribute("data-link") === friendContainerType){

                        var elementChildren = [...element.children];

                        elementChildren.forEach(element => {
                            var icons = [];
                            if(element.classList.contains("icon")){

                                icons = [...icons, ...element.children];

                                icons.forEach(ele => {
                                    ele.style.opacity = "0";

                                    if(ele.classList.contains("open-icon")){
                                        ele.style.opacity = "1";
                                    }
                                })

                                // console.log(icons);
                            }
                        })
                    }
                })

                
            }else{

                containerTitle.forEach(element => {
                    // console.log(element);

                    if(element.getAttribute("data-link") === friendContainerType){

                        var elementChildren = [...element.children];

                        elementChildren.forEach(element => {
                            var icons = [];
                            if(element.classList.contains("icon")){

                                icons = [...icons, ...element.children];

                                icons.forEach(ele => {
                                    ele.style.opacity = "0";

                                    if(ele.classList.contains("close-icon")){
                                        ele.style.opacity = "1";
                                    }
                                })

                                // console.log(icons);
                            }
                        })
                    }
                })
                
                containerToOPenOrClose.style.height = containerToOPenOrClose.scrollHeight + "px";
            }

            containers.forEach((element)=>{

                
        
                if(!element.classList.contains("app-friends-" + friendContainerType)){
                    
                    element.style.height = "0px";
                }
            })
        }

        // console.dir(containerToOPenOrClose);
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
        contactNameContainer = Ele(".contact-name-contents");

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
    contactNameContainer.style.opacity = "0";

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
        contactNameContainer = Ele(".contact-name-contents");

        

        closeButtonFirsticon.forEach(element => {
            element.style.top = "100%";
            element.style.left = "0%";
            
        });

        closeButtonSecondicon.forEach(element => {
            element.style.top = "100%";
            element.style.left = "100%";
            
        });


        menuContainer.style.left = "-350px";
        contactNameContainer.style.opacity = "1";

        
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

function showContextMenu(x, y){
    var posX = 100,
        posY = 100,
        contextMenu = Ele(".chat-context-menu"),
        contextMenuLinks = All(".chat-context-menu .context-menu ul li");

    if(x){
        posX = x;
    }

    if(y){
        posY = y;
    }

    contextMenu.style.display = "block";

    if((window.innerHeight - posY ) < contextMenu.clientHeight){
        posY = posY - (contextMenu.clientHeight + 10);
    }

    if((window.innerWidth - posX ) < contextMenu.clientWidth){
        posY = posX - (contextMenu.clientWidth + 10);
    }
    // console.dir((window.innerHeight - posY) + ":" + (contextMenu.clientHeight))

    contextMenu.style.top = posY + "px";
    contextMenu.style.left = posX + "px";
    contextMenu.style.transition = "0.5s ease all";

    setTimeout(()=>{
        contextMenu.style.opacity = "1";

        contextMenuLinks.forEach((element, index)=>{
            setTimeout(()=>{
                element.style.opacity = "1";
                // console.log(element);
                
            }, (docProps.contextMenuTimeout * index))

        })

        setTimeout(()=>{
            docProps.contextMenuActive = true;

        }, ((contextMenuLinks.length - 1) * docProps.contextMenuTimeout))

    }, 50)


    

}

function hideContextMenu(){
    var contextMenu = Ele(".chat-context-menu"),
        contextMenuLinks = All(".chat-context-menu .context-menu ul li"),
        chatElement = All(".chat-element");

        chatElement.forEach((element)=>{
            element.style.background = "transparent";
        })

        docProps.selectedChats = [];
        docProps.selectActive = false;

        contextMenuLinks.forEach((element, index)=>{
            var timeOutSec = ((index - (contextMenuLinks.length - 1)) * -1)
            // console.log(timeOutSec)
            setTimeout(()=>{
                element.style.opacity = "0";
                // console.log(element);
                
            }, (docProps.contextMenuTimeout * timeOutSec))
        })

        setTimeout(()=>{

            contextMenu.style.opacity = "0";
            
            setTimeout(()=>{
                
                contextMenu.style.top = "0px";
                contextMenu.style.left = "0px";
                contextMenu.style.display = "none";
                setTimeout(()=>{

                    contextMenu.removeAttribute("style");
                    docProps.contextMenuActive = false;

                }, 50)
            }, 500)

        }, ((contextMenuLinks.length - 1) * docProps.contextMenuTimeout))

}

