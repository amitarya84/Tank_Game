
window.onkeydown = () => {
  keys[event.keyCode] = true;
  // alert(event.keyCode)
  /* fire */



  if (keys[32] && player.bullet.length < fireRate || keys[13] && player.bullet.length < fireRate) {

    player.fire = true;
    setTimeout(() => { player.fire = false; }, 100);

    let xVel;
    let yVel, a;

    if (player.a == game.deg2rad(90)) {
      xVel = -8;
      yVel = 0;
      a = game.deg2rad(-90);

    } else if (player.a == game.deg2rad(180)) {
      xVel = 0;
      yVel = -8;
      a = game.deg2rad(0);

    } else if (player.a == game.deg2rad(-90)) {
      xVel = 8;
      yVel = 0;
      a = game.deg2rad(90);

    } else if (player.a == game.deg2rad(0)) {
      xVel = 0;
      yVel = 8;
      a = game.deg2rad(180);
    }

    player.bullet.push({
      x: player.x,
      y: player.y,
      w: 8,
      h: 16,
      a: a,
      xVel: xVel,
      yVel: yVel,
      img: bult_black

    })
  }

}
window.onkeyup = () => {
  //event.keyCode
  delete keys[event.keyCode];

}