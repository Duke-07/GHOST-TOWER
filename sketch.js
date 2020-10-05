var gameState="play";
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var ghostStd;
var iClimber, iClimberGroup;
var song;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-jumping.png");
  ghostStd=loadImage("ghost-standing.png");
  song=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostStd);
  ghost.scale=0.3;
  //creating groups
  doorGroup = new Group();
  climberGroup = new Group();
  iClimberGroup = new Group();
  //song.loop();
}

function draw(){
  background("black");
  
  if(gameState==="play"){
  if (tower.y>600){
    tower.y=300;
  }
  
  if (keyDown("left")){
    ghost.x=ghost.x-5;
  }
  
  if (keyDown("right")){
    ghost.x=ghost.x+5;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
    ghost.addImage(ghostStd);
  }
  
  ghost.velocityY=ghost.velocityY+1;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.addImage(ghostImage);
  }
  
  if(iClimberGroup.isTouching(ghost) ||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoors();
  drawSprites();
  }
  else if(gameState==="end"){
    fill("yellow");
    textSize(28);
    text("GAME OVER",225,300);
  }
  
}

function spawnDoors(){
  if (frameCount%275===0){
    door=createSprite(200,-10);
    door.addImage(doorImage);
    door.x=Math.round(random(120,450));
    door.velocityY=1;
    doorGroup.add(door);
    door.lifetime=700;
    climber=createSprite(200,40);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=700;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    iClimber=createSprite(200,45);
    iClimber.width=climber.width;
    iClimber.height=2;
    iClimberGroup.add(iClimber);
    iClimber.x=door.x;
    iClimber.velocityY=1;
    iClimber.lifetime=700;
  }
}