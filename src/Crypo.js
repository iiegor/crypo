/**
 * @providesModule Crypo
 */

'use strict';

const Encode = require('Encode');
const Decode = require('Decode');

const Methods = {
  /**
   * Fast encryption
   */
  A128: '/128GhIoPQROSTeU' + 'bADfgHijKLM+n0pF' + 'WXY456xyzB7=39Va' + 'qrstJklmNuZvwcdE' + 'C',
  MEGAN35: '3GHIJKLMNOPQRSTU' + 'b=cdefghijklmnop' + 'WXYZ/12+406789Va' + 'qrstuvwxyzABCDEF' + '5',
  GILA7: '7ZSTJK+W=cVtBCas' + 'yf0gzA8uvwDEq3XH' + '/1RMNOILPQU4klm6' + '5YbdeFrx2hij9nop' + 'G',
  TRIPO5: 'ghijopE+G78lmnIJ' + 'QRXY=abcS/UVWdef' + 'ABCs456tDqruvNOP' + 'wx2KLyz01M3Hk9ZF' + 'T',

  /**
   * Strong encryption
   */
  AER256: require('AER256'),
  ARMON64: require('ARMON64'),
};

exports.encode = function(method, str) {
  if (!Methods[method]) {
    console.log(`${method} is currently not supported.`);

    return str;
  } else if (typeof Methods[method] === 'object') {
    return Methods[method].encode(str, arguments[2]);
  }

  return Encode(Methods[method], str);
};

exports.decode = function(method, str) {
  if (!Methods[method]) {
    console.log(`${method} is currently not supported.`);

    return str;
  } else if (typeof Methods[method] === 'object') {
    return Methods[method].decode(str, arguments[2])
  }

  return Decode(Methods[method], str);
};

exports.getSupportedMethods = () => Object.keys(Methods);
exports.addMethod = (method, fn) => Methods[method] = fn;
