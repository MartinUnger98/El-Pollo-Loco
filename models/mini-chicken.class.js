class MiniChicken extends MoveableObject{
    
    chickenIsDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 800 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.85;
        this.animate();
    }

    animate() {
        setInterval( () => {
            if (!this.chickenIsDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() =>{
            if (!this.chickenIsDead) {
                this.playAnnimation(this.IMAGES_WALKING);
            }
            else {
                this.loadImage(this.IMAGES_DEAD);
                if (this.musicCounter === 0) {
                    this.chickenDead_music.play();
                }
                this.musicCounter++;
                setTimeout(() => {
                    this.IMAGES_DEAD = [];
                }, 500);
            }      
        }, 200);
    }
}