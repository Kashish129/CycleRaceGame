var path,mainCyclist,gameOver;
var pathImg,mainRacerImg1,mainRacerImg2,pinkImg,yellowImg,redImg,
gameOverImg;
var pinkCG,yellowCG,redCG;
var bellS;
var p2,y2,r2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
 
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkImg=loadAnimation("images/opponent1.png","images/opponent2.png");
  
yellowImg=loadAnimation("images/opponent4.png","images/opponent5.png");
  
  redImg=loadAnimation("images/opponent7.png","images/opponent8.png");
  
   bellS=loadSound("sound/bell.mp3");
  
  p2=loadImage("images/opponent3.png");
  
  gameOverImg=loadImage("gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

gameOver  = createSprite(200,150,20,20);
gameOver.addAnimation("over",gameOverImg);
gameOver.scale=0.5;
  
  
pinkCG=new Group();
yellowCG=new Group();
redCG=new Group();
  
}

function draw() {
  background(0);
  
  
  if(keyDown("UP_ARROW")){
     restart();
   }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  distance= distance+Math.round(getFrameRate()/60);
  
  
  
  
  
  if(gameState===PLAY){
  
  gameOver.visible=false;
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
    
  }
    
    var select_opponent=Math.round(random(1,3));
      if(World.frameCount%150===0){
        if(select_opponent===1){
         PinkC(); 
        }else if(select_opponent===2){
          yellowC();
        } else{
        redC ();
    
      }
    }
    
    if(keyDown("space")){
      bellS.play();
    }
    
    if(distance===345){
      path.velocityX=-(6+2*distance/150);
      pinkCG.velocityX=-(6+2*distance/150);
      yellowCG.velocityX=-(6+2*distance/150);
      redCG.velocityX=-(6+2*distance/150);
      
    }
    
if(mainCyclist.isTouching(pinkCG)||mainCyclist.isTouching(redCG)||mainCyclist.isTouching(yellowCG)){
gameState=END;
pinkCG.destroyEach();
pinkCG.velocityX=0;
//pinkCG.changeImage(p2);

yellowCG.velocityX=0;
    }
 }else if(gameState===END){
  gameOver.visible=true;
  textSize(20);
  fill(255);
  text("press up arrow to restart!",200,200);
    
   redCG.destroyEach();
   

path.velocityX=0;
   
   

 }
}

function restart(){
  gameState=PLAY;
  gameOver.visible=false;
  
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  
  distance=0;
  path.velocityX=-5;
  redCG.velocityX=-3;
  yellowCG.velocityX=-3;
  pinkCG.velocityX=-3;
}


function yellowC () {
 if(frameCount%7===0) { player2=createSprite(1100,Math.round(random(50,250)),10,10)
 player2.scale=0.06;
 player2.addAnimation("opponent",yellowImg);
 //player2.debug=true;
 player2.setCollider("rectangle",0,0,20,20) ;                  player2.velocityX=-3;
 player2.setLifetime=170;
 yellowCG.add(player2);
                       }                  
  
}

function redC () {
 if(frameCount%5===0) { player3=createSprite(1100,Math.round(random(50,250)),10,10)
 player3.scale=0.06;
 player3.addAnimation("opponent",redImg);
 //player3.debug=true;
 player3.setCollider("rectangle",0,0,20,20) ;                  player3.velocityX=-3;
 player3.setLifetime=170;
 redCG.add(player3);
                       }                  
  
}

function PinkC(){
 if(frameCount%3===0) { player1=createSprite(1100,Math.round(random(50,250)),10,10)
 player1.scale=0.06;
 player1.addAnimation("opponent",pinkImg);
 //player1.debug=true;
 player1.setCollider("rectangle",0,0,20,20)                        
 player1.velocityX=-3;
 player1.setLifetime=170;
 pinkCG.add(player1);
}                  
}


