
var player1, bgImg;
var turn="rightSide";
var fly,bg,fc=0,fire,fireImg;
var jump=true;
var gameState=0;
var playerCount=0;
var form, player, game;
var allPlayers;
var database;
var players=[];
function preload(){
   
bgImg=loadImage("images/map2.png");
player1Img=loadImage("images/player1.png");
fireImg=loadImage("images/fire.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
 
  
  //  fc= frameCount
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  // background(200); 
  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  
  drawSprites();
}