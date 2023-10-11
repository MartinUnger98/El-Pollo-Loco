class FinalBoss extends MoveableObject {

    width = 200;
    height = 400;
    y = 0;
    i = 0;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 2;
        this.x = 2000;
        this.animate();
    }


    /**
     * drains energy from the target
     * 
     */
    hitFinalBoss() {
        this.energyFinalBoss -= 10;    
        if (this.energyFinalBoss < 0) {
            this.energyFinalBoss = 0;
        }
        else {
            this.lastHitFinalBoss = new Date().getTime();
        }
    }


    /**
     * 
     * @returns if the last hit was 1 second ago or not
     */
    isHurtFinalBoss() {
        let timepassed = new Date().getTime() - this.lastHitFinalBoss;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * 
     * @returns if the energy is 0 
     */
    isDeadFinalBoss() {
        return this.energyFinalBoss == 0;
    }


    /**
     * animation of the final boss
     * 
     */
    finalBossAnnimation() {
        if (this.isDeadFinalBoss()) {
            this.finalBossAnnimationDead();
        }
        else if (this.isHurtFinalBoss()) {
            this.finalBossAnnimationHurt();
        }        
        else if (this.i < 15) {
            this.finalBossAnnimationAlert();     
        }
        else if (this.i < 30) {
            this.finalBossAnnimationAttack();
        }
        else {        
            this.finalBossAnnimationWalk();
        }
        this.i++;    
        this.finalBossFirstContact();   
    }


    /**
     * animation at death
     * 
     */
    finalBossAnnimationDead() {
        this.playAnnimation(this.IMAGES_DEAD);
        world.gameOver = true;
        world.background_music.pause()
        setTimeout(() => {
            this.clearAllIntervals();
            this.playSound(world.win_sound);
            gameOverWin();
        }, 1500);
    }


    /**
     * animation at hurt
     * 
     */
    finalBossAnnimationHurt() {
        this.playAnnimation(this.IMAGES_HURT);
    }


    /**
     * animation at alert
     * 
     */
    finalBossAnnimationAlert() {
        this.playAnnimation(this.IMAGES_ALERT); 
    }


    /**
     * animation at attack
     * 
     */
    finalBossAnnimationAttack() {
        this.playAnnimation(this.IMAGES_ATTACK);
    }
    

    /**
     * animation at walking
     * 
     */
    finalBossAnnimationWalk() {
        this.playAnnimation(this.IMAGES_WALK);
    }


    /**
     * checks if the character had first contact with the final boss
     * 
     */
    finalBossFirstContact() {
        if (world.character.x > 1425 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
        }
    }


    /**
     * animates the final boss
     * 
     */
    animate() {
        setInterval(() => {
            this.finalBossAnnimation();            
        }, 200);
        setInterval(() => {
            if (this.hadFirstContact && this.i > 30 && !this.isDeadFinalBoss() && !this.isHurtFinalBoss()) {
                this.x -= this.speed;    
            }        
        }, 1000 / 60);
    }
}
