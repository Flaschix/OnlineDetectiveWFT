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
    ['firstKey', { x: 395, y: 230, text: 'L vdz d frxsoh frph rxw ri wkh\npxvhxp dw 8:55. Wkh jluo zdv\nzklvshulqj wr wkh jxb, wkhq\nvkh vwduwhg odxjklqj, dqg\nvxgghqob vkh zdv fublqj, olnh\nvrphwklqj uhdoob diihfwhg khu.\nWkh jxb kdg d elj edfnsdfn.' }],
    ['secondKey', { x: 410, y: 300, text: 'L qrwlfhg wkdw dw 9:05, wkh jluo\nzdv lq d uxvk. Vkh orrnhg\nuhdoob xsvhw.' }],
    ['thirdKey', { x: 410, y: 200, text: 'Durxqg 9:10, wzr phq fdph\nrxw ri wkh pxvhxp. Rqh ri\nwkhp zdv zhdulqj d zklwh\nfrdw dqg zdv kroglqj d\nvxlwfdvh. Kh vdw grzq rq d\nehqfk rxwvlgh wkh pxvhxp,\nzkloh wkh jxb lq d vxlw orfnhg\nwkh grruv dqg txlfnob udq lq\nwkh rwkhu gluhfwlrq.' }],
    ['fourthKey', { x: 400, y: 240, text: 'L uhphpehu wkdw dw 9:20,\nvrphrqh zhqw edfn lqwr wkh\npxvhxp dqg fdph rxw djdlq\ndw 9:30. L wklqn lw zdv d jluo, exw\nL fdq\'w vdb iru vxuh—L zdv rq\nwkh skrqh dqg zdvq\'w uhdoob\nsdblqj dwwhqwlrq.' }],
    ['fivethKey', { x: 410, y: 300, text: 'L vdz wkh jxb lq wkh zklwh\nfrdw gdqflqj klv zdb wrzdug\nwkh exv vwrs durxqg 9:25.' }],

    ['emptyMan1', { x: 420, y: 330, text: '"I didn\'t see anything."' }],
    ['emptyWoman1', { x: 455, y: 320, text: '"I have nothing to\nreport about that."' }],
    ['emptyMan2', { x: 400, y: 320, text: '"Nothing special caught\nmy eye."' }],
    ['emptyWoman2', { x: 440, y: 320, text: '"I didn\'t see or hear\nanything suspicious."' }],
    ['emptyMan3', { x: 450, y: 320, text: '"I have nothing to\nreport about that."' }],
    ['emptyWoman3', { x: 440, y: 320, text: '"I was busy and didn\'t\nnotice anything."' }],
]);