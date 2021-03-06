/**
 * @providesModule decodeToHex
 */

module.exports = function(oNum) {
  var hexChars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'),
    outP = '',
    d;

  for (var x = oNum; x > 0; x = (x - (x % 16)) / 16) {
    outP = hexChars[x % 16] + '' + outP;
  }

  if (outP.length % 2) {
    outP = '0' + outP;
  }

  return outP;
}
