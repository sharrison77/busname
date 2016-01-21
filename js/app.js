'use strict';

var allProducts = [];
var totalClicks = 0;
//object constructor
function Products(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
  //pushes instances into allProducts Array
  allProducts.push(this);
}

//new instances
var bag = new Products('bag', 'product/bag.jpg');
var banana = new Products('banana', 'product/banana.jpg');
var boots = new Products('boots', 'product/boots.jpg');
var chair = new Products('chair', 'product/chair.jpg');
var cthulu = new Products('cthulhu', 'product/cthulhu.jpg');
var dragon = new Products('dragon', 'product/dragon.jpg');
var pen = new Products('pen', 'product/pen.jpg');
var scissors = new Products('scissors', 'product/scissors.jpg');
var shark = new Products('shark', 'product/shark.jpg');
var sweep = new Products('sweep', 'product/sweep.png');
var unicorn = new Products('unicorn', 'product/unicorn.jpg');
var usb = new Products('usb', 'product/usb.gif');
var watercan = new Products('water can', 'product/water-can.jpg');
var wineglass = new Products('wine glass', 'product/wine-glass.jpg');

function initializeLocalStorage() {
  for (var k = 0; k < allProducts.length; k++){
    var numClickToTest = localStorage.getItem(allProducts[k].productName + 'NumClicks');
    if (numClickToTest) {
      allProducts[k].numClicks = parseInt(numClickToTest);
    } else {
      localStorage.setItem(allProducts[k].productName + 'NumClicks', allProducts[k].numClicks);
    }

    var numDisplayToTest = localStorage.getItem(allProducts[k].productName + 'NumDisplays');
    if (numDisplayToTest) {
      allProducts[k].numDisplays = parseInt(numDisplayToTest);
    } else {
      localStorage.setItem(allProducts[k].productName + 'NumDisplays', allProducts[k].numDisplays);
    }
  }
}
initializeLocalStorage();

//declaring a function for random numbers(to represent products in Array)
function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

//the sequential arrangement of the products
var image1index = 0;
var image2index = 0;
var image3index = 0;


var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');

//50: declaring a function to display 3 different random images
//51: image1index will equal product that is pulls from randomProduct function
//52. img1.src from HTML = allProducts[image1index] is already assigned an array number position and .filePath pulls the image from the directory
function displayThreeImages() {
  image1index = randomProduct();
  img1.src = allProducts[image1index].filePath;
  //numDisplay will keep track of numbers the image was displayed
  allProducts[image1index].numDisplays += 1;
  localStorage.setItem(allProducts[image1index].productName + 'NumDisplays', allProducts[image1index].numDisplays);

  image2index = randomProduct();
  while (image2index === image1index) {
    image2index = randomProduct();
  }
  img2.src = allProducts[image2index].filePath;
  allProducts[image2index].numDisplays += 1;
  localStorage.setItem(allProducts[image2index].productName + 'NumDisplays', allProducts[image2index].numDisplays);

  image3index = randomProduct();
  while (image3index === image1index || image3index === image2index) {
    image3index = randomProduct();
  }
  img3.src = allProducts[image3index].filePath;
  allProducts[image3index].numDisplays += 1;
  localStorage.setItem(allProducts[image3index].productName + 'NumDisplays', allProducts[image3index].numDisplays);

  console.log(image1index);
  console.log(image2index);
  console.log(image3index);
}
  //calling function to display 3 different random images
displayThreeImages();

//var to setup resultButton
var resultButton = document.getElementById('showResults');

//EventListeners: When item is clicked then do what's inside of each function
img1.addEventListener('click', handleImg1Click);
img2.addEventListener('click', handleImg2Click);
img3.addEventListener('click', handleImg3Click);

//Event Handlers: When specific array image is clicked numClicks+=1 counts as one click, totalClicks keeps track of all clicks. If statement totalClicks equals 15 then remove hidden attirbute so that result Button will appear.

function handleImg1Click() {
  allProducts[image1index].numClicks += 1;
  localStorage.setItem(allProducts[image1index].productName + 'NumClicks', allProducts[image1index].numClicks);
  totalClicks += 1;
  console.log(totalClicks + ' totalClicks');
  if (totalClicks === 15) {
    console.log('showbutton');
    resultButton.removeAttribute('hidden');
  }
  console.log(allProducts[image1index].productName + ' clicked ' + allProducts[image1index].numClicks + ' times');
  //need to call displayThreeImages function inside event handler function to display 3 different images. Otherwise only image1 will display three times.
  displayThreeImages();
}

function handleImg2Click() {
  allProducts[image2index].numClicks += 1;
  localStorage.setItem(allProducts[image2index].productName + 'NumClicks', allProducts[image2index].numClicks);
  totalClicks += 1;
  console.log(totalClicks + ' totalClicks');
  if (totalClicks === 15) {
    console.log('showbutton');
    resultButton.removeAttribute('hidden');
  }
  console.log(allProducts[image2index].productName + ' clicked ' + allProducts[image2index].numClicks + ' times');

  displayThreeImages();
}

function handleImg3Click() {
  allProducts[image3index].numClicks += 1;
  localStorage.setItem(allProducts[image3index].productName + 'NumClicks', allProducts[image3index].numClicks);
  totalClicks += 1;
  console.log(totalClicks + ' totalClicks');
  if (totalClicks === 15) {
    console.log('showbutton');
    resultButton.removeAttribute('hidden');
  }
  console.log(allProducts[image3index].productName + ' clicked ' + allProducts[image3index].numClicks + ' times');

  displayThreeImages();
}

var clearLSButton = document.getElementById('clearLS');
clearLSButton.addEventListener('click', handleClearLS);

function handleClearLS() {
  localStorage.clear();
}

resultButton.addEventListener('click', handleDataSubmit);

//unOrder List Review before creating a Bar Graph
// function handleDataSubmit(event) {
//   for (var i = 0; i < allProducts.length; i++) {
//     var ulEl = document.getElementById('list');
//     var liEl = document.createElement('li');
//     liEl.textContent = 'product name ' + allProducts[i].productName + ' numclicks ' + allProducts[i].numClicks + ' numDisplay ' + allProducts[i].numDisplays;
//     ulEl.appendChild(liEl);
//   }
// }

var allClicks = [];
var alltimesDisplayed = [];

function handleDataSubmit(event) {
  for (var i = 0; i < allProducts.length; i++) {
    allClicks[i] = allProducts[i].numClicks;
    alltimesDisplayed[i] = allProducts[i].numDisplays;
  }
  var results = document.getElementById('resultsCanvas').getContext('2d');
  var data = {
    labels: ['Luggage', 'Banana Slicer', 'Rain Boots', 'Chair', 'Cthulhu', 'Dragon Meat', 'Utensil Pens', 'Pizza Scissors', 'Shark Sleeping Bag', 'Baby Sweeper', 'Unicorn Meat', 'USB', 'Watering Can', 'Wine Glass'],
    datasets: [{
      label: 'My First dataset',
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: allClicks
    }, {
      label: 'My Second dataset',
      fillColor: 'rgba(151,187,205,0.5)',
      strokeColor: 'rgba(151,187,205,0.8)',
      highlightFill: 'rgba(151,187,205,0.75)',
      highlightStroke: 'rgba(151,187,205,1)',
      data: alltimesDisplayed
    }]
  };
  var myChart = new Chart(results).Bar(data) //eslint-disable-line
}
