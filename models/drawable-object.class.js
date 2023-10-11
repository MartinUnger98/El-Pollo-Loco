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


    /**
     * sets the current percentage of the status-bar
     * 
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    } 


    /**
     * 
     * @returns the number of the picture with the right percentage
     */
    resolveImageIndex() {
        if (this instanceof BossStatusBar || this instanceof LifeStatusBar) {
            return this.resolveLife();
        };
        if (this instanceof CoinStatusBar) {
            return this.resolveCoin();
        };
        if (this instanceof BottleStatusBar) {
            return this.resolveBottle();
        };
    } 
    
    /**
     * 
     * @returns the right position in the images array 
     */
    resolveLife() {
        if(this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 60) {
            return 4;
        }
        else if(this.percentage > 40) { 
            return 3;
        }
        else if(this.percentage > 20) {
            return 2;
        }
        else if(this.percentage > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }


    /**
     * 
     * @returns the right position in the images array 
     */
    resolveCoin() {
        if(this.percentage === 100) {
            return 5;
        }
        else if (this.percentage === 80) {
            return 4;
        }
        else if(this.percentage === 60) { 
            return 3;
        }
        else if(this.percentage === 40) {
            return 2;
        }
        else if(this.percentage === 20) {
            return 1;
        }
        else {
            return 0;
        }
    }


    /**
     * 
     * @returns the right position in the images array 
     */
    resolveBottle() {
        if(this.percentage === 10) {
            return 5;
        }
        else if (this.percentage >= 8) {
            return 4;
        }
        else if(this.percentage >= 6) { 
            return 3;
        }
        else if(this.percentage >= 4) {
            return 2;
        }
        else if(this.percentage >= 1) {
            return 1;
        }
        else {
            return 0;
        }
    }

}