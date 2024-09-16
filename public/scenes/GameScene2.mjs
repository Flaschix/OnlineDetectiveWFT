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

export class GameScene2 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE2);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map2', './assets/map/tample_2.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map2');

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
        this.matter.add.fromVertices(740, 822, '512.5 1734 672 1734 685.5 1845.5 799.5 1806 791 1928.5 1050 1928.5 1050 1950 672 1961 1 1841.5 15 1 1646.5 1 1646.5 537 1589 528.5 1373 282.5 1328 349 1307 349 1328 282.5 1166 282.5 1150 349 1127.5 349 1138 297 1094.5 297 1080.5 328 1004 307.5 985 267.5 995 89.5 831.5 89.5 831.5 267.5 809 307.5 749.5 328 718.5 297 692 307.5 671.5 349 653.5 297 513 297 513 349 433 215 180.5 448.5 269 537 164.5 568 164.5 768.5 347.5 814 280.5 828 280.5 1181.5 337 1181.5 164.5 1271.5 174 1441 269 1441 164.5 1535 434.5 1780.5 504 1677.5 512.5 1734', { isStatic: true }, true)
        this.matter.add.fromVertices(1230 + 405.5, 476 + 745.5, '0.5 1335 0.5 1490 810 1469 810 1 580.5 51.5 630.5 72 630.5 276 564.5 319.5 484.5 332 434 332 470.5 276 448 218.5 396 196 350.5 196 307 258.5 322.5 332 396 347.5 434 370 515 357 515 654 470.5 654 470.5 723.5 564.5 770.5 598 770.5 618 843 618 1010.5 564.5 971 523 981.5 493.5 1026.5 434 971 307 1100 350.5 1150.5 293 1211 293 1274 121.5 1274 91 1221.5 68.5 1335 0.5 1335', { isStatic: true }, true)
        this.matter.add.fromVertices(760 + 153.5, 915 + 90, '62 80.5 62 179 306.5 179 306.5 29.5 71 29.5 25.5 1 1 29.5 25.5 63.5 62 80.5', { isStatic: true }, true)
        this.matter.add.fromVertices(454 + 80, 395 + 119.5, '1.5 105.5 11.5 238 158.5 230.5 151 86 117 86 138 65 117 21 91 21 49.5 1.5 34 34 66.5 65 1.5 105.5', { isStatic: true }, true)


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

        const backDoor = this.matter.add.fromVertices(904 + 124, 1833 + 63.5, '1 126.5 9.5 1 241.5 1 246.5 126.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(938 + 86.5, 64.5 + 118, '1 0.5 1 235.5 162.5 235.5 171.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const thirdKey = this.matter.add.fromVertices(263.5 + 162.5, 194.5 + 186, '1.5 266.5 106.5 370.5 324 126 255 1.5', {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
        })

        const fourthKey = this.matter.add.fromVertices(242.5 + 170.5, 1503.5 + 179.5, '1.5 95 113.5 1.5 339.5 244.5 268 358', {
            label: `${LABEL_ID.FOURTH_KEY}`,
            isStatic: true,
        })

        const shell1 = this.matter.add.fromVertices(565 + 101.5, 1749.5 + 51, '1 101 56 0.5 202 0.5 176.5 101', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell2 = this.matter.add.fromVertices(208 + 53, 1300 + 116.5, '1 231.5 104.5 161 90 1 1 42', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell3 = this.matter.add.fromVertices(314.5 + 50, 840 + 195.5, '0.5 390 99 363 99 1 0.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell4 = this.matter.add.fromVertices(225 + 30.5, 563.5 + 101.5, '1 180 60.5 202 60.5 26.5 1 1.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell5 = this.matter.add.fromVertices(562 + 104.5, 212.5 + 68.5, '1 0.5 63.5 136.5 208 136.5 175 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell6 = this.matter.add.fromVertices(1270.5 + 110, 209 + 67.5, '31 1 1.5 134.5 158 134.5 219 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell7 = this.matter.add.fromVertices(1461.5 + 173, 198 + 184.5, '345 271 218 368 1.5 134.5 94 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell8 = this.matter.add.fromVertices(1764 + 34, 536.5 + 112, '67 202.5 1 222.5 1 42.5 67 1.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell9 = this.matter.add.fromVertices(1643.5 + 96, 836 + 202, '191.5 1 0.5 26 0.5 308 16 377 191.5 402.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell10 = this.matter.add.fromVertices(1740.5 + 38.5, 1333 + 104, '76 206 0.5 143.5 0.5 1 76 26', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell11 = this.matter.add.fromVertices(1266 + 107.5, 1750 + 66, '23 131.5 1 9.5 157.5 1.5 214 131.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, thirdKey, fourthKey, forwardDoor, shell1, shell2, , shell3, , shell4, shell5, shell6, shell7, shell8, shell9, shell10, shell11];


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
        this.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.thirdKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'thirdKey');
        this.thirdKey.setScale(0.5);
        this.thirdKey.setVisible(false);
        this.thirdKey.setDepth(2);
        this.thirdKey.setScrollFactor(0);
        this.thirdKey.setAlpha(0);

        this.fourthKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'fourthKey');
        this.fourthKey.setScale(0.5);
        this.fourthKey.setVisible(false);
        this.fourthKey.setDepth(2);
        this.fourthKey.setScrollFactor(0);
        this.fourthKey.setAlpha(0);

        this.emptyKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyKey');
        this.emptyKey.setVisible(false);
        this.emptyKey.setDepth(2);
        this.emptyKey.setScrollFactor(0);
        this.emptyKey.setAlpha(0);


        this.closeButton = this.add.image(this.cameras.main.width - 200, 85, 'closeIcon');
        this.closeButton.setDisplaySize(50, 50);
        this.closeButton.setInteractive();
        this.closeButton.setVisible(false);
        this.closeButton.setDepth(2);
        this.closeButton.setScrollFactor(0);
        this.closeButton.setAlpha(0); // Начальное значение прозрачности

        this.closeButton.on('pointerdown', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
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

                if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                    this.moveForwardRoom();
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveBackRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
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

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1720);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 350);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.THIRD_KEY) {
            this.thirdKey.setVisible(true);
            if (this.fold.indexOf(this.thirdKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.thirdKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.FOURTH_KEY) {
            this.fourthKey.setVisible(true);
            if (this.fold.indexOf(this.fourthKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fourthKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.thirdKey.visible) this.thirdKey.setVisible(false);
        if (this.fourthKey.visible) this.fourthKey.setVisible(false);
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.foldKeys.visible) return;
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveForwardRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveBackRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey, context.emptyKey],
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
    }
}