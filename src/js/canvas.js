import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'


console.log(platform)
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image
    this.width = image.width;
    this.height = image.height;

    
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image
    this.width = image.width;
    this.height = image.height;

    
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

let platformImage = createImage(platform)


let player = new Player()
let platforms = [
  new Platform({ x: -1, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 2 - 500, y: 480, image: platformImage }),
]

let genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  })
]

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
platformImage = createImage(platform)


 player = new Player()
 platforms = [
  new Platform({ x: -1, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 2 - 500, y: 480, image: platformImage }),
]

 genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  })
]
 scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw()
  })

  platforms.forEach((platform) => {
    platform.draw();
  })

  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x -=3
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x +=3
      })
    }
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (scrollOffset > 2000) {
    console.log("W mandem");
  }

  if (player.position.y > canvas.height){
    init()
  }

}

animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 37:
      keys.left.pressed = true;
      break;
  }
  switch (keyCode) {
    case 38:
      player.velocity.y -= 15;
      break;
  }
  switch (keyCode) {
    case 39:
      keys.right.pressed = true;
      break;
  }
  switch (keyCode) {
    case 40:
      console.log("down");
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 37:
      keys.left.pressed = false;
      break;
  }
  switch (keyCode) {
    case 38:
      break;
  }
  switch (keyCode) {
    case 39:
      keys.right.pressed = false;
      break;
  }
  switch (keyCode) {
    case 40:
      console.log("down");
      break;
  }
});
