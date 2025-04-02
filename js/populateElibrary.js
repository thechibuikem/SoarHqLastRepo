console.clear();

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
    datePublished: "",
    folderName: "sexualPurity",
  },
  // book2
  {
    imageSrc: "books/theCall/1.webp",
    bookTitle: "The Call",
    bookDescription: "",
    authorsName: "Nancy Chukwuemeka",
    authorsImageSrc: "/images/nancysoar.webp",
    datePublished: "",
    folderName: "theCallDynamic",
  },
  // book3
  {
    imageSrc: "books/jireh/1.webp",
    bookTitle: "Jireh",
    bookDescription: "",
    authorsName: "Nancy Chukwuemeka",
    authorsImageSrc: "/images/nancysoar.webp",
    datePublished: "",
    folderName: "jirehDynamic",
  },
];

// getting the first figure block from my soar post collection
let columnFigure1 = column1.querySelector("#postFigure1");

let booksArray = [];
booksArray = [columnFigure1];
// cloning the first to get two extra new blocks
let columnFigureCloned;
for (let i = 2; i < booksFillerArray.length + 1; i++) {
  columnFigureCloned = columnFigure1.cloneNode(true);
  columnFigureCloned.setAttribute("id", `postFigure${i}`);
  column1.appendChild(columnFigureCloned);
  booksArray.push(columnFigureCloned);
}

// creating array that would house my soar posts
// let booksArray = Array.from(document.querySelectorAll(".ElibraryPostFigure"));

// temporarily hide book3
// let hiddenBook = booksArray[2];
// hiddenBook.style.display = "none";
// the for each statement that does the dynamic manipulation
booksArray.forEach((element, index) => {
  //private variable declaration
  let image = element.querySelector(".imagePart img");
  let title = element.querySelector(".textPart h3");
  let bookDesc = element.querySelector(".textPart h4");
  let authors = element.querySelector(".textPartLast h5");
  let authorsImage = element.querySelector(".textPartLast img");
  // let date = element.querySelector(".textPartLast #hideH5");

  // manipulating the private variables
  if (image) image.src = booksFillerArray[index].imageSrc;
  if (title) title.textContent = booksFillerArray[index].bookTitle;
  if (bookDesc) bookDesc.innerHTML = booksFillerArray[index].bookDescription;
  if (authors) authors.innerHTML = booksFillerArray[index].authorsName;
  if (authorsImage) authorsImage.src = booksFillerArray[index].authorsImageSrc;
  // if (date) date.innerHTML = booksFillerArray[index].datePublished;
  element.dataset.file = booksFillerArray[index].folderName;
});

booksArray.forEach((element) => {
  // the event llistener
  element.addEventListener("click", () => {
    window.location.href = `https://soarhqvercel.vercel.app/real3dflipbookplugin/examples/${element.dataset.file}.html`;
  });
});

// console.log(bookName);
