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

import { BaseScene } from "./BaseScene.mjs";

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/map_garally_4.jpg');

        this.load.image('glovesMin', './assets/mapKey/glovesMin.png');
        this.load.image('chainMin', './assets/mapKey/chainMin.png');
        this.load.image('cameraMin', './assets/mapKey/cameraMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

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
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(50 + 737, 300 + 690.5, '68.5 1348 52.5 1380 1 1 1465 1 1472.5 24.5 1283 24.5 1274.5 51.5 1274.5 79 1268.5 112.5 1274.5 139.5 1297.5 139.5 1324.5 148 1340.5 171 1314 185.5 1309 206.5 1319 239.5 1304 267 1268.5 262 1254 228.5 1292.5 185.5 1274.5 180.5 1247.5 180.5 1229 180.5 1216 163 1229 112.5 1254 51.5 1233 38 1110 51.5 1119.5 122 1095.5 148 1058 139.5 1066 79 1080 45.5 1004.5 51.5 1011.5 79 957 79 957 51.5 733.5 51.5 733.5 87 684.5 87 684.5 51.5 594 38 463 51.5 489 70.5 489 133.5 508 163 478.5 180.5 455.5 172 455.5 148 440 133.5 455.5 116.5 440 63 232 51.5 286.5 163 279.5 187 317 272 305.5 367.5 279.5 367.5 279.5 387 191.5 387 191.5 455 244.5 568.5 269 579 244.5 714 214 707.5 208 737.5 106.5 737.5 93 822.5 149.5 904 180 961.5 214 961.5 188.5 1133.5 149.5 1144.5 134 1200 167 1212 221 1305 182 1348 68.5 1348', { isStatic: true }, true)
        this.matter.add.fromVertices(1520 + 172.5, 576 + 684.5, '313 1148 344 1368.5 306.5 46.5 92 1.5 92 58 58 144.5 58 198 23.5 253 43 391 23.5 399.5 1 431.5 13 479 86 479 116 509 100 549 72 566 100 699.5 128 699.5 197 889 162.5 949 135.5 949 162.5 1119 204.5 1125.5 204.5 1148 313 1148', { isStatic: true }, true)

        this.matter.add.fromVertices(493 + 59.5, 1756.5 + 96, '9 132 32 191 102.5 186 118 116 87.5 47 64 47 52 29.5 23 9.5 0.5 1.5 0.5 47 16 86 9 132', { isStatic: true }, true)
        this.matter.add.fromVertices(1440 + 77, 1840.5 + 119.5, '12 170 66.5 238 140.5 185 153 153 116.5 142 127.5 49.5 103.5 15.5 71 0.5 36 0.5 0.5 71 0.5 102.5 12 170', { isStatic: true }, true)
        this.matter.add.fromVertices(1446 + 60, 1624.5 + 69.5, '1 109.5 25.5 138.5 55.5 138.5 66.5 118.5 66.5 80 74 63 90.5 70 98.5 57.5 81 50 98.5 43.5 98.5 26.5 81 35.5 81 16.5 81 1.5 66.5 3.5 66.5 16.5 55.5 35.5 50 26.5 45.5 1.5 35.5 3.5 41 30 25.5 22 14 35.5 35.5 50 14 63 1 109.5', { isStatic: true }, true)
        this.matter.add.fromVertices(954 + 75, 1473 + 122, '1 64 1 243 149.5 243 149.5 64 118.5 64 127 44 118.5 21.5 118.5 11.5 66.5 21.5 66 11.5 57.5 1.5 45 11.5 36.5 1.5 9 26 30 64 1 64', { isStatic: true }, true)
        this.matter.add.fromVertices(483 + 79.5, 1351 + 66, '27.5 121.5 70.5 131.5 107 131.5 146 100.5 158 54 136 19.5 97 1 49.5 8.5 1 33 1 82.5 27.5 121.5', { isStatic: true }, true)
        this.matter.add.fromVertices(930 + 91.5, 1187 + 64.5, '13.5 98.5 13.5 128.5 178 127.5 182.5 94 182.5 24.5 123 19 87.5 1.5 50 9 37.5 24.5 1 24.5 1 94 13.5 98.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1243.5 + 52.5, 1037 + 126.5, '1.5 9 16 252.5 95.5 252.5 104 213.5 84.5 1 16 1', { isStatic: true }, true)
        this.matter.add.fromVertices(1415 + 80, 1346.5 + 71, '15.5 119 56.5 141 126 134.5 158.5 102 148.5 43.5 119.5 13.5 66.5 1.5 15.5 23.5 1 80', { isStatic: true }, true)
        this.matter.add.fromVertices(718 + 63, 680 + 151, '26.5 165 26.5 301.5 119.5 301.5 119.5 143 113 99 125 53.5 98.5 11.5 72 1.5 58.5 31.5 72 53.5 72 99 53 99 53 81 26.5 81 12 93.5 26.5 104 1 114 26.5 165', { isStatic: true }, true)
        this.matter.add.fromVertices(480 + 55.5, 1640 + 68, '110 115 65 135 37 115 37 76 23 67 7.5 76 1.5 67 16 51.5 1.5 33 37 26.5 50.5 1 84 33 73.5 60.5 110 82.5 110 115', { isStatic: true }, true)
        this.matter.add.fromVertices(595 + 58, 997 + 63, '34.5 79.5 27 115 84.5 125 92 100.5 114.5 89.5 62.5 23.5 84.5 23.5 92 7.5 57 1 44.5 16.5 27 16.5 1.5 79.5 27 64.5 34.5 79.5', { isStatic: true }, true)
        this.matter.add.fromVertices(528 + 43.5, 780 + 65, '76.5 129 30 129 23.5 101.5 30 58 14.5 53 14.5 41.5 1.5 27.5 30 14 41 1 52 14 76.5 14 52 58 85.5 87 76.5 129', { isStatic: true }, true)
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

        const bodyLeftDoor = this.matter.add.fromVertices(168.5 + 75.5, 1216 + 155.5, '1.5 117 130.5 309 150 185.5 33 2', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
        })

        const cameraMin = this.matter.add.sprite(1164, 1082, 'cameraMin', null, {
            label: `${LABEL_ID.CAMERA_KEY}`,
            isStatic: true,
            isSensor: true
        }).setScale(0.5);

        const chainMin = this.matter.add.sprite(1197, 1237, 'chainMin', null, {
            label: `${LABEL_ID.CHAIN_KEY}`,
            isStatic: true,
            isSensor: true
        }).setScale(0.5);

        const glovesMin = this.matter.add.sprite(1358, 1826, 'glovesMin', null, {
            label: `${LABEL_ID.GLOVES_KEY}`,
            isStatic: true,
            isSensor: true
        }).setScale(0.4);

        const arrBodies = [bodyLeftDoor, cameraMin, chainMin, glovesMin];


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
        const at = myMap.get('camera');
        const bt = myMap.get('chain');
        const ct = myMap.get('gloves');

        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false);

        //задний фон оверлея
        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.cameraKey = this.add.image(430, this.cameras.main.height / 2, 'camera');
        this.cameraKey.setScale(0.5);
        this.cameraKey.setVisible(false);
        this.cameraKey.setDepth(2);
        this.cameraKey.setScrollFactor(0);
        this.cameraKey.setAlpha(0);

        this.chainKey = this.add.image(430, this.cameras.main.height / 2, 'chain');
        this.chainKey.setScale(0.5);
        this.chainKey.setVisible(false);
        this.chainKey.setDepth(2);
        this.chainKey.setScrollFactor(0);
        this.chainKey.setAlpha(0);

        this.glovesKey = this.add.image(430, this.cameras.main.height / 2, 'gloves');
        this.glovesKey.setScale(0.5);
        this.glovesKey.setVisible(false);
        this.glovesKey.setDepth(2);
        this.glovesKey.setScrollFactor(0);
        this.glovesKey.setAlpha(0);

        this.textA = this.add.text(at.x, this.cameras.main.height / 2 - 70, `${decrypt(at.text)}`, { font: "normal 30px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textA.setVisible(false);
        this.textA.setAlpha(0);

        this.textB = this.add.text(bt.x, this.cameras.main.height / 2 - 70, `${decrypt(bt.text)}`, { font: "normal 30px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textB.setVisible(false);
        this.textB.setAlpha(0);

        this.textC = this.add.text(ct.x, this.cameras.main.height / 2 - 70, `${decrypt(ct.text)}`, { font: "normal 30px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textC.setVisible(false);
        this.textC.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.cameraKey, this.chainKey, this.glovesKey, this.textA, this.textB, this.textC],
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

    moveLeftRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1800, 1384);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.CAMERA_KEY) {
            this.cameraKey.setVisible(true);
            this.textA.setVisible(true);
            if (this.fold.indexOf(this.cameraKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.cameraKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.CHAIN_KEY) {
            this.chainKey.setVisible(true);
            this.textB.setVisible(true);
            if (this.fold.indexOf(this.chainKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.chainKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.GLOVES_KEY) {
            this.glovesKey.setVisible(true);
            this.textC.setVisible(true);
            if (this.fold.indexOf(this.glovesKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.glovesKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.CAMERA_KEY) { this.cameraKey.setVisible(false); this.textA.setVisible(false); }
        if (this.eventZone == LABEL_ID.CHAIN_KEY) { this.chainKey.setVisible(false); this.textB.setVisible(false); }
        if (this.eventZone == LABEL_ID.GLOVES_KEY) { this.glovesKey.setVisible(false); this.textC.setVisible(false); }

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

        if (this.isInZone) {
            this.player.setVelocity(0);

            if (this.eventZone == LABEL_ID.DOOR_LEFT_ID) {
                this.moveLeftRoom();
                return;
            }

            if (!this.isOverlayVisible) {

                this.showOverlay();

                this.tweens.add({
                    targets: [this.closeButton, this.overlayBackground, this.cameraKey, this.chainKey, this.glovesKey, this.textA, this.textB, this.textC],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                this.tweens.add({
                    targets: [this.closeButton, this.overlayBackground, this.cameraKey, this.chainKey, this.glovesKey, this.textA, this.textB, this.textC],
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
    }
}