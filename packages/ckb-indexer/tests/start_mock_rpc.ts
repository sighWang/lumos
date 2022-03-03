import { createCKBMockRPC, mockData } from "@ckb-lumos/testkit";
import fs from "fs";
import path from "path";
console.log("in start mock server");
const server = createCKBMockRPC({
  blocks: JSON.parse(
    fs.readFileSync(path.join(__dirname, "./blocks_data.json")).toString()
  ),
  localNode: mockData.localNode(),
});

server.listen(8118, function () {
  console.log("🚀 server listen to 8118");
});
