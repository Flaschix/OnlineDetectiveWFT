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
    ['firstKey', { x: 410, y: 250, text: 'Dw 21:45 L vdz d\nehdxwlixo jluo lq d zklwh\nguhvv zdonlqj\ndffrpsdqlhg eb d\nbrxqj pdq zlwk d\nuxfnvdfn.' }],
    ['secondKey', { x: 395, y: 220, text: 'L vdz dq hoghuob pdq lq\nd guhvvlqj jrzq. Wkh\nguhvvlqj jrzq zdv\nfohdq lq wkh pruqlqj,\nexw eb wkh hyhqlqj lw\nzdv douhdgb fryhuhg\nzlwk sdlqw.' }],
    ['thirdKey', { x: 400, y: 250, text: 'L vdz d jluo fdoo\nvrphrqh lq wkh pruqlqj\ndqg duudqjh wr phhw\nwkhp dw wkh pxvhxp lq\nwkh hyhqlqj.' }],
    ['fourthKey', { x: 430, y: 270, text: 'Lq wkh hyhqlqj L vdz d\nbrxqj pdq zlwk d\nuxfnvdfn zdonlqj\nwrzdugv wkh pxvhxp.' }],
    ['fivethKey', { x: 400, y: 270, text: 'Odvw qljkw dw 9.25sp L\nvdz d vwudqjh pdq lq d\nzklwh frdw. Kh zdv\nkroglqj d jxlwdu fdvh.' }],
    ['sixethKey', { x: 400, y: 280, text: 'Dw 9:15sp L vdz d jluo lq\nd vxlw zdonlqj grzq wkh\nvwuhhw, yhub xsvhw.' }],
    ['seventhKey', { x: 420, y: 290, text: 'Odvw qljkw dw 9:10sp L\nvdz d vhfxulwb jxdug\nuxvklqj vrphzkhuh.' }],
    ['emptyMan', { x: 450, y: 330, text: 'I didn\'t see anything' }],
    ['emptyWoman', { x: 450, y: 330, text: 'I didn\'t see anything' }],
]);