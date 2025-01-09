import express from "express";
const router = express.Router();
import net from "net";

import {
  GET_INPUT_SOURCE,
  SOURCE_MAP,
  SWITCH_INPUT_SOURCE,
} from "../utils/constants";

import { getBufferFromHexArray, parseActiveOnDevice } from "../utils/utils";

router.get("/api/current", function (req, res, next) {
  const client = new net.Socket();

  return res.json({ current: "true" })

  // client.connect(process.env.API_PORT, process.env.API_ADDRESS, () => {
  //   client.write(getBufferFromHexArray(GET_INPUT_SOURCE));
  // });
  //
  // client.on("data", (data) => {
  //   client.destroy();
  //   return res.json({ current: parseActiveOnDevice(data) });
  // });
});

router.post("/api/setInput/:target", function (req, res, next) {
  const target = parseInt(req.params.target);
  if (typeof target !== "number" || target < 1 || target > 8) {
    return res.send("Outside range");
  }

  const client = new net.Socket();
  const targetSource = SWITCH_INPUT_SOURCE;
  targetSource[4] = SOURCE_MAP[target];

  // client.connect(process.env.API_PORT, process.env.API_ADDRESS, () => {
  //   client.write(getBufferFromHexArray(targetSource));
  // });
  //
  // client.on("data", (data) => {
  //   const previousOutput = parseActiveOnDevice(data);
  //
  //   client.destroy();
  //   return res.send({
  //     current: target,
  //     prev: previousOutput,
  //   });
  // });

  return res.send({
    current: targetSource,
  });
});

export default router;
