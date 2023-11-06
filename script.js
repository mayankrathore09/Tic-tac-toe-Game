const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let audioTurn = new Audio("ting.mp3");
let music = new Audio("music.mp3");

let currentPlayer;
let gamegrid;


const winningPosition =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// let's create a functyion athat intialise the game

function getinit(){
    currentPlayer ="X";
    //for logics
    gamegrid=["","","","","","","","",""];
    //for UI
    for(let i=0 ;i<9;i++){
        boxes[i].innerText="";
        boxes[i].style.pointerEvents="all";
        boxes[i].classList.remove("win");
    }
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player -${currentPlayer}`;

}

getinit();

boxes.forEach((box,index) =>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

function handleClick(index)
{
    if(gamegrid[index]=== ""){
        boxes[index].innerText = currentPlayer;
        gamegrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        audioTurn.play();
        //turn change
        swapTurn();

        //anyone wins or not
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    gameInfo.innerText =`Current Player -${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPosition.forEach((position)=>{
        
        if((gamegrid[position[0]] != "" && gamegrid[position[1]]!="" && gamegrid[position[1]]!="" )&&
        (gamegrid[position[0]] === gamegrid[position[1]])&& (gamegrid[position[1]] === gamegrid[position[2]]))
        {
            if(gamegrid[position[0]]=="X"){
                answer="X";
            }else{
                answer="O";
            }

            //disable pointers afetr win
            boxes.forEach((box)=>{
                box.style.pointerEvents= "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            newGameBtn.classList.add("active");
            
        }
    });

    //something in answer
    if(answer!="")
    {
        gameInfo.innerText=`Winner is ${answer}`;
        newGameBtn.classList.add("active");
        
    }

    //when there is tie
    let count=0;
    gamegrid.forEach((box)=>{
        if(box!= ""){
            count++;
        }    
    });

    if(count=== 9){
        gameInfo.innerText="It's a Tie" ;
        newGameBtn.classList.add("active");
    }

}

newGameBtn.addEventListener("click",getinit);



//extra
let sd = document.getElementById("sound");

sd.addEventListener('click' , playsound);
let deafulton = false;

function playsound(){
    if(deafulton){
        music.pause();
        deafulton= false;
    }else{
      deafulton =true;
      music.play();
    }
}
