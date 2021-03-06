//宣告變數

//第一周
var week1 = {
    國旅券: ['21', '32', '98', '67', '97', '410'],
    i原券: ['64', '85'],
    農遊券: ['89', '32', '54', '597', '453', '152'],
    藝Fun券: {
        數位: ['96', '15', '07', '30', '73', '98', '19'],
        紙本: ['39', '37', '23', '36', '79', '08', '14', '75']
    },
    動滋券: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985'],
    客庄券: ['81', '900'],
    地方創生券: ['081', '105', '594', '188', '089', '396', '521', '467', '912', '798', '358', '441', '367', '941', '335']
};
//第二周
var week2 = {
    國旅券: ['87', '04', '40', '29', '71'],
    i原券: ['12', '59'],
    農遊券: ['50', '13'],
    藝Fun券: {
        數位: ['78', '00', '39', '22', '61', '23', '15'],
        紙本: ['37', '76', '31', '06', '51', '65', '81']
    },
    動滋券: ['91', '11', '04', '18', '57', '498', '756'],
    客庄券: ['11', '439', '841', '052', '206', '161', '457', '205', '012', '293', '446', '589'],
    地方創生券: ['598', '880', '886', '675', '684', '568', '645', '456']
};
//第三周
var week3 = {
    國旅券: ['44', '34', '09', '55', '35', '041'],
    i原券: ['48', '49'],
    農遊券: ['60', '75'],
    藝Fun券: {
        數位: ['01', '92', '19', '23', '79', '95', '48', '46'],
        紙本: ['31', '56', '02', '52', '44', '49', '00', '47', '59']
    },
    動滋券: ['82', '45', '57', '53', '00', '546', '855', '865', '012', '983'],
    客庄券: ['14', '269'],
    地方創生券: ['771', '706', '064', '168', '191', '459', '135', '341', '366']
};
//第四周
var week4 = {
    國旅券: ['32', '02', '87', '93', '82', '17'],
    i原券: ['29', '82', '71'],
    農遊券: ['315', '740', '381', '264', '285', '765', '682', '763', '373', '015', '374'],
    藝Fun券: {
        數位: ['70', '61', '37', '85', '67', '35', '44'],
        紙本: ['75', '72', '71', '28', '67', '82', '93', '56', '34', '07']
    },
    動滋券: ['30', '03', '51', '88'],
    客庄券: ['69'],
    地方創生券: ['743', '201', '119', '828', '221', '750', '046']
};

//查詢
function query() {
    let code = $('#code').val()
    let type = $('input[name=type]:checked').val()
        //console.log('code = ' + code, ' type=' + type)

    //檢查輸入只能英數
    if (!Mao.verify.EnglishNumberVerify(code)) {
        alert('請輸入正確格式，僅限英文與數字。');
        $('#code').val('');
        return
    }
    //檢查字數 超過10碼
    if (code.length > 10) {
        alert('請輸入正確格式，字數僅限10碼內，或是後三碼。');
        $('#code').val('');
        return
    }

    //剛好10碼
    if (code.length == 10) {
        //console.log('剛好十碼')
        Comparison(code, type)
        return
    }

    //檢查字數 10字內
    if (code.length < 10) {
        //小於10字 就只能接受3碼
        if (code.length != 3) {
            alert('請輸入正確格式，字數僅限10碼內，或是後三碼。');
            $('#code').val('');
            return
        } else {
            //console.log('剛好三碼')
            Comparison(code, type)
            return
        }
    }

}

//比對
function Comparison(code, type) {
    //先清除html物件
    $('.result').empty();

    //紀錄訊息
    let msg = [];

    //取2碼
    let two = '';
    //取3碼
    let three = '';

    //如果是3碼
    if (code.length == 3) {
        two = code.substring(1, 3);
        three = code;
    }
    //如果是10碼
    if (code.length == 10) {
        two = code.substring(8, 10);
        three = code.substring(7, 10);
    }

    //用來存放key值
    let 券種 = ['國旅券', 'i原券', '農遊券', '藝Fun券', '動滋券', '客庄券', '地方創生券'];
    //存放week
    let weeks = [week1, week2, week3, week4]

    //四個周次
    for (let w = 0; w < 4; w++) {
        //取出當周
        let 當周 = weeks[w];
        //券種
        for (let x = 0; x < 券種.length; x++) {
            //取出當前券種
            let 當前券種 = 券種[x];
            //如果當權券種是藝Fun券
            if (當前券種 == '藝Fun券') {
                if (type == '') {
                    //取出 藝Fun券 類型
                    let 類型 = ['數位', '紙本'];
                    for (let i = 0; i < 類型.length; i++) {
                        let 當前券種類型 = 當周[當前券種][類型[i]];
                        //2碼
                        let 兩號碼 = 當前券種類型.indexOf(two)
                        if (兩號碼 != -1) {
                            msg.push({
                                周次: (w + 1),
                                券種: [券種[x]][0] + '_' + 類型[i],
                                號碼: 當前券種類型[兩號碼],
                            })
                        }
                        //3碼
                        let 三號碼 = 當前券種類型.indexOf(three)
                        if (三號碼 != -1) {
                            msg.push({
                                周次: (w + 1),
                                券種: [券種[x]][0] + '_' + 類型[i],
                                號碼: 當前券種類型[三號碼],
                            })
                        }

                    }
                } else {
                    let 類型 = type == 1 ? '數位' : '紙本';
                    let 當前券種類型 = 當周[當前券種][類型];
                    //2碼
                    let 兩號碼 = 當前券種類型.indexOf(two)
                    if (兩號碼 != -1) {
                        msg.push({
                            周次: (w + 1),
                            券種: [券種[x]][0] + '_' + 類型,
                            號碼: 當前券種類型[兩號碼],
                        })
                    }
                    //3碼
                    let 三號碼 = 當前券種類型.indexOf(three)
                    if (三號碼 != -1) {
                        msg.push({
                            周次: (w + 1),
                            券種: [券種[x]][0] + '_' + 類型,
                            號碼: 當前券種類型[三號碼],
                        })
                    }
                }

            } else {
                if (當周[當前券種].indexOf(two) != -1) {
                    msg.push({
                        周次: (w + 1),
                        券種: [券種[x]][0],
                        號碼: 當周[當前券種][當周[當前券種].indexOf(two)],
                    })
                }
                if (當周[當前券種].indexOf(three) != -1) {
                    msg.push({
                        周次: (w + 1),
                        券種: [券種[x]][0],
                        號碼: 當周[當前券種][當周[當前券種].indexOf(three)],
                    })
                }

            }

        }
    }


    //console.log(msg);

    if (msg.length > 0) {
        if (msg.length >= 16) {
            $('.result').css('overflow-y', 'scroll ');
        }
        for (let i = 0; i < msg.length; i++) {
            //組合字串
            let str = '【第 ' + msg[i]['周次'] + ' 周 】' + msg[i]['券種'] + ' 號碼 : 【' + msg[i]['號碼'] + '】';
            //加入
            $('.result').append('<div class="win">' + str + '</div>')
        }
    } else {
        $('.result').append('<p class="lose">很抱歉，您都沒有中獎</p>')
    }
}




//監控Enter按鍵
window.addEventListener('keydown', function(e) {
    //console.log(e);
    if (e.keyCode == 13) {
        //console.log('enter');
        let code = $('#code').val()
        if (code.length != 0) {
            query();
        } else {
            console.log('沒有輸入身分證。')
        }
    }
});