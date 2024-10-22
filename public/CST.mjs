export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
    }
}

export const socket = io();

export const LABEL_ID = {
    DOOR_FORWARD_ID: 11111111,
    DOOR_BACK_ID: 22222222,
    FIRST_KEY: 33333333,
    SECOND_KEY: 44444444,
    THIRD_KEY: 55555555,
    FOURTH_KEY: 6666666,
    FIVETH_KEY: 7777777,
    SIXETH_KEY: 8888888,
    SEIF_KEY: 9999999,
    EMPTY_KEY: 4555745
}

export const myMap = new Map([
    ['firstKey', { x: 250, text: 'I' }],
    ['secondKey', { x: 430, text: 'D' }],
    ['thirdKey', { x: 610, text: 'W' }],
    ['fourthKey', { x: 750, text: 'K' }],
    ['fivethKey', { x: 880, text: 'R' }],
    ['sixethKey', { x: 1000, text: 'P' }],
]);