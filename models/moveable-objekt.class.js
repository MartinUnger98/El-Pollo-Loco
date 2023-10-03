class MoveableObject extends DrawableObject {
     
    speed = 0.15;
    otherDirection = false;
    speedY = 0.5;
    acceleration = 1.7 ;
    energy = 100;
    energyFinalBoss = 100;
    lastHit = 0;
    lastHitFinalBoss = 0;
    notMoving = 0;
    


    applyGravity() {
        setInterval(() => { 
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;    
            }            
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else{
            return this.y <= 100;
        }
        
    }
   

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
    } 

    hit() {
        this.energy -= 2;    
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    hitFinalBoss() {
        this.energyFinalBoss -= 20;    
        if (this.energyFinalBoss < 0) {
            this.energyFinalBoss = 0;
        }
        else {
            this.lastHitFinalBoss = new Date().getTime();
        }
    }

    isHurtFinalBoss() {
        let timepassed = new Date().getTime() - this.lastHitFinalBoss;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDeadFinalBoss() {
        return this.energyFinalBoss == 0;
    }
    
    

    playAnnimation(images) {
        let i = this.currentImage % images.length;
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

    jump() {
        this.speedY = 25;
    }
}