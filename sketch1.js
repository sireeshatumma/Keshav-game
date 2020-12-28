
var player, movingRect;
var turn="rightSide";
function preload(){
  trex_running=loadAnimation("images/trex_1.png","images/trex_2.png","images/trex_3.png");
  
  trex_Standing=loadImage("images/trex_1.png");
  
  forest1=loadImage("images/forest1.png");
  forest2=loadImage("images/forest2.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
 
  forest=createSprite(width/2, height/2, width, height);
  forest.addImage(forest2);
  forest.scale=5;
  player=createSprite(width/2+100, height-100, 50, 100);

   player.addAnimation("running",trex_running);
   player.scale=0.5;
   player.setVelocity(12,0);
   fc= frameCount
}

function draw() {
  background(0); 

  camera.position.x=player.x;
  camera.position.y=player.y;
  // console.log(turn);
  // console.log(player.mirrorX());

  
  if(fc<100){
    console.log("fc: "+fc);
  }else{
    console.log("fc: ");
  }
  
if(keyDown("up")){
  // player.setVelocity(0,-12);
  player.y -=12;
}

if(keyDown("down")){
  // player.setVelocity(0,12);
  player.y +=12;
}

if(keyDown("right") && keyDown("up")){
  player.setVelocity(12,12);
  player.mirrorX(1);
}
if(keyDown("right")){
  player.setVelocity(12,0);
  player.mirrorX(1);
 
}

if(keyDown("left")){
   player.setVelocity(-12,0);
  player.mirrorX(-1);

}
  drawSprites();
}