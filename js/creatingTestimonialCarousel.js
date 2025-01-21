TestCardWrap = document.querySelector(".figureWrap");
TestCard1 = document.querySelector("#testimonialBlock");

for(let i = 0; i < 3; i++){
 let TestCardClone = TestCard1.cloneNode(true);
 TestCardClone.classlist.add(`TestCard${i}`, testcard)
 TestCardWrap.appendChild(TestCardClone)
}

