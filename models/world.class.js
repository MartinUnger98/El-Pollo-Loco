class World {
    character = new Character();
    level = level1;
    canvas
    ctx;
    keyboard;
    camera_x = -0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.World = this;
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollision() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.chickenIsDead = true;
            }
            else if(this.character.isColliding(enemy) && !enemy.chickenIsDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            };
            
        });
    }

    th
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level. backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        /* ---------- Space for fixed objects-----------*/
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
     
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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);

        if (mo.otherDirection) {
           this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}