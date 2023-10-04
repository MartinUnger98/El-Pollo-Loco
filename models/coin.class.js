class Coin extends MoveableObject {

    width = 120;
    height = 120;
    collected = false;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1500;
        this.y = 100 + Math.random() * 100;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.collected) {
                this.IMAGES = [];
                this.loadImage(this.IMAGES);
            }
        }, 100);

        setInterval(() => {
            if (!this.collected) {
                this.playAnnimation(this.IMAGES);
            }
        }, 500);
       
    }
}