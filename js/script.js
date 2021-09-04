// game variables and constants
let inputDir={x:0,y:0};
const foodsound= new Audio('food.mp3');
const gameoversound= new Audio('gameover.mp3');
const movesound= new Audio('move.mp3');
const musicsound= new Audio('music.mp3');
let lastpainttime=0;
let score=0;
let speed=5;
let snakeArr=[
    {x:13,y:15}
];
let snakefood={x:6,y:7};
let hiscore=document.getElementById('hi-score');
 





// game functions
// game loop
function main(ctime) {
    musicsound.play();
    window.requestAnimationFrame(main);
    if ((ctime-lastpainttime)/1000<1/speed) 
    { var gamescore=document.querySelector('.score');
        return;
    }
    lastpainttime=ctime;

    gameEngine();
    // console.log(ctime);
}
function isCollide(snake)
{
// if you bump into yourself
for(let i=1;i<snakeArr.length;i++)
{
    if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y)
    return true;
}
// if you strike to the wall
if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0)
return true;
return false;
}

function gameEngine() {
//   part 1:updating the snake array and food
// if snake is collide then end the game and start new one
var gamescore=document.querySelector('#score');
  if(isCollide(snakeArr)){
      gameoversound.play();
      musicsound.pause();
      inputDir={x:0,y:0};
      alert("Game Over,Press Any Key To Continue!");
      snakeArr=[{x:13,y:15}];
      musicsound.play();
      score=0;
  }
// if snake eat the food then place the food at another place and increase the size of snake

if(snakeArr[0].x===snakefood.x && snakeArr[0].y===snakefood.y)
{  foodsound.play();
    score+=1;
    if(score>15)
    {
        speed=8;
    }
    else if(score>25)
    {
        speed=10;
    }
    else if(score>40)
    {
        speed=12;
    }
     
    gamescore.innerHTML="SCORE: "+score;
     snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
      let a=2;
      let b=17;
     snakefood={x:Math.floor(Math.random() * (b - a + 1) ) + a , y:Math.floor(Math.random() * (b - a + 1) ) + a};
     
}
if(score>highscoreval)
{    highscoreval=score;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
    hiscore.innerHTML="Hi Score:"+highscoreval;
}
// moving the snake
for(let i=snakeArr.length-2;i>=0;i--)
{
  snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;

// part 2:display the snake and food
// display the snake
board.innerHTML ="";
snakeArr.forEach((ele,ind) => {
    snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart=ele.y;
    snakeElement.style.gridColumnStart=ele.x;
    if(ind==0){
        snakeElement.classList.add("head");
    }
    else{

        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
});
// display the food
foodElement=document.createElement("div");
    foodElement.style.gridRowStart=snakefood.y;
    foodElement.style.gridColumnStart=snakefood.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}

// main logic starts

let highscore=localStorage.getItem("highscore");
if(highscore===null){
highscoreval=0;
localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    hiscore.innerHTML="Hi Score:"+highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",a=>{
    inputDir={x:0,y:0};//start the game
    movesound.play();
    switch (a.key)
     {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
            case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
            case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
            case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})