let canvas;
let world;
let keyboard = new Keyboard();
let isLoading = false;
let isMuted = false;
let fullscreen = false;
const keyMapping = {
    39: "RIGHT",
    37: "LEFT",
    38: "UP",
    40: "DOWN",
    32: "SPACE",
    68: "D"
};

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
    document.getElementById("canvasContent").classList.remove("d-none");
}

function gameOverWin() {
    document.getElementById("gameOverWin").classList.remove("d-none");
}

function gameOverLose() {
    document.getElementById("gameOverLose").classList.remove("d-none");
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
    let content = document.getElementById("content");
    let fullscreenImage = document.getElementById("fullscreen");
    if (fullscreen) {
        fullscreenImage.src = 'img/10_extras/vollbild.png';
        exitFullscreen();
        content.classList.remove('fullscreen-mode');
    }
    else {
        fullscreenImage.src = 'img/10_extras/minimieren.png';
        enterFullscreen(document.getElementById("content"));
        content.classList.add('fullscreen-mode');
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
    else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}


window.addEventListener("keydown", (e) => {
    if(keyMapping[e.keyCode]) {
        keyboard[keyMapping[e.keyCode]] = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(keyMapping[e.keyCode]) {
        keyboard[keyMapping[e.keyCode]] = false;
    }
});


function exitHandler() {
    let content = document.getElementById("content");
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        document.getElementById("fullscreen").src = 'img/10_extras/vollbild.png';
        content.classList.remove('fullscreen-mode');
        fullscreen = false;
    }
}


function showHelpPage() {
    let help = document.getElementById('help');
    help.classList.remove('d-none');
    help.innerHTML = showHelpFirstPage();
}

function closeHelpPage() {
    let help = document.getElementById('help');
    help.classList.add('d-none');
}

function showFirstPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpFirstPage();
}

function showSecondPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpSecondPage();
}

function showThirdPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpThirdPage();
}