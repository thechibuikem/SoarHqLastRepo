// initializing my variables
let firstDown = document.getElementById("firstDown"); //rotating buttons
let firstDownShow = document.getElementById("firstDownShow");//the container
let navBar = document.getElementById("nav-bar"); //navbar

// initailizing boolean variables
let firstDownShowisHover = false;
let firstDownisHover = false;


//function to show and display the block
let showdrop = () => {
  firstDownShow.style.display = "block";
};
let hidedrop = () => {
  firstDownShow.style.display = "none";
};


// functions to update the bool variables
let updatebool = (firstDownisHover) => {
  firstDownShowisHover = true;
};


// Event listeners for hovering the button
firstDown.addEventListener("mouseover", showdrop);
firstDown.addEventListener("mouseout", hidedrop);


// event listeners to update booleans on hover
firstDown.addEventListener("mouseover", updatebool(firstDownisHover));
