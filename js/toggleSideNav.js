// declaring my elements
let sideNavActivateBtn = document.getElementById("inviNav");

let sideNavDectivateBtn = document.getElementById("cancel");

let sideNavBar = document.getElementById("navBarRight");


// declaring functions to add classes that would hide and remove sidenav
let addClass = () => {
  sideNavBar.classList.add(`showsideNav`)
};

let removeClass = () =>{
  sideNavBar.classList.remove(`showsideNav`);
}





// adding event listeners for the tripple panel button
sideNavActivateBtn.addEventListener("click", addClass);


// adding event listeners for the canceel button
sideNavDectivateBtn.addEventListener("click", removeClass);