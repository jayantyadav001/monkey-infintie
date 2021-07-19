var backImage,back;
var player, player_running;
var ground,groundImage;

var energyGroup, bananaImage;
var obstaclesGroup, obstacleImage;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  back=createSprite(0,0,displayWidth,displayHeight);
  back.addImage(backImage);
  back.scale=3;
  back.x=back.width/2;
  back.velocityX=-4;
  
  player = createSprite(displayWidth/8,displayHeight-300,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(displayWidth/2,displayHeight-250,displayWidth,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  energyGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background("white");
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back.x<100){
    back.x=back.width/2;
  }
  
    if(energyGroup.isTouching(player)){
      energyGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnenergy();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     
    }
  camera.position.x = player.x
  camera.position.y = player.y
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnenergy() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(displayWidth,250,40,10);
    banana.y = random(displayHeight/2,displayHeight/3);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    energyGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-300,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    

    obstaclesGroup.add(obstacle);
  }
}


  
