class Game {
    constructor() {
        this.tile = [

            3, 2, 2, 2, 2, 2, 6, 2, 2, 2,
            1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            3, 2, 6, 2, 2, 2, 11, 2, 2, 6,
            1, 0, 1, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 15, 6, 2, 2, 5, 14, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 15, 2, 11,
            3, 2, 2, 5, 2, 2, 2, 2, 2, 5

        ];

        //tile values
        this.tileCount = 0;
        this.sX = 0;
        this.sY = 0;
        this.dX = 0;
        this.dY = 0;
        this.wave = 1;

        this.col_Obj = [
            { x: 100, y: 400, w: 100, h: 100 }

        ];

    }
    random(no, toNo) { return Math.round(Math.random() * (no - toNo) + no) }

    deg2rad(deg) { return deg * Math.PI / 180; }

    renderEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].render();
        }
    }

    check_collisiion() {
        for (let i = 0; i < this.col_Obj.length; i++) {
            let obj = this.col_obj[i];
            for (let j = 0; j < this.col.length; j++) {
                let othr = this.col_obj[j];
                if (i != j && obj.x < othr.x + othr.w && obj.x > othr.x) {
                    console.logO('gooooo')
                }
            }
        }
    }

    render_world() {
        ctx.save();

        for (let i = this.tile.length; i > -1; --i) {

            this.sX = (this.tile[i] % 10) * 128;
            this.sY = Math.floor(this.tile[i] / 10) * 128;

            this.dX = (i % 10) * 100;
            this.dY = Math.floor(i / 10) * 100;
            ctx.drawImage(bg_tileSet, this.sX, this.sY, 128, 128, this.dX, this.dY, 100, 100);


        }
        ctx.restore();

        ctx.save();
        ctx.drawImage(bush, 510, 350, 50, 50);
        ctx.drawImage(bush, 110, 110, 80, 80);
        ctx.drawImage(bush, 400, 270, 80, 80);
        ctx.drawImage(small_bush, 80, 390, 50, 50);
        ctx.drawImage(bush, 100, 400, 100, 100);
        ctx.drawImage(lakdi, 300, 300, 30, 30);

        ctx.drawImage(crateWood, 500, 290, 35, 35);
        ctx.restore();


        //gates
        ctx.save();
        ctx.translate(1010, 160)
        ctx.rotate(game.deg2rad(90));
        ctx.drawImage(gate, 90 / 2, 18 / 2, 90, 18);
        ctx.restore();

        ctx.save();
        ctx.translate(1010, -40)
        ctx.rotate(game.deg2rad(90));
        ctx.drawImage(gate, 90 / 2, 18 / 2, 90, 18);
        ctx.restore();

        ctx.save();
        ctx.translate(1010, 460)
        ctx.rotate(game.deg2rad(90));
        ctx.drawImage(gate, 90 / 2, 18 / 2, 90, 18);
        ctx.restore();

        if (enemies.length < 1) {
            // cancelAnimationFrame(animationFrame);
            // clearTimeout(enMovetimeout);
            alert("You Win");
            this.wave++;
            alert('wave ' + this.wave);

            // sponEnemy(Math.floor(enemiesSankhya+=enemiesSankhya/2));
            sponEnemy(enemiesSankhya += 2);

        }
    }


}