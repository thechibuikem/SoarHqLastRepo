const filler = [
  {
    id:1,
    image:"images/girl.svg",
    name:"fransisca",
    testimonial:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eveniet nulla ea nihil animi saepe alias illum nobis quidem sit."
  },
  {
    id:2,
    image:"images/girl.svg",
    name:"fransisca",
    testimonial:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eveniet nulla ea nihil animi saepe alias illum nobis quidem sit."
  } ,
   {
    id:3,
    image:"images/girl.svg",
    name:"fransisca",
    testimonial:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eveniet nulla ea nihil animi saepe alias illum nobis quidem sit."
  },
  {
    id:4,
    image:"images/girl.svg",
    name:"fransisca",
    testimonial:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eveniet nulla ea nihil animi saepe alias illum nobis quidem sit."
  }
]
;
filler.forEach(item => {
  slideList[0]
})


let TestCardWrap = document.querySelector(".figureWrap");
// card 1 declaration
let TestCard1 = document.querySelector("#testimonialBlock");

for (let i = 0; i < 3; i++) {
  let TestCardClone = TestCard1.cloneNode(true);
  TestCardClone.classList.add(`TestCard${i}`, `testcard`);
  TestCardWrap.appendChild(TestCardClone);
}

// declaration of the essentials
let slideCon = document.querySelectorAll(".invi");
// getting array of slides from html collection
let slideList = Array.from(slideCon);
let clickCount = 0;


slideList[1].style.backgroundColor = "red"
slideList[2].style.backgroundColor = "orange"
slideList[3].style.backgroundColor = "yellow"



lButton = document.querySelector("#left");
rButton = document.querySelector("#right");

// function to hide every single element in the array
function hideall() {
  for (i = 0; i < slideList.length; i++) {
    slideList[i].style.display = "none";
  }
}
// function to display just one element in the array
let showOne = () => {
    slideList[clickCount].style.display = "flex";
  }

hideall()
showOne()

let leftClick = () => {
hideall()

clickCount--;
if (clickCount < 0){
  clickCount = slideList.length - 1};
showOne();

}


let rightClick = () => {
hideall();
  clickCount++;
  if (clickCount > slideList.length - 1
  )
  {clickCount = 0};
showOne()
  }





  lButton.addEventListener("click",leftClick)
rButton.addEventListener("click",rightClick)

// hideall();
