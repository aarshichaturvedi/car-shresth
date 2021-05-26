 class Game {
     constructor(){
  
     }
  
     getState(){
       var gameStateRef  = database.ref('gameState');
       gameStateRef.on("value",function(data){
          gameState = data.val();
       })
  
     }
     
     // refering the whole database
     update(state){
       database.ref('/').update({
         gameState: state
       });
     }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      car1 = createSprite(100,200)
      car2 = createSprite(500,200)
     // car3 = createSprite(500,200);
     // car4 = createSprite(700,200);
      players = [car1,car2];
  
     // car1.resize(0.4);
     //  car2.resize(0.4);
  
     car1.addImage("car1",car1Img)
     car2.addImage("car2",car2Img)
      //car3.addImage("carimage",c3)
      //car4.addImage("carimage",c4)
  
       //  car1.scale(0.4)
       //  car2.scale(0.4)
    }
  
    play(){
     form.hide();

     // image(backgroungIMG,displayWidth/2,displayHeight/2)
      Player.getPlayerInfo();

     
      
      
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        //background(backgroungIMG)
       // background("white")
       // image(track(1),0,-displayHeight*4,displayWidth,displayHeight*5)
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 180;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
           x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;

          players[index-1].x = x;
          players[index-1].y = y;
  
           if (index === player.index){
             players[index - 1].shapeColor = "red";
             camera.position.x = displayWidth/2;
             camera.position.y = players[index-1].y;
           }
           
         // textSize(15);
         // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
        
      }
               
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
       
     if(player.distance>3700){
       gameState = 2
     }
      drawSprites();
    }
    end (){
      console.log("gameover")
    }
  }