let body = document.querySelector("body");
let testCardWrap = body.querySelector(".figureWrap")
let testCard = testCardWrap.querySelector(".testimonialcard")

for(i=0;i<5;i++){
  testCardClone = testCard.cloneNode(true)
  testCardClone.id = "testCard"&{i}
  testCardWrap.append(testCardClone)
}