class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    console.log("gameState"+gameState);
    console.log("playerCount"+playerCount);

    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      this.spriteObjects();
      //  player.setVelocity(12,0);
      fly=new Fly();
    }
    
  }
  spriteObjects(){
    
    bg=createSprite(width/2, height/2, width, height/2);
    bg.addImage(bgImg);
    bg.scale=5;
    player1=createSprite(width/2+100, height-300, 50, 100);
    player1.addImage(player1Img);
     player1.scale=0.2;
    //  player2=createSprite(width/2+300, height-300, 50, 100);
    // player2.addImage(player1Img);
    //  player2.scale=0.2;
     players=[player1]
     fire=createSprite(100,100,50,10);
    // fire.shapeColor="red";
    fire.addImage(fireImg);
    fire.scale=0.3
    fire.visible=false
  }
  displayPlay(){

    console.log("fly.length: "+fly.length);
    console.log("fly.length: "+fly.rect.width);
    if(fly.length>=0){
       fly.display();
       fly.rect.width=fly.length;
      fly.rect.visible=true;
    }
    else{ fc=frameCount;}
    if(frameCount<fc+100){
      fly.length=100
      fly.rect.width=0;
      fly.rect.visible=false;
      jump=false;
    }else{jump=true}

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    // player.getCarsAtEnd();
   
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      this.displayPlay();

      
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = height - allPlayers[plr].distance;
        // console.log(players[index-1])
        players[index-1].x = x;
        players[index-1].y = y;
         
        if (index === player.index){
          text(allPlayers[plr].name , x ,y-50)

          if(jump){
            fire.visible=true;
            fire.x=x;
            fire.y=y+50;
          }else{
            fire.visible=false;
            // players[index-1].y=height-300
          }
          // if(keyIsDown(UP_ARROW)&&jump){
          //   // allPlayers[plr].y +=10
          //   console.log("jump")
          // }
        }
       
        //textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, player1.x,player1.y-50)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      if(jump){
        player.distance +=10
      }else{
        player.distance= height-300
      }
     
      player.update();
    }
    

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      // Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    console.log(player.name);
   
    // form.displayRank();
    alert("game ended");
  }

}
