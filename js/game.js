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


/**
 * initialize mobile press events
 * 
 */
function initMobile() {
    mobileKeyPressEvents();
    mobileKeyReleaseEvents();
}


/**
 * starts the game 
 * 
 */
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


/**
 * sets a new World in the canvas
 * 
 */
async function game() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
}


/**
 * removes the loading view and shows the game
 * 
 */
function showGame() {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("canvasContent").classList.remove("d-none");
    document.getElementById("leftMobile-container").classList.remove("d-none");
    document.getElementById("rightMobile-container").classList.remove("d-none");

}


/**
 * shows the win screen
 * 
 */
function gameOverWin() {
    document.getElementById("gameOverWin").classList.remove("d-none");
}


/**
 * shows the lose screen
 * 
 */
function gameOverLose() {
    document.getElementById("gameOverLose").classList.remove("d-none");
}


/**
 * restarts the game
 * 
 */
function restartGame() {
    window.location.reload();
}


/**
 * toggle between mute and unmute
 * 
 */
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


/**
 * toggle between fullscreen and normal screen
 * 
 */
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


/**
 * open the fullscreen
 * 
 * @param {object} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


/**
 * close the fullscreen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * switches the fullscreen icons after pressing escape in fullscreen and sets fullscreen to false
 * 
 */
function exitHandler() {
    let content = document.getElementById("content");
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        document.getElementById("fullscreen").src = 'img/10_extras/vollbild.png';
        content.classList.remove('fullscreen-mode');
        fullscreen = false;
    }
}


/**
 * show help page
 * 
 */
function showHelpPage() {
    let help = document.getElementById('help');
    help.classList.remove('d-none');
    help.innerHTML = showHelpFirstPage();
}


/**
 * close help page
 * 
 */
function closeHelpPage() {
    let help = document.getElementById('help');
    help.classList.add('d-none');
}


/**
 * show first help page
 * 
 */
function showFirstPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpFirstPage();
}


/**
 * show second help page
 * 
 */
function showSecondPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpSecondPage();
}


/**
 * show third help page
 * 
 */
function showThirdPage() {
    let help = document.getElementById('help');
    help.innerHTML = showHelpThirdPage();
}

/**
 * sets the key to true, after pressing them (mobile)
 * 
 */
function mobileKeyPressEvents() {
    const leftButton = document.getElementById('left_button');
    leftButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    const rightButton = document.getElementById('right_button');
    rightButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    const jump = document.getElementById('jump_button');
    jump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    const throwBottle = document.getElementById('throw_button');
    throwBottle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
}


/**
 * This function sets the key to false, after releasing them (mobile)
 */
function mobileKeyReleaseEvents() {
    const leftButton = document.getElementById('left_button');
    leftButton.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
    const rightButton = document.getElementById('right_button');
    rightButton.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
    const jump = document.getElementById('jump_button');
    jump.addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    });
    const throwBottle = document.getElementById('throw_button');
    throwBottle.addEventListener('touchend', (e) => {
        keyboard.D = false;
    });
}