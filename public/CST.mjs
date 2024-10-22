export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
        GAMESCENE5: "GameScene5",
        GAMESCENE6: "GameScene6"
    }
}

export const socket = io();

export const LABEL_ID = {
    DOOR_FORWARD_ID: 11111111,
    DOOR_FORWARD2_ID: 11111112,
    DOOR_LEFT_ID: 111143444,
    DOOR_RIGHT_ID: 222143454,
    DOOR_BACK_ID: 22222222,

    FIRST_KEY: 33333333,
    SECOND_KEY: 44444444,
    THIRD_KEY: 55555555,
    FOURTH_KEY: 6666666,
    FIVETH_KEY: 7777777,
    SIXETH_KEY: 8888888,
    SEVENTH_KEY: 9999999,
    EMPTY_MAN: 4555745,
    EMPTY_WOMAN: 7454657
}

export const myMap = new Map([
    ['firstKey', { x: 420, y: 250, text: 'Елзио е 21:45 нгн\nнугфлегв зиецынг е\nдиосп тогхяи ыог е\nфстусесйзирлл\nпсосзсжс ъиосеинг ф\nубнкгнсп.' }],
    ['secondKey', { x: 395, y: 250, text: 'Елзио тсйлосжс\nпцъйлрц е шгогхи.\nЦхусп шгогх дюо\nълфхюм, еиъиусп цйи е\nнугфни.' }],
    ['thirdKey', { x: 440, y: 250, text: 'Елзио нгн цхусп\nзиецынг кесрлог\nнспц-хс л\nзсжсегулегогфя с\nефхуиъи еиъиусп е\nПцкии.' }],
    ['fourthKey', { x: 430, y: 270, text: 'Елзиог нгн еиъиусп\nпсосзсм ъиосеин ф\nубнкгнсп ыио е\nфхсусрц Пцкив.' }],
    ['fivethKey', { x: 400, y: 250, text: 'Елзио еиъиусп е 21:25\nфхугррсжс пцйълрц е\nдиосп шгогхи. Ср риф\nф фсдсм ъишсо сх\nжлхгую.' }],
    ['sixethKey', { x: 425, y: 270, text: 'Елзио нгн е 21:15\nзиецынг е нсфхбпи\nыог съиря\nугффхусирргв.' }],
    ['seventhKey', { x: 410, y: 290, text: 'Елзио нгн еиъиусп е\n21:10 сшугррлн фтиыло\nнцзг-хс.' }],
    ['emptyMan', { x: 450, y: 330, text: 'Я ничего не видел' }],
    ['emptyWoman', { x: 450, y: 330, text: 'Я ничего не видела' }],
]);