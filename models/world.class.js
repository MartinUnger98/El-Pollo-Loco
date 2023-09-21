class World {
    character = new Character();
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken
    ];
    clouds = [
        new Cloud,
    ]
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png',0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.World = this;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        
        
        




        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });

    }
    addObjectsToMap(objects) {
        objects.forEach(object =>{
            this.addToMap(object);
        })

    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}