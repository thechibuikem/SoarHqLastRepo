// getting my dependencies
const body = document.querySelector("body");
const meetSlidingFlexWrap = body.querySelector(".meetOurTeamWrap");
const meetSlidingFlex = body.querySelector(".meetOurTeamLayer");
// const meetCard1 = meetSlidingFlex.querySelector(".meetOurTeamFigure");

// creating array of objects that would house array contents
const meetCardsArray = [
  // object1
  {
    id: 1,
    image: "images/meetOurTeam/nancysoar.webp",
    Name: "Nancy Chukwuemeka",
    role: "Steward, Soar HQ",
  },

  // object2
  {
    id: 2,
    image: "images/meetOurTeam/chisomSoar.webp",
    Name: "Excellent Ugochi Oguikpe",
    role: "Executive Assistant <br> Administrative Manager",
  },
  // object3
  {
    id: 3,
    image: "images/meetOurTeam/giftSoar.webp",
    Name: "Excellent Gift Nwose",
    role: "Public Relations Manager",
  },
  // object4
  {
    id: 4,
    image: "images/meetOurTeam/chinazaSoar.webp",
    Name: "Excellent Chinaza Okoye",
    role: "media and communication manager",
  },
  // object5
  {
    id: 5,
    image: "images/meetOurTeam/adaezesoar.webp",
    Name: "Adaeze Chukwuma",
    role: " Executor, Light Podcast",
  },

  // object6
  {
    id: 6,
    image: "images/meetOurTeam/janeSoar.webp",
    Name: "Jane Daniel",
    role: " Executor, Social Media Engagement.",
  },
];


// creating the meet elements
meetCardsArray.forEach((e) => {
  let meetCard = document.createElement("figure");
  meetCard.classList.add("meetOurTeamFigure");
  meetCard.setAttribute("id", `meetFigure${e.id}`);

  // initializing the element
  meetCard.innerHTML = `
              <div class="figureGrp1">
                <img src="${e.image}" class="meetImg" alt="${e.Name}"/>
              </div>
              <div class="figureGrp2">
                <h4>${e.Name}</h4>
                <h3 id="role">${e.role}</h3>
              </div>
`;
meetSlidingFlex.appendChild(meetCard);
});

let meetSlidingFlex2 = meetSlidingFlex.cloneNode(true);

// meetSlidingFlexWrap.appendChild(meetSlidingFlex2);
console.log(meetSlidingFlex2);

meetSlidingFlex2Array = Array.from(
  meetSlidingFlex2.children)

  meetSlidingFlex2Array.forEach((e) =>{
    meetSlidingFlex.appendChild(e)
  })




























// event listeners to control the animation of the sliding flex
// mouseover event
meetSlidingFlex.addEventListener("mouseover", (e) => {
  meetSlidingFlex.classList.toggle("pauseAnimation");
});

// click event
meetSlidingFlex.addEventListener("click", (e) => {
  meetSlidingFlex.classList.toggle("pauseAnimation");
});
// mouseout event
meetSlidingFlex.addEventListener("mouseout", (e) => {
  meetSlidingFlex.classList.remove("pauseAnimation");
});
