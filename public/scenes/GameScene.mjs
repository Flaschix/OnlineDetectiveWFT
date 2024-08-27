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

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/map_city_1.png');

        this.load.image('person11', './assets/mapKey/character1-1.png');
        this.load.image('person12', './assets/mapKey/character1-2.png');
        this.load.image('person13', './assets/mapKey/character1-3.png');
        this.load.image('person14', './assets/mapKey/character1-4.png');
        this.load.image('person15', './assets/mapKey/character1-5.png');
        this.load.image('person16', './assets/mapKey/character1-6.png');
        this.load.image('person17', './assets/mapKey/character1-7.png');
        this.load.image('person18', './assets/mapKey/character1-8.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map', MAP_SETTINGS.MAP_FULL1);

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


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL1)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL1, './assets/map/map_city_full_1.png');

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
        this.matter.add.fromVertices(194 + 1002.5, 839, '531 1881 586.5 1889 586.5 2045 1.5 1950.5 69.5 0.5 1984 0.5 2004 862 1984 925.5 1962.5 967 1902 996.5 1902 1042.5 1928.5 1050.5 1939 1083 1928.5 1104.5 1886.5 1115.5 1855.5 1075 1886.5 1050.5 1886.5 1010.5 1855.5 996.5 1812.5 925.5 1812.5 879 1775.5 845 1775.5 780 1812.5 765 1855.5 780 1855.5 678.5 1792.5 678.5 1767.5 514.5 1767.5 397.5 1792.5 397.5 1792.5 267.5 1855.5 280 1855.5 14.5 1301.5 14.5 1301.5 351 1360 371 1360 565.5 1408 565.5 1408 678.5 1465 727.5 1557.5 727.5 1595 749.5 1595 1010.5 1451 1010.5 1451 803.5 1346 845 1267.5 862 937 845 937 925.5 680.5 925.5 613 958 562 958 532.5 925.5 526.5 879 338 879 325.5 920.5 205 920.5 205 853 118.5 845 128 1337.5 194.5 1337.5 194.5 1439.5 128 1439.5 128 1581.5 449 1581.5 461.5 1881 531 1881', { isStatic: true }, true)
        this.matter.add.fromVertices(1855 + 85, 1286 + 357, '53.5 484.5 53.5 713 169.5 700.5 169.5 1 84.5 1 61 104.5 61 328.5 1 357.5 1 484.5 27.5 496.5 53.5 484.5', { isStatic: true }, true)
        this.matter.add.fromVertices(856.5 + 78, 1583 + 169, '0.5 13.5 0.5 327 76.5 337.5 155 327 155 13.5 76.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(1103.5 + 71.5, 1646.5 + 144, '0.5 25 0.5 287.5 142.5 287.5 142.5 25 124 0.5 27 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1568.5 + 95.5, 1370 + 184.5, '91.5 288 91.5 368.5 127 368.5 113 297.5 127 211 159.5 211 190 174 190 132.5 159.5 92 181 64.5 168.5 35 139.5 46 113 1 66.5 15 29.5 46 11 83 29.5 117 49.5 149.5 29.5 163 0.5 186.5 0.5 226.5 66.5 239', { isStatic: true }, true)
        this.matter.add.fromVertices(951 + 54, 1015 + 48, '1 1 1 95 107.5 95 107.5 1', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL1)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
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

        const bodyUp = this.matter.add.fromVertices(1486.5 + 153.5, 6.5 + 101, '0.5 201.5 0.5 0.5 306.5 0.5 306.5 201.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyRight = this.matter.add.fromVertices(1956 + 45.5, 1141.5 + 93.5, '1 186 90.5 186 90.5 0.5 1 0.5', {
            label: `${LABEL_ID.DOOR_RIGHT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(1023, 831, 'person11', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(1351, 870, 'person12', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(674, 1699, 'person13', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(1877, 931, 'person14', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(360, 1285, 'person15', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person6 = this.matter.add.sprite(759, 1018, 'person16', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person8 = this.matter.add.sprite(1861, 1955, 'person18', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person7 = this.matter.add.sprite(1458, 1667, 'person17', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [person1, person2, bodyRight, bodyUp, person3, person4, person5, person6, person7, person8];


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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'firstKey');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.emptyMan = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyMan');
        this.emptyMan.setScale(0.8);
        this.emptyMan.setVisible(false);
        this.emptyMan.setDepth(2);
        this.emptyMan.setScrollFactor(0);
        this.emptyMan.setAlpha(0);

        this.emptyWoman = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyWoman');
        this.emptyWoman.setScale(0.8);
        this.emptyWoman.setVisible(false);
        this.emptyWoman.setDepth(2);
        this.emptyWoman.setScrollFactor(0);
        this.emptyWoman.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyMan, this.emptyWoman],
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

                if (this.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                    this.moveRightRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyMan, this.emptyWoman],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyMan, this.emptyWoman],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1800);
    }

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 200, 1300);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            if (this.fold.indexOf(this.firstKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.firstKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_MAN) {
            this.emptyMan.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.EMPTY_WOMAN) {
            this.emptyWoman.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.firstKey.visible) this.firstKey.setVisible(false);
        if (this.emptyMan.visible) this.emptyMan.setVisible(false);
        if (this.emptyWoman.visible) this.emptyWoman.setVisible(false);

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

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveForwardRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                context.moveRightRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.emptyMan, context.emptyWoman],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.emptyMan, context.emptyWoman],
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
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL1)) {
                this.fullMap = true;

                this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL1, 1, 1)
            }
        }
    }
}