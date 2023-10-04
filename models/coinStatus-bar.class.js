class CoinStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',        
    ];

    coins_collected = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.x = 10;
        this.y = 25;
        this.width = 200;
        this.height = 45;
    }

    setPercentage(coins_collected) {
        this.coins_collected = coins_collected;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }  

    resolveImageIndex() {
        if(this.coins_collected === 0) {
            return 0;
        }
        else if (this.coins_collected === 1) {
            return 1;
        }
        else if(this.coins_collected === 2) { 
            return 2;
        }
        else if(this.coins_collected === 3) {
            return 3;
        }
        else if(this.coins_collected === 4) {
            return 4;
        }
        else {
            return 5;
        }
    }   
}