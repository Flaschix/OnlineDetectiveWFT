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

export class GameScene5 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE5);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map5', './assets/map/map_garally_5.png');

        this.load.image('bagMin', './assets/mapKey/bagMin.png');
        this.load.image('glassesMin', './assets/mapKey/glassesMin.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map5', MAP_SETTINGS.MAP_FULL5);

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


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL5)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL5, './assets/map/map_garally_full_5.png');

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
        this.matter.add.fromVertices(614, 446 + 664.5, '32.5 1189.5 1 1328 11 1 1539.5 1 1539.5 187 1467 187 1467 165.5 1419 165.5 1428.5 86.5 1245 81.5 1238 165.5 1196 171.5 1196 199 1151 199 1147 223 1121 238.5 1093.5 216 1111 194.5 1076.5 194.5 1069.5 171.5 1021.5 171.5 1031 86.5 840.5 86.5 861 165.5 812 165.5 812 187 770 187 791.5 207.5 785.5 238.5 761.5 245.5 736.5 238.5 731.5 207.5 682.5 201.5 682.5 165.5 643 171.5 654 109 637 102 632.5 80.5 450.5 86.5 462 165.5 417 165.5 411 187 345 182.5 339 207.5 359.5 245.5 349.5 271 378.5 330 422.5 340.5 443 404 474 468.5 417 512 388 455.5 345 476 334 441 306.5 421 275.5 427.5 235.5 427.5 221.5 404 192.5 488 215.5 543 241.5 582.5 215.5 720 201 753.5 151 753.5 136.5 708 97 858 136.5 921 145 956 145 974 151 1006 177 1027.5 183 1042 214 1071 250 1107 229 1150 183 1150 151 1090 145 1042 131.5 1033.5 111 1116.5 92 1172.5 58.5 1166.5 53.5 1189.5 32.5 1189.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1520 + 252, 900 + 618, '178 1151.5 151.5 1197 502.5 1234.5 350.5 1 88.5 1 88.5 65 66.5 109 88.5 130 66.5 165 12 201.5 1.5 273 61.5 312 117 292 184.5 292 211.5 437 167.5 518 134 581 192.5 618 222 581 236 618 304 608.5 327 738.5 304 775.5 289.5 857.5 257 895 242 936.5 206.5 941.5 178 974 187.5 1002.5 206.5 1019.5 242 1019.5 275.5 979.5 339 1037 378.5 1037 378.5 1056 405 1056 451 1197 264 1197 294.5 1151.5 294.5 1123.5 248.5 1123.5 222 1102.5 211.5 1123.5 235 1138 178 1151.5', { isStatic: true }, true)
        this.matter.add.fromVertices(290 + 42.5, 1498 + 67.5, '8 110 15 133.5 83.5 104 45.5 66 45.5 41.5 31 14.5 15 1.5 8 14.5 8 41.5 1 52.5 15 97 8 110', { isStatic: true }, true)
        this.matter.add.fromVertices(359.5 + 49, 1393.5 + 64.5, '35.5 128.5 88 128.5 97 94 81 46 52.5 13.5 25.5 1.5 1.5 13.5 15.5 86 35.5 86 35.5 128.5', { isStatic: true }, true)
        this.matter.add.fromVertices(773 + 70.5, 1675 + 103.5, '1.5 154 76 205.5 140.5 161 140.5 133.5 94 107.5 112 45 94 20 70 20 70 1 53 1 39.5 32 14.5 38 28.5 55 28.5 69.5 39.5 96.5 1.5 154', { isStatic: true }, true)
        this.matter.add.fromVertices(847 + 26, 1600.5 + 32, '1 54 17 62.5 51.5 42 51.5 15 27.5 1.5 1 15 1 54', { isStatic: true }, true)
        this.matter.add.fromVertices(1115 + 82, 1515 + 80, '1 88.5 1 159.5 123 159.5 123 109 153 88.5 163 48.5 153 6 133.5 1 123 15.5 93.5 58.5 75.5 88.5 1 88.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1093 + 133.5, 1913 + 62.5, '11 94.5 1 124.5 265 124.5 144 23.5 147 7 132 1 132 27 112.5 45.5 64.5 27 11 94.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1560 + 142, 1455.5 + 149.5, '119 298 216 217 216 188.5 233.5 161.5 248 122 272.5 128 282.5 60.5 254.5 33.5 248 20 222 20 216 40.5 188 60.5 131 1.5 39 79 1.5 167.5 119 298', { isStatic: true }, true)
        this.matter.add.fromVertices(1554 + 34, 1282 + 62.5, '1 78 6 118.5 45.5 123.5 60 97.5 55.5 68 76 44.5 76 1 35.5 9 22 38 1 78', { isStatic: true }, true)
        this.matter.add.fromVertices(896 + 144.5, 1071 + 192, '39 335 49 362.5 133 383 166 383 258.5 362.5 258.5 335 288 291 268 282 268 109.5 288 71.5 268 90 254.5 90 258.5 62.5 246.5 57 232.5 79 187 86 187 45.5 166 40.5 187 22 160 15 153.5 1 140 8.5 119 15 133 45.5 111 50.5 111 86 71 86 49 57 39 71.5 11 62.5 11 79 28 109.5 28 277 1 291 39 335', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL5)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
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

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(920.5 + 89.5, 1954.5 + 43, '0.5 0.5 0.5 85 178.5 85 178.5 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bagMin = this.matter.add.sprite(488, 1264, 'bagMin', null, {
            label: `${LABEL_ID.BAG_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const glassesMin = this.matter.add.sprite(1388, 1696, 'glassesMin', null, {
            label: `${LABEL_ID.GLASSES_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [bodyDoor, bagMin, glassesMin];


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
        this.bagKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bag');
        this.bagKey.setScale(0.5);
        this.bagKey.setVisible(false);
        this.bagKey.setDepth(2);
        this.bagKey.setScrollFactor(0);
        this.bagKey.setAlpha(0);

        this.glassesKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'glasses');
        this.glassesKey.setScale(0.5);
        this.glassesKey.setVisible(false);
        this.glassesKey.setDepth(2);
        this.glassesKey.setScrollFactor(0);
        this.glassesKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.bagKey, this.glassesKey],
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
                        targets: [this.closeButton, this.overlayBackground, this.bagKey, this.glassesKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.bagKey, this.glassesKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 600);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.BAG_KEY) {
            this.bagKey.setVisible(true);
            if (this.fold.indexOf(this.bagKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.bagKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.GLASSES_KEY) {
            this.glassesKey.setVisible(true);
            if (this.fold.indexOf(this.glassesKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.glassesKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.BAG_KEY) this.bagKey.setVisible(false);
        if (this.eventZone == LABEL_ID.GLASSES_KEY) this.glassesKey.setVisible(false);

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
                    targets: [context.overlayBackground, context.closeButton, context.bagKey, context.glassesKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.bagKey, context.glassesKey],
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
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL5)) {
                this.fullMap = true;

                this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL5, 1, 1)
            }
        }
    }
}