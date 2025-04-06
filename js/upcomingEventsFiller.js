let body = document.querySelector("body");
let cardsWrapper = body.querySelector("#event-grid");
let eventCardsArray = [
  {
    // card 1,
    image: "../images/eventImages/InternationalWomensDay.webp",
    title: "When women Pray",
    description:
      "Join us for a day of inspiring talks, workshops, and networking opportunities",
    date: "April 20, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "New York City, NY",
    formLink:
      `https://docs.google.com/forms/d/e/1FAIpQLSdukhq3RcjCIhn4znY4-_Ce_CFcofz5d9o3Pzhlizyqx6GN8w/viewform?usp=sharing`,
  },
  {
    // card 2
    image: "../images/eventImages/TechSummit2025.webp",
    title: "Tech Summit 2025",
    description:
      "Explore the latest trends in technology with industry leaders and innovators.",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdukhq3RcjCIhn4znY4-_Ce_CFcofz5d9o3Pzhlizyqx6GN8w/viewform?usp=sharing",

  },
  {
    // card 3
    image: "../images/eventImages/HealthWellnessExpo.webp",
    title: "Health & Wellness Expo",
    description:
      "Discover ways to improve your health and well-being with expert advice and activities.",
    date: "June 10, 2025",
    time: "11:00 AM - 4:00 PM",
    location: "Austin, TX",
formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdukhq3RcjCIhn4znY4-_Ce_CFcofz5d9o3Pzhlizyqx6GN8w/viewform?usp=sharing",
  },
  {
    // card 4
    image: "../images/eventImages/ArtFestival.webp",
    title: "Art Festival 2025",
    description:
      "Celebrate creativity with art exhibitions, live performances, and workshops.",
    date: "July 25, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "Chicago, IL",
formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdukhq3RcjCIhn4znY4-_Ce_CFcofz5d9o3Pzhlizyqx6GN8w/viewform?usp=sharing",
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
              <button class="btn btn-outline" onclick="window.location.href = '${e.formLink}'">Register</button>
            </div>


 `;

  cardsWrapper.prepend(card);
});

body.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("btn-back")) {
    window.location.href = "allEvents.html";
  }
});
