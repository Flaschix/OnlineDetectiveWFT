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

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/tample_1.jpg');
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
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(90 + 824, 746, '813.5 1533 813.5 1621.5 950 1621.5 966 1533 1014 1533 1046.5 1792.5 1 1792.5 1 1 1635.5 1 1635.5 460 1558 508 1400.5 362.5 1413 337.5 1400.5 316.5 1348 337.5 1348 384 1302 433 1285.5 453 1380 508 1423 493 1455.5 533 1447 583 1389.5 598 1322 692 985.5 454 1084 337.5 1229 418.5 1240.5 384 1240.5 351.5 1270.5 316.5 1260.5 282.5 1270.5 220.5 1322 180 1380 180 1380 141.5 1278 148.5 1260.5 158 1031 148.5 1012.5 220.5 961.5 220.5 966.5 120.5 794 120.5 794 189.5 787 232 734 243.5 725.5 158 448 158 469.5 204.5 367.5 270 313 183 259 183 211 249.5 278.5 291 322.5 327.5 284.5 385 329.5 391 337.5 359 433 316.5 459 327.5 475.5 291 598.5 204.5 686 291 547.5 418.5 540 460 404 538.5 380 521.5 337.5 427.5 297.5 454 259 418.5 189.5 469.5 135.5 418.5 152.5 549.5 223 549.5 223 1208 152.5 1208 152.5 1359.5 189.5 1328 223 1345 318 1426.5 216.5 1551.5 333.5 1665 420.5 1678.5 384 1765.5 726.5 1765.5 752 1533 813.5 1533', { isStatic: true }, true)
        this.matter.add.fromVertices(1220 + 387, 870 + 644, '97.5 1100 1.5 1109 19 1287.5 773 1287.5 764.5 0.5 538.5 0.5 562 104 652 70 652 822.5 590 799 590 926 538.5 926 494 958 481 1026 538.5 1079 481 1134 464.5 1091 414.5 1091 385 1122 251 1134 242 1100 194.5 1067.5 221 1026 125.5 946.5 65 1018.5 153.5 1100 184.5 1079 194.5 1147 113.5 1147 97.5 1100', { isStatic: true }, true)
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

        const bodyDoor = this.matter.add.fromVertices(937 + 84, 143.5 + 76, '1 0.5 7.5 151.5 161.5 151.5 166.5 0.5 ', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const firstKey = this.matter.add.fromVertices(509 + 192.5, 1657 + 71.5, '1 116 374.5 141.5 384 1 28.5 1 1 31 1 116', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })

        const secondkey = this.matter.add.fromVertices(1722.5 + 89, 582.5 + 408.5, '37.5 768 177 816 177 1.5 0.5 85 0.5 697 37.5 768', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const shellLeft = this.matter.add.fromVertices(549.5 + 161, 151.5 + 65.5, '1.5 0.5 48.5 130.5 321 130.5 293 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        const shellRight = this.matter.add.fromVertices(1170 + 141, 148.5 + 63.5, '14 0.5 1.5 126 228.5 126 280.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        const table = this.matter.add.fromVertices(289.5 + 47, 639 + 342.5, '93 684 0.5 684 0.5 1 93 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const tableRight = this.matter.add.fromVertices(1113 + 230.5, 413 + 198, '1 144 120 1 459.5 240 359 394.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, firstKey, secondkey, shellLeft, shellRight, table, tableRight];


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
        const a = myMap.get('firstKey');
        const b = myMap.get('secondKey');

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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'firstKey');
        this.firstKey.setScale(0.5);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondkey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'secondKey');
        this.secondkey.setScale(0.5);
        this.secondkey.setVisible(false);
        this.secondkey.setDepth(2);
        this.secondkey.setScrollFactor(0);
        this.secondkey.setAlpha(0);

        this.textA = this.add.text(a.x, this.cameras.main.height / 2, `${decrypt(a.text)}`, { font: "normal 60px MyCustomFont1", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textA.setVisible(false);
        this.textA.setAlpha(0);

        this.textB = this.add.text(b.x, this.cameras.main.height / 2, `${decrypt(b.text)}`, { font: "normal 60px MyCustomFont1", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textB.setVisible(false);
        this.textB.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey, this.textA, this.textB],
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
            if (this.avatarDialog.visible || this.exitContainer.visible) return;
            if (this.foldKeys.visible) return;

            if (this.isInZone) {
                this.player.setVelocity(0);

                if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                    this.moveForwardRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey, this.textA, this.textB],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey, this.textA, this.textB],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1800);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            this.textA.setVisible(true);
            if (this.fold.indexOf(this.firstKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.firstKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondkey.setVisible(true);
            this.textB.setVisible(true);
            if (this.fold.indexOf(this.secondkey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.secondkey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.firstKey.visible) { this.firstKey.setVisible(false); this.textA.setVisible(false); }
        if (this.secondkey.visible) { this.secondkey.setVisible(false); this.textB.setVisible(false); }
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
        if (context.avatarDialog.visible || context.exitContainer.visible) return;
        if (context.foldKeys.visible) return;
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveForwardRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.emptyKey, context.textA, context.textB],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.emptyKey, context.textA, context.textB],
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