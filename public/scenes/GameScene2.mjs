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
        this.load.image('map2', './assets/map/tample_1.png');

        this.load.image('clotheMin', './assets/mapKey/clotheMin.png');
        this.load.image('notebookMin', './assets/mapKey/notebookMin.png');
        this.load.image('keysMin', './assets/mapKey/keysMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map2', MAP_SETTINGS.MAP_FULL2);

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


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL2)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL2, './assets/map/tample_full_1.png');

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

    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL2)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
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

        const bodyWindow = this.matter.add.fromVertices(906.5 + 114.5, 1013 + 109.5, '0.5 1 0.5 218 228.5 215.5 225.5 1', { label: `${LABEL_ID.WINDOW_KEY}`, isStatic: true })

        const backDoor = this.matter.add.fromVertices(904 + 124, 1833 + 63.5, '1 126.5 9.5 1 241.5 1 246.5 126.5 1 126.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(938 + 86.5, 64.5 + 118, '1 0.5 1 235.5 162.5 235.5 171.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const leftDoor = this.matter.add.fromVertices(65.5 + 94, 1124.5 + 199.5, '1.5 244 139 397.5 186.5 191 45.5 1.5', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
        })

        const rightDoor = this.matter.add.fromVertices(1810.5 + 87, 1121.5 + 201, '172.5 243 31 400.5 1.5 157 133.5 1.5', {
            label: `${LABEL_ID.DOOR_RIGHT_ID}`,
            isStatic: true,
        })

        const clotheMin = this.matter.add.sprite(740, 850, 'clotheMin', null, {
            label: `${LABEL_ID.CLOTHE_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const notebookMin = this.matter.add.sprite(383, 1711, 'notebookMin', null, {
            label: `${LABEL_ID.NOTEBOOK_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const keysMin = this.matter.add.sprite(1440, 1661, 'keysMin', null, {
            label: `${LABEL_ID.KEYS_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [backDoor, bodyWindow, clotheMin, notebookMin, keysMin, rightDoor, forwardDoor, leftDoor];


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
        tthis.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.windowKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'window');
        this.windowKey.setScale(0.5);
        this.windowKey.setVisible(false);
        this.windowKey.setDepth(2);
        this.windowKey.setScrollFactor(0);
        this.windowKey.setAlpha(0);

        this.clotheKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'clothe');
        this.clotheKey.setScale(0.5);
        this.clotheKey.setVisible(false);
        this.clotheKey.setDepth(2);
        this.clotheKey.setScrollFactor(0);
        this.clotheKey.setAlpha(0);

        this.notebookKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'notebook');
        this.notebookKey.setScale(0.5);
        this.notebookKey.setVisible(false);
        this.notebookKey.setDepth(2);
        this.notebookKey.setScrollFactor(0);
        this.notebookKey.setAlpha(0);

        this.keysKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'keys');
        this.keysKey.setScale(0.5);
        this.keysKey.setVisible(false);
        this.keysKey.setDepth(2);
        this.keysKey.setScrollFactor(0);
        this.keysKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.windowKey, this.clotheKey, this.notebookKey, this.keysKey],
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
                    this.moveLeftRoom();
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                    this.moveRightRoom();
                    return;
                }

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
                        targets: [this.closeButton, this.overlayBackground, this.windowKey, this.clotheKey, this.notebookKey, this.keysKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.windowKey, this.clotheKey, this.notebookKey, this.keysKey],
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

    moveLeftRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1785, 1354);
    }

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 340, 1460);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 1024);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.WINDOW_KEY) {
            this.windowKey.setVisible(true);
            if (this.fold.indexOf(this.windowKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.windowKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.CLOTHE_KEY) {
            this.clotheKey.setVisible(true);
            if (this.fold.indexOf(this.clotheKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.clotheKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.NOTEBOOK_KEY) {
            this.notebookKey.setVisible(true);
            if (this.fold.indexOf(this.notebookKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.notebookKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.KEYS_KEY) {
            this.keysKey.setVisible(true);
            if (this.fold.indexOf(this.keysKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.keysKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.WINDOW_KEY) this.windowKey.setVisible(false);
        if (this.eventZone == LABEL_ID.CLOTHE_KEY) this.clotheKey.setVisible(false);
        if (this.eventZone == LABEL_ID.NOTEBOOK_KEY) this.notebookKey.setVisible(false);
        if (this.eventZone == LABEL_ID.KEYS_KEY) this.keysKey.setVisible(false);

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
                context.moveLeftRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                context.moveRightRoom();
                return;
            }

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
                    targets: [context.overlayBackground, context.closeButton, context.windowKey, context.clotheKey, context.notebookKey, context.keysKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.windowKey, context.clotheKey, context.notebookKey, context.keysKey],
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
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL2)) {
                this.fullMap = true;

                this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL2, 1, 1)
            }
        }
    }
}