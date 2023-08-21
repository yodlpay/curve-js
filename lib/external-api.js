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
import axios from "axios";
import memoize from "memoizee";
export var _getPoolsFromApi = memoize(function (network, poolType) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://api.curve.fi/api/getPools/".concat(network, "/").concat(poolType);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data) !== null && _a !== void 0 ? _a : { poolData: [], tvl: 0, tvlAll: 0 }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getAllPoolsFromApi = function (network) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    _getPoolsFromApi(network, "main"),
                    _getPoolsFromApi(network, "crypto"),
                    _getPoolsFromApi(network, "factory"),
                    _getPoolsFromApi(network, "factory-crvusd"),
                    _getPoolsFromApi(network, "factory-eywa"),
                    _getPoolsFromApi(network, "factory-crypto"),
                    _getPoolsFromApi(network, "factory-tricrypto"),
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var _getSubgraphData = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                url = "https://api.curve.fi/api/getSubgraphData/".concat(network);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _e.sent();
                return [2 /*return*/, {
                        poolsData: (_a = response.data.data.poolList) !== null && _a !== void 0 ? _a : [],
                        totalVolume: (_b = response.data.data.totalVolume) !== null && _b !== void 0 ? _b : 0,
                        cryptoVolume: (_c = response.data.data.cryptoVolume) !== null && _c !== void 0 ? _c : 0,
                        cryptoShare: (_d = response.data.data.cryptoShare) !== null && _d !== void 0 ? _d : 0,
                    }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// Moonbeam and Aurora only
export var _getLegacyAPYsAndVolumes = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (["kava", "celo", "zksync", "base"].includes(network))
                    return [2 /*return*/, {}]; // Exclude Kava, Celo, ZkSync and Base
                url = "https://api.curve.fi/api/getMainPoolsAPYs/" + network;
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                data = (_a.sent()).data;
                result = {};
                Object.keys(data.apy.day).forEach(function (poolId) {
                    result[poolId] = { apy: { day: 0, week: 0 }, volume: 0 };
                    result[poolId].apy.day = data.apy.day[poolId] * 100;
                    result[poolId].apy.week = data.apy.week[poolId] * 100;
                    result[poolId].volume = data.volume[poolId];
                });
                return [2 /*return*/, result];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// Base, ZkSync, Moonbeam, Kava and Celo only
export var _getFactoryAPYsAndVolumes = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (network === "aurora")
                    return [2 /*return*/, []]; // Exclude Aurora
                url = "https://api.curve.fi/api/getFactoryAPYs-".concat(network);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data.poolDetails) !== null && _a !== void 0 ? _a : []];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getAllGauges = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getAllGauges";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getHiddenPools = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getHiddenPools";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _generateBoostingProof = memoize(function (block, address) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://prices.curve.fi/v1/general/get_merkle_proof?block=".concat(block, "&account_address=").concat(address);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, { block_header_rlp: response.data.block_header_rlp, proof_rlp: response.data.proof_rlp }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
