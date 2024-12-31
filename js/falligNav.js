// initializing my variables
let firstDown = document.getElementById("firstDown"); //rotating buttons
let firstDownShow = document.getElementById("firstDownShow"); //the container
let navBar = document.getElementById("nav-bar"); //navbar

// initailizing boolean variables
let firstDownShowisHover = false;
let firstDownisHover = false;
// let firstDownisHover = false;
let navBarHov = false;

//function to show and display the block
let showdrop = () => {
  firstDownShow.style.display = "block";
};
let hidedrop = () => {
  firstDownShow.style.display = "none";
};

// functions to update the bool variables
let updatebool = (firstDownisHover) => {
  firstDownisHover = true;
};

// Event listeners for hovering the button
firstDown.addEventListener("mouseover", showdrop);
firstDown.addEventListener("mouseout", hidedrop);

// event listeners to update booleans on hover
firstDown.addEventListener("mouseover", updatebool(firstDownisHover));

// let firstDownisHover = false;

navBar.addEventListener("mouseover", updatebool(navBarHov));

firstDownShow.addEventListener("mouseover", updatebool(firstDownShowisHover));

if (firstDownisHover && navBarHov && firstDownShowisHover) {
  showdrop();
} 
else hidedrop();
