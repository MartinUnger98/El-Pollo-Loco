let canvas;
let world;
let keyboard = new Keyboard();
let isLoading = false;
let isMuted = false;
let fullscreen = false;


document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

async function startGame() {
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("loading").classList.remove("d-none");
    if (!isLoading) {
        await game();
        setTimeout(() => {
            isLoading = true;
            showGame();
        }, 3000);
    }
}

async function game() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
}

function showGame() {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
}

function gameOver() {
    document.getElementById("gameOver").classList.remove("d-none");
}

function restartGame() {
    window.location.reload();
}


function toggleMute() {
    let audioImage = document.getElementById("audio");
      if (isMuted) {
        audioImage.src = 'img/10_extras/ton-an.png';
      } 
      else {
        audioImage.src = 'img/10_extras/ton-aus.png';
      }
      isMuted = !isMuted;
}

function toggleFullscreen() {
    let fullscreenImage = document.getElementById("fullscreen");
    if (fullscreen) {
        fullscreenImage.src = 'img/10_extras/vollbild.png';
        exitFullscreen();
    }
    else {
        fullscreenImage.src = 'img/10_extras/minimieren.png';
        enterFullscreen(document.body);
    }
    fullscreen = !fullscreen;
}


function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } 
    else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } 
    else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
    
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } 
    else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    
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


function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        document.getElementById("fullscreen").src = 'img/10_extras/vollbild.png';
        fullscreen = false;
    }
}  
