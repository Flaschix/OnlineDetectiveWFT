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
    GLASSES_KEY: 88888885
}

export const myMap = new Map([
    ['bag', { x: 655, text: 'Найдена женская сумка,\nвнутри обычные\nдокументы по выставке.' }],
    ['bottle', { x: 648, text: 'Найден разбитый\nфлакон. Подобный флакон\nобычно используется для\nхранения растворителя.' }],
    ['camera', { x: 700, text: 'Найдена камера с\nфотографиями\nэкспонатов.' }],
    ['chain', { x: 690, text: 'Найдена цепочка с\nразбитым кулоном.' }],
    ['clothe', { x: 660, text: 'Найден кусок ткани от\nстарой униформы.' }],
    ['disk', { x: 700, text: 'Найдена нерабочая\nфлешка.' }],
    ['foot', { x: 670, text: 'Найден следы, видимо\nкто-то наступил в\nкраску.' }],
    ['glasses', { x: 670, text: 'Найдены женские очки.' }],
    ['gloves', { x: 660, text: 'Найдены перчатки. На\nних видны следы краски.' }],
    ['keys', { x: 670, text: 'Найдена связка ключей\nот музея.' }],
    ['notebook', { x: 653, text: 'Найден блокнот с\nзаметками. Внутри\nзаписи о планах экскурси.' }],
    ['plan', { x: 670, text: 'Найден план музея, где\nотмечены пути обхода\nкамер.' }],
    ['window', { x: 680, text: 'Найдена рамка от\nукраденной картины.' }],
]);