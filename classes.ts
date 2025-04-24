class Vector2 {
    static ZERO: Vector2 = new Vector2(0, 0);
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    static normalize(v: Vector2): Vector2 {
        let mag: number = v.mag();
        return new Vector2(v.x / mag, v.y / mag);
    }

    mag(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}

class GameObject {
    loc: Vector2;
    img: Sprite;
    constructor(startingLoc: Vector2, sprite: String) {
        this.loc = startingLoc;
        // this.img.
    }
}

class Player extends Sprite {
    
}

class SubmarineParticle extends Sprite {
    countdown(): void {
        setTimeout(() => {
            this.destroy();
        }, 1000)
    }
}

class GameManager {
    _player: Player;
    

    constructor () {
    }

    setPlayer (p: Player): void {
        this._player = p;
    }
    getPlayer (): Player {
        return this._player;
    }

    loadLevel (level: tiles.TileMapData): Array<Array<boolean>> {
        tiles.setCurrentTilemap(level);

        switch (level.width) {
            case 16: return [
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
            ]
        }
        return [[false]];
    }
}