var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DirectSecp256k1HdWallet = require("@cosmjs/proto-signing").DirectSecp256k1HdWallet;
var _a = require("@cosmjs/cosmwasm-stargate"), assertIsBroadcastTxSuccess = _a.assertIsBroadcastTxSuccess, SigningCosmWasmClient = _a.SigningCosmWasmClient, CosmWasmClient = _a.CosmWasmClient;
var _b = require("@cosmjs/stargate"), coins = _b.coins, GasPrice = _b.GasPrice;
var fs = require("fs");
require("dotenv").config();
// const mnemonic = process.env.MNEMONIC; // Replace with your mnemonic
var mnemonic = "ride exhibit west toilet buddy chat elder faith attack purity wreck find";
// const rpcEndpoint = process.env.RPC; // Replace with your RPC endpoint
var rpcEndpoint = "https://rpc.hongbai.mantrachain.io";
var contractWasmPath = "./dinonum.wasm"; // Path to your compiled contract
function deploy() {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, account, client, wasmCode, uploadReceipt, codeId, initMsg, instantiateReceipt, contractAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
                        prefix: "mantra", // Replace with the correct prefix for your chain
                    })];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, wallet.getAccounts()];
                case 2:
                    account = (_a.sent())[0];
                    console.log("Wallet address: ".concat(account.address));
                    return [4 /*yield*/, SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice: GasPrice.fromString("0.0025uom") })];
                case 3:
                    client = _a.sent();
                    console.log("Connected to blockchain");
                    wasmCode = fs.readFileSync("./dinonum.wasm");
                    return [4 /*yield*/, client.upload(account.address, wasmCode, "auto", "Upload CosmWasm contract")];
                case 4:
                    uploadReceipt = _a.sent();
                    codeId = uploadReceipt.codeId;
                    console.log("Contract uploaded with Code ID: ".concat(codeId));
                    initMsg = {
                        count: 10,
                    };
                    return [4 /*yield*/, client.instantiate(account.address, codeId, initMsg, "My Dinonum Contract", "auto")];
                case 5:
                    instantiateReceipt = _a.sent();
                    contractAddress = instantiateReceipt.contractAddress;
                    console.log("Contract instantiated at reciept: ".concat(instantiateReceipt));
                    console.log("Contract instantiated at address: ".concat(contractAddress));
                    return [2 /*return*/];
            }
        });
    });
}
deploy().catch(console.error);
