// This example shows how to use the CkbIndexer to collect cells

import { Script, Indexer as CkbIndexer, helpers, config, BI } from "@ximingwang/lumos";

config.initializeConfig(config.predefined.AGGRON4);

const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const indexer = new CkbIndexer(CKB_INDEXER_URL, CKB_RPC_URL);

async function capacityOf(lock: Script): Promise<BI> {
  const collector = indexer.collector({ lock });

  let balance: BI = BI.from(0);
  for await (const cell of collector.collect()) {
    balance = balance.add(cell.cell_output.capacity);
  }

  return balance;
}

async function main() {
  const address = "ckt1qyqxgftlqzmtv05cwcyl4xlz6ryx6dgsyrasjrp27t";
  const lock: Script = helpers.parseAddress(address);

  const balance = await capacityOf(lock);

  const integer = balance.div(BI.from(10).pow(8));
  const fraction = balance.mod(BI.from(10).pow(8));

  console.log(`lock of ${address} is`, lock, "\n");
  console.log(`total CKB of ${address} is ${integer + "." + fraction}`);
}

main();
