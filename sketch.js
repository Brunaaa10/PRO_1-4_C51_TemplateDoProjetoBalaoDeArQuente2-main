var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var controlJumpSound;
var restart;
var reset;
var obstacles;
var gameState = 0;

function preload() {
  bgImg = loadImage("assets/bg.png");

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
  restart = loadImage("./assets/restart.png");

  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");

  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");

  jumpSong = loadSound("./assets/jump.mp3");
  dieSong = loadSound("./assets/die.mp3");

}

function setup() {

  createCanvas(windowWidth - 10, windowHeight - 30);
  //imagem de fundo
  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);
  bg.scale = 1.3;


  //criar solos superiores e inferiores
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //criar o balão      
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.7;

  reset = createSprite(width - 200, height - 650, 50, 50);
  reset.addImage(restart);
  reset.visible = false;

  obstacles = new Group();

}

function draw() {

  background("black");

  
  
if(gameState == 0){

  //faça o balão de ar quente pular
  if (keyDown(RIGHT_ARROW)) {
    balloon.velocityX = 6;

  }
  if (keyDown(LEFT_ARROW)) {
    balloon.velocityX = -6;

  }
  if (keyDown("up")) {
    setTimeout(() => {
      balloon.velocityY = -6
    }, 700);

    jumpSong.play();
    jumpSong.setVolume(0.3);
    
    // balloon.overlap(obstacleBottom);
    // balloon.overlap(obstacleTop);
    
  }

  if(balloon.isTouching(obstacles)){
    gameState = 1;
    balloon.visible = false;

    reset.visible = true;

    obstacles.setVelocityXEach();
    dieSong.play();
    dieSong.setVolume(0.2);
    
  }
  spawnObstaclesTop();
  spawnObstaclesBottom();

 
}


  //adicione gravidade
  balloon.velocityY = balloon.velocityY + 0.5;


  Bar();

  drawSprites();

  //gerar obstáculos superiores

 
  
  if(gameState == 1){
    if(mousePressedOver(reset)){
      resetGame();
    }
  }


}


function spawnObstaclesTop() {
  if (World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400, 50, 40, 50);

    //obstacleTop.addImage(obsTop1);

    obstacleTop.scale = 0.2;
    obstacleTop.velocityX = -4;

    //posições y aleatórias para os principais obstáculos
    obstacleTop.y = Math.round(random(10, 100));

    //gerar obstáculos superiores aleatórios
    //var rand = Math.round(random(0,1));
    //var rand = random(1,2);
    var rand = Math.round(random(1, 2));
    //var rand=roundoff(random(1,2))

    switch (rand) {
      case 1: obstacleTop.addImage(obsTop1);
        break;
      case 2: obstacleTop.addImage(obsTop2);
        break;
      default: break;
    }

    //atribuir tempo de vida à variável
    obstacleTop.lifetime = 100;
    obstacleTop.depth = obstacleTop.depth + 1;
    //balloon.depth = balloon.depth + 1;
    //  balloon.depth = balloon.depth - 1;
    //obstacleTop.depth=obstacleTop.depth-1;

    obstacles.add(obstacleTop);

  }
}

function Bar() {
  if (World.frameCount % 60 === 0) {
    var bar = createSprite(400, 200, 10, 800);
    bar.velocityX = -6
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
  }
}

function spawnObstaclesBottom() {

  if (frameCount % 400 === 0) {
    obstacleBottom = createSprite(width, random(500, 620), 30, 200);

    
    obstacleBottom.velocityX = -2;

    var rand = Math.round(random(1, 2, 3));
    // var rand = 3;
    switch (rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
      obstacleBottom.scale = 0.25;
      obstacleBottom.y = 495;
        break;
      case 2: obstacleBottom.addImage(obsBottom2);
      obstacleBottom.scale = 0.2;
      obstacleBottom.y = 580;
        break;
      case 3: obstacleBottom.addImage(obsBottom3);
      obstacleBottom.scale = 0.25;
      obstacleBottom.y = 480;
      default: break;
    }

    
    obstacleBottom.lifetime = 300;

    obstacles.add(obstacleBottom);
  }
}



function resetGame(){
  obstacles.destroyEach();
 
  balloon.position.x = 100;
  balloon.position.y = 200;

  gameSate = 0;

  balloon.visible = true;

  reset.visible = false;

}


