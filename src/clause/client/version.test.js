require("dotenv").config();
const curdir = __dirname;
const path = require("path");
const fs = require("fs");
const thrift = require("thrift");
const Serving = require("./gen-nodejs/Serving");
const ttypes = require("./gen-nodejs/server_types");
const debug = require("debug")("chatopera:bot:clause:test");
const test = require("ava");
const _ = require("lodash");
const shortid = require("shortid");

var transport = thrift.TFramedTransport;
var protocol = thrift.TBinaryProtocol;

/**
 * Clear null value
 * @param {JSON} res
 */
function res2data(res) {
  let data = {};
  for (let x of _.keys(res)) {
    if (res[x] != null) {
      data[x] = res[x];
    }
  }
  return data;
}

test.before(t => {
  var connection = thrift.createConnection(
    process.env["SERVING_HOST"] || "192.168.2.219",
    process.env["SERVING_PORT"] || 8056,
    {
      transport: transport,
      protocol: protocol,
      max_attempts: 1000,
      retry_max_delay: 2000,
      connect_timeout: 6000
    }
  );

  connection.on("error", function(err) {
    console.log(err);
  });

  t.context.client = thrift.createClient(Serving, connection);
});

/**
 * 通过chatbotID等信息获得session信息
 */
test.skip("Chatopera Clause#get session", t => {
  t.context.client.getSession(
    {
      session: {
        id: "4B254E38FB8B0FF65778C648B03C4A29"
      }
    },
    (err, result) => {
      if (err) {
        t.pass(err);
        t.end();
        return;
      }
      debug("create session: %j", result);
      t.pass();
      t.end();
    }
  );
});

test.skip("Chatopera Clause#get devver", t => {
  t.context.client.devver(
    {
      chatbotID: "mychatbotID2"
    },
    (err, result) => {
      if (err) {
        t.pass(err);
        t.end();
        return;
      }
      debug("devver: %j", result);
      t.pass();
      t.end();
    }
  );
});

test.skip("Chatopera Clause#get prover", t => {
  t.context.client.prover(
    {
      chatbotID: "mychatbotID2"
    },
    (err, result) => {
      if (err) {
        t.pass(err);
        t.end();
        return;
      }
      debug("prover: %j", result);
      t.pass();
      t.end();
    }
  );
});

test.skip("Chatopera Clause#online", t => {
  t.context.client.online(
    {
      chatbotID: "mychatbotID2",
      prover: {
        version: "16cd79015d0"
      }
    },
    (err, result) => {
      if (err) {
        t.pass(err);
        t.end();
        return;
      }
      debug("prover: %j", result);
      t.pass();
      t.end();
    }
  );
});

test.cb("Chatopera Clause#version", t => {
  t.context.client.version(
    {
      chatbotID: "mychatbotID2"
    },
    (err, result) => {
      if (err) {
        t.pass(err);
        t.end();
        return;
      }
      debug("prover: %j", result);
      t.pass();
      t.end();
    }
  );
});
