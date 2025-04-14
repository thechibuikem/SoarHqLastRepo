let body = document.querySelector("body");
let cardsWrapper = body.querySelector("#event-grid");
let eventCardsArray = [
  {
    // card 1,
    image: "../images/eventImages/soarHqDiscipleshipProgram.webp",
    title: "Soar HQ Discipleship Program 1.0",
    description:
      "Soar HQ is a 24-week journey equipping women through faith, identity, encounters, and purpose for impactful, spirit-led transformation",
    date: "October - April 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Virtual",
  },
  {
    // card 2
    image: "../images/eventImages/healingToTheNations.webp",
    title: "Annual Visionary Vigil",
    description:
      "Annual Visionary Vigil is a mountain of divine encounters, healing, vision, and Kingdom-aligned blueprints..",
    date: "29th December 2024",
    time: "11:30 PM",
    location: "Virtual",
  },
  {
    // card 3
    image: "../images/eventImages/whenWomenPray.webp",
    title: "When Women Pray",
    description:
      "When women pray is a  quarterly spiritual boot camp for nation-nurturing women.",
    date: "29th December 2024",
    time: " 11:30 PM",
    location: "Virtual",
  },
  {
    // card 4
    image: "../images/eventImages/socialImpactEffectiveness.webp",
    title: "Social Impact Effectiveness",
    description:
      "Social Impact Effectiveness is an activation—an awakening to the leadership competencies essential for driving impact across every field",
    date: "22nd February 2025",
    time: "7:00 PM",
    location: "Virtual",
  },
];

eventCardsArray.forEach((e) => {
  let card = document.createElement("div");
  card.classList.add("event-card");
  card.innerHTML = `
     <div class="event-image-container">
              <img src="${e.image}" alt="${e.title}" class="event-image" />
              <h3>${e.title}</h3>
            </div>

            <div class="event-content">
              <h3 class="event-title">${e.title}</h3>
              <p class="event-description">${e.description}</p>
              <div class="event-details">
                <div class="event-detail">
                  <i class="far fa-calendar"></i>
                  <span>${e.date}</span>
                </div>
                <div class="event-detail">
                  <i class="far fa-clock"></i>
                  <span>${e.time}</span>
                </div>
                <div class="event-detail">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${e.location}</span>
                </div>
              </div>
            </div>

            <div class="event-footer">
              <button class="btn btn-outline">Register</button>
            </div>


 `;

  cardsWrapper.prepend(card);
});

body.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-outline")) {
    alert("This event is expired");
  } else if (e.target.classList.contains("btn-back")) {
    window.location.href = "upcomingEvents.html";
  }
});
