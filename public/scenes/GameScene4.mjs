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

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/tample_4.jpg');

        this.load.image('rightMiniGameBack', 'assets/saif/saif.png');
        this.load.image('rightMiniGameElm', 'assets/saif/lever.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

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

        createGameFieldRight(this, 700, 360);
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
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

        const bodyDoor = this.matter.add.fromVertices(827 + 186, 1731.5 + 96, '1 191.5 16 0.5 349.5 0.5 370.5 191.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const seif = this.matter.add.fromVertices(925 + 93.5, 227 + 151.5, '0.5 302 0.5 1 186 1 186 302', {
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

        this.textA = this.add.text(470, 200, 'Страница из личного дневника', { font: "bold 20px MyCustomFont2", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textA.setVisible(false);
        this.textA.setAlpha(0);

        this.textB = this.add.text(300, 240, `${decrypt('Ф нгухлрю фрлпгбх кгьлхрцб хнгря л в хиувб згу уиъл. В цйи\nкргб, ъяв ахс нгухлрг. В псжц фпсхуихя рг рии ъгфгпл. Ахс ри\nтусфхс нгухлрг, г зугжсщиррюи есфтсплргрлв: есх пю фпиипфв рг\nкгрвхлвш е гнгзиплл, есх пиъхгип с фсдфхеиррюш еюфхгенгш, есх\nсрг лкелрвихфв тиуизс прсм л цикйгих, угкдле фиузщи. Г есх в\nтсоцъгб рсесфхя с иё фпиухл ъиуик ъихюуи жсзг.\nЕфё жсулх е тгпвхл хгн вунс, дцзхс дю ахс туслфшсзлос еъиуг, г\nри прсжс оих ргкгз…\nВ крго, ъхс иё нгухлрю фхгрцх лкеифхрюпл. Рс рлнхс нуспи пирв\nри тсрлпгих лш ргфхсвьим щиррсфхл! Нгухлрг зсойрг\nтулргзоийгхя при! В дцзц зимфхесегхя еиъиусп, нсжзг ефи цмзцх.\nФскзгп лзигоярюи цфоселв л рлнхс ри кгтсзскулх пирв. Ахс\nизлрфхеиррси, ъхс ц пирв тсфои риё сфхгосфя. Срг ри елрлог дю\nпирв, еизя шцзсйрлн ефижзг тсмпёх зуцжсжс шцзсйрлнг…”')}`, { font: "italic 18px MyCustomFont2", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textB.setVisible(false);
        this.textB.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.answer, this.textA, this.textB],
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

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveBackRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.answer, this.textA, this.textB],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.answer, this.textA, this.textB],
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
            // this.answer.setVisible(true);
            showRightPuzzle(this);
            return;
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.eventZone == LABEL_ID.SEIF_KEY) {
            if (this.answer.visible) {
                this.answer.setVisible(false);
                this.textA.setVisible(false);
                this.textB.setVisible(false);
                this.overlayBackground.setVisible(false)
                this.closeButton.setVisible(false);
            } else {
                hideRightPuzzle(this);
            }
            return;
        }

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

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveBackRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.answer, context.textA, context.textB],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.answer, context.textA, context.textB],
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

let itemsRight = [];
let puzzleBackRight;

// Массив, определяющий, какие элементы должны быть повернуты
let rotatedItemsRight = [
    [false, false, false],
    [false, true, true],
    [false, true, true],
    [true, true, false]
];

function createGameFieldRight(scene, startX, startY) {
    const fieldWidth = 800;
    const fieldHeight = 1000;
    const cols = 3;
    const rows = 4;
    const padding = 5; // Отступ между элементами
    const itemWidth = (fieldWidth - (cols - 1) * padding) / cols;
    const itemHeight = (fieldHeight - (rows - 1) * padding) / rows;

    puzzleBackRight = scene.add.image(startX, startY, 'rightMiniGameBack');
    puzzleBackRight.setScale(0.6)
    puzzleBackRight.setDepth(2);
    puzzleBackRight.setScrollFactor(0);
    puzzleBackRight.setAlpha(0);
    puzzleBackRight.setVisible(false);

    for (let row = 0; row < rows; row++) {
        itemsRight[row] = [];
        for (let col = 0; col < cols; col++) {
            const x = (startX - 70) + col * 80;
            const y = (startY - 160) + row * 90;

            const item = scene.add.image(x, y, 'rightMiniGameElm');
            // item.setDisplaySize(itemWidth, itemHeight);
            item.setScale(0.4);
            item.setDepth(2);
            item.setInteractive();
            item.row = row;
            item.col = col;

            // Устанавливаем угол поворота только для определённых элементов
            if (rotatedItemsRight[row][col]) {
                item.setAngle(-90);
            }

            item.on('pointerdown', () => rotateItemsRight(scene, row, col));
            item.setScrollFactor(0);
            item.setVisible(false);
            item.setAlpha(0);
            itemsRight[row][col] = item;
        }
    }
}

function rotateItemsRight(scene, row, col) {
    // Rotate row
    for (let c = 0; c < itemsRight[row].length; c++) {
        scene.tweens.add({
            targets: itemsRight[row][c],
            angle: itemsRight[row][c].angle - 90,
            duration: 150,
            ease: 'Power2'
        });
        rotatedItemsRight[row][c] = !rotatedItemsRight[row][c]; // Меняем значение в массиве
    }

    // Rotate column
    for (let r = 0; r < itemsRight.length; r++) {
        if (r !== row) {
            scene.tweens.add({
                targets: itemsRight[r][col],
                angle: itemsRight[r][col].angle - 90,
                duration: 150,
                ease: 'Power2'
            });
            rotatedItemsRight[r][col] = !rotatedItemsRight[r][col]; // Меняем значение в массиве
        }
    }

    // Проверяем условие победы
    checkWinConditionRight(scene);
}


function checkWinConditionRight(context) {
    for (let row = 0; row < rotatedItemsRight.length; row++) {
        for (let col = 0; col < rotatedItemsRight[row].length; col++) {
            if (rotatedItemsRight[row][col]) {
                return; // Если хотя бы один элемент true, продолжаем игру
            }
        }
    }

    hideRightPuzzle(context);

    context.answer.setAlpha(1);
    context.textA.setAlpha(1);
    context.textB.setAlpha(1);
    context.overlayBackground.setAlpha(1);
    context.closeButton.setAlpha(1);

    context.answer.setVisible(true);
    context.textA.setVisible(true);
    context.textB.setVisible(true);
    context.overlayBackground.setVisible(true);
    context.closeButton.setVisible(true);
}

function showRightPuzzle(context) {
    context.tweens.add({
        targets: [puzzleBackRight],
        alpha: 1,
        duration: 500
    });

    puzzleBackRight.setVisible(true)
    itemsRight.forEach(items => {
        items.forEach(item => {
            context.tweens.add({
                targets: [item],
                alpha: 1,
                duration: 500
            });
            item.setVisible(true);
        })
    })
}

function hideRightPuzzle(context) {
    context.tweens.add({
        targets: [puzzleBackRight],
        alpha: 0,
        duration: 500,
        onComplete: () => {
            try {
                puzzleBackRight.setVisible(false)
            }
            catch (e) { }
        }
    });

    itemsRight.forEach(items => {
        items.forEach(item => {
            context.tweens.add({
                targets: [item],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    try {
                        item.setVisible(false);
                    }
                    catch (e) { }
                }
            });

        })
    })
}