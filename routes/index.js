import express from 'express';
const router = express.Router();
import net from 'net';

import {
  GET_INPUT_SOURCE,
  HOST,
  PORT,
  SOURCE_MAP,
  SWITCH_INPUT_SOURCE,
} from '../constants.js';

import {
  getBufferFromHexArray,
  parseActiveOnDevice,
} from '../utils.js';

router.get('/', function(req, res, next) {
  const client = new net.Socket();

  client.connect(PORT, HOST, () => {
    client.write(getBufferFromHexArray(GET_INPUT_SOURCE));
  });

  client.on('data', (data) => {
    client.destroy();
    return res.send(parseActiveOnDevice(data).toString());
  });
});

router.post('/:target', function(req, res, next) {
  const target = parseInt(req.params.target);
  if (typeof target !== "number" || target < 1 || target > 8) {
    return res.send("Outside range");
  }

  const client = new net.Socket();
  const targetSource = SWITCH_INPUT_SOURCE;
  targetSource[4] = SOURCE_MAP[target];

  client.connect(PORT, HOST, () => {
    client.write(getBufferFromHexArray(targetSource));
  });

  client.on('data', (data) => {
    const previousOutput = parseActiveOnDevice(data);

    client.destroy();
    return res.send({
      "current": target,
      "prev": previousOutput,
    });
  });
});

export default router;
