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

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/tample_4.png');

        this.load.image('glovesMin', './assets/mapKey/glovesMin.png');
        this.load.image('chainMin', './assets/mapKey/chainMin.png');
        this.load.image('cameraMin', './assets/mapKey/cameraMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4', MAP_SETTINGS.MAP_FULL4);

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


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL4)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL4, './assets/map/tample_full_4.png');

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
        this.matter.add.fromVertices(670, 160 + 800, '1151.5 1711 1151.5 1765.5 0.5 1765.5 0.5 1 1785.5 1 1785.5 339.5 1634 339.5 1658 276.5 1595 309.5 1536 265.5 1536 208 1240.5 208 1240.5 324.5 1207 324.5 1207 383.5 1022.5 383.5 1011.5 324.5 1011.5 276.5 804.5 276.5 791.5 383.5 599.5 383.5 588 324.5 570 324.5 570 265.5 529 256 529 217.5 273 228.5 256 309.5 187.5 291.5 169 339.5 285 457.5 256 496.5 239 550 300 598 256 683 285 753 285 999 256 1025 273 1054.5 239 1094 239 1289 273 1306 256 1349 149 1409 137.5 1444.5 226 1444.5 273 1577.5 526 1577.5 552 1538.5 618 1555 603 1604 712 1604 712 1711 1151.5 1711', { isStatic: true }, true)
        this.matter.add.fromVertices(1255 + 374.5, 770 + 714.5, '1.5 1280 12.5 1407 748 1428 748 1 592.5 1 482.5 113 456 128 456 166 482.5 200 469.5 382 469.5 440.5 507 461.5 497.5 683 482.5 745.5 520.5 781.5 507 977 456 977 456 1033.5 592.5 1083 604 1151 520.5 1193 497.5 1242 497.5 1302.5 422 1280 414.5 1248 439 1208 422 1151 357.5 1121 319.5 1170 319.5 1208 335 1280 255 1280 213.5 1242 156.5 1242 130 1280 1.5 1280', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL4)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
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

        const bodyDoor = this.matter.add.fromVertices(827 + 186, 1731.5 + 96, '1 191.5 16 0.5 349.5 0.5 370.5 191.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const seif = this.matter.add.fromVertices(929.5 + 93.5, 227 + 151.5, '0.5 302 0.5 1 186 1 186 302', {
            label: `${LABEL_ID.SEIF_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, seif];


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
        this.answer = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'answer');
        this.answer.setScale(0.9);
        this.answer.setVisible(false);
        this.answer.setDepth(2);
        this.answer.setScrollFactor(0);
        this.answer.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.answer],
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

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveBackRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.answer],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.answer],
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

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 240);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SEIF_KEY) {
            this.answer.setVisible(true);
            // if (this.fold.indexOf(this.answer.texture.key) == -1) {
            //     this.mySocket.emitAddNewImg(this.answer.texture.key);
            // }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.SEIF_KEY) this.answer.setVisible(false);

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

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveBackRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.answer],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.answer],
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
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL4)) {
                this.fullMap = true;

                this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL4, 1, 1)
            }
        }
    }
}