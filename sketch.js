var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var groundImage;
var survivalTime=0

function preload(){
monkey_running =  loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameoverImage=loadImage("gameOver.png.png");
  restartImage=loadImage("restart.png");
  
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;
ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
ground.x=ground.width/2;
  
  
   gameOver = createSprite(250,100);
  gameOver.addImage(gameoverImage);
  gameOver.visible = false;
restart = createSprite(250,150);
  restart.addImage(restartImage);
  restart.visible=false
  obstacleGroup= new Group();
  FoodGroup= new Group();
}


function draw() {
background(255);
  gameOver.scale=0.2;
  restart.scale=0.2;
 
  if (gameState===PLAY){
    
    stroke("black")
 textSize(20);
  fill("black")
 survivalTime= survivalTime + Math.round(getFrameRate()/60);
    
    if(keyDown("space")) {
     monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
     food();
  obstacles();
  
    
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
    if(FoodGroup.isTouching(monkey)){
      survivalTime=survivalTime+10;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
      survivalTime=0;
  
    }
  }
 
  
  text( "Survival Time: " +survivalTime,100,50)
  
  
  drawSprites();
}

function food (){
  if (frameCount % 80 === 0) {
  var banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.scale = 0.09;
    banana.velocityX = -3;
    FoodGroup.add(banana);
}
  
}

function obstacles(){
  if (frameCount % 300 === 0) {
  var obstacle = createSprite(600,330,10,40);
  obstacle.addImage(obstacleImage);
   obstacle.scale = 0.09;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
}
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  
  
}


