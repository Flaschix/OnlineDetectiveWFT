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
        this.load.image('map2', './assets/map/map_garally_2.png');

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

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL2, './assets/map/map_garally_full_2.png');

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
        this.matter.add.fromVertices(684, 842, '248 1318 208.5 1742 1.5 1519 80.5 1 1615.5 1 1615.5 320.5 1549 320.5 1536.5 240 1280 240 1280 268.5 1206 268.5 1164.5 268.5 1164.5 311 1139.5 303.5 1145.5 344.5 1088.5 344.5 1071 294 1071 249.5 1039.5 232 1039.5 88 870 88 870 232 832 240 813.5 311 813.5 344.5 756.5 344.5 756.5 311 723 311 723 268.5 620 268.5 620 249.5 368.5 249.5 356 311 316.5 389 438 404.5 455.5 439.5 492 439.5 492 485.5 481 540.5 492 574 536.5 604 536.5 699 455.5 699 392 667.5 392 753 368.5 835 346.5 827 346.5 892 517.5 892 517.5 987 261 987 261 1020.5 166 1012.5 133.5 965 83 1179.5 182 1288', { isStatic: true }, true)
        this.matter.add.fromVertices(1485 + 228.5, 440 + 725, '187 1041 231 1449.5 456 1449.5 409.5 1 206 1 206 75.5 166 94.5 122 103 105.5 177 105.5 237.5 166 237.5 158 273.5 166 394.5 206 383.5 188 442.5 206 563.5 243 539 243 605 105.5 605 86.5 577.5 1 577.5 1 716.5 86.5 716.5 118 689 231 689 243 716.5 243 749.5 266.5 768.5 292 768.5 362 700 391.5 917 319 1009 280.5 1004 280.5 936.5 259.5 902 231 917 206 902 166 924 187 1041', { isStatic: true }, true)
        this.matter.add.fromVertices(879.5 + 140, 1673.5 + 145.5, '1.5 139.5 134 289.5 279 139.5 134 1.5', { isStatic: true }, true)
        this.matter.add.fromVertices(305 + 79.5, 1382 + 72, '32.5 136 91 143 146 109 157.5 43.5 128 9.5 65 1 8.5 36.5 1 102', { isStatic: true }, true)
        this.matter.add.fromVertices(1383 + 44.5, 1781 + 74, '10.5 24 1.5 138.5 88.5 146.5 88.5 28.5 56.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(1551 + 49, 1917.5 + 59.5, '8 57 1 118 94 118 75.5 67.5 94 38 83 15 62 1.5 21.5 15 21.5 52.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1520 + 40, 1372 + 49, '23.5 1.5 1 81 45 99 78.5 18.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1443 + 76, 680 + 144.5, '1 202 6.5 282.5 92.5 287.5 102 245 97.5 198 102 168 133.5 126 125 105.5 117 78.5 129 60.5 151 38.5 145.5 6 111.5 1 82 14.5 82 38.5 51 49.5 30 49.5 30 89.5 58 117 45.5 157 30 186 1 202', { isStatic: true }, true)
        this.matter.add.fromVertices(1215 + 96, 480 + 143.5, '7 252.5 40.5 275 78 286 129.5 281 158 241.5 150.5 187.5 129.5 158.5 139 123 114 101 118 73.5 124 66 172.5 66 183 38.5 190.5 18.5 168 1 150.5 45 139 31.5 118 12.5 96.5 38.5 78 66 78 101 64 101 54 117 54 136 34.5 154 1 196 7 252.5', { isStatic: true }, true)
        this.matter.add.fromVertices(652 + 85, 410 + 174.5, '30 332 80 348.5 125 348.5 146.5 326 169 283 155.5 238 114 189 87 166.5 87 137.5 87 88 75 51.5 96.5 18 71 1 44.5 18 59.5 28.5 30 63.5 23.5 102 0.5 114 0.5 159 15.5 172.5 34.5 166.5 44.5 221.5 15.5 257.5 15.5 291 30 332', { isStatic: true }, true)
        this.matter.add.fromVertices(330 + 143.5, 1952 + 53.5, '286.5 106.5 148.5 60 93 65 68 51.5 76 25.5 46.5 1 19.5 8 1.5 25.5 6 60 34.5 70 57.5 106.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(841 + 180.5, 2020 + 14.5, '1 1 1 28.5 360.5 28.5 360.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(950 + 81.5, 389.5 + 66.5, '1 0.5 1 132.5 162.5 132.5 162.5 0.5', {
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
        this.overlayBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.windowKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'window');
        this.windowKey.setScale(0.5);
        this.windowKey.setVisible(false);
        this.windowKey.setDepth(2);
        this.windowKey.setScrollFactor(0);
        this.windowKey.setAlpha(0);

        this.clotheKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'clothe');
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