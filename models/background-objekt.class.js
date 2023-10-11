class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 420-this.height;
    }
}