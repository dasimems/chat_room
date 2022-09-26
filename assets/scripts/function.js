"use strict";

function Ele(elementSelector){

    return document.querySelector(elementSelector);

}

function All(elementSelector){

    return document.querySelectorAll(elementSelector);

}

function getContent(linkDetails, res){

    if(linkDetails && typeof(linkDetails) === "object" && linkDetails !== null){

        var xmlhttp,
            link,
            method = "GET",
            contentType = "application/x-www-form-urlencoded";

        if(linkDetails.method){
            method = linkDetails.method;
        }

        if(linkDetails.contentType){
            contentType = linkDetails.contentType;
        }

        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        if(linkDetails.link){
            link = linkDetails.link;
                    
                xmlhttp.open("GET", link, true);
                xmlhttp.setRequestHeader("Content-type", contentType);
                xmlhttp.send();

                    xmlhttp.onreadystatechange = async function() {
                        if (xmlhttp.status == 200) {
                            var returnedRes = await xmlhttp.responseText;
                            res("success" ,returnedRes);
                        }else{
                            res("error" ,"unknown error occured" + " status code: " + xmlhttp.status);

                        }
                    };
                    
            
        }else{
            res("error" ,"Object key 'link' not provided to the parameters sent")
        }

    }else{
        res("error" ,"Empty parameter or parameter is not a type of object")
    }

}

function newElement(elementDetails){

    var container,
        elementStyle,
        elementAttribute,
        styleKeys = [],
        combinedStyles = "",
        attributeKeys = [],
        attributeValues = [],
        elementType = "div"


    if(elementDetails && typeof(elementDetails) === "object"){

        if(elementDetails.type){

            elementType = elementDetails.type;
        }


        container = document.createElement(elementType);

        if(elementDetails.styles && typeof(elementDetails.styles) === "object"){

            elementStyle = elementDetails.styles;
            styleKeys = Object.keys(elementDetails.styles);


            styleKeys.forEach((styles)=>{
                combinedStyles += styles+ ":" + elementStyle[styles] + "; ";
                
            })

        }

        if(elementDetails.attributes && typeof(elementDetails.attributes) === "object"){

            elementAttribute = elementDetails.attributes;
            attributeKeys = Object.keys(elementDetails.attributes);
            attributeValues = Object.values(elementDetails.attributes);

            attributeKeys.forEach((attributes, index)=>{
                // console.log(attributes)
                container.setAttribute(attributes, attributeValues[index]);
                
            })
        }

        container.setAttribute("style", combinedStyles)

        // console.log(Object.values(elementDetails.attributes))

        

    }else{

        container = document.createElement(elementType);

    }

    return container;

}

// console.log(newElement({
//     styles: {
//         width: "30px",
//         height: "30px"
//     },
//     attributes: {
//         "data-url": "leave",
//         class: "name"
//     }
// }));




