export class BoxesController {
    constructor(scene, player) {
        this.scene = scene; // Сохраняем ссылку на сцену
        this.player = player;

        this.isNearObject = null;
        this.isHoldingObject = null;
        this.minDistance = 50;
        this.minDistanceX = 50;
        this.minDistanceY = 80;
        this.maxDistance = 100;
        this.maxDistanceX = 60;
        this.maxDistanceY = 90;

        this.previousPlayerPosition = { x: this.player.x, y: this.player.y };

        this.boxes = {};

        this.places = [];

        this.flagPressC = false;
    }

    createPlace(x, y, angle, labelPlace) {
        const place = this.scene.matter.add.sprite(x, y, 'place', null, { label: labelPlace });
        place.setSensor(true);
        place.setAngle(angle);
        // const place = this.scene.matter.add.fromVertices(xs, ys, '107 226 216 143.5 208.5 132.5 200 139.5 203.5 121.5 188.5 114 177.5 121.5 177.5 98.5 200 87.5 203.5 73 200 47.5 188.5 21 161.5 5 131 1.5 107 10.5 107 32 90.5 80 70 80 21 87.5 13 98.5 17 109.5 17 121.5 6.5 132.5 1 154.5 6.5 167 26.5 167 44.5 154.5 98 185 90.5 192.5 84 209 90.5 226', {
        //     isStatic: true,
        // })

        this.scene.matterCollision.addOnCollideStart({
            objectA: this.scene.player,
            objectB: place,
            callback: function (eventData) {
                if (eventData.bodyB.gameObject.box != null) return;
                this.scene.isInZone = true;
                this.scene.eventZone = Number(eventData.bodyB.label);

                place.setTint(0x00ff00);
            },
            context: this
        });

        this.scene.matterCollision.addOnCollideEnd({
            objectA: this.scene.player,
            objectB: place,
            callback: function (eventData) {
                this.scene.isInZone = false;
                this.scene.eventZone = null;

                place.clearTint(0xFFF000);

            },
            context: this
        });

        this.places.push(place);
    }

    createBoxes(boxes) {

        Object.keys(boxes).forEach((item) => {
            this.boxes[item] = this.scene.matter.add.sprite(boxes[item].x, boxes[item].y, `sculpture${Number(item) + 1}`);

            this.boxes[item].setFixedRotation();
            this.boxes[item].setStatic(true);

            this.boxes[item].setCollisionCategory(0x0002);

            this.boxes[item].label = item;

            for (let i = 0; i < this.places.length; i++) {
                if (this.places[i].x == this.boxes[item].x && this.places[i].y == this.boxes[item].y + 30) {
                    this.fillPlace(i, item);
                }
            }

            this.scene.matterCollision.addOnCollideStart({
                objectA: this.player,
                objectB: this.boxes[item],
                callback: this.handlePlayerObjectCollision,
                context: this
            });
        });

        this.scene.mySocket.subscribeCatchedBox(this, this.catchedBox);
        this.scene.mySocket.subscribeBoxMovement(this, this.updateBoxes);
    }

    handlePlayerObjectCollision({ bodyA, bodyB }) {
        let boxesId = bodyB.gameObject.label;
        this.isNearObject = boxesId;
        if (!bodyB.isSensor) {
            this.flagPressC = true;
        }
    }

    holdObject(boxId) {
        this.scene.mySocket.emitCatchBox(Number(boxId));
    }

    catchedBox(boxId) {
        if (this.boxes[`${boxId}`].place != null) {
            this.clearPlace(this.boxes[`${boxId}`].place, boxId);
        }
        this.isHoldingObject = `${boxId}`;
        this.boxes[`${boxId}`].setStatic(false);
        this.boxes[`${boxId}`].setSensor(false);
    }

    releaseObject(boxId, place) {
        const box = this.boxes[`${boxId}`]
        box.setVelocity(0, 0);
        box.setStatic(true); // Остановить объект
        this.scene.mySocket.emitReleaseBox(Number(boxId));

        if (place == null) this.scene.mySocket.emitMoveBoxeLast({ id: Number(this.isHoldingObject), x: box.x, y: box.y, lastKey: true });
        else this.scene.mySocket.emitMoveBoxeLast({ id: Number(this.isHoldingObject), x: box.x, y: box.y, lastKey: true, placeCur: place });

        box.setPosition(box.x, box.y);
        this.isHoldingObject = null;

        this.flagPressC = false;
    }

    updateBoxes(movementData) {
        if (this.boxes[movementData.id]) {
            const box = this.boxes[movementData.id];
            if (movementData.lastKey == null && box.isStatic) {
                box.setSensor(true);
            }
            if (box.place != null) this.clearPlace(box.place, box.label);

            this.scene.tweens.add({
                targets: [box],
                x: movementData.x,
                y: movementData.y,
                duration: 200,
                onComplete: () => {
                    try {
                        if (movementData.lastKey != null) {
                            box.setSensor(false);

                            if (movementData.placeCur != null) {
                                this.fillPlace(movementData.placeCur, box.label);
                            }

                        }
                    }
                    catch (e) { }
                }
            });
        }
    }

    putBox(place) {
        const placeCur = this.places[place]
        this.boxes[`${this.isHoldingObject}`].setPosition(placeCur.x, placeCur.y - 30);
        this.fillPlace(place, this.isHoldingObject);
        this.releaseObject(this.isHoldingObject, place);
    }

    fillPlace(placeCur, obj) {
        this.places[placeCur].box = obj;
        this.boxes[`${obj}`].place = placeCur;
    }

    clearPlace(place, obj) {
        this.places[place].box = null;
        this.boxes[`${obj}`].place = null;
    }

    update() {
        // Перемещение объекта за игроком

        if (this.isHoldingObject) {
            const deltaX = this.player.x - this.previousPlayerPosition.x;
            const deltaY = this.player.y - this.previousPlayerPosition.y;
            const box = this.boxes[this.isHoldingObject]

            // box.setPosition(box.x + deltaX, box.y + deltaY);
            box.setVelocity(deltaX, deltaY);
            // console.log(box.x + " " + box.y);

            // Проверка и корректировка минимального расстояния
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, box.x, box.y);
            const distanceX = Math.abs(this.player.x - box.x);
            const distanceY = Math.abs(this.player.y - box.y);
            if (distance < this.minDistance) {
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, box.x, box.y);
                box.x = this.player.x + Math.cos(angle) * this.minDistance;
                box.y = this.player.y + Math.sin(angle) * this.minDistance;
            }

            this.scene.mySocket.emitMoveBoxe({ id: Number(this.isHoldingObject), x: box.x, y: box.y });

            if (distanceX > this.maxDistanceX || distanceY > this.maxDistanceY) {
                this.flagPressC = false;
                this.releaseObject(this.isHoldingObject);
            }
        }

        if (this.isNearObject != null) {
            const box = this.boxes[this.isNearObject];
            const distanceX = Math.abs(this.player.x - box.x);
            const distanceY = Math.abs(this.player.y - box.y);

            if (distanceX > this.minDistanceX || distanceY > this.minDistanceY) {
                this.isNearObject = null;
                if (this.isHoldingObject == null) {
                    this.flagPressC = false;
                }
            }
        }


        // Обновление предыдущей позиции игрока
        this.previousPlayerPosition.x = this.player.x;
        this.previousPlayerPosition.y = this.player.y;
    }
}
