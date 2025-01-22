let TestCardWrap = document.querySelector(".figureWrap");
let TestCard1 = document.querySelector("#testimonialBlock");

for(let i = 0; i < 3; i++){
 let TestCardClone = TestCard1.cloneNode(true);
 TestCardClone.classList.add(`TestCard${i}`, `testcard`)
 TestCardWrap.appendChild(TestCardClone)
}

// declaration of the essentials
let slideCon = document.getElementsByClassName("arrange");
let n = 0//n is representing the index of the first element in the array
let clickCount = 0;
lButton = document.getElementById("left");
rButton = document.getElementById("right");

// getting array of slides from html collection
let slideList = Array.from(slideCon);


// function to hide every single element in the array
function hideall(){
for(i=0; i<slideList.length; i++)
  
  { slideList[i].style.display="none"}
};



function showOne(n)
{


  for (i=0; i< slideList.length; i++) {
    slideList[n].style.display = "block"
  }

}

rButton.addEventListener("click", function (n) {
  return n++;
});


showOne()
hideall()




