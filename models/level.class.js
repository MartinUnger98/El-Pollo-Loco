class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2157;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}