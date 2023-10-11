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
    coinsCounter = 0;
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


    /**
     * allows the character to get all information of the world
     * 
     */
    setWorld() {
        this.character.World = this;
        if (!isMuted) {
            this.background_music.loop = true;
            this.background_music.volume = 0.3;    
            this.background_music.play();    
        }
    }


    /**
     * starts the interval for the game
     * 
     */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkBackgroundMusic();
        }, 25);
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionThrowableObject();
        }, 200);
    }


    /**
     * checks if the background music is muted 
     * 
     */
    checkBackgroundMusic() {
        if (isMuted) {
            this.background_music.pause();
        }
        else if (!this.gameOver) {
            this.background_music.play();
        }          
    }



    /**
     * checks if the button D is pressed and if there are bottles to throw left and throws a bottle if both is true
     * 
     */
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


    /**
     * sets object is thrown to true to one bottle in the array
     *  
     * @param {array} array 
     */
    bottleIsThrown(array) {
        for (let obj of array) {
            if (obj.isThrown === false && obj.collected === true) {
                obj.isThrown = true;
                break;
            }
        }        
    }


    /**
     * checks all collisions in the game
     * 
     */
    checkCollision() {
        this.checkCollisionJumpOnEnemy();
        this.checkCollisionCharacterEnemy();
        this.checkCollisionCharacterCoin();
        this.checkCollisionCharacterBottle();
        this.checkCollisionCharacterFinalboss();
    }


    /**
     * checks if the character jumps on an enemy
     * 
     */
    checkCollisionJumpOnEnemy() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                if (!enemy.chickenIsDead) {
                    this.character.jump();
                };
                enemy.chickenIsDead = true;
                
            }
        });
    }


    /**
     * checks collision between character and enemy
     * 
     */
    checkCollisionCharacterEnemy() {
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !enemy.chickenIsDead) {
                this.character.hit();
                this.lifeStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * checks collisions of the bottles
     * 
     */
    checkCollisionThrowableObject() {
        this.throwableObjects.forEach((bottle, index) => {
            this.checkCollisionBottleFinalboss(bottle, index);
            this.checkCollisionBottleGround(bottle, index);
        });
    }


    /**
     * checks collision between bottle and final boss
     * 
     * @param {object} bottle 
     * @param {number} index 
     */
    checkCollisionBottleFinalboss(bottle, index) {
        if (this.level.finalboss.isColliding(bottle)) {
            this.level.finalboss.hitFinalBoss();
            bottle.playSound(this.bottleBroke_sound);
            this.bossStatusBar.setPercentage(this.level.finalboss.energyFinalBoss);
            bottle.isColliding = true;
            setTimeout(() => {
                this.throwableObjects.splice(index, 1)
            }, 200);
        };
    }


    /**
     * checks collision between bottle and ground
     * 
     * @param {object} bottle 
     * @param {number} index 
     */
    checkCollisionBottleGround(bottle, index) {
        if (!bottle.isAboveGround()) {
            bottle.isColliding = true;
            bottle.playSound(this.bottleBroke_sound);
            setTimeout(() => {
                this.throwableObjects.splice(index, 1)
            }, 50);
        };
    }


    /**
     * checks collision between character and coin
     * 
     */
    checkCollisionCharacterCoin() {
        this.level.coins.forEach((coin, index)=> {
            if (this.character.isColliding(coin)) {
                coin.collected = true;
                coin.playSound(this.collectCoin_sound);
                this.coinsCounter = this.coinsCounter + 20;
                this.coinStatusBar.setPercentage(this.coinsCounter);
                this.level.coins.splice(index, 1);
            }
        });
    }


    /**
     * checks collision between character and bottle
     * 
     */
    checkCollisionCharacterBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !bottle.isThrown && !bottle.collected) {
                bottle.collected = true;
                bottle.playSound(this.collectBottle_sound);
                this.bottleCounter++;
                this.bottleStatusBar.setPercentage(this.bottleCounter);
                this.level.bottles.splice(index, 1);
            }
        });
    }


    /**
     * checks collison between character and final boss
     * 
     */
    checkCollisionCharacterFinalboss() {
        if (this.character.isColliding(this.level.finalboss)) {
            this.gameOver = true;
            this.background_music.pause();
            this.walking_sound.pause();
            this.level.finalboss.clearAllIntervals();
            gameOverLose();
            this.level.finalboss.playSound(this.lose_sound);
        };
    }
       
    /**
     * draws everything in the canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawWorld();
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    /**
     * draws all objects of the world
     * 
     */
    drawWorld() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.level.finalboss.hadFirstContact) {
            this.addToMap(this.bossStatusBar);
        };
        this.ctx.translate(this.camera_x, 0);        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.finalboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * adds the object of the array to the world
     * 
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object =>{
            this.addToMap(object);
        })
    }


    /**
     * adds the object to the world
     * 
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        };
        mo.draw(this.ctx);
        if (mo.otherDirection) {
           this.flipImageBack(mo);
        };
    }


    /**
     * flips the image of the object in the other direction
     * 
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * flips the image back of the object 
     * 
     * @param {object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}