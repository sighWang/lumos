import { startCKBIndexer } from "@ckb-lumos/testkit";
import { ChildProcess } from "child_process";

const child: ChildProcess = startCKBIndexer("0.2.2");

export { child };
