import { CST, LABEL_ID } from "../CST.mjs";
import { socket } from "../CST.mjs";
import { SocketWorker } from "../share/SocketWorker.mjs";
import { createUIBottom, createUITop, createUIRight, createUILeftMobile, createUI, createExitMenu, createAvatarDialog, isMobile, createJoystick, createMobileXButton, HEIGHT_PRESS_X, MAP_SETTINGS, CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";
import { AnimationControl } from "../share/AnimationControl.mjs";
import { PlayersController } from "../share/PlayerController.mjs";

export class BaseScene extends Phaser.Scene {
    constructor(sceneKey) {
        super({ key: sceneKey });

        //проверка на то, стоит ли игрок в зоне или нет
        this.isInZone = false;

        this.player;

        //зона в которой стоит игрок
        this.eventZone = null;

        //виден ли оверлей сейчас поврех экрана
        this.isOverlayVisible = false;

        this.mobileFlag = false;

        this.isDragging = false;

        this.foldImgNumber = 0;
        this.fold = [];

        this.fullMap = true;
        this.moved = false;

        this.otherPlayers = {};
    }

    preload() {
        this.loding = new AnimationControl(AnimationControl.LOADING);
        this.loding.addLoadOnScreen(this, 1280 / 2, 720 / 2, 0.3, 0.3);
    }

    create(data) {
        this.mySocket = new SocketWorker(socket);
        const { players } = data;
        this.loding.deleteLoadFromScreen(this);
        this.playersController = new PlayersController();
        this.mobileFlag = isMobile();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.createUnWalkedObjects();
        this.createCollision();
        this.createOverlays();
        this.createFold();
        this.createInputHandlers();
        this.createUIElements(players);
        this.setupSocketListeners();
    }

    createUIElements(players) {
        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 120);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 120, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 'fold', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu, 90, 200, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN);
        }
        createUIRight(this);
        createUITop(this);
        createUIBottom(this);
        createExitMenu(this, this.leaveGame, this.closeExitMenu, this.mobileFlag);
        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, player.room, isMobile());
    }

    setupSocketListeners() {
        this.mySocket.subscribeExistedPlayers(this, this.createOtherPlayersTest);
        this.mySocket.subscribeTakeFold(this, this.updateFold);
        this.mySocket.subscribeNewPlayer(this, this.scene.key, this.otherPlayers, this.playersController.createOtherPlayer);
        this.mySocket.subscribePlayerMoved(this, this.scene.key, this.checkOtherPlayer);
        this.mySocket.subscribePlayerDisconected(this.deletePlayer);
        this.mySocket.subscribeSceneSwitched(this, this.scene.key, this.sceneSwitched);
        this.mySocket.emitGetPlayers();
        this.mySocket.emitGetFold();
    }

    createMap(map, mapFull) {
        if (this.textures.exists(mapFull)) {
            this.map = this.add.image(0, 0, mapFull).setOrigin(0, 0);
            this.map.setScale(MAP_SETTINGS.MAP_SCALE_4_3, MAP_SETTINGS.MAP_SCALE_4_3);
            this.matter.world.setBounds(0, 0, this.map.width * MAP_SETTINGS.MAP_SCALE_4_3, this.map.height * MAP_SETTINGS.MAP_SCALE_4_3);
        } else {
            this.map = this.add.image(0, 0, map).setOrigin(0, 0);
            this.map.setScale(2, 2);
            this.matter.world.setBounds(0, 0, this.map.width * MAP_SETTINGS.MAP_SCALE_2, this.map.height * MAP_SETTINGS.MAP_SCALE_2);
        }
    }

    createUnWalkedObjects() {
        // Реализация метода
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                player = this.playersController.createMainPlayer(this, players[id]);
                this.cameras.main.startFollow(player);
                if (this.textures.exists(MAP_SETTINGS.MAP_FULL2)) this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width * MAP_SETTINGS.MAP_SCALE_4_3 + cameraMargin.right, this.map.height * MAP_SETTINGS.MAP_SCALE_4_3 + cameraMargin.bottom);
                else this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.right, this.map.height * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.bottom);
            } else {
                this.playersController.createOtherPlayer(this, players[id], this.otherPlayers);
            }
        });
    }

    createOtherPlayersTest(context, players) {
        Object.keys(players).forEach((id) => {
            if (!(id === socket.id) && this.otherPlayers[id] == null) {
                context.playersController.createOtherPlayer(context, players[id], this.otherPlayers);
            }
        });
    }

    checkOtherPlayer(self, playerInfo) {
        if (this.otherPlayers[playerInfo.id]) {
            const player = this.otherPlayers[playerInfo.id];
            player.targetX = playerInfo.x;
            player.targetY = playerInfo.y;
            player.velocityX = playerInfo.velocityX;
            player.velocityY = playerInfo.velocityY;
            player.isMoving = playerInfo.isMoving;
            player.direction = playerInfo.direction;
            self.tweens.add({
                targets: player,
                x: playerInfo.x,
                y: playerInfo.y,
                duration: 200,
                onUpdate: function () {
                    self.playersController.updateAnimOtherPlayer(player, {
                        ...playerInfo,
                        velocityX: player.targetX - player.x,
                        velocityY: player.targetY - player.y
                    });
                },
                onComplete: function () {
                    try {
                        if (!player.isMoving) {
                            player.anims.stop();
                        }
                    } catch (e) { };
                }
            });
        }
    }

    deletePlayer(id) {
        if (this.otherPlayers[id]) {
            this.otherPlayers[id].nameText.destroy();
            this.otherPlayers[id].destroy();
            delete this.otherPlayers[id];
        }
    }

    createCollision() {
        // Реализация метода
    }

    createOverlays() {
        // Реализация метода
    }

    createInputHandlers() {
        this.input.keyboard.on('keydown-X', () => {
            if (this.foldKeys.visible) return;
            if (this.isInZone) {
                player.setVelocity(0);
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
                        targets: [this.closeButton, this.overlayBackground, this.emptySign, this.thirdKey, this.fourthKey],
                        alpha: 1,
                        duration: 500
                    });
                } else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.emptySign, this.thirdKey, this.fourthKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1840);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 700);
    }

    showOverlay() {
        this.isOverlayVisible = true;
        if (this.eventZone == LABEL_ID.THIRD_KEY) {
            this.thirdKey.setPosition(this.cameras.main.scrollX + 640, this.cameras.main.scrollY + 360).setVisible(true);
            if (this.fold.indexOf(this.thirdKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.thirdKey.texture.key);
            }
        } else if (this.eventZone == LABEL_ID.FOURTH_KEY) {
            this.fourthKey.setPosition(this.cameras.main.scrollX + 640, this.cameras.main.scrollY + 360).setVisible(true);
            if (this.fold.indexOf(this.fourthKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fourthKey.texture.key);
            }
        } else {
            this.emptySign.setPosition(this.cameras.main.scrollX + 640, this.cameras.main.scrollY + 360).setVisible(true);
        }
        this.overlayBackground.setPosition(this.cameras.main.scrollX + 640, this.cameras.main.scrollY + 360).setVisible(true);
        this.closeButton.setPosition(
            this.cameras.main.scrollX + 640 + this.overlayBackground.displayWidth / 2 - this.overlayBackground.displayWidth * 0.1 / 2 + 10,
            this.cameras.main.scrollY + 360 - this.overlayBackground.displayHeight / 2 + this.overlayBackground.displayHeight * 0.1 / 2,
        ).setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false;
        if (this.eventZone == LABEL_ID.THIRD_KEY) this.thirdKey.setVisible(false);
        else if (this.eventZone == LABEL_ID.FOURTH_KEY) this.fourthKey.setVisible(false);
        else {
            this.emptySign.setVisible(false);
        }
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    createFold() {
        // Реализация метода
    }

    showFold(context) {
        if (context.isOverlayVisible) return;
        player.setVelocity(0);
        context.isOverlayVisible = true;
        context.overlayBackground.setAlpha(1);
        context.foldColseBtn.setAlpha(1);
        if (context.fold == null || context.fold.length < 1) {
            context.emptySign.setPosition(context.cameras.main.scrollX + 640, context.cameras.main.scrollY + 360).setVisible(true);
            context.emptySign.setAlpha(1);
        } else if (context.fold.length > 1) {
            context.foldImgNumber = 0;
            context.leftArrow.setVisible(false);
            context.rightArrow.setVisible(true);
            context.foldKeys.setTexture(context.fold[0]);
            context.foldKeys.setVisible(true);
        } else {
            context.foldImgNumber = 0;
            context.foldKeys.setTexture(context.fold[0]);
            context.foldKeys.setVisible(true);
        }
        context.overlayBackground.setPosition(context.cameras.main.scrollX + 640, context.cameras.main.scrollY + 360).setVisible(true);
        context.foldColseBtn.setPosition(
            context.cameras.main.scrollX + 640 + context.overlayBackground.displayWidth / 2 - context.overlayBackground.displayWidth * 0.1 / 2 + 10,
            context.cameras.main.scrollY + 360 - context.overlayBackground.displayHeight / 2 + context.overlayBackground.displayHeight * 0.1 / 2,
        ).setVisible(true);
    }

    moveRightKeys() {
        if (this.foldImgNumber < this.fold.length - 1) {
            this.foldImgNumber += 1;
            if (this.foldImgNumber == this.fold.length - 1) this.rightArrow.setVisible(false);
            this.leftArrow.setVisible(true);
            this.tweens.add({
                targets: [this.foldKeys],
                alpha: 0,
                duration: 250,
                onComplete: () => {
                    try {
                        this.foldKeys.setTexture(this.fold[this.foldImgNumber]);
                        this.tweens.add({
                            targets: [this.foldKeys],
                            alpha: 1,
                            duration: 250,
                        });
                    } catch (e) { }
                }
            });
        }
    }

    moveLeftKeys() {
        if (this.foldImgNumber > 0) {
            this.foldImgNumber -= 1;
            if (this.foldImgNumber == 0) this.leftArrow.setVisible(false);
            this.rightArrow.setVisible(true);
            this.tweens.add({
                targets: [this.foldKeys],
                alpha: 0,
                duration: 250,
                onComplete: () => {
                    try {
                        this.foldKeys.setTexture(this.fold[this.foldImgNumber]);
                        this.tweens.add({
                            targets: [this.foldKeys],
                            alpha: 1,
                            duration: 250,
                        });
                    } catch (e) { }
                }
            });
        }
    }

    updateFold(context, arr) {
        context.fold = arr;
    }

    showSettings(self) {
        if (self.foldKeys.visible || self.emptySign.visible) return;
        self.avatarDialog.setPosition(self.cameras.main.scrollX + 640, self.cameras.main.scrollY + 360);
        self.avatarDialog.setVisible(true);
        self.isOverlayVisible = true;
        self.exitContainer.setVisible(false);
        player.setVelocity(0);
    }

    showExitMenu(self) {
        if (self.foldKeys.visible || self.emptySign.visible) return;
        self.exitContainer.setPosition(self.cameras.main.scrollX + 640, self.cameras.main.scrollY + 360);
        self.exitContainer.setVisible(true);
        self.isOverlayVisible = true;
        self.avatarDialog.setVisible(false);
        player.setVelocity(0);
    }

    leaveGame(self) {
        window.location.reload();
    }

    closeExitMenu(self) {
        self.exitContainer.setVisible(false);
        self.isOverlayVisible = false;
    }

    enterNewSettingsInAvatarDialog(self, usernameInput, nameError, imgCount) {
        const username = usernameInput.value;
        if (username.length < 1 || username.length > 12) {
            nameError.style.visibility = "visible";
        } else {
            self.mySocket.emitPlayerReconnect({ x: player.x, y: player.y, avatar: imgCount + 1, name: username });
            player.setTexture(`character${imgCount + 1}`);
            player.character = imgCount + 1;
            player.nameText.setText(username);
            self.avatarDialog.setVisible(false);
            self.isOverlayVisible = false;
            nameError.style.visibility = "hidden";
        }
    }

    closeAvatarDialog(self) {
        self.avatarDialog.setVisible(false);
        self.isOverlayVisible = false;
    }

    loadPlusTexture(name, path) {
        this.load.image(name, path);
        this.load.start();
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);
        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.isInZone) {
            player.setVelocity(0);
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
                    targets: [context.emptySign, context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey],
                    alpha: 1,
                    duration: 500
                });
            } else {
                context.tweens.add({
                    targets: [context.emptySign, context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey],
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
        if (!player || this.isOverlayVisible) return;
        this.updatePlayerPosition();
        this.updatePressXVisibility();
        Object.keys(this.otherPlayers).forEach((id) => {
            let otherPlayer = this.otherPlayers[id];
            if (otherPlayer.targetX !== undefined && otherPlayer.targetY !== undefined) {
                otherPlayer.x += (otherPlayer.targetX - otherPlayer.x) * 0.1;
                otherPlayer.y += (otherPlayer.targetY - otherPlayer.y) * 0.1;
            }
        });
        if (!this.fullMap) {
            if (this.textures.exists(MAP_SETTINGS.MAP_FULL2)) {
                this.fullMap = true;
                this.map.setScale(4 / 3, 4 / 3);
                this.map.setTexture(MAP_SETTINGS.MAP_FULL2);
                this.matter.world.setBounds(0, 0, this.map.width * 4 / 3, this.map.height * 4 / 3);
            }
        }
    }

    updatePlayerPosition() {
        if (!this.mobileFlag) {
            this.playersController.updateMainPlayerPosition(player, this.cursors);
        } else {
            this.playersController.updateMainPlayerPositionJoystick(player, this.joystickThumb, this.joystickBase);
        }
        const isMoving = player.body.velocity.x !== 0 || player.body.velocity.y !== 0;
        const movementData = {
            x: player.x,
            y: player.y,
            velocityX: player.body.velocity.x,
            velocityY: player.body.velocity.y,
            isMoving: isMoving,
            direction: player.direction
        };
        if (player.body.velocity.x != 0 || player.body.velocity.y != 0) {
            this.mySocket.emitPlayerMovement(this.scene.key, movementData);
            this.moved = true;
        } else if (this.moved) {
            this.mySocket.emitPlayerMovement(this.scene.key, movementData);
            this.moved = false;
        }
    }

    updatePressXVisibility() {
        if (this.isInZone) {
            if (!this.pressX) {
                this.pressX = this.add.text(player.x, player.y - HEIGHT_PRESS_X, 'Press X', { fontSize: '32px', fill: '#fff' });
            } else {
                this.pressX.setPosition(player.x, player.y - HEIGHT_PRESS_X);
                this.pressX.setVisible(true);
            }
        } else if (this.pressX) {
            this.pressX.setVisible(false);
        }
    }
}