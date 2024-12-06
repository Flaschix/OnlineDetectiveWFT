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
    WINDOW_KEY: 99999993,
    CLOTHE_KEY: 999999994,
    KEYS_KEY: 999999995,
    NOTEBOOK_KEY: 999999996,
    BOTTLE_KEY: 999999997,
    PLAN_KEY: 999999998,
    CAMERA_KEY: 88888881,
    APPLICATION_KEY: 88888883,
    BAG_KEY: 888888884,
    NOTE_KEY: 88888886,
    COMPUTER_KEY: 88888887,
    PHONE_KEY: 88888888,

    PLACE_KEY_1: 333333333,
    PLACE_KEY_2: 333333337,
    PLACE_KEY_3: 333333332,
    PLACE_KEY_4: 333333338,
}

export const myMap = new Map([
    ['bag', { x: 645, y: 280, xi: 430, yi: 360, text: 'D zrpdq\'v edj. Wkhuh duh\ngrfxphqwv iru dq haklelwlrq,\ndq hasluhg sdfn ri prrg-\nvwdelolclqj sloov lqvlgh dqg\neuljkw uhg olsvwlfn.' }],
    ['bottle', { x: 670, y: 290, xi: 430, yi: 360, text: 'D eurnhq yldo zdv irxqg.\nD vlplodu yldo lv xvxdoob\nxvhg wr vwruh vroyhqw.' }],
    ['camera', { x: 670, y: 290, xi: 430, yi: 360, text: 'D fdphud zlwk skrwrv ri\nvwrohq haklelwv iurp rwkhu\npxvhxpv.' }],
    ['clothe', { x: 680, y: 290, xi: 430, yi: 360, text: 'Irxqg d slhfh ri ideulf\niurp dq rog xqlirup.' }],
    ['disk', { x: 660, y: 290, xi: 430, yi: 360, text: 'D eurnhq iodvk gulyh. Lw\'v\nvfudwfkhg zlwk wkh zrugv:\n"Vxuyhloodqfh fdphudv."' }],
    ['keys', { x: 720, y: 290, xi: 430, yi: 360, text: 'Irxqg d exqfk ri\ngxsolfdwh nhbv wr\nwkh pxvhxp.' }],
    ['notebook', { x: 660, y: 270, xi: 430, yi: 360, text: 'D gldub zlwk qrwhv\nderxw pdwhuldov\niru uhvwrulqj d\nqhz sdlqwlqj. Vhyhudo\nsdjhv kdyh ehhq wruq rxw.' }],
    ['plan', { x: 670, y: 290, xi: 430, yi: 360, text: 'Irxqg d sodq ri wkh\npxvhxp wkdw pdunhg wkh\nsdwkv durxqg wkh\nfkdpehuv.' }],
    ['window', { x: 680, y: 290, xi: 430, yi: 360, text: 'Irxqg wkh iudph iurp d\nvwrohq sdlqwlqj.' }],
    ['note', { x: 660, y: 250, xi: 430, yi: 360, text: 'Dq xqsdlg eloo lq Dqqd\'v\nqdph kdv ehhq irxqg.\n\nWkhuh\'v d kdqgzulwwhq qrwh\ndw wkh erwwrp:\n"Zkhuh fdq L ilqg wkh\nprqhb?"' }],
    ['computer', { x: 665, y: 230, xi: 430, yi: 360, text: 'D odswrs. Wkhuh\'v d\ngrfxphqw zlwk uhfrugv ri\npxvhxp hpsorbhhv\'\npryhphqwv dqg qrwhv\nrq sdvw wkhiwv.\nWkhuh duh vwlfnhuv lq wkh\nvkdsh ri wkh ohwwhu "P" rq\nwkh fryhu ri wkh odswrs.' }],
    ['phone', { x: 660, y: 290, xi: 430, yi: 360, text: 'Lqfrplqj phvvdjh:\n"Grq\'w brx gduh eh odwh iru\nwkh phhwlqj! Ohw\'v dw ohdvw\neuhdn xs surshuob!"' }],
    ['application', { x: 680, y: 290, xi: 430, yi: 360, text: 'D fuxpsohg uhvljqdwlrq\nohwwhu iurp D.' }],

    ['door1', { x: 560, text: 'idflqj Hdvw.' }],
    ['door2', { x: 540, text: 'idflqj Qruwk.' }],
    ['door3', { x: 540, text: 'idflqj Vrxwk.' }],
    ['door4', { x: 560, text: 'idflqj Zhvw.' }],
]);