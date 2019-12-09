//BY CAROLINE CHEUNG AND KIANA MENGUITA

//global variables
let userInput;
let findButton;
let randomizeButton;
let video;
let vine;
let keywords;
let splitKeywords;
let data;
let currentVine;
let error;
let voogle;
let disclaimer;
let thereIsBestMatch = false;
let playing = true;


function preload() {
  //json file
  data = loadJSON("vines.json");
}

function setup() {
  //create video
  video = createVideo();
  video.hide();
  
  //error 
  error = createDiv("");
  error.position(windowWidth / 2 - 100, windowHeight / 2);
  error.style('font-family', 'Futura');


  disclaimer = createDiv("Disclaimer: We do not own any of the content. All rights go to the owners.");
  disclaimer.style('font-size', '12px');
  disclaimer.position(windowWidth / 2 - 200, windowHeight / 2 + 290);

  createCanvas(windowWidth, windowHeight);
  voogle = createDiv("Voogle");
  voogle.style('font-size', '72px');
  voogle.style('font-family', 'Futura');
  voogle.style('color', '#ffffff');
  voogle.position(windowWidth / 2 - 135, windowHeight / 2 - 300);

  //input bar
  userInput = createInput("Enter 2 or more keywords");
  userInput.style('font-family', 'Futura');
  userInput.position(windowWidth / 2 - 200, windowHeight / 2 - 180);
  userInput.size(350, 20);

  //find button
  findButton = createButton("Find that Vine!");
  findButton.style('font-family', 'Futura');
  findButton.style('font-size', '14px');
  findButton.position(windowWidth / 2 - 130, windowHeight / 2 - 140);
  findButton.mousePressed(getKeywords);

  //randomize button
  randomizeButton = createButton("Randomize!");
  randomizeButton.style('font-family', 'Futura');
  randomizeButton.style('font-size', '14px');
  randomizeButton.position(windowWidth / 2, windowHeight / 2 - 140);
  randomizeButton.mousePressed(randomize);
}

//compare keywords
function compareKeywords() {
  playing  =true;
  let bestMatch = null;
  let bestNumberOfMatches = 0;
  //gets user keywors
  keywords = userInput.value();
  keywords = keywords.toLowerCase();
  splitKeywords = split(keywords, ' ');
  
  //gets individual vine keywords
  for (let j = 0; j < data.vines.length; j++) {
    let jsonKeywords = data.vines[j].keywords;
    let jsonSplitKeywords = split(jsonKeywords, ' ');
    let numOfMatches = 0;
    
  //checks if keyword is in json keyword array
    for (k = 0; k < splitKeywords.length; k++) {
      if (jsonSplitKeywords.includes(splitKeywords[k])) {
        numOfMatches++;
      }
    }

    //finds best match
    if (numOfMatches > bestNumberOfMatches) {
      bestNumberOfMatches = numOfMatches;
      bestMatch = data.vines[j];
    }
  }

  //plays video
  if (bestMatch) {
    thereIsBestMatch = true;
    currentVine = bestMatch.vine;
    // video.style("display","block")
    video.src = currentVine;
    video.stop();
    video.loop();
    print(bestMatch);
    print(bestNumberOfMatches);
    error.html("")
  } 
  //stops video and error message
  else {
    thereIsBestMatch = false;
    video.stop();
    // video.style("display","none")
    error.html("Error. No Vine Found.")
  }

}

function draw() {
  background("#00B386");
  if (thereIsBestMatch) {
    image(video, width / 2 - 203, height / 2 - 80, 360, 360);
  }

}

function getKeywords() {
  compareKeywords();
}


//random vine
function randomize() {
  error.html("")
  playing = true;
  thereIsBestMatch = true;
  let randomN = floor(random(0, data.vines.length));
  let randomVine = data.vines[randomN].vine;
  video.stop();
  video.src = randomVine;
  video.loop();
}

//play and pause button
function keyPressed() {
	if (key ===  ' ') {
		if (playing) {
			video.pause();
			playing = false;
		} else {
			video.play();
			playing = true;
		}
	}
}
