class Bottle extends MoveableObject {
    collected = false;
    width = 80;
    height = 80;
    IMAGES = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 50 + Math.random() * 1500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.collected) {
                this.playAnnimation(this.IMAGES);    
            }
            else{
                this.IMAGES = [];
                this.loadImage(this.IMAGES);
            }
            
        }, 100);
        
    }

}