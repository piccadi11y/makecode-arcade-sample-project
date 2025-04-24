const ACCELERATION: number = .5;
const DECELERATION: number = .1;
const MAX_VELOCITY: number = 35;
const DRAG: Vector2 = new Vector2(0.3, 1);
const PARTICLE_SPAWN_COUNT: number = 18;
const PARTICLE_SPAWN_VELOCITY: number = 50;
const PARTICLE_DECEL_FACTOR: number = .95;
const PARTICLE_DECEL_COUNT_MS: number = 10;
const PARTICLE_COOLDOWN: number = 3000; //ms
const PARTICLE_LIFE: number = 5000;
const PARTICLE_LIFE_VARIATION: number = 500;

let game_manager: GameManager = new GameManager();
let input_direction: Vector2 = Vector2.ZERO;
let shake_cooldown: number = 0;
let bCanSpawnParticles: boolean = true;
let particle_array: Array<Sprite> = [];
let particle_calc_cooldown: number = PARTICLE_DECEL_COUNT_MS;
let pAvgLife: number = 0;

let tilemap_flip: Array<Array<boolean>> = [[]];


function handle_movement_input (pressure: Vector2 = new Vector2(512, 512)): void {
// function handle_movement_input (): void {
    // console.log("event")


    let pressure_scale: Vector2 = new Vector2(pressure.x / 512, pressure.y / 512);
    // console.log(pressure.x)

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

    // console.log(`${input_direction.x}, ${input_direction.y}`);
}

function handle_spawn_particles(): void {
    // console.log("spawn")
    if (bCanSpawnParticles) {
        pAvgLife = 0;
        music.sonar.play();
        let p: Player = game_manager.getPlayer();
        for (let i = 0; i < PARTICLE_SPAWN_COUNT; i++) {
            // let sp: Sprite = sprites.createProjectileFromSprite(assets.image`particle`, p, 20, 20);
            let sp: Sprite = sprites.createProjectileFromSprite(assets.image`particle0`, p, Math.sin(i/PARTICLE_SPAWN_COUNT*(Math.PI * 2)) * PARTICLE_SPAWN_VELOCITY, Math.cos(i/PARTICLE_SPAWN_COUNT*(Math.PI * 2)) * PARTICLE_SPAWN_VELOCITY);
            sp.setFlag(SpriteFlag.BounceOnWall, false);
            sp.setFlag(SpriteFlag.DestroyOnWall, false);
            sp.setFlag(SpriteFlag.AutoDestroy, false);
            // setTimeout(() => sp.destroy(), Math.randomRange(5000, 10000));
            let pLife: number = Math.randomRange(PARTICLE_LIFE, PARTICLE_LIFE + PARTICLE_LIFE_VARIATION);
            pAvgLife += pLife;
            sp.lifespan = pLife;
            // let sTime: number = game.runtime();
            
            particle_array.push(sp);
        }
        bCanSpawnParticles = false;
        setTimeout(() => bCanSpawnParticles = true, PARTICLE_COOLDOWN);
    }
}

function init_scene (): void {
    scene.setBackgroundColor(1);

    info.setLife(3);
    // game.debug = true;
    game.stats = true;
    
}

function init_player (): void {
    let p: Player = sprites.create(assets.image`submarine`, SpriteKind.Player);
    scene.cameraFollowSprite(p);
    game_manager.setPlayer(p);
    // controller.moveSprite(p, 50, 50);
    scene.onHitWall(SpriteKind.Player, () => {
        if (shake_cooldown == 0) {
            let vel: Vector2 = new Vector2(game_manager.getPlayer().vx, game_manager.getPlayer().vy)
            let shakeMult: number = ((vel.x * (vel.x < 0 ? -1 : 1)) + (vel.y * (vel.y < 0 ? -1 : 1))) / 50;
            // game_manager.getPlayer().sayText(shakeMult, 1000);
            scene.cameraShake(5 * shakeMult, 500 * shakeMult);
            shake_cooldown = 500 * shakeMult;
            setTimeout(() => shake_cooldown = 0, shake_cooldown);
        }
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

    
    
    tilemap_flip = game_manager.loadLevel(assets.tilemap`level_1`);
    tiles.placeOnRandomTile(game_manager.getPlayer(), assets.tile`spawn_tile`);
    
    scene.onHitWall(SpriteKind.Projectile, (sprite: Sprite, location: tiles.Location) => {
                
        sprite.vx = 0;
        sprite.vy = 0;
        let loc: Vector2 = new Vector2(location.column, location.row);
        console.log(`x: ${loc.x}, y: ${loc.y}`);
        if (!tilemap_flip[loc.x][loc.y]) {
            console.log(`less than ${PARTICLE_SPAWN_COUNT}???`);
            tilemap_flip[loc.x][loc.y] = true;
            tiles.setTileAt(location, assets.tile`myTile2`);
            setTimeout(() => {
                tiles.setTileAt(location, assets.tile`myTile1`);
                tilemap_flip[loc.x][loc.y] = false;
            }, pAvgLife / PARTICLE_SPAWN_COUNT);
        }
        // console.log(location.bottom.toString())
        // console.log(location.getNeighboringLocation(CollisionDirection.Bottom).getImage());
        
        // let neighbours: Array<boolean> = [];
        // neighbours[0] = tiles.getTileLocation(location.column - 1, location.row - 1).isWall();
        // console.log(neighbours[0]);

        // --- on hit
        // global array based on tilemap size arr<bool>[16][16] (etc) - column, row -
        // flip hit tile
        // only perform tile changing logic if not flipped
        // use tile resetting timeout to flip back so can be changed again
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
    // p.sayText(`x: ${input_direction.x}, y: ${input_direction.y}`, 2);
    // controller.
    // console.log(controller.dx);


    let updated_velocity: Vector2 = calculate_velocity(new Vector2(p.vx, p.vy != undefined ? p.vy : 0));
    p.setVelocity(updated_velocity.x, updated_velocity.y);


    // process particles
    let alive: boolean = false;
    for (let i = 0; i < particle_array.length; i++) {
        // p.sayText(`${particle_array[i].flags}`, 2);
        if (particle_array[i].flags == 0) {
            alive = true;

            if (particle_calc_cooldown <= 0) {
                let pt: Sprite = particle_array[i];
                let vel: Vector2 = new Vector2(pt.vx, pt.vy);
                let norm: Vector2 = Vector2.normalize(vel);

                // p.sayText(`x: ${norm.x}, y: ${norm.y}`, 1000);

                let mag: number = vel.mag();
                mag -= PARTICLE_DECEL_FACTOR * .001;
                if (vel.x != 0) {
                    // vel.x -= /*((2-(totv / PARTICLE_SPAWN_VELOCITY)) **/ (norm.x / vel.mag()) * ((PARTICLE_DECEL_FACTOR * .001 ) * pt.vx < 0 ? -1 : 1) //* (PARTICLE_SPAWN_VELOCITY / vel.x);
                    // vel.x -= (mag * (norm.y * norm.y < 0 ? -1 : 1)) * pt.vx < 0 ? -1 : 1;
                    vel.x *= PARTICLE_DECEL_FACTOR;
                    if (vel.x > -.7 && vel.x < .7) vel.x = 0;
                }
                if (vel.y != 0) {
                    // vel.y -= /*((2-(totv / PARTICLE_SPAWN_VELOCITY)) **/ (norm.y / vel.mag()) * ((PARTICLE_DECEL_FACTOR * .001) * pt.vy < 0 ? -1 : 1) //* (PARTICLE_SPAWN_VELOCITY / vel.y);
                    // vel.y -= (mag * (norm.x * norm.x < 0 ? -1 : 1)) * pt.vy < 0 ? -1 : 1;
                    vel.y *= PARTICLE_DECEL_FACTOR;
                    if (vel.y > -.7 && vel.y < .7) vel.y = 0;
                }
                pt.setVelocity(vel.x, vel.y);
            }
        }
    }
    if (!alive && particle_array.length > 0) {
        particle_array = [];
        // console.log("all dead");
    }
    // p.sayText(`alive: ${alive}`, 2)

    if (particle_calc_cooldown <= 0) particle_calc_cooldown = PARTICLE_DECEL_COUNT_MS;
}

init(); 