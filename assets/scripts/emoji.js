"use strict";

var props = {
    emojis: [],
    emojiOpened: false,
    emojiCategories: []
}

function showEmojiContainer(){
    var emojiParentContainer = Ele(".chat-emojis .emoji-contents");

    emojiParentContainer.scrollTo({
        top: 0,
        left: 0
    })

    



    if(props.emojiOpened){

        hideContainer();



    }else{

        showContainer();

        
    }

}

function showContainer(){
    var emojiContainer = Ele(".chat-emojis"),
    emojiSearchInput = Ele("#search-emoji");

    emojiContainer.style.display = "block";

        setTimeout(()=>{
            emojiContainer.style.opacity = "1";
            emojiSearchInput.value = "";
            emojiSearchInput.focus();
            outputEmoji();
        }, 50)

        props.emojiOpened = true;


}

function hideContainer(){

    var emojiContainer = Ele(".chat-emojis");

    var emojiContainer = Ele(".chat-emojis");

    emojiContainer.style.opacity = "0";
        
        setTimeout(()=>{

            emojiContainer.style.display = "none";

        }, 600)
        
        props.emojiOpened = false;

}

function typeEmoji(e){
    var inputContainer = Ele(".input-box"),
        emojiContent = e.target,
        emojiValue = "",
        inputValue = inputContainer.innerText,
        end = inputValue.length;

        if(emojiContent.hasAttribute("data-emoji")){
            emojiValue = emojiContent.getAttribute("data-emoji");
        }
    inputContainer.innerText = inputValue + emojiValue;
    // inputContainer.setSelectionRange(end, end);
    
    var s = window.getSelection()
    var r = document.createRange()
    r.setStart(inputContainer, 1)
    r.setEnd(inputContainer, 1)
    s.removeAllRanges()
    s.addRange(r)
    inputContainer.focus();
    // console.log(e)



}

function searchEmoji(value){
    var reg = new RegExp(value),
    filteredEmoji = props.emojis.filter((emoji)=> {
        var emojiString  = "";

        emoji.tags.forEach((tag)=>{
            emojiString += tag;

        })

        emoji.aliases.forEach((tag)=>{
            emojiString += tag;

        })

        // console.log(emojiString)

        return(
            reg.test(emojiString)
            
        )
    });


    outputEmoji(filteredEmoji);
    // console.log(filteredEmoji)

}

function outputEmoji(emojiList){
    var emojiParentContainer = Ele(".chat-emojis .emoji-contents"),
        emojiArr = props.emojis;

    if(emojiList && Array.isArray(emojiList)){
        emojiArr = emojiList
        
    }
    emojiParentContainer.innerHTML = "";


    props.emojiCategories.forEach((category)=>{

        var emojiContainer = newElement({
                    
                attributes: {
                    class: "emojis"
                }
            }),
            emojiTitle = newElement({

                type: "h2",
                    
                attributes: {
                    class: "emoji-category"
                }
            }),
            emojiContent = newElement({

                    
                attributes: {
                    class: "emoji-container"
                }
            }),
            filteredEmoji = filterEmoji(category, emojiArr);

            filteredEmoji.forEach((emojis)=>{
                
                var { emoji, description } = emojis;
                var emojiElement = newElement({

                    type: "span",
                    attributes: {
                        class: emoji,
                        "data-emoji": emoji,
                        "data-description": description,
                        title: description
                    }
                })

                // console.log(emojiElement);

                emojiElement.addEventListener("click", typeEmoji);
                emojiElement.innerText = emoji;
                emojiContent.appendChild(emojiElement)
            })


        emojiTitle.innerText = category;




        emojiContainer.appendChild(emojiTitle);
        emojiContainer.appendChild(emojiContent);

        if(filteredEmoji.length > 0){
            emojiParentContainer.appendChild(emojiContainer);

        }


        // console.log(emojiContent);


    })


    

}

function filterEmoji(emojiCategory, emojiList){

    var newEmoji = props.emojis;

    if(emojiList && Array.isArray(emojiList)){
        newEmoji = emojiList;

        // console.log(newEmoji)
    }

    if(emojiCategory){
        newEmoji = newEmoji.filter(emoji => emoji.category === emojiCategory)

    }
    return newEmoji;

}

window.addEventListener("load", ()=>{
    var emojiOpenBtn = Ele(".emoji-btn"),
        emojiSearchInput = Ele("#search-emoji"),
        chatBoxInput = Ele(".input-box"),
        chatElement = All(".chat-element");

    getContent({
        link: "./assets/data/emoji.json",
        contentType: "application/json"

    }, (status, res)=>{

        if(status === "success"){
            var catArr = [];

            
            if(res !== ""){
                var emoji = JSON.parse(res);

                if(Array.isArray(emoji)){

                    props.emojis = emoji;
                    // console.log(emoji);
    
                    emoji.forEach((emojis)=>{

                        if(catArr.includes(emojis.category)){
                            return
                        }

                        catArr.push(emojis.category);
    
    
                    })

                    props.emojiCategories = catArr;
                    outputEmoji();

                    // searchEmoji("happy")
                    

                    // console.log(filterEmoji("Smileys & Emotion"))

                    // console.log(props.emojiCategories)


                }
                
            }
        }
    })

    emojiOpenBtn.addEventListener("click", showEmojiContainer);
    emojiSearchInput.addEventListener("input", (e)=>{
        searchEmoji(e.target.value);
    })

    chatElement.forEach((element)=>{
        element.addEventListener("click", ()=>{
            hideContainer();
        })

    })

    chatBoxInput.addEventListener("click", hideContainer)
    chatBoxInput.addEventListener("keypress", hideContainer)

})