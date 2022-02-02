class Tank {

    constructor(img, x, y, w, h, player, health) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xVel = 0;
        this.yVel = 0;
        this.img = img;
        this.player = player || false;
        this.speed = 3;
        this.a = 0;
        this.fire = false;
        this.bullet = [];
        this.explosions = [];
        this.healthBar = 50;
        this.max_health = health || 3;
        this.current_health = this.max_health;

        this.blsframe = 0;
        this.blastTimeout;
        this.dead = false;


    }

    render() {

        // rendering bullets
        for (let i = 0; i < this.bullet.length; i++) {
            let bult = this.bullet[i];
            ctx.save();
            ctx.translate(bult.x += bult.xVel, bult.y += bult.yVel);
            ctx.rotate(bult.a);
            ctx.drawImage(bult.img, -bult.w / 2, -bult.h / 2, bult.w, bult.h);
            ctx.restore();

            if (bult.x >= canv.width || bult.y >= canv.height || bult.y <= 0 || bult.x <= 0) {
                this.bullet.splice(i, 1);
            }

            //bullet hit check for enemies
            if (this.player) {
                for (let j = 0; j < enemies.length; j++) {
                    let enm = enemies[j];

                    if (bult.x <= enm.x + (enm.w / 2) && bult.x >= enm.x - (enm.w / 2) && bult.y <= enm.y + (enm.h / 2) && bult.y >= enm.y - (enm.h / 2)) {
                        //console.log("hit");
                        //this.blastTimeout = setInterval(()=>{this.blastAnimation(bult.x, bult.y)},10);
                        //render_blast(bult.x,bult.y);
                        enm.explosions.push({
                            x: enm.x,
                            y: enm.y,
                            w: 60,
                            h: 60
                        })
                        enm.current_health--;
                        enm.xVel = 0; enm.yVel = 0;
                        this.bullet.splice(i, 1);
                        if (enm.current_health < 1) {
                            enemies.splice(j, 1);
                        }

                        setInterval(()=>{enm.explosions.splice(j,1)},100);
                    }

                }
            } else if (this.player === false) {
                if (bult.x <= player.x + (player.w / 2) && bult.x >= player.x - (player.w / 2) && bult.y <= player.y + (player.h / 2) && bult.y >= player.y - (player.h / 2)) {
                    // console.log("haar gya");

                    //this.blastTimeout = setInterval(()=>{this.blastAnimation(bult.x, bult.y)},10);
                    this.explosions.push({
                        x: bult.x,
                        y: bult.y,
                        w: 50,
                        h: 50
                    })
                    this.bullet.splice(i, 1);
                    player.current_health--;

                    if (player.current_health < 1) {

                        cancelAnimationFrame(animationFrame);
                        clearTimeout(enMovetimeout);
                        alert("Game Over")
                        ctx.save();
                        ctx.fillStyle = "red";
                        ctx.font = "60px bold Times";
                        ctx.fillText("Game Over", canv.height / 2, canv.height / 2);
                        ctx.restore();
                    }
                }
            }

        }


        //wall collision
        if (this.x >= canv.width - this.w / 2) {
            this.x = canv.width - 1 - (this.w / 2);
            this.xVel = 0;
            this.a = game.deg2rad(90);

        } else if (this.x <= this.w / 2) {
            this.x = (this.w / 2) + 1;
            this.xVel = 0;
            this.a = game.deg2rad(-90);

        } if (this.y >= canv.height - this.h / 2) {
            this.y = canv.height - 1 - (this.h / 2);
            this.yVel = 0;
            this.a = game.deg2rad(180);

        } else if (this.y <= this.h / 2) {
            this.y = (this.h / 2) + 1;
            this.yVel = 0;
            this.a = game.deg2rad(0);

        }

        this.x += this.xVel;
        this.y += this.yVel;

        //TANK Render
        ctx.save();
        ctx.translate(this.x, this.y);

        /*Health Bar*/

        this.health_unit = (this.healthBar / this.max_health) / this.max_health;
        this.current_health_percent = this.health_unit * this.current_health * this.max_health;

        ctx.strokeStyle = "white";
        ctx.strokeRect(-this.healthBar / 2, -this.h / 1.3, this.healthBar, 6);

        if (this.player == true) { ctx.fillStyle = "green" } else { ctx.fillStyle = 'rgb(179, 0, 0)'; }

        ctx.fillRect(-this.healthBar / 2, -this.h / 1.3, this.current_health_percent, 6);
        ctx.rotate(this.a);
        ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
        if (this.fire) {
            ctx.drawImage(fire_img, -7.5, this.h / 2, 15, 30);
        }
        ctx.restore();


        for (let i = 0; i < this.explosions.length; i++) {
            let explo = this.explosions[i];

            ctx.save();
            ctx.drawImage(blast3, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.h);
            
                        this.blsframe++;
                        if (this.blsframe < 10 && this.blsframe > 0) {
                            ctx.drawImage(blast1, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.w);
                        }
                
                        if (this.blsframe < 20 && this.blsframe > 10) {
                            ctx.drawImage(blast2, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.w);
                        }
                        if (this.blsframe < 30 && this.blsframe > 20) {
                            ctx.drawImage(blast3, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.w);
                        }
            
                        if (this.blsframe < 40 && this.blsframe > 30) {
                            ctx.drawImage(blast4, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.w);
                        }
            
                        if (this.blsframe < 50 && this.blsframe > 40) {
                            ctx.drawImage(blast5, explo.x-explo.w/2, explo.y-explo.h/2, explo.w, explo.w);
                        }
            
                        if (this.blsframe > 50) {
                            //clearInterval(this.blastTimeout);
                            this.explosions.splice(i,1);
                            this.blsframe = 0;
                        }
                       // console.log('running')
                        ctx.restore();
                        
        }



    }

    move() {

        /*left*/
        if (keys[37] && player.x > this.w / 2 || keys[65] && player.x >= this.w / 2) {
            player.x -= player.speed;
            this.a = game.deg2rad(90);
        }
        /*up */
        else if (keys[38] && player.y >= this.h / 2 || keys[87] && player.y >= this.h / 2) {
            player.y -= player.speed;
            this.a = game.deg2rad(180);

        }
        //right
        else if (keys[39] && player.x + player.w / 2 <= canv.width || keys[68] && player.x + player.w / 2 <= canv.width) {
            player.x += player.speed;
            this.a = game.deg2rad(-90);

        }
        //down
        else if (keys[40] && player.y + player.h / 2 <= canv.height || keys[83] && player.y + player.h / 2 <= canv.height) {
            player.y += player.speed;
            this.a = game.deg2rad(0);

        }
    }

}