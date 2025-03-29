// getting and declaring my variables
let body = document.querySelector("body");
let column1 = document.getElementById("ElibraryBlockOfBlocksColumnId"); //the first column containing blocks of figure elements
let columnWrapper = body.querySelector("#ElibraryBlockOfBlocksWrap");
// creating array of objects that would dynamically change the contents of trybook
const booksFillerArray = [
  // book1
  {
    imageSrc: "books/sexualPurity/1.webp",
    bookTitle: "Sexual Purity",
    bookDescription: "",
    authorsName: "Nancy Chukwuemeka",
    authorsImageSrc: "/images/nancysoar.webp",
    datePublished: "• 20 April 2007",
  },
  // book2
  {
    imageSrc: "/books/theCall/1.webp",
    bookTitle: "The Call",
    bookDescription: "",
    authorsName: "Nancy Chukwuemeka",
    authorsImageSrc: "/images/nancysoar.webp",
    datePublished: "• 20 April 2007",
  },
  // book3
  {
    imageSrc: "",
    bookTitle: "",
    bookDescription: "",
    authorsName: "",
    authorsImageSrc: "",
    datePublished: "• 20 April 2007",
  },
];

// getting the first figure block from my soar post collection
let columnFigure1;
columnFigure1 = column1.querySelector("#postFigure1");
console.log(columnFigure1);

// cloning the first to get two extra new blocks
let columnFigureCloned;
for (let i = 2; i < 4; i++) {
  columnFigureCloned = columnFigure1.cloneNode(true);
  columnFigureCloned.setAttribute("id", `postFigure${i}`);
  column1.appendChild(columnFigureCloned);
}

// creating array that would house my soar posts
let booksArray = Array.from(document.querySelectorAll(".ElibraryPostFigure"));


// temporarily link the call i.e book 2
const changePage = () =>{
  window.location =
    "https://soarhqvercel.vercel.app/real3dflipbookplugin/examples/theCall.html";
}
let theCall = booksArray[1];
theCall.addEventListener("click",changePage);

// temporarily hide book3
let hiddenBook = booksArray[2]
hiddenBook.style.display="none"
// the for each statement that does the dynamic manipulation
booksArray.forEach((element, index) => {
  //private variable declaration
  let image = element.querySelector(".imagePart img");
  let title = element.querySelector(".textPart h3");
  let bookDesc = element.querySelector(".textPart h4");
  let authors = element.querySelector(".textPartLast h5");
  let authorsImage = element.querySelector(".textPartLast img");
  let date = element.querySelector(".textPartLast #hideH5");

  // manipulating the private variables
  if (image) image.src = booksFillerArray[index].imageSrc;
  if (title) title.textContent = booksFillerArray[index].bookTitle;
  if (bookDesc) bookDesc.textContent = booksFillerArray[index].bookDescription;
  if (authors) authors.textContent = booksFillerArray[index].authorsName;
  if (authorsImage) authorsImage.src = booksFillerArray[index].authorsImageSrc;
  if (date) date.textContent = booksFillerArray[index].datePublished;
});

// console.log(booksArray);
