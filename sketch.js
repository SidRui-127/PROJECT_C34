var dog, dogImg, dogHappy, foodS, foodStock, Food;
var firebase, database;

function preload() {
  dogImg = loadImage("./images/dog.png");
  dogHappy = loadImage("./images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  //console.log(foodStock);

  fill("red");
  
}


function draw() {  

  background(46, 139, 87);
  fill("white");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  drawSprites();
  
  text("CLICK THE UP ARROW KEY TO FEED THE DOG", width/4, height/6);

  text("Bottles Left:" + foodS, width/3, height/11);

  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  } 
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}



