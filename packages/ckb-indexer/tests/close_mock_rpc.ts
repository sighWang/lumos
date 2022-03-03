import request from "request";
const find = require("find-process");
let options = {
  method: "GET",
  url: "http://localhost:8118/quit",
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

find("name", "ckb-indexer", true).then((list: any) => {
  console.log(list);
  process.kill(list[0].pid, "SIGINT");
});
