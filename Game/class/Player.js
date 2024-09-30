class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSRC, frameRate, animations }) {
        super({ imageSRC, frameRate, animations })
        this.position = {
            x: 100,
            y: 100,
        }

        this.velocity = {
            x: 0,
            y: 1,
        }

        this.sides = {
            bottom: this.position.y + this.height,
        }
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
        this.isJumping = false; // Flag for jumping state
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }

    update() {
        this.position.x += this.velocity.x;
        // Horizontal collisions
        this.updateHitbox()
        this.checkHorizontal()
        // Apply gravity
        this.applyGravity()
        this.updateHitbox()
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        // Vertical collisions
        this.checkVertical()
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 14,
                y: this.position.y + 65,
            },
            width: 150,
            height: 125,
        }
    }

    checkHorizontal() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Left collision
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }

                // Right collision
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                break
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
        if (this.velocity.y > 0) {
            this.isJumping = true // Set jumping flag when falling
        }
    }

    checkVertical() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    this.isJumping = false // Reset jumping flag when landing
                    break
                }
                break
            }
        }
    }
}
