var balloon,database,height;
var bgImg,balloonAnimation;
function preload(){
  bgImg = loadImage("images/Hot Air Ballon-01.png")
  balloonAnimation = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")

}

function setup() {
  database = firebase.database()
  createCanvas(1500,710);
  balloon = createSprite(150,490, 10, 10);
  balloon.addAnimation("run",balloonAnimation);
  balloon.scale = 0.75
  //console.log(balloon.scale)

   var balloonPosition = database.ref("balloon/position")
   balloonPosition.on("value",readPosition,showError) 
}

function draw() {
  background(bgImg);
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.scale = balloon.scale-0.012
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10);
    balloon.scale = balloon.scale+0.012
  }
   
  textSize(20)
  fill(0)
  text("**Use  ARROW  KEYS  to move  HOT  AIR  BALLOON !!",20,50)


  drawSprites();
}

function updatePosition(x,y){
  database.ref("balloon/position").set({
      "x": height.x + x,
      "y": height.y + y
  })
}

function readPosition(data){
  height = data.val(); 
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}