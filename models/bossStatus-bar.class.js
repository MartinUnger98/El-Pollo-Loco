class BossStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/0.png',     
        'img/7_statusbars/2_statusbar_endboss/20.png',     
        'img/7_statusbars/2_statusbar_endboss/40.png',     
        'img/7_statusbars/2_statusbar_endboss/60.png',     
        'img/7_statusbars/2_statusbar_endboss/80.png',     
        'img/7_statusbars/2_statusbar_endboss/100.png',     
    ];

    percentage = 100

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 500;
        this.y = 30;
        this.width = 200;
        this.height = 45;
    }

   
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }  

    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 60) {
            return 4;
        }
        else if(this.percentage > 40) { 
            return 3;
        }
        else if(this.percentage > 20) {
            return 2;
        }
        else if(this.percentage > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }   
}