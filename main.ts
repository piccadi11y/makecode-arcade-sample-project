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

class Player extends Sprite {
    // currently only being used for namesake purposes
    // might've had a use in another game
    // kept for clarity's sake
}

class GameManager {
    _player: Player;
    _target: Vector2;
    _current_level: number;
    _winning_level: number;
    

    constructor(winning_level: number) {
        this._winning_level = winning_level;
    }

    setPlayer (p: Player): void {
        this._player = p;
    }
    getPlayer (): Player {
        return this._player;
    }

    getTarget(): Vector2 {
        return this._target;
    }

    getLevel(): number {
        return this._current_level;
    }

    hasWon(): boolean {
        return this._current_level == this._winning_level;
    }

    loadLevel(level_n: number): Array<Array<boolean>> {
        this._current_level = level_n;
        let level: tiles.TileMapData;
        
        switch (level_n) {
            case 1:
                this._target = new Vector2(12, 7);
                level = assets.tilemap`level_1`;
                break;
            case 2:
                this._target = new Vector2(26, 6);
                level = assets.tilemap`level_2`;
                break;
            case 3:
                this._target = new Vector2(4, 28);
                level = assets.tilemap`level_3`;
                break;
            default: return [[false]];
                
        }
        tiles.setCurrentTilemap(level);
        tiles.placeOnRandomTile(this._player, assets.tile`spawn_tile`);

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
            case 32: return [
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
            ]
        }
        return [[false]];
    }
}

const ACCELERATION: number = .5;
const DECELERATION: number = .1;
const MAX_VELOCITY: number = 35;
const DRAG: Vector2 = new Vector2(0.3, 1);
const PARTICLE_SPAWN_COUNT: number = 144;
const PARTICLE_SPAWN_VELOCITY: number = 100;
const PARTICLE_DECEL_FACTOR: number = .95;
const PARTICLE_DECEL_COUNT_MS: number = 10;
const PARTICLE_COOLDOWN: number = 2000; //ms
const PARTICLE_LIFE: number = 2500;
const PARTICLE_LIFE_VARIATION: number = 500;
const SHOW_SONAR_PULSE_DEBUG: boolean = false;

let game_manager: GameManager = new GameManager(3);
let input_direction: Vector2 = Vector2.ZERO;
let shake_cooldown: number = 0;
let bCanSpawnParticles: boolean = true;
let particle_array: Array<Sprite> = [];
let particle_calc_cooldown: number = PARTICLE_DECEL_COUNT_MS;
let pAvgLife: number = 0;

let tilemap_flip: Array<Array<boolean>> = [[]];
interface iActive_timeouts {
    [key: string]: number;
}
let active_timeouts: iActive_timeouts = {};



function handle_movement_input (pressure: Vector2 = new Vector2(512, 512)): void {


    let pressure_scale: Vector2 = new Vector2(pressure.x / 512, pressure.y / 512);

    input_direction.x = controller.dx();
    input_direction.y = controller.dy();
    if (input_direction.x) {
        input_direction.x /= input_direction.x * input_direction.x < 0 ? -1 : 1;
        if (pressure_scale.x) input_direction.x *= pressure_scale.x;
    }
    if (input_direction.y) {
        input_direction.y /= input_direction.y * input_direction.y < 0 ? -1 : 1;
        if (pressure_scale.y) input_direction.y *= pressure_scale.y;
    }
}

function handle_spawn_particles(): void {
    if (bCanSpawnParticles) {
        // enables me to keep dampening logic for if I ever want it enabled, without killing perf
        // enabling 'SpriteFlag.DestroyOnWall` disables aforementioned logic
        // too many sprites will still impact performance, just no dampening. potentially fix later, mitigated by shortening particle life
        setTimeout(() => particle_array = [], PARTICLE_COOLDOWN-1);
        pAvgLife = 0;
        music.sonar.play();
        let p: Player = game_manager.getPlayer();
        for (let i = 0; i < PARTICLE_SPAWN_COUNT; i++) {
            let sp: Sprite = sprites.createProjectileFromSprite(assets.image`particle0`, p, Math.sin(i/PARTICLE_SPAWN_COUNT*(Math.PI * 2)) * PARTICLE_SPAWN_VELOCITY, Math.cos(i/PARTICLE_SPAWN_COUNT*(Math.PI * 2)) * PARTICLE_SPAWN_VELOCITY);
            sp.setFlag(SpriteFlag.BounceOnWall, false);
            sp.setFlag(SpriteFlag.DestroyOnWall, !SHOW_SONAR_PULSE_DEBUG);
            sp.setFlag(SpriteFlag.AutoDestroy, false);
            let pLife: number = Math.randomRange(PARTICLE_LIFE, PARTICLE_LIFE + PARTICLE_LIFE_VARIATION);
            pAvgLife += pLife;
            sp.lifespan = pLife;
            
            particle_array.push(sp);
        }
        bCanSpawnParticles = false;
        setTimeout(() => bCanSpawnParticles = true, PARTICLE_COOLDOWN);
    }
}

function init_scene (): void {
    scene.setBackgroundColor(1);

    info.setLife(3);
    game.stats = true;
    
}

function init_player (): void {
    let p: Player = sprites.create(assets.image`submarine`, SpriteKind.Player);
    scene.cameraFollowSprite(p);
    game_manager.setPlayer(p);
    scene.onHitWall(SpriteKind.Player, () => {
        if (shake_cooldown == 0) {
            info.changeLifeBy(-1);
            let vel: Vector2 = new Vector2(game_manager.getPlayer().vx, game_manager.getPlayer().vy)
            let shakeMult: number = ((vel.x * (vel.x < 0 ? -1 : 1)) + (vel.y * (vel.y < 0 ? -1 : 1))) / 50;
            scene.cameraShake(5 * shakeMult, 500 * shakeMult);
            shake_cooldown = 500 * shakeMult;
            setTimeout(() => shake_cooldown = 0, shake_cooldown);
        }
    });

    scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, () => {
        let projectiles: Sprite[] = sprites.allOfKind(SpriteKind.Projectile);
        if (projectiles.length > 0) for (let i = 0; i < projectiles.length; i++) projectiles[i].destroy();
        
        if (game_manager.hasWon()) game.gameOverPlayerWin(1);
        else tilemap_flip = game_manager.loadLevel(game_manager.getLevel() + 1);
    });

}

function init_input(): void {
    
    // this logic works in theory, but simulation doesn't seem to simulate the analog stick being anythiing other than 0,512. not too important though for this, so not worried
    controller.up.onEvent(ControllerButtonEvent.Pressed, () => handle_movement_input(new Vector2(0, controller.up.pressureLevel() - controller.down.pressureLevel())));
    controller.up.onEvent(ControllerButtonEvent.Released, () => handle_movement_input(new Vector2(0, controller.up.pressureLevel() - controller.down.pressureLevel())));
    controller.down.onEvent(ControllerButtonEvent.Pressed, () => handle_movement_input(new Vector2(0, controller.down.pressureLevel() - controller.up.pressureLevel())));
    controller.down.onEvent(ControllerButtonEvent.Released, () => handle_movement_input(new Vector2(0, controller.down.pressureLevel() - controller.up.pressureLevel())));
    controller.left.onEvent(ControllerButtonEvent.Pressed, () => handle_movement_input(new Vector2(controller.left.pressureLevel() - controller.right.pressureLevel(), 0)));
    controller.left.onEvent(ControllerButtonEvent.Released, () => handle_movement_input(new Vector2(controller.left.pressureLevel() - controller.right.pressureLevel(), 0)));
    controller.right.onEvent(ControllerButtonEvent.Pressed, () => handle_movement_input(new Vector2(controller.right.pressureLevel() - controller.left.pressureLevel(), 0)));
    controller.right.onEvent(ControllerButtonEvent.Released, () => handle_movement_input(new Vector2(controller.right.pressureLevel() - controller.left.pressureLevel(), 0)));


    controller.A.onEvent(ControllerButtonEvent.Pressed, handle_spawn_particles);
}

function init (): void {
    init_scene();
    init_player();
    init_input();

    
    
    tilemap_flip = game_manager.loadLevel(1);
    if (tilemap_flip.length < 2) {/**error state */ game.reset(); }
    
    scene.onHitWall(SpriteKind.Projectile, (sprite: Sprite, location: tiles.Location) => {
        sprite.vx = 0;
        sprite.vy = 0;
        let loc: Vector2 = new Vector2(location.column, location.row);
        let key = `x${loc.x}y${loc.y}`;
        let target: Vector2 = game_manager.getTarget();
        if (!tilemap_flip[loc.x][loc.y]) {
            tilemap_flip[loc.x][loc.y] = true;
            if (loc.x == target.x && loc.y == target.y) {
                tiles.setTileAt(location, assets.tile`myTile3`);
                tiles.setWallAt(location, false);
            }
            else {
                tiles.setTileAt(location, assets.tile`myTile2`);
                active_timeouts[key] = setTimeout(() => {
                    tiles.setTileAt(location, assets.tile`myTile1`);
                    tilemap_flip[loc.x][loc.y] = false;
                    delete active_timeouts[key]
                }, pAvgLife / PARTICLE_SPAWN_COUNT);
            }
        } else {
            if (loc.x == target.x && loc.y == target.y) return;
            clearTimeout(active_timeouts[key]);
            active_timeouts[key] = setTimeout(() => {
                tiles.setTileAt(location, assets.tile`myTile1`);
                tilemap_flip[loc.x][loc.y] = false;
                delete active_timeouts[key]
            }, pAvgLife / PARTICLE_SPAWN_COUNT);
        }
});
    
    game.onUpdate(process);
}

function calculate_velocity(current: Vector2): Vector2 {
    let nX: number = current.x;
    let nY: number = current.y;

    if (input_direction.x != 0) {
        nX = Math.clamp(-MAX_VELOCITY, MAX_VELOCITY, current.x + (input_direction.x * ACCELERATION));
    } else if (current.x != 0) {
        if (current.x > -.05 && current.x < .05) nX = 0;
        else nX -= DRAG.x * DECELERATION * nX < 0 ? -1 : 1;
    }

    if (input_direction.y != 0) {
        nY = Math.clamp(-MAX_VELOCITY, MAX_VELOCITY, current.y + (input_direction.y * ACCELERATION));
    } else if (current.y != 0) {
        if (current.y > -.05 && current.y < .05) nY = 0;
        else nY -= DRAG.y * DECELERATION * nY < 0 ? -1 : 1;
    }
    
    return new Vector2(nX, nY);
}

function process(): void {
    particle_calc_cooldown--;
    let p: Player = game_manager.getPlayer();


    let updated_velocity: Vector2 = calculate_velocity(new Vector2(p.vx, p.vy != undefined ? p.vy : 0));
    p.setVelocity(updated_velocity.x, updated_velocity.y);


    // process particles
    let alive: boolean = false;
    for (let i = 0; i < particle_array.length; i++) {
        if (particle_array[i].flags == 0) {
            alive = true;

            if (particle_calc_cooldown <= 0) {
                let pt: Sprite = particle_array[i];
                let vel: Vector2 = new Vector2(pt.vx, pt.vy);

                let mag: number = vel.mag();
                mag -= PARTICLE_DECEL_FACTOR * .001;
                if (vel.x != 0) {
                    vel.x *= PARTICLE_DECEL_FACTOR;
                    if (vel.x > -.7 && vel.x < .7) vel.x = 0;
                }
                if (vel.y != 0) {
                    vel.y *= PARTICLE_DECEL_FACTOR;
                    if (vel.y > -.7 && vel.y < .7) vel.y = 0;
                }
                pt.setVelocity(vel.x, vel.y);
            }
        }
    }
    if (!alive && particle_array.length > 0) {
        particle_array = [];
    }

    if (particle_calc_cooldown <= 0) particle_calc_cooldown = PARTICLE_DECEL_COUNT_MS;
}

init(); 