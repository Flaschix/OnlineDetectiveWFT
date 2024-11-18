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
    ['bag', { x: 680, text: 'Irxqg d zrpdq\'v edj,\nlqvlgh duh wkh xvxdo\nhaklelwlrq sdshuv.' }],
    ['bottle', { x: 670, text: 'D eurnhq yldo zdv irxqg.\nD vlplodu yldo lv xvxdoob\nxvhg wr vwruh vroyhqw.' }],
    ['camera', { x: 700, text: 'Irxqg d fdphud zlwk\nslfwxuhv ri wkh haklelwv.' }],
    ['chain', { x: 690, text: 'Irxqg d qhfnodfh zlwk d\neurnhq shqgdqw.' }],
    ['clothe', { x: 680, text: 'Irxqg d slhfh ri ideulf\niurp dq rog xqlirup.' }],
    ['disk', { x: 660, text: 'Irxqg dq lqrshudeoh iodvk\ngulyh.' }],
    ['foot', { x: 710, text: 'Irxqg irrwsulqwv,\ndssduhqwob vrphrqh\nvwhsshg rq wkh sdlqw.' }],
    ['glasses', { x: 670, text: 'D zrpdq\'v jodvvhv zhuh\nirxqg.' }],
    ['gloves', { x: 660, text: 'Joryhv zhuh irxqg. Wkhuh\nzhuh wudfhv ri sdlqw rq\nwkhp.' }],
    ['keys', { x: 670, text: 'Irxqg d exqfk ri nhbv wr\nwkh pxvhxp.' }],
    ['notebook', { x: 653, text: 'Irxqg d qrwherrn ri qrwhv.\nLqvlgh duh qrwhv derxw\nvljkwvhhlqj sodqv.' }],
    ['plan', { x: 670, text: 'Irxqg d sodq ri wkh\npxvhxp wkdw pdunhg wkh\nsdwkv durxqg wkh\nfkdpehuv.' }],
    ['window', { x: 680, text: 'Irxqg wkh iudph iurp d\nvwrohq sdlqwlqj.' }],

    ['door1', { x: 560, text: 'idflqj Hdvw.' }],
    ['door2', { x: 510, text: 'idflqj Vrxwk-Hdvw.' }],
    ['door3', { x: 540, text: 'idflqj Vrxwk.' }],
    ['door4', { x: 560, text: 'idflqj Zhvw.' }],
]);