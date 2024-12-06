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

    ['seif1', { x: 490, y: 200, xi: 350, yi: 360, text: 'Sdjh iurp d Shuvrqdo Gldub\n\n"...lw\'v qrw mxvw d sdlqwlqj; lw\'v pb suhflrxv phprulhv:\nkhuh zh duh odxjklqj lq fodvv dw wkh dfdghpb, guhdplqj\nderxw rxu rzq haklelwlrqv, dqg khuh vkh lv dsrorjlclqj\nwr ph dqg ohdylqj, euhdnlqj pb khduw. Dqg wkhq L jhw\nwkh qhzv ri khu ghdwk irxu bhduv odwhu. Hyhubwklqj exuqv\nlq pb phprub vr ylylgob, dv li lw kdsshqhg bhvwhugdb,\nqrw vr pdqb bhduv djr…\n\nL nqhz khu zrun zrxog ehfrph idprxv! L uhfrjqlchg\nwkdw vwboh uljkw dzdb! Qr rqh hovh xqghuvwdqgv wkh wuxh\nydoxh ri wklv sdlqwlqj! Lw kdv wr ehorqj wr ph! Lw\'v wkh\nrqob wklqj L kdyh ohiw ri khu..."', img: 'later' }],
    ['seif2', { x: 550, y: 180, xi: 370, yi: 360, text: 'Rog Phglfdo Qrwh\n\nSdwlhqw\'v Frqglwlrq: Iuhtxhqw prrg vzlqjv,\nlpsxovlyh uhdfwlrqv lqfoxglqj lqdssursuldwh\njhvwxuhv dqg idfldo hasuhvvlrqv, gliilfxowlhv lq\nexloglqj uhodwlrqvklsv zlwk rwkhuv, revhvvlrq\nzlwk dq remhfw ri ghvluh, dqg orvv ri frqwdfw\nzlwk uhdolwb.\n\nGldjqrvlv: Erughuolqh shuvrqdolwb glvrughu,\nsurjuhvvlqj Dgho Vbqgurph.\n\nUhfrpphqgdwlrqv: Uhjxodu wkhudsb vhvvlrqv\nduh qhfhvvdub, dorqj zlwk wkh frpsxovrub xvh\nri dqalrobwlfv. Uhtxluhv rqjrlqj prqlwrulqj.', img: 'memo' }],
    ['seif3', { x: 730, y: 330, xi: 450, yi: 360, text: 'Froohfwlrq ri Ydulrxv\nSkrwrv ri Plfkdho', img: 'photo' }],

]);