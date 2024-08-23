import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { createUILeftMobile } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { MAP_SETTINGS } from "../share/UICreator.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene3 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE3);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map3', './assets/map/map_garally_3.png');

        this.load.image('bottleMin', './assets/mapKey/bottleMin.png');
        this.load.image('planMin', './assets/mapKey/planMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map3', MAP_SETTINGS.MAP_FULL3);

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 120);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 120, this.itemInteract);
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


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL3)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL3, './assets/map/map_garally_full_3.png');

            this.fullMap = false;
        }
    }

    createMap(map, mapFull) {
        if (this.textures.exists(mapFull)) {
            this.map = this.add.image(0, 0, mapFull).setOrigin(0, 0);
            // this.map.setScale(MAP_SETTINGS.MAP_SCALE_4_3, MAP_SETTINGS.MAP_SCALE_4_3);
            this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
        } else {
            this.map = this.add.image(0, 0, map).setOrigin(0, 0);
            this.map.setScale(2, 2);
            this.matter.world.setBounds(0, 0, this.map.width * MAP_SETTINGS.MAP_SCALE_2, this.map.height * MAP_SETTINGS.MAP_SCALE_2);
        }
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(670, 352 + 711.5, '337 1359 394.5 1422 1 1422 66 45.5 1612.5 1 1612.5 216 1567.5 216 1555 149.5 1517 157.5 1491.5 131.5 1413 131.5 1396 188 1340.5 157.5 1300 157.5 1300 202 1243.5 202 1235.5 216 1286 246.5 1326.5 289 1235.5 395.5 1087.5 350.5 1094.5 325 1167 216 1063 202 1063 169 1038 169 1043 95 856.5 95 856.5 166 840.5 166 840.5 202 800 202 745.5 216 827 336 653 395.5 586.5 276.5 622.5 246.5 671 230.5 671 202 640.5 202 646 139.5 353.5 139.5 340.5 216 299 216 265.5 350.5 273.5 366.5 286 381.5 293 426 323 426 323 381.5 317 355.5 286 336 299 305 323 295 323 325 334 325 371.5 355.5 380.5 381.5 371.5 410 371.5 438 391.5 438 426 474.5 420 552 306 552 299 598.5 244.5 598.5 227.5 620.5 183 620.5 156.5 552 129.5 703 166 758.5 196 758.5 183 793 166 837.5 371.5 830.5 382.5 861.5 328 1274 133 1267 123.5 1328.5 149.5 1372.5 199 1372.5 199 1412 337 1359', { isStatic: true }, true)
        this.matter.add.fromVertices(1680 + 105, 674.5 + 643.5, '168.5 1212 149.5 1286 209 1286 209 0.5 1 0.5 1 80 58.5 93 79 173 44 234 1 278.5 23.5 433 79 442.5 79 481.5 149.5 481.5 168.5 624.5 125.5 684 79 713.5 97.5 777 58.5 808.5 58.5 860.5 97.5 894 58.5 942.5 79 974 149.5 1000 168.5 1212', { isStatic: true }, true)

        this.matter.add.fromVertices(905 + 133, 1855 + 81, '10.5 35.5 1.5 161 265.5 161 265.5 50.5 243.5 35.5 168 32 162.5 18 134 1 98.5 9 83.5 35.5 10.5 35.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1150 + 130.5, 1550 + 148, '1 168 161 294.5 260.5 210 260.5 178 134.5 65 148.5 26 125.5 10 115.5 26 105 1 105 26 93.5 38.5 93.5 65 9 132.5 1 168', { isStatic: true }, true)
        this.matter.add.fromVertices(578 + 127, 1637 + 138.5, '1 191.5 75.5 276 253 158.5 162.5 54.5 144.5 62.5 137.5 40 118.5 12.5 94.5 1.5 70 29.5 64 62.5 75.5 111 1 158.5 1 191.5', { isStatic: true }, true)
        this.matter.add.fromVertices(930.5 + 84, 1474 + 53.5, '0.5 39 0.5 106.5 167.5 106.5 167.5 39 149.5 1 26 1 0.5 39', { isStatic: true }, true)
        this.matter.add.fromVertices(1235 + 31, 1448 + 40, '1 35.5 8 66 29 79 51 71.5 51 55 61 22.5 37.5 1 8 11.5 1 35.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1484 + 83, 1498 + 141.5, '1 209 95 281.5 165 209 136 183 157 164.5 141.5 140 149 114.5 165 57.5 136 1.5 103 35.5 79 126.5 45 160 1 209', { isStatic: true }, true)
        this.matter.add.fromVertices(925 + 119.5, 1110 + 134.5, '0.5 87 0.5 267.5 238 260 238 87 191 50 149.5 55 142 19 115 1 81.5 8 64 30.5 72.5 55 25 55 0.5 87', { isStatic: true }, true)
        this.matter.add.fromVertices(1526 + 53.5, 904 + 119, '1.5 153 11.5 237.5 106 237.5 96.5 175.5 106 164 96.5 99.5 96.5 57 83 35 73 43.5 64 29 73 7 64 1.5 48.5 7 55 21.5 64 57 44 84 55 120.5 28.5 120.5 28.5 137.5 1.5 153', { isStatic: true }, true)

    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL3)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
                else this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.right, this.map.height * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.bottom);
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


        const bodyDoor = this.matter.add.fromVertices(1797 + 56, 1076 + 149, '77.5 2 1 177 21 296 110.5 104.5', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
        })

        const bottleMin = this.matter.add.sprite(383, 1260, 'bottleMin', null, {
            label: `${LABEL_ID.BOTTLE_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const planMin = this.matter.add.sprite(1070, 1763, 'planMin', null, {
            label: `${LABEL_ID.PLAN_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [bodyDoor, bottleMin, planMin];


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
        this.bottleKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bottle');
        this.bottleKey.setScale(0.5);
        this.bottleKey.setVisible(false);
        this.bottleKey.setDepth(2);
        this.bottleKey.setScrollFactor(0);
        this.bottleKey.setAlpha(0);

        this.planKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'plan');
        this.planKey.setScale(0.5);
        this.planKey.setVisible(false);
        this.planKey.setDepth(2);
        this.planKey.setScrollFactor(0);
        this.planKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.bottleKey, this.planKey],
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
            if (this.foldKeys.visible) return;

            if (this.isInZone) {
                this.player.setVelocity(0);

                if (this.eventZone == LABEL_ID.DOOR_LEFT_ID) {
                    this.moveRightRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.bottleKey, this.planKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.bottleKey, this.planKey],
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
        });
    }

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 300, 1384);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.BOTTLE_KEY) {
            this.bottleKey.setVisible(true);
            if (this.fold.indexOf(this.bottleKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.bottleKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.PLAN_KEY) {
            this.planKey.setVisible(true);
            if (this.fold.indexOf(this.planKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.planKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.BOTTLE_KEY) this.bottleKey.setVisible(false);
        if (this.eventZone == LABEL_ID.PLAN_KEY) this.planKey.setVisible(false);

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_LEFT_ID) {
                context.moveRightRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.bottleKey, context.planKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.bottleKey, context.planKey],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        try {
                            context.hideOverlay();
                        } catch (e) { }

                    }
                });
            }
        }
    }


    update() {
        super.update();

        if (!this.fullMap) {
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL3)) {
                this.fullMap = true;

                this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL3, 1, 1)
            }
        }
    }
}