class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;
   
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')

        this.x =  100 + Math.random() * 5000;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}