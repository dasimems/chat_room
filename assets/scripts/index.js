"use strict";

function showMessage(messageDetails){
    var body = document.querySelector("body"),
        messageContainer = document.createElement("div"),
        messageTextContainer = document.createElement("p");

    return new Promise((resolve, reject)=>{


        messageContainer.style.transition = "1s ease all";
    
        messageContainer.setAttribute("class", "message");
        
        if(typeof(messageDetails) === "object" && messageDetails !== null){
    
            if(messageDetails.type && messageDetails.message){
    
                if(messageDetails.type === "success"){
                    messageTextContainer.setAttribute("class" , "success");
                }else{
                    messageTextContainer.setAttribute("class", "error");
        
                }
        
                
                
                messageTextContainer.innerText = messageDetails.message;
                messageContainer.appendChild(messageTextContainer)
    
                if(body.appendChild(messageContainer)){

                    resolve("Message made successfully")

                    setTimeout(()=>{
        
                        messageContainer.style.top = "-" + (messageContainer.clientHeight + 20) + "px";
                        
                        setTimeout(()=>{
        
                            body.removeChild(messageContainer);
        
                        }, 1200)
        
                    }, 3000)


                }else{
                    reject("Unable to append message")
                }
    
            }else{

                reject("Object details failed to have the type and message value")
            }
    
        }else{

            reject("Non object details provided")
        }

    })

}

// showMessage({type: "error", message: "This is an error message"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

