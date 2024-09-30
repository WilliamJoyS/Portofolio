const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 64 * 16
    canvas.height = 64 * 9

const collisionBlocks = []


const parsedCollisions = collisionsLevel1.parse2D();
parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 577) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y * 32,
                }
            }))
        }
    })
})

const backgroundlevel1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    width: 1024, 
    height: 576, 
    imageSRC: './sprite/background.png'
})

const player = new Player({
    width: 128, 
    height: 77, 
    collisionBlocks,
    imageSRC: './sprite/cat3.png',
    frameRate: 7,
    animations: {
        idleRight:{
            frameRate: 7,
            frameBuffer: 25,
            loop: true,
            imageSRC: './sprite/cat3.png',
        },
        idleLeft:{
            frameRate: 7,
            frameBuffer: 25,
            loop: true,
            imageSRC: './sprite/cat4.png',
        },
        runRight:{
            frameRate: 7,
            frameBuffer: 10,
            loop: true,
            imageSRC: './sprite/catright2.png',
        },
        runLeft:{
            frameRate: 7,
            frameBuffer: 10,
            loop: true,
            imageSRC: './sprite/catleft2.png',
        },
        jump:{
            frameRate: 7,
            frameBuffer: 12,
            loop: false,
            imageSRC: './sprite/catjump2.png',
        },
        jump1:{
            frameRate: 7,
            frameBuffer: 12,
            loop: false,
            imageSRC: './sprite/catjump5.png',
        },
    }
})
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}
function animate() {
    window.requestAnimationFrame(animate);
    backgroundlevel1.draw()

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    player.velocity.x = 0;

    if (keys.d.pressed) {
        player.switchSprite('runRight')
        player.velocity.x = 6;
        player.lastDirection = 'right'
    } else if (keys.a.pressed) {
        player.switchSprite('runLeft')
        player.velocity.x = -6;
        player.lastDirection = 'left'
    } else {
        if (!player.isJumping) { // Only switch to idle if not jumping
            if (player.lastDirection === 'left') player.switchSprite('idleLeft')
            else player.switchSprite('idleRight')
        }
    }

    player.update()
    player.draw()
}

animate()
