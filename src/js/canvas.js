import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'
import theMLH from '../img/theMLH.png'


console.log(platform)
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
class Player {
  constructor() {
    this.speed = 10
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 100;

    this.image = createImage(theMLH)
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
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
  
]

let genericObjects = [
  
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
let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

 player = new Player()
 platforms = [
  
  new Platform({ x: platformImage.width * 5 + 300 - 2 + platformImage.width - platformSmallTallImage.width, y: 400,
   image: platformSmallTallImage }),
  new Platform({ x: platformImage.width * 8 + 869 - 2 + platformImage.width - platformSmallTallImage.width, y: 400,
    image: platformSmallTallImage }),
    new Platform({ x: platformImage.width * 8 + 1086 - 2 + platformImage.width - platformSmallTallImage.width, y: 400,
      image: platformSmallTallImage }),
  new Platform({ x: platformImage.width * 5 - 100, y: 480, image: platformImage }),
  new Platform({ x: -1, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 2 - 500, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 3 - 200, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 4 - 200 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 7.5 - 200 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 9 - 200 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 12 - 200 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 13 - 50 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 15 - 350 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 17 - 550 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 18 - 150 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 19 - 154 - 2, y: 480, image: platformImage }),
  new Platform({ x: platformImage.width * 5 - 170 - 2 + platformImage.width - platformSmallTallImage.width, y: 400, image: platformSmallTallImage })
  
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
    player.velocity.x = player.speed;
  } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0) ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x -= player.speed * .66
      })
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * .66
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

init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;
  }
  switch (keyCode) {
    case 87:
      player.velocity.y -= 10;
      break;
  }
  switch (keyCode) {
    case 68:
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
    case 65:
      keys.left.pressed = false;
      break;
  }
  switch (keyCode) {
    case 87:
      break;
  }
  switch (keyCode) {
    case 68:
      keys.right.pressed = false;
      break;
  }
  switch (keyCode) {
    case 40:
      console.log("down");
      break;
  }
});
