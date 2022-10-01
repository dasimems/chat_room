"use strict";

var docProps = {
    menuOpened: false,
    otherChatOptionOpened: false,
    mediaBoxOpened: false,
    mediaBoxOpenedNum: 0,
    selectedChats: [],
    selectActive: false,
    contextMenuActive: false,
    contextMenuTimeout: 10,
    replyActive: false,
    editActive: false,
    previouslyTypedMessage: "",
    forwardActive: false,
    forwardText: "",
    chatMenuOpened: false
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
        friendListOpenCloseBtn = All(".friend-list-container .container-title"),
        contextMenuLinks = All(".context-menu-link"),
        headerActionBtn = All(".select-header-action-btn"),
        selectHeaderTitle = Ele(".chat-content-header .chat-select-header .total-chat-selected .count"),
        cancelReplyEditContent = Ele(".cancel-reply-edit"),chatReplyEditContainer = Ele(".chat-reply-edit-content"),
        inputBox = Ele(".chat-form .input-box"),
        emojiContainer = Ele(".chats .chat-emojis"),
        chatFormContainer = Ele(".chat-form"),
        chatMenuLinks = All(".chat-menu-container ul li"),
        chatHeaderBtn = All(".chat-header-icon ul li button");

    headerButton.addEventListener("click", menu);
    otherThingsButton.addEventListener("click", openContent);
    showCaseImageCloseButton.addEventListener("click", closeImageShowCase);
    prevImageBtn.addEventListener("click", showPrevImage);
    nextImageBtn.addEventListener("click", showNextImage);

    counterContainer.innerText = mediaImage.length;

    //this is the code to enlarge the images in the profile tab or section
    mediaImage.forEach((images, index)=>{
        images.addEventListener("click", (e)=>{
            // console.log(e.target.src);
            showImageShowCase(e.target.src, index);
        });
    })

    //this is the code to open and close the friend list accordion
    friendListOpenCloseBtn.forEach((element)=>{
        element.addEventListener("click", ()=>{
            if(element.hasAttribute("data-link")){
                var linkName = element.getAttribute("data-link");
                openFriends(linkName)
                
            }
        })
    })

    //this is the code to switch between the menu links
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


    //this is the code to bring out the chat contextmenu
    

    chatElement.forEach((element)=>{

        
        element.addEventListener("click", (e)=>{
            // console.dir(element)
            var posX = (e.x + 10),
                posY = (e.y + 10);

            // var posX = e.layerX,
            //     posY = element.offsetTop;
        


            if(docProps.selectActive){

                
                if(docProps.selectedChats.includes(element)){
                    
                    element.style.background = "transparent";

                    docProps.selectedChats = docProps.selectedChats.filter(selectedElements => selectedElements !== element);

                }else{
                    
                    docProps.selectedChats.push(element);
                    element.style.background = "rgba(0, 0, 0, .1)";
                }

                selectHeaderTitle.innerText = docProps.selectedChats.length;

                if(docProps.selectedChats.length < 1){
                    disableSelectChatHeader();
                }

                // console.log(docProps.selectedChats);

            }else{

               

                
                if(docProps.contextMenuActive){

                    chatElement.forEach((el)=>{

                        el.style.background = "transparent";
        
                    })

                    emojiReaction.forEach((element, index) => {
                        element.style.animationName = "";
                        element.style.animationDelay = "unset";
                    })
                    hideContextMenu();
                    docProps.selectActive = false;
                    docProps.selectedChats = [];
                    
                }else{
                    docProps.selectedChats = [element];

                    emojiReaction.forEach((element, index) => {
                        element.style.animationName = "pushAnimate";
                        element.style.animationDelay = (0.04 * index) + "s";
                    })
                    
                    element.style.background = "rgba(0, 0, 0, .1)"
                    
                    

                    showContextMenu(posX, posY);
                    
                }
            }



            // console.log(docProps.selectedChats);


        })

    })

    emojiOpenBtn.addEventListener("click", ()=>{
        hideContextMenu();
        removeSelectedChatBackground();
    })

    //code to performaction when context menu links are clicked
    contextMenuLinks.forEach(element => {

        element.addEventListener("click", ()=>{

            if(element.getAttribute("data-action")){

                perFormContextMenuActions(element.getAttribute("data-action"))
            }
        })
    })

    headerActionBtn.forEach(element => {

        element.addEventListener("click", ()=>{

            if(element.getAttribute("data-action")){

                perFormContextMenuActions(element.getAttribute("data-action"))
            }
        })
    })

    cancelReplyEditContent.addEventListener("click", closeReplyEditTextBox);

    inputBox.addEventListener("input", ()=>{
        chatReplyEditContainer.style.bottom = chatFormContainer.getBoundingClientRect().height + "px"
        emojiContainer.style.bottom = chatFormContainer.getBoundingClientRect().height + "px";
        chatReplyEditContainer.style.transition = "none";
    })

    chatMenuLinks.forEach(element => {


        element.addEventListener("click", ()=>{

            if(element.getAttribute("data-action")){
                performChatMenuActions(element.getAttribute("data-action"));
            }
        })
    })

    chatHeaderBtn.forEach(element => {


        element.addEventListener("click", ()=>{

            if(element.getAttribute("data-action")){
                performChatHeaderActions(element.getAttribute("data-action"));
            }
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

function performChatHeaderActions(action){

    switch (action) {
        case "chat-menu":
            if(docProps.chatMenuOpened){

                closeChatHeaderMenu()

            }else{

                openChatHeaderMenu();

            }
            
            break;
    
        default:
            break;
    }

}

function openChatHeaderMenu(){
    var chatMenuBox = Ele(".chat-menu-container"),
        chatMenuOpenIcon = Ele(".chat-header-icon ul li button .open-icon"),
        chatMenuCloseIcon = Ele(".chat-header-icon ul li button .close-icon");

    chatMenuBox.style.display = "block";
    chatMenuOpenIcon.style.transform = "rotateZ(-5760deg)";
    
    setTimeout(()=>{
        chatMenuOpenIcon.style.display = "none";
        chatMenuOpenIcon.style.transform = "rotateZ(0deg)";
        chatMenuCloseIcon.style.display = "block";

    }, 600)
    
    setTimeout(()=>{

        chatMenuBox.style.opacity = "1";

    }, 50)

    docProps.chatMenuOpened = true;



}

function closeChatHeaderMenu(){
    var chatMenuBox = Ele(".chat-menu-container"),
        chatMenuOpenIcon = Ele(".chat-header-icon ul li button .open-icon"),
        chatMenuCloseIcon = Ele(".chat-header-icon ul li button .close-icon");

    chatMenuBox.style.opacity = "0";

    setTimeout(()=> {
        chatMenuBox.style.display = "none";
        chatMenuCloseIcon.style.display = "none";
        chatMenuOpenIcon.style.display = "block";
    }, 600)



    docProps.chatMenuOpened = false;
    
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

        // chatElement.forEach((element)=>{
        //     element.style.background = "transparent";
        // })

        // docProps.selectedChats = [];
        // docProps.selectActive = false;

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

function switchChatHeaders(headerType){
    var headers = All(".chat-content-header .contact-header"),
        chatHeader = Ele(".chat-content-header .contact-chat-header"),
        settingsHeader = Ele(".chat-content-header .chat-settings-header"),
        selectHeader = Ele(".chat-content-header .chat-select-header");

    headers.forEach(element => {
        element.style.opacity = "0";

        setTimeout(()=>{
            element.style.display = "none";

        }, 600)
    })


    setTimeout(()=>{

        switch (headerType) {
            case "chat":
                chatHeader.style.display = "flex";
                
                setTimeout(()=>{
                    chatHeader.style.opacity = "1";

                }, 50)
                
                break;

            case "select":
                selectHeader.style.display = "flex";
                
                setTimeout(()=>{
                    selectHeader.style.opacity = "1";

                }, 50)

                break;
            case "settings":
                settingsHeader.style.display = "flex";
                
                setTimeout(()=>{
                    settingsHeader.style.opacity = "1";

                }, 50)
                break;
        
            default:
                chatHeader.style.display = "flex";
                
                setTimeout(()=>{
                    chatHeader.style.opacity = "1";

                }, 50)
                break;
        }

    }, 600)
}

function openChatModal(properties){
    if(properties && typeof(properties) === "object"){
        var modalText = "",
            acceptFunc,
            rejectFunc = closeChatModal,
            modal = Ele(".chats .chat-modal"),
            modalContent = Ele(".chats .chat-modal .chat-modal-content"),
            modalContentText = Ele(".chats .chat-modal .chat-modal-content p"),
            modalContentAccept = Ele(".chats .chat-modal .chat-modal-content .accept-btn"),
            modalContentReject = Ele(".chats .chat-modal .chat-modal-content .reject-btn");

        if(properties.text){
            modalText = properties.text;
        }

        if(properties.accept){
            acceptFunc = properties.accept;
        }

        if(properties.reject){
            rejectFunc = properties.reject;
        }

        if(properties.text && properties.accept){
            
            modal.style.display = "block";
            modalContentText.innerText = modalText;
            modalContentAccept.onclick = ()=>{
                acceptFunc();
            }
            modalContentReject.onclick = ()=>{
                rejectFunc();
            }

            setTimeout(()=>{
                modal.style.opacity = "1";
                modalContent.style.marginTop = "2px";

            }, 50)



        }


    }
}

function removeSelectedChatBackground(){

    var chatElement = All(".chat-element");

    chatElement.forEach(element=>{
        element.style.background = "transparent";
    })

    docProps.selectedChats = [];


}

function closeChatModal(){
    var modal = Ele(".chats .chat-modal"),
        modalContent = Ele(".chats .chat-modal .chat-modal-content"),
        modalContentText = Ele(".chats .chat-modal .chat-modal-content p"),
        modalContentAccept = Ele(".chats .chat-modal .chat-modal-content .accept-btn"),
        modalContentReject = Ele(".chats .chat-modal .chat-modal-content .reject-btn"),
        chatElement = All(".chat-element");

        modalContent.style.marginTop = "-50px";
        modal.style.opacity = "0";

        setTimeout(()=>{
            modalContentText.innerText = "";
            modalContentAccept.onclick = ()=>{
                return;
            }

            modalContentReject.onclick = ()=>{
                return;
            }
            modal.style.display = "none";


        }, 600)
        docProps.selectedChats = [];
        
        chatElement.forEach(element=>{
            element.style.background = "transparent";
        })

        // console.log(docProps.selectedChats)
}

function disableSelectChatHeader(){

    var selectHeaderTitle = Ele(".chat-content-header .chat-select-header .total-chat-selected .count")

    selectHeaderTitle.innerText = 1;
    docProps.selectActive = false;
    removeSelectedChatBackground();
    switchChatHeaders();


}

function deleteChatElement(){
    var chatParentElement = Ele(".chats .chat-content .chat-details-container"),
        chatParentChildren = [...chatParentElement.children]

    if(docProps.selectedChats.length > 0){

        docProps.selectedChats.forEach(element => {

            if(chatParentChildren.includes(element)){
                
                chatParentElement.removeChild(element);
                closeChatModal();
                
            }



        })



    }

    showMessage({
        type: "success",
        message: "Chat deleted successfully"
    })

    // console.log(docProps.selectedChats)

    disableSelectChatHeader();

}

function openReplyEditTextBox(props){
    var container = Ele(".chat-reply-edit-content"),
        containerText = Ele(".chat-reply-edit-content .reply-edit-content-message"),
        containerEditIcon = Ele(".chat-reply-edit-content .reply-edit-content-header .edit-icon"),
        containerReplyIcon = Ele(".chat-reply-edit-content .reply-edit-content-header .reply-icon"),
        containerHeaderText = Ele(".chat-reply-edit-content .reply-edit-content-header .text"),
        inputBox = Ele(".chat-form .input-box"),
        chatFormContainer = Ele(".chat-form");

    if(props && typeof(props) === "object" && props.action && props.message){

        if(docProps.editActive || docProps.replyActive){

            containerText.innerText = props.message;
            container.style.transition = "0.5s ease all";
            
            if(props.action === "edit"){
                inputBox.innerText = props.message;
                containerHeaderText.innerText = "Editing message";
                containerEditIcon.style.display = "inline";
                containerReplyIcon.style.display = "none";
            }else{

                inputBox.innerText = "";
                containerHeaderText.innerText = "Replying to";
                containerEditIcon.style.display = "none";
                containerReplyIcon.style.display = "inline";

            }

            container.style.bottom = chatFormContainer.getBoundingClientRect().height + "px";
            container.style.display = "block";
            inputBox.focus();

            setTimeout(()=>{
                container.style.opacity = "1";
            }, 50)
    
        }
    }

}

function closeReplyEditTextBox(){

    var container = Ele(".chat-reply-edit-content"),
        containerText = Ele(".chat-reply-edit-content .reply-edit-content-message"),
        containerEditIcon = Ele(".chat-reply-edit-content .reply-edit-content-header .edit-icon"),
        containerReplyIcon = Ele(".chat-reply-edit-content .reply-edit-content-header .reply-icon"),
        containerHeaderText = Ele(".chat-reply-edit-content .reply-edit-content-header .text"),
        inputBox = Ele(".chat-form .input-box"),
        chatFormContainer = Ele(".chat-form");

        container.style.transition = "0.5s ease all";

        inputBox.focus();

        setTimeout(()=>{

            container.style.opacity = "0";
    
            inputBox.innerText = docProps.previouslyTypedMessage;
            docProps.previouslyTypedMessage = "";
            docProps.editActive = false;
            docProps.replyActive = false;
    
            setTimeout(()=>{
                container.style.display = "none";
                containerText.innerText = "";
                containerHeaderText.innetText = "";
                containerEditIcon.style.display = "none";
                containerReplyIcon.style.display = "none";
                container.style.bottom = chatFormContainer.getBoundingClientRect().height + "px";
    
                container.style.transition = "none";
                
            }, 600)
        }, 50)

        removeSelectedChatBackground();

}

function perFormContextMenuActions(action){
    hideContextMenu();
    var textToCopy = "",
        inputBox = Ele(".chat-form .input-box");


    switch(action){

        case "copy":
            docProps.selectedChats.forEach(elements => {
                var chatBoxChildren = [...elements.children];

                chatBoxChildren.forEach(ele => {
                    // console.log(ele)

                    if(ele.classList.contains("chat-text")){

                        var newChildren = [...ele.children];

                        newChildren.forEach(elem => {
                            if(elem.classList.contains("chat-text-details")){
                                var chatsChildren = [...elem.children];

                                chatsChildren.forEach(chat => {
                                    if(chat.tagName === "P"){
                                        // console.log(chat.innerText);
                                        textToCopy += chat.innerText + `
`;

                                    }
                                })

                                // console.log(elem.children)
                            }
                        })


                    }
                })


            })



            if(navigator.clipboard.writeText(textToCopy)){
                showMessage({
                    type: "success",
                    message: "Chat Copied!"
                })

            }else{
                showMessage({
                    type: "error",
                    message: "Unable to copy chats"
                })


            }

            removeSelectedChatBackground();
            
            if(docProps.selectActive){
                switchChatHeaders();
                docProps.selectActive = false;


            }

            break;

        case "edit":

            docProps.editActive = true;
            docProps.selectedChats.forEach(elements => {
                var chatBoxChildren = [...elements.children];

                chatBoxChildren.forEach(ele => {
                    // console.log(ele)

                    if(ele.classList.contains("chat-text")){

                        var newChildren = [...ele.children];

                        newChildren.forEach(elem => {
                            if(elem.classList.contains("chat-text-details")){
                                var chatsChildren = [...elem.children];

                                chatsChildren.forEach(chat => {
                                    if(chat.tagName === "P"){
                                        // console.log(chat.innerText);
                                        docProps.previouslyTypedMessage = inputBox.innerText;
                                        openReplyEditTextBox({
                                            action: "edit",
                                            message: chat.innerText
                                        }) 

                                    }
                                })

                                // console.log(elem.children)
                            }
                        })


                    }
                })


            })


            break;

        case "select":
            docProps.selectActive = true;
            switchChatHeaders("select");
            // console.log(docProps.selectedChats);
            break;

        case "delete":

            if(docProps.selectedChats.length > 0){
                var chatType = docProps.selectedChats.length > 1? "chats" : "chat";
                openChatModal({
                    text: "Are you sure you want to delete this " + chatType,
                    accept: deleteChatElement
                })


            }


            break;

        case "reply":

            docProps.replyActive = true;
            docProps.selectedChats.forEach(elements => {
                var chatBoxChildren = [...elements.children];

                chatBoxChildren.forEach(ele => {
                    // console.log(ele)

                    if(ele.classList.contains("chat-text")){

                        var newChildren = [...ele.children];

                        newChildren.forEach(elem => {
                            if(elem.classList.contains("chat-text-details")){
                                var chatsChildren = [...elem.children];

                                chatsChildren.forEach(chat => {
                                    if(chat.tagName === "P"){
                                        // console.log(chat.innerText);
                                        docProps.previouslyTypedMessage = inputBox.innerText;
                                        openReplyEditTextBox({
                                            action: "reply",
                                            message: chat.innerText
                                        }) 

                                    }
                                })

                                // console.log(elem.children)
                            }
                        })


                    }
                })


            })

            break;

        case "forward":

            break;

        case "report":
            
            break;
        case "removeSelectHeader":
            disableSelectChatHeader();

            break;
        default:
            break;
    }

    console.log(docProps.selectedChats);
}

function performChatMenuActions(action){

    switch (action){

        case "":

            break;

        default:
            break;
    }

}

function addReactionToChat(reaction){

}
