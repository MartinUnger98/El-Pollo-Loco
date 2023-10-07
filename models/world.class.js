class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -0;
    lifeStatusBar = new LifeStatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    bossStatusBar = new BossStatusBar();
    throwableObjects = [];
    bottleCounter = 0;
    gameOver = false;
    background_music = new Audio('audio/game_music.mp3');
    chickenDead_music = new Audio('audio/chicken.mp3');
    walking_sound = new Audio('audio/running.mp3')
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/game_over.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    finalbossHurt_sound = new Audio('audio/finalboss_hurt.mp3')
    collectBottle_sound = new Audio('audio/bottle.mp3');
    collectCoin_sound = new Audio('audio/coin.mp3');
    lose_sound = new Audio('audio/game_over.mp3');
    bottleBroke_sound = new Audio('audio/glass.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    win_sound = new Audio('audio/win.mp3');
    

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
        if (!isMuted) {
            this.background_music.loop = true;
            this.background_music.volume = 0.3;    
            this.background_music.play();    
        }
        
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
            this.checkBackgroundMusic();
        }, 200);
    }

    checkBackgroundMusic() {
        setInterval(() => {
            if (isMuted) {
                this.background_music.pause();
            }
            else if (!gameOver) {
                this.background_music.play();
            }             
        }, 25);

    }


    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCounter > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50)
            this.throwableObjects.push(bottle);
            this.character.playSound(this.throw_sound);
            this.character.standingTime = 0;
            this.bottleIsThrown(this.level.bottles);
            this.bottleCounter--;
            this.bottleStatusBar.setPercentage(this.bottleCounter);
        }
    }  

    bottleIsThrown(array) {
        for (let obj of array) {
            if (obj.isThrown === false && obj.collected === true) {
                obj.isThrown = true;
                break;
            }
        }        
    }

    checkCollision() {
        this.checkCollisionJumpOnEnemy();
        this.checkCollisionCharacterEnemy();
        this.checkCollisionThrowableObject();
        this.checkCollisionCharacterCoin();
        this.checkCollisionCharacterBottle();
        this.checkCollisionCharacterFinalboss();
        
    }
    checkCollisionJumpOnEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.chickenIsDead = true;
            }
        });
    }

    checkCollisionCharacterEnemy() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !enemy.chickenIsDead) {
                this.character.hit();
                this.lifeStatusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionThrowableObject() {
        this.throwableObjects.forEach((bottle, index) => {
            this.checkCollisionBottleFinalboss(bottle, index);
            this.checkCollisionBottleGround(bottle, index);
        })
    }

    checkCollisionBottleFinalboss(bottle, index) {
        if (this.level.finalboss.isColliding(bottle)) {
            this.level.finalboss.hitFinalBoss();
            bottle.playSound(this.bottleBroke_sound);
            this.bossStatusBar.setPercentage(this.level.finalboss.energyFinalBoss);
            bottle.isColliding = true;
            setTimeout(() => {
                this.throwableObjects.splice(index, 1)
            }, 200);
        }
    }

    checkCollisionBottleGround(bottle, index) {
        if (!bottle.isAboveGround()) {
            bottle.isColliding = true;
            bottle.playSound(this.bottleBroke_sound);
            setTimeout(() => {
                this.throwableObjects.splice(index, 1)
            }, 50);
        }
    }

    checkCollisionCharacterCoin() {
        this.level.coins.forEach((coin, index)=> {
            if (this.character.isColliding(coin)) {
                coin.collected = true;
                coin.playSound(this.collectCoin_sound);
                this.coinStatusBar.setPercentage(this.checkCollected(this.level.coins));
                this.level.coins.splice(index, 1);
            }
        })
    }

    checkCollisionCharacterBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !bottle.isThrown && !bottle.collected) {
                bottle.collected = true;
                bottle.playSound(this.collectBottle_sound);
                this.bottleCounter++;
                this.bottleStatusBar.setPercentage(this.bottleCounter);
                this.level.bottles.splice(index, 1);
            }
        })
    }

    checkCollisionCharacterFinalboss() {
        if (this.character.isColliding(this.level.finalboss)) {
            this.gameOver = true;
            this.background_music.pause();
            this.walking_sound.pause();
            this.level.finalboss.clearAllIntervals();
            gameOver();
            this.level.finalboss.playSound(this.lose_sound);
        }
    }
    
    checkCollected(array) {
        let count = 0;
        for (let obj of array) {
            if (obj.collected === true) {
                count++;
            }
        }
        return count;
    }
   
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); //Back
        /* ---------- Space for fixed objects-----------*/
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.level.finalboss.hadFirstContact) {
            this.addToMap(this.bossStatusBar);
        }
        this.ctx.translate(this.camera_x, 0); //Forwards

        
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