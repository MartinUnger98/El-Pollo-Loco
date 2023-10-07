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
            return this.y <= 280;
        }
        else{ 
            return this.y <= 115;
        } 
        
    }
   

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
    } 
    

    playAnnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}