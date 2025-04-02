// getting my dependencies
const body = document.querySelector("body");
const meetSlidingFlex = body.querySelector(".meetOurTeamLayer");
const meetCard1 = meetSlidingFlex.querySelector(".meetOurTeamFigure");

// creating array of objects that would house array contents
const meetCardsArrayFiller = [
  // object1
  {
    image: "images/nancysoar.webp",
    Name: "Nancy Chukwuemeka",
    role: "Steward, Soar HQ",
  },

  // object2
  {
    image: "images/chisomSoar.webp",
    Name: "Excellent Ugochi Oguikpe",
    role: "Steward, Soar HQ",
  },
  // object3
  {
    image: "images/giftSoar.webp",
    Name: "Excellent Gift Nwose",
    role: "Public Relations Manager",
  },
  // object4
  {
    image: "images/chinazaSoar.webp",
    Name: "Excellent Chinaza Okoye",
    role: "media and communication managerPublic Relations Manager",
  },
  // object5
  {
    image: "images/adaezesoar.webp",
    Name: "Adaeze Chukwuma",
    role: " Executor, Light Podcast",
  },
];

for (let i = 2; i < 6; i++) {
  const meetCardClone = meetCard1.cloneNode(true);
  meetCardClone.setAttribute("id", `meetFigure${i}`);

  meetSlidingFlex.append(meetCardClone);
}

const meetCardsArray = Array.from(
  meetSlidingFlex.querySelectorAll(".meetOurTeamFigure")
);

meetCardsArray.forEach((element, index) => {
  let name = element.querySelector(".figureGrp2 h4");
  let role = element.querySelector(".figureGrp2 #role");
  let image = element.querySelector(".figureGrp1 .meetImg");

  if (name) name.textContent = meetCardsArrayFiller[index].Name;
  if (role) role.textContent = meetCardsArrayFiller[index].role;
  if (image) image.src = meetCardsArrayFiller[index].image;
});

// event listeners to control the animation of the sliding flex
// mouseover event
meetSlidingFlex.addEventListener("mouseover", (e) => {meetSlidingFlex.classList.toggle("pauseAnimation");})

// click event
meetSlidingFlex.addEventListener("click", (e) => {
  meetSlidingFlex.classList.toggle("pauseAnimation");
});
// mouseout event
meetSlidingFlex.addEventListener("mouseout", (e) => {
  meetSlidingFlex.classList.remove("pauseAnimation");
});

// event listeners to control the grayscale on the cards
// mouseover event
meetCardsArray.forEach((element)=>{
  element.addEventListener("mouseover", (e) => {
    element.classList.toggle("turnCardGrey");
  });
})

// // click event
// meetCardsArray.forEach((element) => {
//   element.addEventListener("click", (e) => {
//     element.classList.toggle("turnCardGrey");
//   });
// });
// // mouseout event
// meetCardsArray.forEach((element) => {
//   element.addEventListener("mouseout", (e) => {
//     element.classList.toggle("turnCardGrey");
//   });});
