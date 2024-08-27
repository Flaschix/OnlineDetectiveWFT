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
        this.load.image('map3', './assets/map/tample_3.png');
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
        this.createEnterCodeContainer();
        //Создание слушателей нажатия кнопок
        this.createInputHandlers();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());


        if (!this.textures.exists(MAP_SETTINGS.MAP_FULL3)) {

            this.loadPlusTexture(MAP_SETTINGS.MAP_FULL3, './assets/map/tample_full_3.png');

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
        this.matter.add.fromVertices(690, 940, '1118 1896 1118 1952.5 84.5 1912.5 0.5 1642 61 0.5 1674 0.5 1674 471 1603.5 441 1473.5 309 1437 334 1216.5 334 1181 360 1191 423 1156.5 448 1104.5 471 1082.5 441 1052 413.5 1052 349 1082.5 286 1082.5 227 1082.5 177.5 1041 177.5 1041 131 1052 56.5 777.5 56.5 786 177.5 743.5 177.5 743.5 227 743.5 276.5 761 334 761 379 761 423 735 448 702 448 674.5 423 649 379 406 379 374.5 309 179 504 158.5 504 158.5 778.5 217.5 820 224.5 847.5 254.5 902 294.5 931 285 1083.5 254.5 1113.5 234 1160.5 234 1193 171 1220.5 171 1308.5 171 1448.5 84.5 1531 84.5 1558.5 112 1575 125.5 1616 180.5 1597 334 1750.5 384 1765 665 1765 665 1822 729.5 1822 738 1750.5 775 1750.5 775 1896 1118 1896', { isStatic: true }, true)
        this.matter.add.fromVertices(1320 + 382, 335 + 773.5, '1 1432 13.5 1519 748 1546 748 1.5 527 1.5 399 55.5 361.5 1.5 279 72 341 155 420 72 442.5 130 515 167.5 590 72 590 538.5 590 634 544 652.5 610.5 677.5 610.5 1079.5 544 1013 578 1172 427.5 1338.5 401 1382 55 1403 1 1432', { isStatic: true }, true)
        this.matter.add.fromVertices(770 + 278, 1100 + 167.5, '1 169.5 10.5 334 549 328 555 169.5 329.5 169.5 329.5 65 350 65 350 0.5 176.5 0.5 176.5 65 198 65 198 169.5 1 169.5', { isStatic: true }, true)
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


        const bodyDoor = this.matter.add.fromVertices(872 + 142, -2.5 + 75.5, '1 0.5 13.5 150.5 270 150.5 282.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyBackDoor = this.matter.add.fromVertices(873.5 + 160.5, 1765 + 78.5, '0.5 156 0.5 1 302.5 1 320 156', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const fivethKey = this.matter.add.fromVertices(1722 + 62.5, 1090.5 + 235, '124.5 468 1 364.5 1 1.5 124.5 45', {
            label: `${LABEL_ID.FIVETH_KEY}`,
            isStatic: true,
        })

        const sixethKey = this.matter.add.fromVertices(194 + 43, 467 + 168.5, '1 302.5 85.5 335.5 85.5 72.5 1 2', {
            label: `${LABEL_ID.SIXETH_KEY}`,
            isStatic: true,
        })

        const shell1 = this.matter.add.fromVertices(422.5 + 174, 1766.5 + 59.5, '308.5 109 346.5 0.5 70.5 0.5 1.5 118', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell2 = this.matter.add.fromVertices(189 + 126.5, 1608.5 + 124.5, '148.5 247.5 252 142.5 114 1.5 1 97', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell3 = this.matter.add.fromVertices(153 + 163.5, 157 + 191, '1 255 125 380.5 325.5 186 237.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell4 = this.matter.add.fromVertices(450 + 146, 154 + 131, '1 0.5 69.5 253 290.5 261 267 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell5 = this.matter.add.fromVertices(1297 + 147, 162 + 108, '35.5 1 1 215.5 220.5 215.5 292.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell6 = this.matter.add.fromVertices(1562 + 160, 204 + 155, '118.5 1 1 150 181 308.5 319 206.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell7 = this.matter.add.fromVertices(1761 + 34.5, 467.5 + 254.5, '68.5 1.5 1 67.5 1 507.5 68.5 495', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell8 = this.matter.add.fromVertices(1599.5 + 127.5, 1600 + 130.5, '81.5 259.5 1.5 162 156.5 1 254 79', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, fivethKey, sixethKey, bodyBackDoor, shell1, shell2, , shell3, , shell4, shell5, shell6, shell7, shell8];


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
        this.fivethKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'fivethKey');
        this.fivethKey.setScale(0.5);
        this.fivethKey.setVisible(false);
        this.fivethKey.setDepth(2);
        this.fivethKey.setScrollFactor(0);
        this.fivethKey.setAlpha(0);

        this.sixethKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'sixethKey');
        this.sixethKey.setScale(0.5);
        this.sixethKey.setVisible(false);
        this.sixethKey.setDepth(2);
        this.sixethKey.setScrollFactor(0);
        this.sixethKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyKey],
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
                    // this.moveForwardRoom();
                    if (this.enterCodeContainer.visible) {
                        this.tweens.add({
                            targets: [this.enterCodeContainer],
                            alpha: 0,
                            duration: 500,
                            onComplete: () => {
                                this.enterCodeContainer.setVisible(false);
                                this.isOverlayVisible = false;
                            }
                        });

                    } else {
                        this.isOverlayVisible = true;
                        this.enterCodeContainer.setVisible(true);
                        this.tweens.add({
                            targets: [this.enterCodeContainer],
                            alpha: 1,
                            duration: 500
                        });
                    }
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveBackRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 380);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1700);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIVETH_KEY) {
            this.fivethKey.setVisible(true);
            if (this.fold.indexOf(this.fivethKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fivethKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.SIXETH_KEY) {
            this.sixethKey.setVisible(true);
            if (this.fold.indexOf(this.sixethKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.sixethKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.fivethKey.visible) this.fivethKey.setVisible(false);
        if (this.sixethKey.visible) this.sixethKey.setVisible(false);
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
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                if (context.enterCodeContainer.visible) {
                    context.tweens.add({
                        targets: [context.enterCodeContainer],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            context.enterCodeContainer.setVisible(false);
                            context.isOverlayVisible = false;
                        }
                    });

                } else {
                    context.isOverlayVisible = true;
                    context.enterCodeContainer.setVisible(true);
                    context.tweens.add({
                        targets: [context.enterCodeContainer],
                        alpha: 1,
                        duration: 500
                    });
                }
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveBackRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.sixethKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.sixethKey, context.emptyKey],
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

    createEnterCodeContainer() {
        this.enterCodeContainer = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
    <div class="enterCodeContainer">
        <div id="enterCodeDialog">
            <h2 id="enterCodeTitle">Enter code</h2>
            <div id="codeInputs">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
            </div>
            <input id="join-room-connect" class="connect-space-button" type="image" src="./assets/button/enter.png" alt="Connect">
            <input id="join-room-cancel" class="connect-space-button" type="image" src="./assets/button/cancel.png" alt="Cancel">
        </div>
    </div>
                `);
        this.enterCodeContainer.setScrollFactor(0);
        this.enterCodeContainer.setOrigin(0.5, 0.5);
        const inputsContainer = document.getElementById('codeInputs')
        const titleContainer = document.getElementById('enterCodeTitle')

        const inputs = document.querySelectorAll('#codeInputs input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });

            input.addEventListener('paste', (event) => {
                event.preventDefault();
                const pasteData = (event.clipboardData || window.clipboardData).getData('text');
                const pasteArray = pasteData.split('').slice(0, inputs.length);

                pasteArray.forEach((char, i) => {
                    inputs[i].value = char;
                });

                if (pasteArray.length < inputs.length) {
                    inputs[pasteArray.length].focus();
                }
            });
        });

        const correctCode = 'FATHOM';
        let correctFlag = true;

        const joinRoomConnect = document.getElementById('join-room-connect');
        joinRoomConnect.addEventListener('click', () => {
            if (correctFlag) {
                let code = '';

                inputs.forEach(input => {
                    code += input.value;
                });

                code = code.toUpperCase();

                if (code == correctCode) {
                    this.enterCodeContainer.setVisible(false);
                    this.isOverlayVisible = false;
                    this.moveForwardRoom();
                }
                else {
                    inputs.forEach(input => {
                        input.value = "";
                    });

                    inputsContainer.style.display = 'none';
                    titleContainer.innerHTML = 'Incorrect code';
                    titleContainer.style.color = 'red';
                    joinRoomConnect.src = './assets/button/try-again.png';
                    correctFlag = false
                }
            } else {
                inputsContainer.style.display = 'flex';
                titleContainer.innerHTML = 'Enter code';
                titleContainer.style.color = '#F2F0FF';
                joinRoomConnect.src = './assets/button/enter.png';
                correctFlag = true
            }
        });

        const joinRoomCancel = document.getElementById('join-room-cancel');
        joinRoomCancel.addEventListener('click', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.enterCodeContainer],
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

        this.enterCodeContainer.setVisible(false);
    }
}