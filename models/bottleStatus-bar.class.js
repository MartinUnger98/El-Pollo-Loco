class BottleStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    bottles_collected = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.x = 10;
        this.y = 60;
        this.width = 200;
        this.height = 45;
    }

    setPercentage(bottles_collected) {
        this.bottles_collected = bottles_collected;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }  

    resolveImageIndex() {
        if(this.bottles_collected === 10) {
            return 5;
        }
        else if (this.bottles_collected >= 8) {
            return 4;
        }
        else if(this.bottles_collected >= 6) { 
            return 3;
        }
        else if(this.bottles_collected >= 4) {
            return 2;
        }
        else if(this.bottles_collected >= 1) {
            return 1;
        }
        else {
            return 0;
        }
    }   
}