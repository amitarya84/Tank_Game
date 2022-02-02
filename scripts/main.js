const canv = document.querySelector('#canv');
const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 700;

let animationFrame;
let enMovetimeout;
let blast_interval;
let blast_frame = 1;
let playerHealth = 5;
let enemiesHealth = 2;
let fireRate = 1;
let enemiesSankhya = 5;
let keys = [];
// let explosion = new Array();


const game = new Game();
const player = new Tank(tank_img1, 50, 100, 40, 50, true, playerHealth);
const enemies = [];
// game.col_Obj.push({x:tank.x, y:tank)

function sponEnemy(sankhya) {

    for (let i = 0; i < sankhya; i++) {
        enemies.push(new Tank(tank_img2, Math.random() * canv.width, Math.random() * canv.height, 40, 50, false, enemiesHealth))
    }

}
function moveEnemies() {
    enMovetimeout = setTimeout(moveEnemies, 1500);

    for (let i = 0; i < enemies.length; i++) {

        let num = Math.round(Math.random() * 6);
        let en = enemies[i];
        if (num === 0) {
            en.xVel = game.random(4,6);
            en.yVel = 0;
            en.a = game.deg2rad(-90);

        } else if (num === 1) {
            en.xVel = game.random(-4,-6);;
            en.yVel = 0;
            en.a = game.deg2rad(90);

        } else if (num === 2) {
            en.yVel = game.random(4,6);
            en.xVel = 0;
            en.a = game.deg2rad(0);

        } else if (num === 3) {
            en.yVel = game.random(-4,-6);;
            en.xVel = 0;
            en.a = game.deg2rad(180);

        } else{

            en.fire = true;
            setTimeout(() => { en.fire = false; }, 100);

            let xVel;
            let yVel, a;

            if (en.a == game.deg2rad(90)) {
                xVel = -8;
                yVel = 0;
                a = game.deg2rad(-90);

            } else if (en.a == game.deg2rad(180)) {
                xVel = 0;
                yVel = -8;
                a = game.deg2rad(0);

            } else if (en.a == game.deg2rad(-90)) {
                xVel = 8;
                yVel = 0;
                a = game.deg2rad(90);

            } else if (en.a == game.deg2rad(0)) {
                xVel = 0;
                yVel = 8;
                a = game.deg2rad(180);
            }

            en.bullet.push({
                x: en.x,
                y: en.y,
                w: 8,
                h: 16,
                a: a,
                xVel: xVel,
                yVel: yVel,
                img: bult_red

            })

        }
    }
}

moveEnemies();
sponEnemy(enemiesSankhya);

function animate() {
    animationFrame = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canv.width, canv.height);
    game.render_world();
    player.render();
    player.move();
    game.renderEnemies();

    //render_blast();

}

animate();
