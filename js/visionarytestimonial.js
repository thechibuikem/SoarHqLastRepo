let body = document.querySelector("body");
let testCardWrap = body.querySelector(".figureWrap")
let testCard = testCardWrap.querySelector(".testimonialcard")

for(i=0;i<5;i++){
  testCardClone = testCard.cloneNode(true)
  testCardClone.id = `testCard${i}`
  testCardWrap.append(testCardClone)
}

let testCardList = body.querySelectorAll(".testimonialcard")

let testCardArray = Array.from(testCardList)

let changeTest1Content = () =>{
  testCardArray[3].querySelector("h4").textContent = 'I just concluded my discipleship call with the steward, Excellent Nancy, and it was truly transformative. I used the word "transformative" because just a few minutes before the call, I was feeling down, there is a power outage, it left my laptop unusable. I have important tasks to complete to meet upcoming timelines, and I was also troubled by some family issues. However, joining the call opened my eyes to hope and strengthened me by the grace of God. During our conversation, Excellent Nancy shared some of her undergraduate experiences, which resonated deeply with me. I left the call feeling uplifted and strengthened in God&apos;s word; I even received insights to share with my twin sister.I am continually grateful for this community of Godliness and excellence.God bless you, Excellent Nancy; may you receive more of God&apos;s grace ma.God bless us all!'
}

changeTest1Content()