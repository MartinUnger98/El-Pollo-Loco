class DrawableObject {
    x = 120;
    y = 280;
    
    height = 80;
    width = 60;

    img;
    imageCache = {};
    currentImage = 0;

    background_music = new Audio('audio/game_music.mp3');
    chickenDead_music = new Audio('audio/chicken.mp3');
    musicCounter = 0;

    playBackgroundMusic() {
        this.background_music.play();
    }
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof FinalBoss || this instanceof MiniChicken) {
            ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        };
    }
    
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src= path;
            this.imageCache[path] = img;
        });
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}