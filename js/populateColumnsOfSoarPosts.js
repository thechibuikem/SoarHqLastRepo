// getting and declaring my variables
let body = document.querySelector("body");
let column1 = document.getElementById("ElibraryBlockOfBlocksColumnId");//the first column containing blocks of figure elements
let columnWrapper = body.querySelector("#ElibraryBlockOfBlocksWrap");

// getting the first figure block from my soar post collection
let columnFigure1 = column1.querySelector("#postFigure1");
console.log(columnFigure1);


// cloning the first to get two extra new blocks

for (
  let i = 0; i< 8; i++
){
let columnFigureCloned = columnFigure1.cloneNode(true);
column1.appendChild(columnFigureCloned);
}


// addind the two extra blocks to my column of figure posts

// adding my new cloumn to get two extra columns
// let column2 = column1.cloneNode(true);
// let column3 = column1.cloneNode(true);

// adding the two extra columns to my column collection wrapper
columnWrapper.append(column2,column3);