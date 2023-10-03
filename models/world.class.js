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
            this.character.standingTime = 0;
        }
    }

    checkCollision() {
        this.checkCollisionJumpOnEnemy();
        this.checkCollisionCharacterEnemy();
        this.checkCollisionThrowableObject();
        this.checkCollisionCharacterCoin();
        this.checkCollisionCharacterBottle();
    }
    checkCollisionJumpOnEnemy() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.chickenIsDead = true;
            }
        });
    }

    checkCollisionCharacterEnemy() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !enemy.chickenIsDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionThrowableObject() {
        this.throwableObjects.forEach((bottle, index) => {
            this.checkCollisionBottleFinalboss(bottle, index);
        })
    }

    checkCollisionBottleFinalboss(bottle, index) {
        if (this.level.finalboss.isColliding(bottle)) {
            this.level.finalboss.hitFinalBoss();
            setTimeout(() => {
                this.throwableObjects.splice(index, 1)
            }, 50);
        }
    }

    checkCollisionCharacterCoin() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                coin.collected = true;
            }
        })
    }

    checkCollisionCharacterBottle() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                bottle.collected = true;
            }
        })
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        /* ---------- Space for fixed objects-----------*/
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.finalboss);
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