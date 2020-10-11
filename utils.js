const getBufferFromHexArray = (array) => {
  const hexString = array.map(byte => byte.substring(2)).join("");
  return Buffer.from(hexString, 'hex');
};

const parseActiveOnDevice = (data) => {
  const result = data.toString('hex');
  const resultArray = result.match(/.{1,2}/g);
  return parseInt(resultArray[4].substring(1)) + 1;
};

export {
  getBufferFromHexArray,
  parseActiveOnDevice,
};
