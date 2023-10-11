class LifeStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 10;
        this.y = -10;
        this.width = 200;
        this.height = 45;
    }
 

    /**
     * sets the current percentage of the status-bar
     * 
     * @param {*} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }  


    /**
     * 
     * @returns the number of the picture with the right percentage
     */
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