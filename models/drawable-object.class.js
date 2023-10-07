class DrawableObject {
    x = 120;
    y = 280;
    
    height = 80;
    width = 60;

    img;
    imageCache = {};
    currentImage = 0;

    

    musicCounter = 0;

    


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    playSound(sound) {
        if (!isMuted) {
            sound.play();
        }
       }

}