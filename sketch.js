var hypnoticalBall,database;
var position;

function setup(){
    database =firebase.database();
        console.log(database);
    
    createCanvas(500,500);
    hypnoticalBall = createSprite(250,250,10,10);
    hypnoticalBall.shapeColor = "red";

    var hypnoticalBallPosition = database.ref('ball/position');
    hypnoticalBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position !=undefined )
    {
       if(keyDown(LEFT_ARROW))
       {
        writePosition(-1,0);
       }
        else if(keyDown(RIGHT_ARROW))
        {
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW))
        {
            writePosition(0,-1);
        }
       else if(keyDown(DOWN_ARROW))
       {
        writePosition(0,+1);
       }
    drawSprites();
   }
}


function changePosition(x,y){
    hypnoticalBall.x =  hypnoticalBall.x + x;
    hypnoticalBall.y =  hypnoticalBall.y + y;
}

function readPosition(data)
{
    position=data.val();
    console.log(position.x);
    hypnoticalBall.x=position.x;
    hypnoticalBall.y=position.y;

}
function writePosition(x,y)
{
    database.ref('ball/position').set(
        {'x' : position.x + x,

         'y' : position.y + y

        }

    )
}
function showError()
{
    console.log("firebase error")
}