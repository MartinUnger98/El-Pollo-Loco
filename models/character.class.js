class Character extends MoveableObject{
    
    height = 250;
    width = 120;
    y = 115;
    speed = 5;
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
   walking_sound = new Audio('audio/running.mp3')

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() =>{
            this.walking_sound.pause();
            if(world.keyboard.RIGHT) {
                this.walking_sound.play();
                if (this.x < world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
            }
            if(world.keyboard.LEFT) {
                this.walking_sound.play();
                if (this.x > 150) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                }
            }
            world.camera_x = -this.x + 120;
        }, 1000 / 60);

        setInterval(() =>{
            if(world.keyboard.RIGHT || world.keyboard.LEFT) {              
                //Walk Animation
               this.playAnnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
    
    jump() {

    }
}