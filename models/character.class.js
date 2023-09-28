class Character extends MoveableObject{
    
    height = 250;
    width = 120;
    y = 115;
    speed = 5;
    standingTime = 0;
    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

   walking_sound = new Audio('audio/running.mp3')

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() =>{
            this.walking_sound.pause();
            if(world.keyboard.RIGHT) {
                this.moveRight();
                this.walking_sound.play();
            }
            if(world.keyboard.LEFT) {
                this.moveLeft();
                this.walking_sound.play();
            }

            if (world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            world.camera_x = -this.x + 120;
        }, 1000 / 60);

        setInterval(() =>{

            

            if (this.isDead()) {
                this.playAnnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.clearAllIntervals();
                    gameOver();
                }, 1500);
                
            }
            else if (this.isHurt()) {
                this.playAnnimation(this.IMAGES_HURT);
                this.standingTime = 0;
            }
            else if (this.isAboveGround()) {
                this.playAnnimation(this.IMAGES_JUMPING);
                this.standingTime = 0;
            } else{
                if(world.keyboard.RIGHT || world.keyboard.LEFT) {              
                    this.playAnnimation(this.IMAGES_WALKING);
                    this.standingTime = 0;
                }
                else {
                    this.playAnnimation(this.IMAGES_STANDING);
                    this.standingTime += 150;
                    if (this.standingTime >=6000) {
                        this.playAnnimation(this.IMAGES_SLEEPING);
                    }
                }
                    
                
            }
        }, 100);
    }
    
}