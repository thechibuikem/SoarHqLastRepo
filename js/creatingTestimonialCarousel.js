let TestCardWrap = document.querySelector(".figureWrap");
let TestCard1 = document.querySelector("#testimonialBlock");

for(let i = 0; i < 3; i++){
 let TestCardClone = TestCard1.cloneNode(true);
 TestCardClone.classList.add(`TestCard${i}`, `testcard`)
 TestCardWrap.appendChild(TestCardClone)
}

