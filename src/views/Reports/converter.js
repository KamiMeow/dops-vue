// const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятьнадцать', 'шестнадцать', 'семьнадцать', 'восемьнадцать', 'девятьнадцать'];
// const decades = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесять', 'шестьдесять', 'семьдесят', 'восемьдесят', 'девяносто'];

// export function inWords(num) {
//   if ((num = num.toString()).length > 9) return 'overflow';
//   const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//   if (!n) return; var str = '';
//   str += (n[1] != 0) ? (units[Number(n[1])] || decades[n[1][0]] + ' ' + units[n[1][1]]) + '' : '';
//   str += (n[2] != 0) ? (units[Number(n[2])] || decades[n[2][0]] + ' ' + units[n[2][1]]) + '' : '';
//   str += (n[3] != 0) ? (units[Number(n[3])] || decades[n[3][0]] + ' ' + units[n[3][1]]) + 'тысяча ' : '';
//   str += (n[4] != 0) ? (units[Number(n[4])] || decades[n[4][0]] + ' ' + units[n[4][1]]) + 'сто ' : '';
//   str += (n[5] != 0) ? ((str != '') ? 'и ' : '') + (units[Number(n[5])] || decades[n[5][0]] + ' ' + units[n[5][1]]) + 'только ' : '';
//   return str;
// }


export function numberToString(number) {
  const arrNumbers = new Array();
  arrNumbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
  arrNumbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
  arrNumbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');

  function numberParser(num, desc) {
    var string = '',
        numHundred = '';
    if (num.length == 3) {
      numHundred = num.substr(0, 1);
      num = num.substr(1, 3);
      string = arrNumbers[3][numHundred] + ' ';
    }

    if (num < 20) string += arrNumbers[1][parseFloat(num)] + ' ';
    else {
      var firstnum = num.substr(0, 1),
          secondnum = num.substr(1, 2);
      string += arrNumbers[2][firstnum] + ' ' + arrNumbers[1][secondnum] + ' ';
    }             
    switch (desc){
      case 0: {
        var lastnum = parseFloat(num.substr(-1));
        if (lastnum == 1) string += 'рубль';
        else if (lastnum > 1 && lastnum < 5) string += 'рубля';
        else string += 'рублей';
      } break;

      case 1: {
        var lastnum = parseFloat(num.substr(-1));
        if (lastnum == 1) string += 'тысяча ';
        else if (lastnum > 1 && lastnum < 5) string += 'тысячи ';
        else string += 'тысяч ';

        string = string.replace('один ', 'одна ');
        string = string.replace('два ', 'две ');
      } break;

      case 2: {
        var lastnum = parseFloat(num.substr(-1));
        if (lastnum == 1) string += 'миллион ';
        else if (lastnum > 1 && lastnum < 5) string += 'миллиона ';
        else string += 'миллионов ';
      } break;

      case 3: {
        var lastnum = parseFloat(num.substr(-1));
        if (lastnum == 1) string += 'миллиард ';
        else if (lastnum > 1 && lastnum < 5) string += 'миллиарда ';
        else string += 'миллиардов ';
      } break;
    }

    string = string.replace('  ', ' ');
    return string;
  }

  // function decimalsParser(num) {
  //   var firstnum = num.substr(0, 1),
  //       secondnum = parseFloat(num.substr(1, 2)),
  //       string = ' ' + firstnum + secondnum;

  //   if (secondnum == 1) string += ' копейка';
  //   else if (secondnum > 1 && secondnum < 5) string += ' копейки';
  //   else string += ' копеек';

  //   return string;
  // }

  if (!number || number == 0) return false;

  if (typeof number !== 'number') {
    number = number.replace(',', '.');
    number = parseFloat(number);
    if (isNaN(number)) return false;
  }

  number = number.toFixed(2);
  if(number.indexOf('.') != -1) {
    var numberArr = number.split('.'),
        number = numberArr[0],
        numberDecimals = numberArr[1];
  }

  var numberLength = number.length,
      numParser = '',
      string = '',
      count = 0;

  for (var i = (numberLength - 1); i >= 0; i--) {
    var numDigit = number.substr(i, 1);
    numParser = numDigit +  numParser;
    if ((numParser.length == 3 || i == 0) && !isNaN(parseFloat(numParser))) {
      string = numberParser(numParser, count) + string;
      numParser = '';
      count++;
    }
  }

  // if (numberDecimals) string += decimalsParser(numberDecimals);
  return string;
}
  