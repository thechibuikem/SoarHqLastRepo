let returnHomeBtn = document.querySelector("#homeBtn");
let goHome = () => {
  window.location = "index.html"
};
returnHomeBtn.addEventListener("click",goHome);