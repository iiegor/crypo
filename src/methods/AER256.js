/**
 * @providesModule AER256
 */

const completeEscape = require('completeEscape');
const decodeToHex = require('decodeToHex');

exports.encode = function(oString, oKey) {
  if (oKey.length < 3) {
    console.log('The key must be at least 3 characters long');

    return oString;
  }

  var oKeyNum = new Array(),
    oOutStr = '',
    oOp = new Array('+=', '/=', '-=', '*= 0.02 *');

  for (var x = 0; x < oKey.length; x++) {
    oKeyNum[x] = parseInt('0x' + completeEscape(oKey.charAt(x)));
  }

  for (var x = 0, y = ''; x < oString.length; x += Math.round(oKey.length / 2), y = ', ') {
    var theNum = parseInt('0x' + completeEscape(oString.substr(x, Math.round(oKey.length / 2))));

    if (isNaN(theNum)) {
      console.log('Encryption Failed!');

      return oString;
    }

    for (var z = 0; z < oKey.length; z++) {
      eval('theNum ' + oOp[z % 3] + ' ' + oKeyNum[z] + ';');
    }
    
    oOutStr += y + theNum;
  }

  return oOutStr;
}

exports.decode = function(oString, oKey) {
  if (oKey.length < 3) {
    console.log('The key must be at least 3 characters long');

    return oString;
  }

  var oKeyNum = new Array(),
    oOutStr = oString.split(', '),
    oOutStr2 = '',
    oOp = new Array('-=', '*=', '+=', '/= 0.02 *');

  for (var x = 0; x < oKey.length; x++) {
    oKeyNum[x] = parseInt('0x' + completeEscape(oKey.charAt(x)));
  }

  for (var x = 0; x < oOutStr.length; x++) {
    oOutStr[x] = parseFloat(oOutStr[x]);
    for (var z = oKey.length - 1; z >= 0; z--) {
      eval('oOutStr[x] ' + oOp[z % 3] + ' ' + oKeyNum[z] + ';');
    }
    oOutStr[x] = decodeToHex(Math.round(oOutStr[x]));
  }

  oOutStr = oOutStr.join('');
  for (x = 0; x < oOutStr.length; x += 2) {
    oOutStr2 += unescape('%' + oOutStr.substr(x, 2));
  }

  return oOutStr2;
}
