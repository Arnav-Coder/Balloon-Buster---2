var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var boundary;

var score = 0;
var lives = 5;

//We have to put different values for variables otherwise they will be considered same
var PLAY = 1;
var STOP = 2;
var END = 3;

var gameState = PLAY;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0;
   
   balloonGroup = new Group();
   arrowGroup = new Group();

   boundary = createSprite(400,200,10,400);
   boundary.visible = false;
}

function draw() {
 background("Black");

 createEdgeSprites();
 //Losing live when touching right edge
   if(balloonGroup.isTouching(boundary)||balloonGroup.isTouching(bow)){

    lives = lives - 1;
    balloonGroup.destroyEach();
   }

 //Destroying balloon on touching arrow
   if(arrowGroup.isTouching(balloonGroup)){
    score++;
    balloonGroup.destroyEach();
    arrowGroup.destroyEach();
   }  

  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
  //Taking break after shooting 1 arrow
    if(gameState == STOP){

      if(World.frameCount % 100 === 0){

        gameState = PLAY;
      }
    }

   // release arrow when space key is pressed
  if (keyDown("space") && gameState == PLAY) {
    
    createArrow();
    gameState = STOP;
    
  }
   
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 130 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }  
    
  drawSprites();

  if(gameState == PLAY||gameState == STOP){

  textSize(20);
  fill("Black");
  text("Score : "+ score, 300,50);  

  text("Lives : "+lives,300,30);
  }

  if(lives == 0){
    gameState = END;
    
  }

  if(gameState == END){
    scene.destroy();
    bow.destroy();
    balloonGroup.destroyEach();

    textSize(50);
    fill("Red");
    text("GAME OVER",50,200);
  }
}


// Creating  arrows for bow
 function createArrow() {

  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;

  arrowGroup.add(arrow);
}

function redBalloon() {

  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;

 //Adding red to BalloonGroup
  balloonGroup.add(red);
}

function blueBalloon() {

  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;

 //Adding blue to BalloonGroup 
  balloonGroup.add(blue);
}

function greenBalloon() {

  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;

 //Adding green to BalloonGroup 
  balloonGroup.add(green);
}

function pinkBalloon() {

  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1;

 //Adding pink to BalloonGroup 
  balloonGroup.add(pink);
}
