export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
        GAMESCENE5: "GameScene5"
    }
}

export const socket = io();

export const LABEL_ID = {
    DOOR_FORWARD_ID: 11111111,
    DOOR_FORWARD2_ID: 11111112,
    DOOR_LEFT_ID: 111143444,
    DOOR_RIGHT_ID: 222143454,
    DOOR_BACK_ID: 22222222,

    DISK_KEY: 99999991,
    FOOT_KEY: 99999992,
    WINDOW_KEY: 99999993,
    CLOTHE_KEY: 999999994,
    KEYS_KEY: 999999995,
    NOTEBOOK_KEY: 999999996,
    BOTTLE_KEY: 999999997,
    PLAN_KEY: 999999998,
    CAMERA_KEY: 88888881,
    CHAIN_KEY: 88888882,
    GLOVES_KEY: 88888883,
    BAG_KEY: 888888884,
    GLASSES_KEY: 88888885,

    PLACE_KEY_1: 333333333,
    PLACE_KEY_2: 333333337,
    PLACE_KEY_3: 333333332,
    PLACE_KEY_4: 333333338,
}

export const myMap = new Map([
    ['bag', { x: 655, text: 'Ргмзирг йирфнгв фцпнг,\nерцхул сдюърюи\nзснцпирхю тс еюфхгени.' }],
    ['bottle', { x: 648, text: 'Ргмзир угкдлхюм\nчогнср. Тсзсдрюм чогнср\nсдюърс лфтсоякцихфв зов\nшугрирлв угфхесулхиов. ' }],
    ['camera', { x: 700, text: 'Ргмзирг нгпиуг ф\nчсхсжугчлвпл\nанфтсргхсе.' }],
    ['chain', { x: 690, text: 'Ргмзирг щитсънг ф\nугкдлхюп нцосрсп.' }],
    ['clothe', { x: 660, text: 'Ргмзир нцфсн хнгрл сх\nфхгусм црлчсупю.' }],
    ['disk', { x: 700, text: 'Ргмзирг риугдсъгв\nчоиынг.' }],
    ['foot', { x: 670, text: 'Ргмзир фоизю, елзлпс\nнхс-хс ргфхцтло е\nнугфнц.' }],
    ['glasses', { x: 670, text: 'Ргмзирю йирфнли сънл.' }],
    ['gloves', { x: 660, text: 'Ргмзирю тиуъгхнл. Рг\nрлш елзрю фоизю нугфнл.' }],
    ['keys', { x: 670, text: 'Ргмзирг февкнг нобъим\nсх пцкив.' }],
    ['notebook', { x: 653, text: 'Ргмзир доснрсх ф\nкгпихнгпл. Ерцхул\nкгтлфл с тогргш анфнцуфл.' }],
    ['plan', { x: 670, text: 'Ргмзир тогр пцкив, жзи\nсхпиъирю тцхл сдшсзг\nнгпиу.' }],
    ['window', { x: 680, text: 'Ргмзирг угпнг сх\nцнугзиррсм нгухлрю.' }],

    ['door1', { x: 560, text: 'idflqj Hdvw.' }],
    ['door2', { x: 510, text: 'idflqj Vrxwk-Hdvw.' }],
    ['door3', { x: 540, text: 'idflqj Vrxwk.' }],
    ['door4', { x: 560, text: 'idflqj Zhvw.' }],
]);