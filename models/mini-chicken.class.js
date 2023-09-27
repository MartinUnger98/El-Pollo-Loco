class MiniChicken extends MoveableObject{
    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
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
            this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() =>{
            this.playAnnimation(this.IMAGES_WALKING);
        }, 200);
    }
}