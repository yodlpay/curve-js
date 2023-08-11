var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ethers, Contract } from "ethers";
import { Provider as MulticallProvider, Contract as MulticallContract } from 'ethcall';
import { getFactoryPoolData } from "./factory/factory.js";
import { getFactoryPoolsDataFromApi } from "./factory/factory-api.js";
import { getCryptoFactoryPoolData } from "./factory/factory-crypto.js";
import { getTricryptoFactoryPoolData } from "./factory/factory-tricrypto.js";
import ERC20Abi from './constants/abis/ERC20.json' assert { type: 'json' };
import cERC20Abi from './constants/abis/cERC20.json' assert { type: 'json' };
import yERC20Abi from './constants/abis/yERC20.json' assert { type: 'json' };
import minterABI from './constants/abis/minter.json' assert { type: 'json' };
import minterChildABI from './constants/abis/minter_child.json' assert { type: 'json' };
import votingEscrowABI from './constants/abis/votingescrow.json' assert { type: 'json' };
import anycallABI from './constants/abis/anycall.json' assert { type: 'json' };
import votingEscrowOracleABI from './constants/abis/voting_escrow_oracle.json' assert { type: 'json' };
import votingEscrowOracleEthABI from './constants/abis/voting_escrow_oracle_eth.json' assert { type: 'json' };
import feeDistributorABI from './constants/abis/fee_distributor.json' assert { type: 'json' };
import addressProviderABI from './constants/abis/address_provider.json' assert { type: 'json' };
import gaugeControllerABI from './constants/abis/gaugecontroller.json' assert { type: 'json' };
import routerABI from './constants/abis/router.json' assert { type: 'json' };
import depositAndStakeABI from './constants/abis/deposit_and_stake.json' assert { type: 'json' };
import cryptoCalcZapABI from './constants/abis/crypto_calc.json' assert { type: 'json' };
import depositAndStake6CoinsABI from './constants/abis/deposit_and_stake_6coins.json' assert { type: 'json' };
import StableCalcZapABI from './constants/abis/stable_calc.json' assert { type: 'json' };
import registryExchangeABI from './constants/abis/registry_exchange.json' assert { type: 'json' };
import streamerABI from './constants/abis/streamer.json' assert { type: 'json' };
import factoryABI from './constants/abis/factory.json' assert { type: 'json' };
import factoryEywaABI from './constants/abis/factory-eywa.json' assert { type: 'json' };
import factoryAdminABI from './constants/abis/factory-admin.json' assert { type: 'json' };
import cryptoFactoryABI from './constants/abis/factory-crypto.json' assert { type: 'json' };
import tricryptoFactoryABI from './constants/abis/factory-tricrypto.json' assert { type: 'json' };
import { POOLS_DATA_ETHEREUM, LLAMMAS_DATA_ETHEREUM, POOLS_DATA_POLYGON, POOLS_DATA_FANTOM, POOLS_DATA_AVALANCHE, POOLS_DATA_ARBITRUM, POOLS_DATA_OPTIMISM, POOLS_DATA_XDAI, POOLS_DATA_MOONBEAM, POOLS_DATA_AURORA, POOLS_DATA_KAVA, POOLS_DATA_CELO, POOLS_DATA_ZKSYNC, } from './constants/pools/index.js';
import { ALIASES_ETHEREUM, ALIASES_OPTIMISM, ALIASES_POLYGON, ALIASES_FANTOM, ALIASES_AVALANCHE, ALIASES_ARBITRUM, ALIASES_XDAI, ALIASES_MOONBEAM, ALIASES_AURORA, ALIASES_KAVA, ALIASES_CELO, ALIASES_ZKSYNC, } from "./constants/aliases.js";
import { COINS_ETHEREUM, cTokensEthereum, yTokensEthereum, ycTokensEthereum, aTokensEthereum } from "./constants/coins/ethereum.js";
import { COINS_OPTIMISM, cTokensOptimism, yTokensOptimism, ycTokensOptimism, aTokensOptimism } from "./constants/coins/optimism.js";
import { COINS_POLYGON, cTokensPolygon, yTokensPolygon, ycTokensPolygon, aTokensPolygon } from "./constants/coins/polygon.js";
import { COINS_FANTOM, cTokensFantom, yTokensFantom, ycTokensFantom, aTokensFantom } from "./constants/coins/fantom.js";
import { COINS_AVALANCHE, cTokensAvalanche, yTokensAvalanche, ycTokensAvalanche, aTokensAvalanche } from "./constants/coins/avalanche.js";
import { COINS_ARBITRUM, cTokensArbitrum, yTokensArbitrum, ycTokensArbitrum, aTokensArbitrum } from "./constants/coins/arbitrum.js";
import { COINS_XDAI, cTokensXDai, yTokensXDai, ycTokensXDai, aTokensXDai } from "./constants/coins/xdai.js";
import { COINS_MOONBEAM, cTokensMoonbeam, yTokensMoonbeam, ycTokensMoonbeam, aTokensMoonbeam } from "./constants/coins/moonbeam.js";
import { COINS_AURORA, cTokensAurora, yTokensAurora, ycTokensAurora, aTokensAurora } from "./constants/coins/aurora.js";
import { COINS_KAVA, cTokensKava, yTokensKava, ycTokensKava, aTokensKava } from "./constants/coins/kava.js";
import { COINS_CELO, cTokensCelo, yTokensCelo, ycTokensCelo, aTokensCelo } from "./constants/coins/celo.js";
import { COINS_ZKSYNC, cTokensZkSync, yTokensZkSync, ycTokensZkSync, aTokensZkSync } from "./constants/coins/zksync.js";
import { lowerCasePoolDataAddresses, extractDecimals, extractGauges } from "./constants/utils.js";
import { _getAllGauges, _getHiddenPools } from "./external-api.js";
var _killGauges = function (poolsData) { return __awaiter(void 0, void 0, void 0, function () {
    var gaugeData, isKilled, poolId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _getAllGauges()];
            case 1:
                gaugeData = _a.sent();
                isKilled = {};
                Object.values(gaugeData).forEach(function (d) {
                    var _a;
                    isKilled[d.gauge.toLowerCase()] = (_a = d.is_killed) !== null && _a !== void 0 ? _a : false;
                });
                for (poolId in poolsData) {
                    if (isKilled[poolsData[poolId].gauge_address]) {
                        poolsData[poolId].is_gauge_killed = true;
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
export var NATIVE_TOKENS = {
    1: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
    },
    10: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x4200000000000000000000000000000000000006'.toLowerCase(),
    },
    100: {
        symbol: 'XDAi',
        wrappedSymbol: 'WXDAI',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'.toLowerCase(),
    },
    137: {
        symbol: 'MATIC',
        wrappedSymbol: 'WMATIC',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'.toLowerCase(),
    },
    250: {
        symbol: 'FTM',
        wrappedSymbol: 'WFTM',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'.toLowerCase(),
    },
    324: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91'.toLowerCase(),
    },
    1284: {
        symbol: 'GLMR',
        wrappedSymbol: 'WGLMR',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xAcc15dC74880C9944775448304B263D191c6077F'.toLowerCase(),
    },
    2222: {
        symbol: 'KAVA',
        wrappedSymbol: 'WKAVA',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b'.toLowerCase(),
    },
    42161: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'.toLowerCase(),
    },
    42220: {
        symbol: 'CELO',
        wrappedSymbol: 'WCELO',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x3Ad443d769A07f287806874F8E5405cE3Ac902b9'.toLowerCase(),
    },
    43114: {
        symbol: 'AVAX',
        wrappedSymbol: 'WAVAX',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'.toLowerCase(),
    },
    1313161554: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB'.toLowerCase(),
    },
};
export var NETWORK_CONSTANTS = {
    1: {
        NAME: 'ethereum',
        ALIASES: ALIASES_ETHEREUM,
        POOLS_DATA: POOLS_DATA_ETHEREUM,
        LLAMMAS_DATA: LLAMMAS_DATA_ETHEREUM,
        COINS: COINS_ETHEREUM,
        cTokens: cTokensEthereum,
        yTokens: yTokensEthereum,
        ycTokens: ycTokensEthereum,
        aTokens: aTokensEthereum,
    },
    10: {
        NAME: 'optimism',
        ALIASES: ALIASES_OPTIMISM,
        POOLS_DATA: POOLS_DATA_OPTIMISM,
        COINS: COINS_OPTIMISM,
        cTokens: cTokensOptimism,
        yTokens: yTokensOptimism,
        ycTokens: ycTokensOptimism,
        aTokens: aTokensOptimism,
    },
    100: {
        NAME: 'xdai',
        ALIASES: ALIASES_XDAI,
        POOLS_DATA: POOLS_DATA_XDAI,
        COINS: COINS_XDAI,
        cTokens: cTokensXDai,
        yTokens: yTokensXDai,
        ycTokens: ycTokensXDai,
        aTokens: aTokensXDai,
    },
    137: {
        NAME: 'polygon',
        ALIASES: ALIASES_POLYGON,
        POOLS_DATA: POOLS_DATA_POLYGON,
        COINS: COINS_POLYGON,
        cTokens: cTokensPolygon,
        yTokens: yTokensPolygon,
        ycTokens: ycTokensPolygon,
        aTokens: aTokensPolygon,
    },
    250: {
        NAME: 'fantom',
        ALIASES: ALIASES_FANTOM,
        POOLS_DATA: POOLS_DATA_FANTOM,
        COINS: COINS_FANTOM,
        cTokens: cTokensFantom,
        yTokens: yTokensFantom,
        ycTokens: ycTokensFantom,
        aTokens: aTokensFantom,
    },
    324: {
        NAME: 'zksync',
        ALIASES: ALIASES_ZKSYNC,
        POOLS_DATA: POOLS_DATA_ZKSYNC,
        COINS: COINS_ZKSYNC,
        cTokens: cTokensZkSync,
        yTokens: yTokensZkSync,
        ycTokens: ycTokensZkSync,
        aTokens: aTokensZkSync,
    },
    1284: {
        NAME: 'moonbeam',
        ALIASES: ALIASES_MOONBEAM,
        POOLS_DATA: POOLS_DATA_MOONBEAM,
        COINS: COINS_MOONBEAM,
        cTokens: cTokensMoonbeam,
        yTokens: yTokensMoonbeam,
        ycTokens: ycTokensMoonbeam,
        aTokens: aTokensMoonbeam,
    },
    2222: {
        NAME: 'kava',
        ALIASES: ALIASES_KAVA,
        POOLS_DATA: POOLS_DATA_KAVA,
        COINS: COINS_KAVA,
        cTokens: cTokensKava,
        yTokens: yTokensKava,
        ycTokens: ycTokensKava,
        aTokens: aTokensKava,
    },
    42161: {
        NAME: 'arbitrum',
        ALIASES: ALIASES_ARBITRUM,
        POOLS_DATA: POOLS_DATA_ARBITRUM,
        COINS: COINS_ARBITRUM,
        cTokens: cTokensArbitrum,
        yTokens: yTokensArbitrum,
        ycTokens: ycTokensArbitrum,
        aTokens: aTokensArbitrum,
    },
    42220: {
        NAME: 'celo',
        ALIASES: ALIASES_CELO,
        POOLS_DATA: POOLS_DATA_CELO,
        COINS: COINS_CELO,
        cTokens: cTokensCelo,
        yTokens: yTokensCelo,
        ycTokens: ycTokensCelo,
        aTokens: aTokensCelo,
    },
    43114: {
        NAME: 'avalanche',
        ALIASES: ALIASES_AVALANCHE,
        POOLS_DATA: POOLS_DATA_AVALANCHE,
        COINS: COINS_AVALANCHE,
        cTokens: cTokensAvalanche,
        yTokens: yTokensAvalanche,
        ycTokens: ycTokensAvalanche,
        aTokens: aTokensAvalanche,
    },
    1313161554: {
        NAME: 'aurora',
        ALIASES: ALIASES_AURORA,
        POOLS_DATA: POOLS_DATA_AURORA,
        COINS: COINS_AURORA,
        cTokens: cTokensAurora,
        yTokens: yTokensAurora,
        ycTokens: ycTokensAurora,
        aTokens: aTokensAurora,
    },
};
var Curve = /** @class */ (function () {
    function Curve() {
        var _this = this;
        this.fetchFactoryPools = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (this.chainId === 1313161554)
                                return [2 /*return*/];
                            if (!useApi) return [3 /*break*/, 2];
                            _a = this.constants;
                            _b = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolsDataFromApi.call(this, "factory")];
                        case 1:
                            _a.FACTORY_POOLS_DATA = _b.apply(void 0, [_h.sent()]);
                            return [3 /*break*/, 4];
                        case 2:
                            _c = this.constants;
                            _d = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolData.call(this)];
                        case 3:
                            _c.FACTORY_POOLS_DATA = _d.apply(void 0, [_h.sent()]);
                            _h.label = 4;
                        case 4:
                            _e = this.constants;
                            return [4 /*yield*/, this._filterHiddenPools(this.constants.FACTORY_POOLS_DATA)];
                        case 5:
                            _e.FACTORY_POOLS_DATA = _h.sent();
                            this._updateDecimalsAndGauges(this.constants.FACTORY_POOLS_DATA);
                            return [4 /*yield*/, _killGauges(this.constants.FACTORY_POOLS_DATA)];
                        case 6:
                            _h.sent();
                            _f = this.constants.FACTORY_GAUGE_IMPLEMENTATIONS;
                            _g = "factory";
                            return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].contract.gauge_implementation(this.constantOptions)];
                        case 7:
                            _f[_g] = _h.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchCrvusdFactoryPools = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.chainId != 1)
                                return [2 /*return*/];
                            if (!useApi) return [3 /*break*/, 2];
                            _a = this.constants;
                            _b = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolsDataFromApi.call(this, "factory-crvusd")];
                        case 1:
                            _a.CRVUSD_FACTORY_POOLS_DATA = _b.apply(void 0, [_f.sent()]);
                            return [3 /*break*/, 4];
                        case 2:
                            _c = this.constants;
                            _d = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolData.call(this, 0, undefined, this.constants.ALIASES.crvusd_factory)];
                        case 3:
                            _c.CRVUSD_FACTORY_POOLS_DATA = _d.apply(void 0, [_f.sent()]);
                            _f.label = 4;
                        case 4:
                            _e = this.constants;
                            return [4 /*yield*/, this._filterHiddenPools(this.constants.CRVUSD_FACTORY_POOLS_DATA)];
                        case 5:
                            _e.CRVUSD_FACTORY_POOLS_DATA = _f.sent();
                            this._updateDecimalsAndGauges(this.constants.CRVUSD_FACTORY_POOLS_DATA);
                            return [4 /*yield*/, _killGauges(this.constants.CRVUSD_FACTORY_POOLS_DATA)];
                        case 6:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchEywaFactoryPools = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.chainId != 250)
                                return [2 /*return*/];
                            if (!useApi) return [3 /*break*/, 2];
                            _a = this.constants;
                            _b = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolsDataFromApi.call(this, "factory-eywa")];
                        case 1:
                            _a.EYWA_FACTORY_POOLS_DATA = _b.apply(void 0, [_f.sent()]);
                            return [3 /*break*/, 4];
                        case 2:
                            _c = this.constants;
                            _d = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolData.call(this, 0, undefined, this.constants.ALIASES.eywa_factory)];
                        case 3:
                            _c.EYWA_FACTORY_POOLS_DATA = _d.apply(void 0, [_f.sent()]);
                            _f.label = 4;
                        case 4:
                            _e = this.constants;
                            return [4 /*yield*/, this._filterHiddenPools(this.constants.EYWA_FACTORY_POOLS_DATA)];
                        case 5:
                            _e.EYWA_FACTORY_POOLS_DATA = _f.sent();
                            this._updateDecimalsAndGauges(this.constants.EYWA_FACTORY_POOLS_DATA);
                            return [4 /*yield*/, _killGauges(this.constants.EYWA_FACTORY_POOLS_DATA)];
                        case 6:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchCryptoFactoryPools = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (![1, 137, 250].includes(this.chainId))
                                return [2 /*return*/];
                            if (!useApi) return [3 /*break*/, 2];
                            _a = this.constants;
                            _b = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolsDataFromApi.call(this, "factory-crypto")];
                        case 1:
                            _a.CRYPTO_FACTORY_POOLS_DATA = _b.apply(void 0, [_h.sent()]);
                            return [3 /*break*/, 4];
                        case 2:
                            _c = this.constants;
                            _d = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getCryptoFactoryPoolData.call(this)];
                        case 3:
                            _c.CRYPTO_FACTORY_POOLS_DATA = _d.apply(void 0, [_h.sent()]);
                            _h.label = 4;
                        case 4:
                            _e = this.constants;
                            return [4 /*yield*/, this._filterHiddenPools(this.constants.CRYPTO_FACTORY_POOLS_DATA)];
                        case 5:
                            _e.CRYPTO_FACTORY_POOLS_DATA = _h.sent();
                            this._updateDecimalsAndGauges(this.constants.CRYPTO_FACTORY_POOLS_DATA);
                            return [4 /*yield*/, _killGauges(this.constants.CRYPTO_FACTORY_POOLS_DATA)];
                        case 6:
                            _h.sent();
                            _f = this.constants.FACTORY_GAUGE_IMPLEMENTATIONS;
                            _g = "factory-crypto";
                            return [4 /*yield*/, this.contracts[this.constants.ALIASES.crypto_factory].contract.gauge_implementation(this.constantOptions)];
                        case 7:
                            _f[_g] = _h.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchTricryptoFactoryPools = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (![1].includes(this.chainId))
                                return [2 /*return*/];
                            if (!useApi) return [3 /*break*/, 2];
                            _a = this.constants;
                            _b = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getFactoryPoolsDataFromApi.call(this, "factory-tricrypto")];
                        case 1:
                            _a.TRICRYPTO_FACTORY_POOLS_DATA = _b.apply(void 0, [_h.sent()]);
                            return [3 /*break*/, 4];
                        case 2:
                            _c = this.constants;
                            _d = lowerCasePoolDataAddresses;
                            return [4 /*yield*/, getTricryptoFactoryPoolData.call(this)];
                        case 3:
                            _c.TRICRYPTO_FACTORY_POOLS_DATA = _d.apply(void 0, [_h.sent()]);
                            _h.label = 4;
                        case 4:
                            _e = this.constants;
                            return [4 /*yield*/, this._filterHiddenPools(this.constants.TRICRYPTO_FACTORY_POOLS_DATA)];
                        case 5:
                            _e.TRICRYPTO_FACTORY_POOLS_DATA = _h.sent();
                            this._updateDecimalsAndGauges(this.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                            return [4 /*yield*/, _killGauges(this.constants.TRICRYPTO_FACTORY_POOLS_DATA)];
                        case 6:
                            _h.sent();
                            _f = this.constants.FACTORY_GAUGE_IMPLEMENTATIONS;
                            _g = "factory-tricrypto";
                            return [4 /*yield*/, this.contracts[this.constants.ALIASES.tricrypto_factory].contract.gauge_implementation(this.constantOptions)];
                        case 7:
                            _f[_g] = _h.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchNewFactoryPools = function () { return __awaiter(_this, void 0, void 0, function () {
            var currentPoolIds, lastPoolIdx, poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.chainId === 1313161554)
                            return [2 /*return*/, []];
                        currentPoolIds = Object.keys(this.constants.FACTORY_POOLS_DATA);
                        lastPoolIdx = Number(currentPoolIds[currentPoolIds.length - 1].split("-")[2]);
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getFactoryPoolData.call(this, lastPoolIdx + 1)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)];
                }
            });
        }); };
        this.fetchNewCryptoFactoryPools = function () { return __awaiter(_this, void 0, void 0, function () {
            var currentPoolIds, lastPoolIdx, poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (![1, 137, 250].includes(this.chainId))
                            return [2 /*return*/, []];
                        currentPoolIds = Object.keys(this.constants.CRYPTO_FACTORY_POOLS_DATA);
                        lastPoolIdx = Number(currentPoolIds[currentPoolIds.length - 1].split("-")[2]);
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getCryptoFactoryPoolData.call(this, lastPoolIdx + 1)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.CRYPTO_FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.CRYPTO_FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.CRYPTO_FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)];
                }
            });
        }); };
        this.fetchNewTricryptoFactoryPools = function () { return __awaiter(_this, void 0, void 0, function () {
            var currentPoolIds, lastPoolIdx, poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (![1].includes(this.chainId))
                            return [2 /*return*/, []];
                        currentPoolIds = Object.keys(this.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                        lastPoolIdx = Number(currentPoolIds[currentPoolIds.length - 1].split("-")[2]);
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getTricryptoFactoryPoolData.call(this, lastPoolIdx + 1)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.TRICRYPTO_FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.TRICRYPTO_FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)];
                }
            });
        }); };
        this.fetchRecentlyDeployedFactoryPool = function (poolAddress) { return __awaiter(_this, void 0, void 0, function () {
            var poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.chainId === 1313161554)
                            return [2 /*return*/, ''];
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getFactoryPoolData.call(this, 0, poolAddress)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)[0]]; // id
                }
            });
        }); };
        this.fetchRecentlyDeployedCryptoFactoryPool = function (poolAddress) { return __awaiter(_this, void 0, void 0, function () {
            var poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (![1, 137, 250].includes(this.chainId))
                            return [2 /*return*/, ''];
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getCryptoFactoryPoolData.call(this, 0, poolAddress)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.CRYPTO_FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.CRYPTO_FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.CRYPTO_FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)[0]]; // id
                }
            });
        }); };
        this.fetchRecentlyDeployedTricryptoFactoryPool = function (poolAddress) { return __awaiter(_this, void 0, void 0, function () {
            var poolData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (![1].includes(this.chainId))
                            return [2 /*return*/, ''];
                        _a = lowerCasePoolDataAddresses;
                        return [4 /*yield*/, getTricryptoFactoryPoolData.call(this, 0, poolAddress)];
                    case 1:
                        poolData = _a.apply(void 0, [_b.sent()]);
                        this.constants.TRICRYPTO_FACTORY_POOLS_DATA = __assign(__assign({}, this.constants.TRICRYPTO_FACTORY_POOLS_DATA), poolData);
                        this._updateDecimalsAndGauges(this.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                        return [2 /*return*/, Object.keys(poolData)[0]]; // id
                }
            });
        }); };
        this.getMainPoolList = function () { return Object.keys(_this.constants.POOLS_DATA); };
        this.getFactoryPoolList = function () { return Object.keys(_this.constants.FACTORY_POOLS_DATA); };
        this.getCrvusdFactoryPoolList = function () { return Object.keys(_this.constants.CRVUSD_FACTORY_POOLS_DATA); };
        this.getEywaFactoryPoolList = function () { return Object.keys(_this.constants.EYWA_FACTORY_POOLS_DATA); };
        this.getCryptoFactoryPoolList = function () { return Object.keys(_this.constants.CRYPTO_FACTORY_POOLS_DATA); };
        this.getTricryptoFactoryPoolList = function () { return Object.keys(_this.constants.TRICRYPTO_FACTORY_POOLS_DATA); };
        this.getPoolList = function () { return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], _this.getMainPoolList(), true), _this.getFactoryPoolList(), true), _this.getCrvusdFactoryPoolList(), true), _this.getEywaFactoryPoolList(), true), _this.getCryptoFactoryPoolList(), true), _this.getTricryptoFactoryPoolList(), true); };
        this.getPoolsData = function () { return (__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, _this.constants.POOLS_DATA), _this.constants.FACTORY_POOLS_DATA), _this.constants.CRVUSD_FACTORY_POOLS_DATA), _this.constants.EYWA_FACTORY_POOLS_DATA), _this.constants.CRYPTO_FACTORY_POOLS_DATA), _this.constants.TRICRYPTO_FACTORY_POOLS_DATA), _this.constants.LLAMMAS_DATA)); };
        this.getGaugeImplementation = function (factoryType) { return _this.constants.FACTORY_GAUGE_IMPLEMENTATIONS[factoryType] || _this.constants.ZERO_ADDRESS; };
        // @ts-ignore
        this.provider = null;
        // @ts-ignore
        this.signer = null;
        this.signerAddress = '';
        this.chainId = 1;
        // @ts-ignore
        this.multicallProvider = null;
        this.contracts = {};
        this.feeData = {};
        this.constantOptions = { gasLimit: 12000000 };
        this.options = {};
        this.constants = {
            NATIVE_TOKEN: NATIVE_TOKENS[1],
            NETWORK_NAME: 'ethereum',
            ALIASES: {},
            POOLS_DATA: {},
            FACTORY_POOLS_DATA: {},
            CRVUSD_FACTORY_POOLS_DATA: {},
            EYWA_FACTORY_POOLS_DATA: {},
            CRYPTO_FACTORY_POOLS_DATA: {},
            TRICRYPTO_FACTORY_POOLS_DATA: {},
            LLAMMAS_DATA: {},
            COINS: {},
            DECIMALS: {},
            GAUGES: [],
            FACTORY_GAUGE_IMPLEMENTATIONS: {},
            ZERO_ADDRESS: ethers.ZeroAddress,
        };
    }
    Curve.prototype.init = function (providerType, providerSettings, options // gasPrice in Gwei
    ) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var jsonRpcApiProviderOptions, _b, e_1, _c, network, poolId, _d, cTokens, yTokens, ycTokens, aTokens, customAbiTokens, _e, err_1, _i, _f, pool, _g, _h, coinAddr, _j, _k, coinAddr, _l, _m, coinAddr, _minterABI, addressProviderContract, _o, factoryContract, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        // @ts-ignore
                        this.provider = null;
                        // @ts-ignore
                        this.signer = null;
                        this.signerAddress = '';
                        this.chainId = 1;
                        // @ts-ignore
                        this.multicallProvider = null;
                        this.contracts = {};
                        this.feeData = {};
                        this.constantOptions = { gasLimit: 12000000 };
                        this.options = {};
                        this.constants = {
                            NATIVE_TOKEN: NATIVE_TOKENS[1],
                            NETWORK_NAME: 'ethereum',
                            ALIASES: {},
                            POOLS_DATA: {},
                            FACTORY_POOLS_DATA: {},
                            CRVUSD_FACTORY_POOLS_DATA: {},
                            EYWA_FACTORY_POOLS_DATA: {},
                            CRYPTO_FACTORY_POOLS_DATA: {},
                            TRICRYPTO_FACTORY_POOLS_DATA: {},
                            LLAMMAS_DATA: {},
                            COINS: {},
                            DECIMALS: {},
                            GAUGES: [],
                            FACTORY_GAUGE_IMPLEMENTATIONS: {},
                            ZERO_ADDRESS: ethers.ZeroAddress,
                        };
                        if (!(providerType.toLowerCase() === 'JsonRpc'.toLowerCase())) return [3 /*break*/, 6];
                        providerSettings = providerSettings;
                        jsonRpcApiProviderOptions = void 0;
                        if (providerSettings.batchMaxCount) {
                            jsonRpcApiProviderOptions = {
                                batchMaxCount: providerSettings.batchMaxCount,
                            };
                        }
                        if (providerSettings.url) {
                            this.provider = new ethers.JsonRpcProvider(providerSettings.url, undefined, jsonRpcApiProviderOptions);
                        }
                        else {
                            this.provider = new ethers.JsonRpcProvider('http://localhost:8545/', undefined, jsonRpcApiProviderOptions);
                        }
                        if (!providerSettings.privateKey) return [3 /*break*/, 1];
                        this.signer = new ethers.Wallet(providerSettings.privateKey, this.provider);
                        return [3 /*break*/, 5];
                    case 1:
                        if (!!((_a = providerSettings.url) === null || _a === void 0 ? void 0 : _a.startsWith("https://rpc.gnosischain.com"))) return [3 /*break*/, 5];
                        _q.label = 2;
                    case 2:
                        _q.trys.push([2, 4, , 5]);
                        _b = this;
                        return [4 /*yield*/, this.provider.getSigner()];
                    case 3:
                        _b.signer = _q.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _q.sent();
                        this.signer = null;
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        if (!(providerType.toLowerCase() === 'Web3'.toLowerCase())) return [3 /*break*/, 8];
                        providerSettings = providerSettings;
                        this.provider = new ethers.BrowserProvider(providerSettings.externalProvider);
                        _c = this;
                        return [4 /*yield*/, this.provider.getSigner()];
                    case 7:
                        _c.signer = _q.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        if (providerType.toLowerCase() === 'Infura'.toLowerCase()) {
                            providerSettings = providerSettings;
                            this.provider = new ethers.InfuraProvider(providerSettings.network, providerSettings.apiKey);
                            this.signer = null;
                            // Alchemy provider
                        }
                        else if (providerType.toLowerCase() === 'Alchemy'.toLowerCase()) {
                            providerSettings = providerSettings;
                            this.provider = new ethers.AlchemyProvider(providerSettings.network, providerSettings.apiKey);
                            this.signer = null;
                        }
                        else {
                            throw Error('Wrong providerType');
                        }
                        _q.label = 9;
                    case 9: return [4 /*yield*/, this.provider.getNetwork()];
                    case 10:
                        network = _q.sent();
                        console.log("CURVE-JS IS CONNECTED TO NETWORK:", { name: network.name.toUpperCase(), chainId: Number(network.chainId) });
                        this.chainId = Number(network.chainId) === 133 || Number(network.chainId) === 31337 ? 1 : Number(network.chainId);
                        this.constants.NATIVE_TOKEN = NATIVE_TOKENS[this.chainId];
                        this.constants.NETWORK_NAME = NETWORK_CONSTANTS[this.chainId].NAME;
                        this.constants.ALIASES = NETWORK_CONSTANTS[this.chainId].ALIASES;
                        this.constants.ALIASES.anycall = "0x37414a8662bc1d25be3ee51fb27c2686e2490a89";
                        this.constants.ALIASES.voting_escrow_oracle = "0x12F407340697Ae0b177546E535b91A5be021fBF9";
                        this.constants.POOLS_DATA = NETWORK_CONSTANTS[this.chainId].POOLS_DATA;
                        if (this.chainId === 1)
                            this.constants.LLAMMAS_DATA = NETWORK_CONSTANTS[this.chainId].LLAMMAS_DATA;
                        for (poolId in this.constants.POOLS_DATA)
                            this.constants.POOLS_DATA[poolId].in_api = true;
                        this.constants.COINS = NETWORK_CONSTANTS[this.chainId].COINS;
                        this.constants.DECIMALS = extractDecimals(__assign(__assign({}, this.constants.POOLS_DATA), this.constants.LLAMMAS_DATA));
                        this.constants.DECIMALS[this.constants.NATIVE_TOKEN.address] = 18;
                        this.constants.DECIMALS[this.constants.NATIVE_TOKEN.wrappedAddress] = 18;
                        this.constants.GAUGES = extractGauges(this.constants.POOLS_DATA);
                        _d = [
                            NETWORK_CONSTANTS[this.chainId].cTokens,
                            NETWORK_CONSTANTS[this.chainId].yTokens,
                            NETWORK_CONSTANTS[this.chainId].ycTokens,
                            NETWORK_CONSTANTS[this.chainId].aTokens,
                        ], cTokens = _d[0], yTokens = _d[1], ycTokens = _d[2], aTokens = _d[3];
                        customAbiTokens = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], cTokens, true), yTokens, true), ycTokens, true), aTokens, true);
                        return [4 /*yield*/, _killGauges(this.constants.POOLS_DATA)];
                    case 11:
                        _q.sent();
                        this.multicallProvider = new MulticallProvider(this.chainId, this.provider);
                        if (!this.signer) return [3 /*break*/, 16];
                        _q.label = 12;
                    case 12:
                        _q.trys.push([12, 14, , 15]);
                        _e = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 13:
                        _e.signerAddress = _q.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        err_1 = _q.sent();
                        this.signer = null;
                        return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        this.signerAddress = '';
                        _q.label = 17;
                    case 17:
                        this.feeData = { gasPrice: options.gasPrice, maxFeePerGas: options.maxFeePerGas, maxPriorityFeePerGas: options.maxPriorityFeePerGas };
                        return [4 /*yield*/, this.updateFeeData()];
                    case 18:
                        _q.sent();
                        for (_i = 0, _f = Object.values(__assign(__assign({}, this.constants.POOLS_DATA), this.constants.LLAMMAS_DATA)); _i < _f.length; _i++) {
                            pool = _f[_i];
                            this.setContract(pool.swap_address, pool.swap_abi);
                            if (pool.token_address !== pool.swap_address) {
                                this.setContract(pool.token_address, ERC20Abi);
                            }
                            if (pool.gauge_address !== this.constants.ZERO_ADDRESS) {
                                this.setContract(pool.gauge_address, pool.gauge_abi);
                            }
                            if (pool.deposit_address && !this.contracts[pool.deposit_address]) {
                                this.setContract(pool.deposit_address, pool.deposit_abi);
                            }
                            for (_g = 0, _h = pool.underlying_coin_addresses; _g < _h.length; _g++) {
                                coinAddr = _h[_g];
                                this.setContract(coinAddr, ERC20Abi);
                            }
                            for (_j = 0, _k = pool.wrapped_coin_addresses; _j < _k.length; _j++) {
                                coinAddr = _k[_j];
                                if (customAbiTokens.includes(coinAddr))
                                    continue;
                                if (coinAddr in this.contracts)
                                    continue;
                                this.setContract(coinAddr, ERC20Abi);
                            }
                            // TODO add all coins
                            for (_l = 0, _m = pool.wrapped_coin_addresses; _l < _m.length; _l++) {
                                coinAddr = _m[_l];
                                if (cTokens.includes(coinAddr)) {
                                    this.setContract(coinAddr, cERC20Abi);
                                }
                                if (aTokens.includes(coinAddr)) {
                                    this.setContract(coinAddr, ERC20Abi);
                                }
                                if (yTokens.includes(coinAddr) || ycTokens.includes(coinAddr)) {
                                    this.setContract(coinAddr, yERC20Abi);
                                }
                            }
                            if (pool.reward_contract) {
                                this.setContract(pool.reward_contract, streamerABI);
                            }
                            if (pool.sCurveRewards_address) {
                                this.setContract(pool.sCurveRewards_address, pool.sCurveRewards_abi);
                            }
                        }
                        this.setContract(this.constants.NATIVE_TOKEN.wrappedAddress, ERC20Abi);
                        this.setContract(this.constants.ALIASES.crv, ERC20Abi);
                        this.constants.DECIMALS[this.constants.ALIASES.crv] = 18;
                        _minterABI = this.chainId === 1 ? minterABI : minterChildABI;
                        this.setContract(this.constants.ALIASES.minter, _minterABI);
                        this.setContract(this.constants.ALIASES.voting_escrow, votingEscrowABI);
                        this.setContract(this.constants.ALIASES.fee_distributor, feeDistributorABI);
                        this.setContract(this.constants.ALIASES.address_provider, addressProviderABI);
                        if (!(this.chainId !== 324)) return [3 /*break*/, 20];
                        addressProviderContract = this.contracts[this.constants.ALIASES.address_provider].contract;
                        _o = this.constants.ALIASES;
                        return [4 /*yield*/, addressProviderContract.get_address(2, this.constantOptions)];
                    case 19:
                        _o.registry_exchange = (_q.sent()).toLowerCase();
                        this.setContract(this.constants.ALIASES.registry_exchange, registryExchangeABI);
                        _q.label = 20;
                    case 20:
                        this.setContract(this.constants.ALIASES.gauge_controller, gaugeControllerABI);
                        this.setContract(this.constants.ALIASES.router, routerABI);
                        if (this.chainId === 137) {
                            this.setContract(this.constants.ALIASES.deposit_and_stake, depositAndStake6CoinsABI);
                        }
                        else {
                            this.setContract(this.constants.ALIASES.deposit_and_stake, depositAndStakeABI);
                        }
                        this.setContract(this.constants.ALIASES.crypto_calc, cryptoCalcZapABI);
                        this.setContract(this.constants.ALIASES.stable_calc, StableCalcZapABI);
                        this.setContract(this.constants.ALIASES.factory, factoryABI);
                        if (!(this.chainId !== 1313161554)) return [3 /*break*/, 22];
                        factoryContract = this.contracts[this.constants.ALIASES.factory].contract;
                        _p = this.constants.ALIASES;
                        return [4 /*yield*/, factoryContract.admin(this.constantOptions)];
                    case 21:
                        _p.factory_admin = (_q.sent()).toLowerCase();
                        this.setContract(this.constants.ALIASES.factory_admin, factoryAdminABI);
                        _q.label = 22;
                    case 22:
                        this.setContract(this.constants.ALIASES.crvusd_factory, factoryABI);
                        this.setContract(this.constants.ALIASES.eywa_factory, factoryEywaABI);
                        this.setContract(this.constants.ALIASES.crypto_factory, cryptoFactoryABI);
                        this.setContract(this.constants.ALIASES.tricrypto_factory, tricryptoFactoryABI);
                        this.setContract(this.constants.ALIASES.anycall, anycallABI);
                        this.setContract(this.constants.ALIASES.voting_escrow_oracle, this.chainId === 1 ? votingEscrowOracleEthABI : votingEscrowOracleABI);
                        return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.setContract = function (address, abi) {
        this.contracts[address] = {
            contract: new Contract(address, abi, this.signer || this.provider),
            multicallContract: new MulticallContract(address, abi),
        };
    };
    Curve.prototype._filterHiddenPools = function (pools) {
        return __awaiter(this, void 0, void 0, function () {
            var hiddenPools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _getHiddenPools()];
                    case 1:
                        hiddenPools = (_a.sent())[this.constants.NETWORK_NAME] || [];
                        // @ts-ignore
                        return [2 /*return*/, Object.fromEntries(Object.entries(pools).filter(function (_a) {
                                var id = _a[0];
                                return !hiddenPools.includes(id);
                            }))];
                }
            });
        });
    };
    Curve.prototype._updateDecimalsAndGauges = function (pools) {
        this.constants.DECIMALS = __assign(__assign({}, this.constants.DECIMALS), extractDecimals(pools));
        this.constants.GAUGES = __spreadArray(__spreadArray([], this.constants.GAUGES, true), extractGauges(pools), true);
    };
    Curve.prototype.setCustomFeeData = function (customFeeData) {
        this.feeData = __assign(__assign({}, this.feeData), customFeeData);
    };
    Curve.prototype.formatUnits = function (value, unit) {
        return ethers.formatUnits(value, unit);
    };
    Curve.prototype.parseUnits = function (value, unit) {
        return ethers.parseUnits(value, unit);
    };
    Curve.prototype.updateFeeData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var feeData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getFeeData()];
                    case 1:
                        feeData = _a.sent();
                        if (feeData.maxFeePerGas === null || feeData.maxPriorityFeePerGas === null) {
                            delete this.options.maxFeePerGas;
                            delete this.options.maxPriorityFeePerGas;
                            this.options.gasPrice = this.feeData.gasPrice !== undefined ?
                                this.parseUnits(this.feeData.gasPrice.toString(), "gwei") :
                                (feeData.gasPrice || this.parseUnits("20", "gwei"));
                        }
                        else {
                            delete this.options.gasPrice;
                            this.options.maxFeePerGas = this.feeData.maxFeePerGas !== undefined ?
                                this.parseUnits(this.feeData.maxFeePerGas.toString(), "gwei") :
                                feeData.maxFeePerGas;
                            this.options.maxPriorityFeePerGas = this.feeData.maxPriorityFeePerGas !== undefined ?
                                this.parseUnits(this.feeData.maxPriorityFeePerGas.toString(), "gwei") :
                                feeData.maxPriorityFeePerGas;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Curve;
}());
export { Curve };
export var curve = new Curve();
