class ThrowableObject extends MoveableObject {

    IMAGES_ROATATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    isColliding = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROATATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw();
        this.animate()
        
    }


    /**
     * throws an bottle and make a curve
     * 
     */
    throw() {
        this.speedY = 20;
        if (!this.isColliding) {
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);   
        }       
        setInterval(() => {
            this.animate();
        }, 100);
    }


    /**
     * animates the bottle
     * 
     */
    animate() {
        if (this.isAboveGround() && !this.isColliding) {
            this.playAnnimation(this.IMAGES_ROATATION);  
        }
        else {
            this.playAnnimation(this.IMAGES_SPLASH);  
        }

    }
}