import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { createUILeftMobile, decrypt } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { myMap } from "../CST.mjs";

import { BoxesController } from "../share/BoxesController.mjs";
import { BaseScene } from "./BaseScene.mjs";

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/map_garally_1.jpg');

        this.load.image('diskMin', './assets/mapKey/diskMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 140);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 140, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 'fold', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu, 90, 200, this.showFold); this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN);
        }

        //Создаём объект с которыми будем взаимодействовать
        this.createCollision();
        //Создание оверлея
        this.createOverlays();
        this.createFold();
        //Создание слушателей нажатия кнопок
        this.createInputHandlers();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());

        this.boxesController = new BoxesController(this, this.player); // Передаем сцену
        this.mySocket.subscribeTakeBoxes(this, this.boxesController.createBoxes.bind(this.boxesController));
        this.boxesController.createPlace(573, 1770, 34, LABEL_ID.PLACE_KEY_1);
        this.mySocket.emitGetBoxes([0, 1, 2]);
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(125 + 767, 228 + 753.5, '88.5 1150 9 1506.5 0.5 1 1533.5 1 1533.5 485 1468 475.5 1449.5 412.5 1348 412.5 1369 458 1358.5 507 1358.5 537.5 1285 537.5 1285 507 1243 507 1243 537.5 1182.5 537.5 1182.5 507 1103.5 507 1095 452 1070.5 458 1025 475.5 996 458 979.5 404.5 979.5 155 898 134 833 166.5 833 404.5 815.5 432.5 833 452 773.5 467.5 710.5 452 710.5 475.5 668.5 485 651 611 555.5 618 548.5 529 468 529 468 475.5 303.5 475.5 280.5 513 221 520 88.5 982 241 1016.5 241 1134.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1668 + 134, 790 + 585.5, '178.5 764.5 267.5 1170 208 0.5 1 0.5 1 147.5 89.5 215.5 185.5 653 165.5 694.5 89.5 694.5 106.5 771.5 178.5 764.5', { isStatic: true }, true)
        this.matter.add.fromVertices(702 + 108, 1804 + 117, '18.5 182 83 232.5 173.5 196 215 109 188.5 28 125.5 1.5 40.5 28 1 109', { isStatic: true }, true)
        this.matter.add.fromVertices(320 + 68, 1720 + 111, '21.5 1 1.5 179 21.5 221.5 109.5 221.5 135 19 58 13 51 1 21.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(494 + 53, 1395 + 97.5, '9.5 176 51 194 95.5 176 105 135.5 86.5 111 73.5 107 73.5 95 81.5 74.5 42 28 42 1.5 26 11.5 9.5 38 1.5 74.5 18.5 83.5 18.5 123 1.5 143.5 9.5 176', { isStatic: true }, true)
        this.matter.add.fromVertices(1736 + 42, 1827 + 38.5, '10.5 53.5 38 76 64 76 83.5 53.5 83.5 21.5 56 1 23.5 1 1.5 21.5 10.5 53.5', { isStatic: true }, true)
        this.matter.add.fromVertices(868 + 150.5, 1326 + 154, '5 114 0.5 228 92.5 307 204.5 307 300 227.5 296.5 102.5 188.5 28 165.5 28 162 14.5 154 0.5 138.5 0.5 132 7 123.5 10 123.5 28 100.5 34.5', { isStatic: true }, true)
        this.matter.add.fromVertices(728 + 199.5, 1134 + 109, '19 144.5 19 217 398 217 398 151.5 328 151.5 75 144.5 56 125.5 63 96 56 68.5 63 41 49.5 25 19 1 1.5 6 6.5 50.5 1.5 68.5 11.5 80.5 19 118 19 144.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1404 + 99, 1254 + 99.5, '1.5 113.5 117 198 196.5 135 181 105.5 149 92.5 149 18.5 142.5 50.5 102.5 31 91.5 8.5 64.5 1 49.5 31 64.5 31 64.5 58 7.5 101 1.5 113.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1460 + 99.5, 1740 + 100.5, '21 58 38 199.5 138.5 192 129.5 119.5 166 101.5 166 90 198 66.5 190 58 151.5 81.5 143 72.5 129.5 37.5 108 37.5 108 11.5 89.5 6 70.5 22 63 22 44 1 1.5 42.5 21 58', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
            } else {
                this.playersController.createOtherPlayer(this, players[id], this.otherPlayers);
            }
        });
    }

    createCollision() {
        // Создаем графику для подсветки
        const highlightGraphics = this.add.graphics();
        highlightGraphics.lineStyle(2, 0x06ff01, 1);
        highlightGraphics.setDepth(0);

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(945.5 + 78, 719 + 113, '0.5 1 0.5 225.5 154.5 225.5 145 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const diskMin = this.matter.add.sprite(980, 1224, 'diskMin', null, {
            label: `${LABEL_ID.DISK_KEY}`,
            isStatic: true,
            isSensor: true
        }).setScale(0.8);

        const arrBodies = [bodyDoor, diskMin];


        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = true;
                this.eventZone = Number(eventData.bodyB.label);

                // Подсвечиваем границы зоны
                const vertices = eventData.bodyB.vertices;
                highlightGraphics.beginPath();
                highlightGraphics.moveTo(vertices[0].x, vertices[0].y);
                for (let i = 1; i < vertices.length; i++) {
                    highlightGraphics.lineTo(vertices[i].x, vertices[i].y);
                }
                highlightGraphics.closePath();
                highlightGraphics.strokePath();
            },
            context: this
        });

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = false;
                this.eventZone = null;

                highlightGraphics.clear();
            },
            context: this
        });
    }

    createOverlays() {
        const at = myMap.get('disk')
        const dt1 = myMap.get('door1');

        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false).setDepth(1);

        //задний фон оверлея
        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.diskKey = this.add.image(430, this.cameras.main.height / 2, 'disk');
        this.diskKey.setScale(0.5);
        this.diskKey.setVisible(false);
        this.diskKey.setDepth(2);
        this.diskKey.setScrollFactor(0);
        this.diskKey.setAlpha(0);

        this.textA = this.add.text(at.x, this.cameras.main.height / 2 - 70, `${decrypt(at.text)}`, { font: "normal 30px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textA.setVisible(false);
        this.textA.setAlpha(0);

        this.placeBack = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayPaper');
        this.placeBack.setScale(0.65, 0.8);
        this.placeBack.setVisible(false);
        this.placeBack.setDepth(2);
        this.placeBack.setScrollFactor(0);
        this.placeBack.setAlpha(0);

        this.paperPlace = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'paperPlace');
        this.paperPlace.setScale(0.8);
        this.paperPlace.setVisible(false);
        this.paperPlace.setDepth(2);
        this.paperPlace.setScrollFactor(0);
        this.paperPlace.setAlpha(0);

        this.paperDoor = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'paperDoor');
        this.paperDoor.setScale(0.8);
        this.paperDoor.setVisible(false);
        this.paperDoor.setDepth(2);
        this.paperDoor.setScrollFactor(0);
        this.paperDoor.setAlpha(0);

        this.textС = this.add.text(dt1.x, this.cameras.main.height / 2 + 70, `${decrypt(dt1.text)}`, { font: "normal 30px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textС.setVisible(false);
        this.textС.setAlpha(0);

        this.closeButton = this.add.image(this.cameras.main.width - 260, 80, 'closeIcon');
        this.closeButton.setDisplaySize(50, 50);
        this.closeButton.setInteractive();
        this.closeButton.setVisible(false);
        this.closeButton.setDepth(2);
        this.closeButton.setScrollFactor(0);
        this.closeButton.setAlpha(0); // Начальное значение прозрачности

        this.closeButton.on('pointerdown', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.diskKey, this.textA, this.paperPlace, this.placeBack, this.paperDoor, this.textС],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    try {
                        this.hideOverlay();
                    }
                    catch (e) { }
                }
            });
        });
    }

    createInputHandlers() {

        this.input.keyboard.on('keydown-X', () => {
            this.itemInteract();
        });
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 2000);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.PLACE_KEY_1) {
            this.paperPlace.setVisible(true);
            this.placeBack.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
            this.paperDoor.setVisible(true);
            this.textС.setVisible(true);
            this.placeBack.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.DISK_KEY) {
            this.diskKey.setVisible(true);
            this.textA.setVisible(true);
            this.overlayBackground.setVisible(true);
            if (this.fold.indexOf(this.diskKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.diskKey.texture.key);
            }
        }


        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.diskKey.visible) { this.diskKey.setVisible(false); this.textA.setVisible(false); }
        if (this.paperPlace.visible) { this.paperPlace.setVisible(false); this.placeBack.setVisible(false); }
        if (this.paperDoor.visible) { this.paperDoor.setVisible(false); this.textС.setVisible(false); this.placeBack.setVisible(false); }

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract() {
        if (this.avatarDialog.visible || this.exitContainer.visible) return;
        if (this.foldColseBtn.visible) return;

        if (this.boxesController.isHoldingObject) {
            if (this.eventZone == LABEL_ID.PLACE_KEY_1 && this.boxesController.places[0].box == null) {
                this.boxesController.putBox(0)
                return;
            }
            this.boxesController.releaseObject(this.boxesController.isHoldingObject);
            return;
        } else if (this.boxesController.isNearObject) {
            this.boxesController.holdObject(this.boxesController.isNearObject);
            return;
        }

        if (this.isInZone) {
            this.player.setVelocity(0);

            if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID && this.boxesController.places[0].box == '2') {
                this.moveForwardRoom();
                return;
            }

            if (!this.isOverlayVisible) {

                this.showOverlay();

                this.tweens.add({
                    targets: [this.closeButton, this.overlayBackground, this.diskKey, this.textA, this.paperPlace, this.placeBack, this.paperDoor, this.textС],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                this.tweens.add({
                    targets: [this.closeButton, this.overlayBackground, this.diskKey, this.textA, this.paperPlace, this.placeBack, this.paperDoor, this.textС],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        try {
                            this.hideOverlay();
                        } catch (e) { }

                    }
                });
            }
        }
    }


    update() {
        super.update();

        this.boxesController.update();
    }
}