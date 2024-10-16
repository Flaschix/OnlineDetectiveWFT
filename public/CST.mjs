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
    ['firstKey', { x: 420, y: 250, text: 'Видел в 21:45 как\nкрасивая девушка в\nбелом платье шла в\nсопровождении\nмолодого человека с\nрюкзаком.' }],
    ['secondKey', { x: 395, y: 250, text: 'Видел пожилого\nмучжину в халате.\nУтром халат был\nчистый, вечером уже в\nкраске.' }],
    ['thirdKey', { x: 440, y: 250, text: 'Видел как утром\nдевушка звонила\nкому-то и\nдоговаривалась о\nвстрече вечером в\nМузее.' }],
    ['fourthKey', { x: 430, y: 270, text: 'Видела как вечером\nмолодой человек с\nрюкзаком шел в\nсторону Музея.' }],
    ['fivethKey', { x: 400, y: 250, text: 'Видел вечером в 21:25\nстранного мужчину в\nбелом халате. Он нес\nс собой чехол от\nгитары.' }],
    ['sixethKey', { x: 425, y: 270, text: 'Видел как в 21:15\nдевушка в костюме\nшла очень\nрасстроенная.' }],
    ['seventhKey', { x: 410, y: 290, text: 'Видел как вечером в\n21:10 охранник спешил\nкуда-то.' }],
    ['emptyMan', { x: 450, y: 330, text: 'Я ничего не видел' }],
    ['emptyWoman', { x: 450, y: 330, text: 'Я ничего не видела' }],
]);