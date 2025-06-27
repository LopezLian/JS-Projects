const weatherAPIKey="9ca3f8434a26fe82e3119b44d7411196";
const weatherAPIURL=`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

function menuHandler(){
document.getElementById("open-nav-menu").addEventListener("click",function(){
    document.querySelector("header nav .wrapper").classList.add("nav-open");
});
document.querySelector("#close-nav-menu").addEventListener("click",function(){
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
});
}
function tempConverter(celc){
    return (celc*9/5)+32;

}
function greetingHandler(){
    let greeting;
    let hrs=new Date().getHours();
    if(hrs<12){
        greeting="Good Morning!";
    }
    else if(hrs<17){
        greeting="Good Afternoon!";
    }
    else if(hrs<24){
        greeting="Good Evening!";
    }
    else{
        greeting="Welcome!";
    }

    document.querySelector("#greeting").innerHTML=greeting;


}
function timeHandler(){
    setInterval(function(){
         let currtime=new Date();
    document.querySelector("span[data-time=hours]").textContent=currtime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent=currtime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent=currtime.getSeconds().toString().padStart(2,"0");

    },1000);
   
}
function galleryHandler(){
    const galleryImages=[
        {
            src:"./assets/gallery/image1.jpg",
            alt:"Thumbnail for image 1"
        },
         {
            src:"./assets/gallery/image2.jpg",
            alt:"Thumbnail for image 2"
        },
         {
            src:"./assets/gallery/image3.jpg",
            alt:"Thumbnail for image 3"
        },
        {
            src:"./assets/gallery/img1.png",
            alt:"Thumbnail for image 4"
        }

    ]

    let mainImage=document.querySelector("#gallery > img");
    mainImage.src=galleryImages[0].src;
    mainImage.alt=galleryImages[0].alt;

    let thumbnails=document.querySelector("#gallery .thumbnails");

    galleryImages.forEach(function(image,index){
        let thumb=document.createElement("img");
        thumb.src=image.src;
        thumb.alt=image.alt;
        thumb.dataset.arrayIndex=index;
        thumb.dataset.selected=index===0;

        thumb.addEventListener("click",function(e){
            let selectedIndex=e.target.dataset.arrayIndex;
            let selectedImage=galleryImages[selectedIndex];
            mainImage.src=selectedImage.src;
            mainImage.alt=selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected=false;
            })
            e.target.dataset.selected=true;

        })

        thumbnails.appendChild(thumb);
        
    })

    

}
function populateProducts(productList){
    let productSection=document.querySelector(".products-area");
    productSection.textContent="";

    
    productList.forEach(function(product,index){
        let productElm=document.createElement("div");
        productElm.classList.add("product-item");
            let productImage=document.createElement("img");
            productImage.src=product.image;
            productImage.alt=product.title;
          
            let productDetails=document.createElement("div");
            productDetails.classList.add("product-details");
                let productTitle=document.createElement("h3");
                productTitle.classList.add("product-title");
                productTitle.textContent=product.title;
                let productAuthor=document.createElement("p");
                productAuthor.classList.add("product-author");
                productAuthor.textContent=product.author;
                let productPtext=document.createElement("p");
                productPtext.classList.add("price-title");
                productPtext.textContent="Price";
                let productPrice=document.createElement("p");
                productPrice.classList.add("product-price");
                productPrice.textContent= product.price>0 ? "$"+product.price.toFixed(2):"Free";

                productDetails.append(productTitle);
                productDetails.append(productAuthor);
                productDetails.append(productPtext);
                productDetails.append(productPrice);
            productElm.append(productImage);
            productElm.append(productDetails);
        productSection.append(productElm);
    });

}
function productHandler(){
    productItems=[
    
      {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 95,
      image: "./assets/products/img4.png"
    }
  ]
 
    let paidItems=productItems.filter(function(product){
        return product.price>0;
    })

    let freeItems=productItems.filter(function(product){
        return !product.price || product.price<=0;
    })

    //Displaying filtered lengths
    let totalLength=productItems.length;
    let paidLength=paidItems.length;
    let freeLength=freeItems.length;
    document.querySelector(".products-filter label[for=all] .product-amount").textContent=totalLength;
    document.querySelector(".products-filter label[for=paid] .product-amount").textContent=paidLength;
    document.querySelector(".products-filter label[for=free] .product-amount").textContent=freeLength;

    populateProducts(productItems); //On Load show all items

    //Filtering for paid and free products
    document.querySelector(".products-filter").addEventListener("click",function(e){
        if(e.target.id==="all"){
            
            populateProducts(productItems);
        }
        else if(e.target.id==="paid"){
            populateProducts(paidItems);
        }
        else if(e.target.id==="free"){
            populateProducts(freeItems);
        }

        });
}
function footerHandler(){
    let fullyear=new Date().getFullYear();
    document.querySelector("footer").textContent=`\xa9 ${fullyear}-ALL RIGHTS RESERVED`;
}
function weatherHandler(){

navigator.geolocation.getCurrentPosition(position=>{
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;
    let url= weatherAPIURL
                .replace("{lat}",lat)
                .replace("{lon}",lon)
                .replace("{API key}",weatherAPIKey);
    fetch(url)
     .then(response=>response.json())
      .then(data=>{
        console.log(data);
        const weatherCondition=data.weather[0].description;
        const userLocation=data.name;
        const temp=data.main.temp;
        console.log(temp,userLocation);
    

    const celcText= `The weather is ${weatherCondition} in ${userLocation} and its ${temp.toFixed(2).toString()}°C outside`;
    const fahrText= `The weather is ${weatherCondition} in ${userLocation} and its ${tempConverter(temp).toFixed(2).toString()}°F outside`;
    document.querySelector("p#weather").innerHTML=celcText;
    
    document.querySelector(".greeting-section .left-side .weather-group")
    .addEventListener("click",function(e){
        
        if (e.target.id==="fahr"){
            
           document.querySelector("p#weather").innerHTML=fahrText; 
        }
        else if(e.target.id==="celsius"){
            document.querySelector("p#weather").innerHTML=celcText;
            
        }
    });

}).catch((err)=>{
    document.querySelector("p#weather").innerHTML="Unable to retrieve weather info. Try again later!";

});
      
});
}




menuHandler();
greetingHandler();
timeHandler();
galleryHandler();
productHandler();
footerHandler();
weatherHandler();