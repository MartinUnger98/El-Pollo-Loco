class DrawableObject {
    x = 120;
    y = 280;
    height = 80;
    width = 60;
    img;
    imageCache = {};
    currentImage = 0;
    musicCounter = 0;

    /**
     * creates a new image
     * 
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * draw the object to the canvas
     * 
     * @param {object} ctx is the context of the canvas 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } 
    

    /**
     * loads the images of the array in the image cache
     * 
     * @param {Array} arr array of of the images  
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src= path;
            this.imageCache[path] = img;
        });
    }


    /**
     * stops all intervals
     * 
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * play the sound of the object
     * 
     * @param {object} sound 
     */
    playSound(sound) {
        if (!isMuted) {
            sound.play();
        }
    }

}