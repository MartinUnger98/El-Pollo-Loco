class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 80;
    width = 60;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0.5;
    acceleration = 1.7 ;

    applyGravity() {
        setInterval(() => { 
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;    
            }            
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 115;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src= path;
            this.imageCache[path] = img;
        });
    }

    playAnnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        if (this.x < world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft(){
        if (this.x > 150) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }
}