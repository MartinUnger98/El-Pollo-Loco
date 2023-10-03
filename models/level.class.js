class Level {
    finalboss;
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2157;

    constructor(finalboss, enemies, clouds, backgroundObjects, coins, bottles) {
        this.finalboss = finalboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}