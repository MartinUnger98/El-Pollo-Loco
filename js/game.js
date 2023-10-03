let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById("startScreen").classList.add("d-none");
    game();
    
    
}

function game() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    showGame();
}

function showGame() {
    document.getElementById("canvas").classList.remove("d-none");
}

function gameOver() {
    document.getElementById("gameOver").classList.remove("d-none");
}

function restartGame() {
    window.location.reload();
}


window.addEventListener("keydown", (e) => {
    if(e.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode === 38) {
        keyboard.UP = true;
    }
    if(e.keyCode === 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode === 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode === 68) {
        keyboard.D = true;
    }
    
});


window.addEventListener("keyup", (e) => {
    if(e.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode === 38) {
        keyboard.UP = false;
    }
    if(e.keyCode === 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode === 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode === 68) {
        keyboard.D = false;
    }

});




