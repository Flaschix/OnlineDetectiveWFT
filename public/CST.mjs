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
    ['firstKey', { x: 400, y: 230, text: 'В елзио, нгн е 20:55 лк пцкив\nеюыог тгуг: зиецынг\nыитхгогфя ф тгурип,\nтсхсп ргъгог фпивхяфв, г\nтсхсп кгтогнгог, нгн\nдцзхс ъхс-хс ии флоярс\nхусрцос. Ц тгурв дюо\nдсояысм убнкгн.' }],
    ['secondKey', { x: 430, y: 280, text: 'В елзиог, нгн е 21:05\nзиецынг нцзг-хс флоярс\nфтиылог. Еюжовзиог срг\nсъиря угффхусиррсм.' }],
    ['thirdKey', { x: 400, y: 220, text: 'Тулпиурс е 21:10 лк пцкив\nеюыол зег пцйълрю. Сзлр\nлк рлш дюо е диосп шгогхи л\nф ъипсзгрсп е уцнгш л фио\nргогенц ц пцкив, г пцйълрг\nе нсфхбпи кгтиу зеиул л\nдюфхус тсдийго е зуцжцб\nфхсусрц.' }],
    ['fourthKey', { x: 400, y: 240, text: 'Тултсплргб, нгн е 21:20\nнхс-хс еиурцофв е пцким, г\nеюыио лк рижс е 21:30. Еусзи\nнгн ахс дюог зиецынг, рс\nхсърс ри фнгйц, в дсохгог\nтс хиоичсрц л ри сдугьгог\nсфсдсжс ерлпгрлв.' }],
    ['fivethKey', { x: 400, y: 280, text: 'В елзио, нгн пцйълрг е\nдиосп шгогхи ыио\nтулхгрщсеюегв е fхсусрц\nгехсдцфрсм сфхгрсенл е\n21:25.' }],


    ['emptyMan1', { x: 400, y: 330, text: 'Мне нечего сообщить\nпо этому поводу.' }],
    ['emptyWoman1', { x: 445, y: 310, text: 'Ничего особого\nне попадалось мне\nна глаза.' }],
    ['emptyMan2', { x: 440, y: 310, text: 'Я не видел и\nне слышал ничего\nподозрительного.' }],
    ['emptyWoman2', { x: 400, y: 330, text: 'Мне нечего сообщить\nпо этому поводу.' }],
    ['emptyMan3', { x: 430, y: 330, text: 'Я был занят и\n ничего не заметил.' }],
    ['emptyWoman3', { x: 420, y: 330, text: 'Я была занята и\nничего не заметила.' }],
]);