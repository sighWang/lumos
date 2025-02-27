const test = require("ava");
const { Reader } = require("@ximingwang/toolkit");
const { BI } = require("@ximingwang/bi");

const {
  CKBHasher,
  ckbHash,
  toBigUInt64LECompatible,
  readBigUInt64LECompatible,
  readBigUInt128LECompatible,
  toBigUInt128LECompatible,
  computeScriptHash,
  hashCode,
  assertHexString,
  assertHexadecimal,
  generateTypeIdScript,
} = require("../lib/utils");

const message = "0x";
const messageDigest =
  "0x44f4c69744d5f8c55d642062949dcae49bc4e7ef43d388c5a12f42b5633d163e";

test.before(() => {
  BigInt = () => {
    throw new Error("can not find bigint");
  };
});

test("CKBHasher, hex", (t) => {
  const result = new CKBHasher().update(message).digestHex();
  t.is(result, messageDigest);
});

test("CKBHasher, reader", (t) => {
  const result = new CKBHasher().update(new Reader(message)).digestHex();
  t.is(result, messageDigest);
});

test("ckbHash", (t) => {
  const arrayBuffer = new Reader(message).toArrayBuffer();
  const result = ckbHash(arrayBuffer);
  t.is(result.serializeJson(), messageDigest);
});

const uint64Compatible = BI.from(1965338);
const uint64leCompatible = "0x1afd1d0000000000";

test("toBigUInt64LECompatible", (t) => {
  t.is(toBigUInt64LECompatible(uint64Compatible), uint64leCompatible);
});

test("readBigUInt64LECompatible", (t) => {
  t.true(readBigUInt64LECompatible(uint64leCompatible).eq(uint64Compatible));
});
const u128Compatible = BI.from("1208925819614629174706177");
const u128leCompatible = "0x01000000000000000000010000000000";

test("toBigUInt128LECompatible", (t) => {
  t.is(toBigUInt128LECompatible(u128Compatible), u128leCompatible);
});

test("toBigUInt128LECompatible, to small", (t) => {
  t.throws(() => toBigUInt128LECompatible(BI.from(-1)));
  t.notThrows(() => toBigUInt128LECompatible(0));
});

test("toBigUInt128LECompatible, to big", (t) => {
  t.throws(() => toBigUInt128LECompatible(BI.from(2).pow(128)));
  t.notThrows(() => toBigUInt128LECompatible(BI.from(2).pow(128).sub(1)));
});

test("readBigUInt128LECompatible", (t) => {
  t.true(readBigUInt128LECompatible(u128leCompatible).eq(u128Compatible));
});

const script = {
  code_hash:
    "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x36c329ed630d6ce750712a477543672adab57f4c",
};
const scriptHash =
  "0x1f2615a8dde4e28ca736ff763c2078aff990043f4cbf09eb4b3a58a140a0862d";

test("computeScriptHash", (t) => {
  t.is(computeScriptHash(script), scriptHash);
});

test("hashCode, should return same hash if same input", (t) => {
  const buffer = Buffer.from("1234ab", "hex");
  t.is(hashCode(buffer), hashCode(buffer));
});

test("assertHexString", (t) => {
  t.notThrows(() => assertHexString("", "0x"));
  t.notThrows(() => assertHexString("", "0x1234"));
  t.throws(() => assertHexString("", "1234"));
  t.throws(() => assertHexString("", "0x123"));
  t.throws(() => assertHexString("", "0x123h"));
});

test("assertHexadecimal", (t) => {
  t.notThrows(() => assertHexadecimal("", "0x0"));
  t.notThrows(() => assertHexadecimal("", "0x01"));
  t.notThrows(() => assertHexadecimal("", "0x12"));
  t.throws(() => assertHexadecimal("", "12"));
  t.throws(() => assertHexadecimal("", "1r"));
});

test("test type id", (t) => {
  const input = {
    previous_output: {
      index: "0x0",
      tx_hash:
        "0x128b201cd1995efba3126d4431f837c34f7d2f6a29ed8968d2ebc39059add56a",
    },
    since: "0x0",
  };
  const typeIdScript = {
    args: "0xa803c9ed6c190fd780e64d885794933ab23da641e94ad1b9270ebac893a7cdcc",
    code_hash:
      "0x00000000000000000000000000000000000000000000000000545950455f4944",
    hash_type: "type",
  };
  t.deepEqual(generateTypeIdScript(input, "0x0"), typeIdScript);
});
