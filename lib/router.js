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
import axios from "axios";
import memoize from "memoizee";
import { ethers } from "ethers";
import { curve } from "./curve.js";
import { _getCoinAddresses, _getCoinDecimals, _getUsdRate, ensureAllowance, ensureAllowanceEstimateGas, fromBN, hasAllowance, isEth, toBN, BN, parseUnits, _cutZeros, ETH_ADDRESS, _get_small_x, _get_price_impact, } from "./utils.js";
import { getPool } from "./pools/index.js";
import { _getAmplificationCoefficientsFromApi } from "./pools/utils.js";
var getNewRoute = function (routeTvl, poolId, poolAddress, inputCoinAddress, outputCoinAddress, i, j, swapType, swapAddress, tvl) {
    var routePoolIds = routeTvl.route.map(function (s) { return s.poolId; });
    // Steps <= 4
    if (routePoolIds.length >= 4)
        return { route: [], minTvl: Infinity, totalTvl: 0 };
    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
    if (routePoolIds.includes(poolId))
        return { route: [], minTvl: Infinity, totalTvl: 0 };
    return {
        route: __spreadArray(__spreadArray([], routeTvl.route, true), [{ poolId: poolId, poolAddress: poolAddress, inputCoinAddress: inputCoinAddress, outputCoinAddress: outputCoinAddress, i: i, j: j, swapType: swapType, swapAddress: swapAddress }], false),
        minTvl: Math.min(tvl, routeTvl.minTvl),
        totalTvl: routeTvl.totalTvl + tvl,
    };
};
// TODO REMOVE IT!!!
var filterMaticFactory83Route = function (routes, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return routes.filter(function (r) {
        for (var _i = 0, _a = r.route; _i < _a.length; _i++) {
            var step = _a[_i];
            if (step.poolId === "factory-crypto-83" && step.inputCoinAddress === curveObj.constants.NATIVE_TOKEN.address)
                return false;
        }
        return true;
    });
};
// TODO REMOVE IT!!!
var filterAvax = function (routes) {
    return routes.filter(function (r) {
        for (var _i = 0, _a = r.route; _i < _a.length; _i++) {
            var step = _a[_i];
            if (step.poolId == 'avaxcrypto' && step.swapType == 4 && (step.i === 3 || step.j === 3))
                return false;
        }
        return true;
    });
};
var MAX_ROUTES_FOR_ONE_COIN = 3;
var filterRoutes = function (routes, inputCoinAddress, sortFn, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    // TODO REMOVE IT!!!
    if (curveObj.chainId === 137)
        routes = filterMaticFactory83Route(routes);
    if (curveObj.chainId === 43114)
        routes = filterAvax(routes);
    return routes
        .filter(function (r) { return r.route.length > 0; })
        .filter(function (r) { return r.route[0].inputCoinAddress === inputCoinAddress; }) // Truncated routes
        .filter(function (r, i, _routes) {
        var routesByPoolIds = _routes.map(function (r) { return r.route.map(function (s) { return s.poolId; }).toString(); });
        return routesByPoolIds.indexOf(r.route.map(function (s) { return s.poolId; }).toString()) === i;
    }) // Route duplications
        .sort(sortFn).slice(0, MAX_ROUTES_FOR_ONE_COIN);
};
var sortByTvl = function (a, b) { return b.minTvl - a.minTvl || b.totalTvl - a.totalTvl || a.route.length - b.route.length; };
var sortByLength = function (a, b) { return a.route.length - b.route.length || b.minTvl - a.minTvl || b.totalTvl - a.totalTvl; };
var _getTVL = memoize(function (poolId, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Number;
                return [4 /*yield*/, (getPool(poolId, curveObj)).stats.totalLiquidity()];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    }); });
}, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// Inspired by Dijkstra's algorithm
export var findAllRoutes = memoize(function (inputCoinAddress, outputCoinAddress, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var ALL_POOLS, amplificationCoefficientDict, curCoins, nextCoins, routesByTvl, routesByLength, maxSteps, step, _loop_1, _i, curCoins_1, inCoin, routes;
        var _a, _b;
        var _c, _d, _e, _f, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    inputCoinAddress = inputCoinAddress.toLowerCase();
                    outputCoinAddress = outputCoinAddress.toLowerCase();
                    ALL_POOLS = Object.entries(curveObj.getPoolsData()).filter(function (_a) {
                        var id = _a[0], _ = _a[1];
                        return id !== "crveth";
                    });
                    return [4 /*yield*/, _getAmplificationCoefficientsFromApi(curveObj)];
                case 1:
                    amplificationCoefficientDict = _s.sent();
                    curCoins = [inputCoinAddress];
                    nextCoins = new Set();
                    routesByTvl = (_a = {},
                        _a[inputCoinAddress] = [{ route: [], minTvl: Infinity, totalTvl: 0 }],
                        _a);
                    routesByLength = (_b = {},
                        _b[inputCoinAddress] = [{ route: [], minTvl: Infinity, totalTvl: 0 }],
                        _b);
                    maxSteps = 2;
                    step = 0;
                    _s.label = 2;
                case 2:
                    if (!(step < maxSteps)) return [3 /*break*/, 8];
                    _loop_1 = function (inCoin) {
                        var outCoin_1, newRoutesByTvl, newRoutesByLength, _loop_2, _t, ALL_POOLS_1, _u, poolId, poolData;
                        return __generator(this, function (_v) {
                            switch (_v.label) {
                                case 0:
                                    if (curveObj.chainId !== 42220 && [curveObj.constants.NATIVE_TOKEN.address, curveObj.constants.NATIVE_TOKEN.wrappedAddress].includes(inCoin)) { // Exclude Celo
                                        outCoin_1 = inCoin === curveObj.constants.NATIVE_TOKEN.address ? curveObj.constants.NATIVE_TOKEN.wrappedAddress : curveObj.constants.NATIVE_TOKEN.address;
                                        newRoutesByTvl = routesByTvl[inCoin].map(function (route) { return getNewRoute(route, "wrapper", curveObj.constants.NATIVE_TOKEN.wrappedAddress, inCoin, outCoin_1, 0, 0, 15, curveObj.constants.ZERO_ADDRESS, Infinity); });
                                        newRoutesByLength = routesByLength[inCoin].map(function (route) { return getNewRoute(route, "wrapper", curveObj.constants.NATIVE_TOKEN.wrappedAddress, inCoin, outCoin_1, 0, 0, 15, curveObj.constants.ZERO_ADDRESS, Infinity); });
                                        routesByTvl[outCoin_1] = __spreadArray(__spreadArray([], ((_c = routesByTvl[outCoin_1]) !== null && _c !== void 0 ? _c : []), true), newRoutesByTvl, true);
                                        routesByTvl[outCoin_1] = filterRoutes(routesByTvl[outCoin_1], inputCoinAddress, sortByTvl);
                                        routesByLength[outCoin_1] = __spreadArray(__spreadArray([], ((_d = routesByLength[outCoin_1]) !== null && _d !== void 0 ? _d : []), true), newRoutesByLength, true);
                                        routesByLength[outCoin_1] = filterRoutes(routesByLength[outCoin_1], inputCoinAddress, sortByLength);
                                        nextCoins.add(outCoin_1);
                                    }
                                    _loop_2 = function (poolId, poolData) {
                                        var wrapped_coin_addresses, underlying_coin_addresses, base_pool, meta_coin_addresses, token_address, is_aave_like_lending, tvlMultiplier, inCoinIndexes, tvl, _w, poolAddress, coin_addresses, _loop_3, j, inCoinIndex, swapType_1, newRoutesByTvl, newRoutesByLength, _loop_4, j, _loop_5, j;
                                        return __generator(this, function (_x) {
                                            switch (_x.label) {
                                                case 0:
                                                    wrapped_coin_addresses = poolData.wrapped_coin_addresses.map(function (a) { return a.toLowerCase(); });
                                                    underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
                                                    base_pool = poolData.is_meta ? __assign(__assign({}, curveObj.constants.POOLS_DATA), curveObj.constants.FACTORY_POOLS_DATA)[poolData.base_pool] : null;
                                                    meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); }) : [];
                                                    token_address = poolData.token_address.toLowerCase();
                                                    is_aave_like_lending = poolData.is_lending && wrapped_coin_addresses.length === 3 && !poolData.deposit_address;
                                                    tvlMultiplier = poolData.is_crypto ? 1 : ((_e = amplificationCoefficientDict[poolData.swap_address]) !== null && _e !== void 0 ? _e : 1);
                                                    inCoinIndexes = {
                                                        wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                                                        underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                                                        meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                                                    };
                                                    // Skip pools which don't contain inCoin
                                                    if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1 && inCoin !== token_address)
                                                        return [2 /*return*/, "continue"];
                                                    if (!poolId.startsWith('factory-crvusd-')) return [3 /*break*/, 1];
                                                    _w = 500000 * 100;
                                                    return [3 /*break*/, 3];
                                                case 1: return [4 /*yield*/, _getTVL(poolId, curveObj)];
                                                case 2:
                                                    _w = (_x.sent()) * tvlMultiplier;
                                                    _x.label = 3;
                                                case 3:
                                                    tvl = _w;
                                                    // Skip empty pools
                                                    if (tvl === 0)
                                                        return [2 /*return*/, "continue"];
                                                    poolAddress = poolData.is_fake ? poolData.deposit_address : poolData.swap_address;
                                                    coin_addresses = (is_aave_like_lending || poolData.is_fake) ? underlying_coin_addresses : wrapped_coin_addresses;
                                                    // LP -> wrapped coin (underlying for lending or fake pool) "swaps" (actually remove_liquidity_one_coin)
                                                    if (coin_addresses.length < 6 && inCoin === token_address) {
                                                        _loop_3 = function (j) {
                                                            // Looking for outputCoinAddress only on the final step
                                                            if (step === maxSteps - 1 && coin_addresses[j] !== outputCoinAddress)
                                                                return "continue";
                                                            // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                                                            var outputCoinIdx = coin_addresses.indexOf(outputCoinAddress);
                                                            if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                return "continue";
                                                            var swapType = poolData.is_crypto ? 14 : is_aave_like_lending ? 13 : 12;
                                                            var newRoutesByTvl = routesByTvl[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, coin_addresses[j], 0, j, swapType, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            var newRoutesByLength = routesByLength[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, coin_addresses[j], 0, j, swapType, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            routesByTvl[coin_addresses[j]] = __spreadArray(__spreadArray([], ((_f = routesByTvl[coin_addresses[j]]) !== null && _f !== void 0 ? _f : []), true), newRoutesByTvl, true);
                                                            routesByTvl[coin_addresses[j]] = filterRoutes(routesByTvl[coin_addresses[j]], inputCoinAddress, sortByTvl, curveObj);
                                                            routesByLength[coin_addresses[j]] = __spreadArray(__spreadArray([], ((_h = routesByLength[coin_addresses[j]]) !== null && _h !== void 0 ? _h : []), true), newRoutesByLength, true);
                                                            routesByLength[coin_addresses[j]] = filterRoutes(routesByLength[coin_addresses[j]], inputCoinAddress, sortByLength, curveObj);
                                                            nextCoins.add(coin_addresses[j]);
                                                        };
                                                        for (j = 0; j < coin_addresses.length; j++) {
                                                            _loop_3(j);
                                                        }
                                                    }
                                                    inCoinIndex = (is_aave_like_lending || poolData.is_fake) ? inCoinIndexes.underlying_coin : inCoinIndexes.wrapped_coin;
                                                    if (coin_addresses.length < 6 && inCoinIndex >= 0 && !poolData.is_llamma) {
                                                        // Looking for outputCoinAddress only on the final step
                                                        if (!(step === maxSteps - 1 && token_address !== outputCoinAddress)) {
                                                            swapType_1 = is_aave_like_lending ? 9
                                                                : coin_addresses.length === 2 ? 7
                                                                    : coin_addresses.length === 3 ? 8
                                                                        : coin_addresses.length === 4 ? 10 : 11;
                                                            newRoutesByTvl = routesByTvl[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, token_address, coin_addresses.indexOf(inCoin), 0, swapType_1, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            newRoutesByLength = routesByLength[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, token_address, coin_addresses.indexOf(inCoin), 0, swapType_1, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            routesByTvl[token_address] = __spreadArray(__spreadArray([], ((_j = routesByTvl[token_address]) !== null && _j !== void 0 ? _j : []), true), newRoutesByTvl, true);
                                                            routesByTvl[token_address] = filterRoutes(routesByTvl[token_address], inputCoinAddress, sortByTvl, curveObj);
                                                            routesByLength[token_address] = __spreadArray(__spreadArray([], ((_k = routesByLength[token_address]) !== null && _k !== void 0 ? _k : []), true), newRoutesByLength, true);
                                                            routesByLength[token_address] = filterRoutes(routesByLength[token_address], inputCoinAddress, sortByLength, curveObj);
                                                            nextCoins.add(token_address);
                                                        }
                                                    }
                                                    // Wrapped swaps
                                                    if (inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake) {
                                                        _loop_4 = function (j) {
                                                            if (j === inCoinIndexes.wrapped_coin)
                                                                return "continue";
                                                            // Native swaps spend less gas
                                                            // TODO uncomment
                                                            // if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === curveObj.constants.NATIVE_TOKEN.wrappedAddress) continue;
                                                            // Looking for outputCoinAddress only on the final step
                                                            if (step === maxSteps - 1 && wrapped_coin_addresses[j] !== outputCoinAddress)
                                                                return "continue";
                                                            // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                                                            var outputCoinIdx = wrapped_coin_addresses.indexOf(outputCoinAddress);
                                                            if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                return "continue";
                                                            var swapType = poolData.is_crypto ? 3 : 1;
                                                            var newRoutesByTvl = routesByTvl[inCoin].map(function (route) { return getNewRoute(route, poolId, poolData.swap_address, inCoin, wrapped_coin_addresses[j], inCoinIndexes.wrapped_coin, j, swapType, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            var newRoutesByLength = routesByLength[inCoin].map(function (route) { return getNewRoute(route, poolId, poolData.swap_address, inCoin, wrapped_coin_addresses[j], inCoinIndexes.wrapped_coin, j, swapType, curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            routesByTvl[wrapped_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_l = routesByTvl[wrapped_coin_addresses[j]]) !== null && _l !== void 0 ? _l : []), true), newRoutesByTvl, true);
                                                            routesByTvl[wrapped_coin_addresses[j]] = filterRoutes(routesByTvl[wrapped_coin_addresses[j]], inputCoinAddress, sortByTvl, curveObj);
                                                            routesByLength[wrapped_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_m = routesByLength[wrapped_coin_addresses[j]]) !== null && _m !== void 0 ? _m : []), true), newRoutesByLength, true);
                                                            routesByLength[wrapped_coin_addresses[j]] = filterRoutes(routesByLength[wrapped_coin_addresses[j]], inputCoinAddress, sortByLength, curveObj);
                                                            nextCoins.add(wrapped_coin_addresses[j]);
                                                        };
                                                        for (j = 0; j < wrapped_coin_addresses.length; j++) {
                                                            _loop_4(j);
                                                        }
                                                    }
                                                    // Only for underlying swaps
                                                    poolAddress = (poolData.is_crypto && poolData.is_meta) || ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ?
                                                        poolData.deposit_address : poolData.swap_address;
                                                    // Underlying swaps
                                                    if (!poolData.is_plain && inCoinIndexes.underlying_coin >= 0) {
                                                        _loop_5 = function (j) {
                                                            if (j === inCoinIndexes.underlying_coin)
                                                                return "continue";
                                                            // Don't swap metacoins since they can be swapped directly in base pool
                                                            if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j]))
                                                                return "continue";
                                                            // Looking for outputCoinAddress only on the final step
                                                            if (step === maxSteps - 1 && underlying_coin_addresses[j] !== outputCoinAddress)
                                                                return "continue";
                                                            // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                                                            var outputCoinIdx = underlying_coin_addresses.indexOf(outputCoinAddress);
                                                            if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                return "continue";
                                                            // Skip empty pools
                                                            if (tvl === 0)
                                                                return "continue";
                                                            var hasEth = (inCoin === curveObj.constants.NATIVE_TOKEN.address || underlying_coin_addresses[j] === curveObj.constants.NATIVE_TOKEN.address);
                                                            var swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                                                                : ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ? 5
                                                                    : hasEth && poolId !== 'avaxcrypto' ? 3
                                                                        : poolData.is_crypto ? 4
                                                                            : 2;
                                                            var newRoutesByTvl = routesByTvl[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, underlying_coin_addresses[j], inCoinIndexes.underlying_coin, j, swapType, (swapType === 5 || swapType === 6) ? poolData.swap_address : curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            var newRoutesByLength = routesByLength[inCoin].map(function (route) { return getNewRoute(route, poolId, poolAddress, inCoin, underlying_coin_addresses[j], inCoinIndexes.underlying_coin, j, swapType, (swapType === 5 || swapType === 6) ? poolData.swap_address : curveObj.constants.ZERO_ADDRESS, tvl); });
                                                            routesByTvl[underlying_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_o = routesByTvl[underlying_coin_addresses[j]]) !== null && _o !== void 0 ? _o : []), true), newRoutesByTvl, true);
                                                            routesByTvl[underlying_coin_addresses[j]] = filterRoutes(routesByTvl[underlying_coin_addresses[j]], inputCoinAddress, sortByTvl, curveObj);
                                                            routesByLength[underlying_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_p = routesByLength[underlying_coin_addresses[j]]) !== null && _p !== void 0 ? _p : []), true), newRoutesByLength, true);
                                                            routesByLength[underlying_coin_addresses[j]] = filterRoutes(routesByLength[underlying_coin_addresses[j]], inputCoinAddress, sortByLength, curveObj);
                                                            nextCoins.add(underlying_coin_addresses[j]);
                                                        };
                                                        for (j = 0; j < underlying_coin_addresses.length; j++) {
                                                            _loop_5(j);
                                                        }
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _t = 0, ALL_POOLS_1 = ALL_POOLS;
                                    _v.label = 1;
                                case 1:
                                    if (!(_t < ALL_POOLS_1.length)) return [3 /*break*/, 4];
                                    _u = ALL_POOLS_1[_t], poolId = _u[0], poolData = _u[1];
                                    return [5 /*yield**/, _loop_2(poolId, poolData)];
                                case 2:
                                    _v.sent();
                                    _v.label = 3;
                                case 3:
                                    _t++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, curCoins_1 = curCoins;
                    _s.label = 3;
                case 3:
                    if (!(_i < curCoins_1.length)) return [3 /*break*/, 6];
                    inCoin = curCoins_1[_i];
                    return [5 /*yield**/, _loop_1(inCoin)];
                case 4:
                    _s.sent();
                    _s.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    curCoins = Array.from(nextCoins);
                    nextCoins = new Set();
                    _s.label = 7;
                case 7:
                    step++;
                    return [3 /*break*/, 2];
                case 8:
                    routes = __spreadArray(__spreadArray([], ((_q = routesByTvl[outputCoinAddress]) !== null && _q !== void 0 ? _q : []), true), ((_r = routesByLength[outputCoinAddress]) !== null && _r !== void 0 ? _r : []), true);
                    return [2 /*return*/, routes.map(function (r) { return r.route; })];
            }
        });
    });
}, {
    promise: true,
    maxAge: 15 * 60 * 1000, // 15m
});
var _getRouteKey = function (route, inputCoinAddress, outputCoinAddress) {
    var sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
    var key = "".concat(sortedCoins[0], "-->");
    for (var _i = 0, route_1 = route; _i < route_1.length; _i++) {
        var routeStep = route_1[_i];
        key += "".concat(routeStep.poolId, "-->");
    }
    key += sortedCoins[1];
    return key;
};
var _getExchangeMultipleArgs = function (route, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    var _route = [];
    if (route.length > 0)
        _route.push(route[0].inputCoinAddress);
    var _swapParams = [];
    var _factorySwapAddresses = [];
    for (var _i = 0, route_2 = route; _i < route_2.length; _i++) {
        var routeStep = route_2[_i];
        _route.push(routeStep.poolAddress, routeStep.outputCoinAddress);
        _swapParams.push([routeStep.i, routeStep.j, routeStep.swapType]);
        _factorySwapAddresses.push(routeStep.swapAddress);
    }
    _route = _route.concat(Array(9 - _route.length).fill(curveObj.constants.ZERO_ADDRESS));
    _swapParams = _swapParams.concat(Array(4 - _swapParams.length).fill([0, 0, 0]));
    _factorySwapAddresses = _factorySwapAddresses.concat(Array(4 - _factorySwapAddresses.length).fill(curveObj.constants.ZERO_ADDRESS));
    return { _route: _route, _swapParams: _swapParams, _factorySwapAddresses: _factorySwapAddresses };
};
var _estimatedGasForDifferentRoutesCache = {};
var _estimateGasForDifferentRoutes = function (routes, inputCoinAddress, outputCoinAddress, _amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, gasPromises, value, _i, routes_1, route, routeKey, gasPromise, _a, _route, _swapParams, _factorySwapAddresses, _gasAmounts_1, err_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputCoinAddress = inputCoinAddress.toLowerCase();
                    outputCoinAddress = outputCoinAddress.toLowerCase();
                    contract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].contract;
                    gasPromises = [];
                    value = isEth(inputCoinAddress) ? _amount : curveObj.parseUnits("0");
                    for (_i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                        route = routes_1[_i];
                        routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                        gasPromise = void 0;
                        _a = _getExchangeMultipleArgs(route, curveObj), _route = _a._route, _swapParams = _a._swapParams, _factorySwapAddresses = _a._factorySwapAddresses;
                        if ((((_b = _estimatedGasForDifferentRoutesCache[routeKey]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 3600000 < Date.now()) {
                            gasPromise = contract.exchange_multiple.estimateGas(_route, _swapParams, _amount, 0, _factorySwapAddresses, __assign(__assign({}, curveObj.constantOptions), { value: value }));
                        }
                        else {
                            gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
                        }
                        gasPromises.push(gasPromise);
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(gasPromises)];
                case 2:
                    _gasAmounts_1 = _c.sent();
                    routes.forEach(function (route, i) {
                        var routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                        _estimatedGasForDifferentRoutesCache[routeKey] = { 'gas': _gasAmounts_1[i], 'time': Date.now() };
                    });
                    return [2 /*return*/, _gasAmounts_1.map(function (_g) { return Number(curveObj.formatUnits(_g, 0)); })];
                case 3:
                    err_1 = _c.sent();
                    return [2 /*return*/, routes.map(function () { return 0; })];
                case 4: return [2 /*return*/];
            }
        });
    });
};
export var getBestRoute = memoize(function (inputCoinAddress, outputCoinAddress, amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinDecimals, outputCoinDecimals, _amount, routesRaw, routes, calls, multicallContract, _i, routesRaw_1, r, _b, _route, _swapParams, _factorySwapAddresses, _outputAmounts, i, err_2, contract, _outputs, _c, routesRaw_2, r, _d, _route, _swapParams, _factorySwapAddresses, _e, _f, e_1, i, _h, gasAmounts, outputCoinUsdRate, gasData, ethUsdRate, gasPrice, expectedAmounts, expectedAmountsUsd, txCostsUsd;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _a = _getCoinDecimals(curveObj, inputCoinAddress, outputCoinAddress), inputCoinDecimals = _a[0], outputCoinDecimals = _a[1];
                    _amount = parseUnits(amount, inputCoinDecimals);
                    if (_amount === curveObj.parseUnits("0"))
                        return [2 /*return*/, []];
                    return [4 /*yield*/, findAllRoutes(inputCoinAddress, outputCoinAddress, curveObj)];
                case 1:
                    routesRaw = (_j.sent()).map(function (route) { return ({ route: route, _output: curveObj.parseUnits("0"), outputUsd: 0, txCostUsd: 0 }); });
                    routes = [];
                    _j.label = 2;
                case 2:
                    _j.trys.push([2, 4, , 11]);
                    calls = [];
                    multicallContract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].multicallContract;
                    for (_i = 0, routesRaw_1 = routesRaw; _i < routesRaw_1.length; _i++) {
                        r = routesRaw_1[_i];
                        _b = _getExchangeMultipleArgs(r.route, curveObj), _route = _b._route, _swapParams = _b._swapParams, _factorySwapAddresses = _b._factorySwapAddresses;
                        calls.push(multicallContract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses));
                    }
                    return [4 /*yield*/, curveObj.multicallProvider.all(calls)];
                case 3:
                    _outputAmounts = _j.sent();
                    for (i = 0; i < _outputAmounts.length; i++) {
                        routesRaw[i]._output = _outputAmounts[i];
                        routes.push(routesRaw[i]);
                    }
                    return [3 /*break*/, 11];
                case 4:
                    err_2 = _j.sent();
                    contract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].contract;
                    _outputs = [];
                    _c = 0, routesRaw_2 = routesRaw;
                    _j.label = 5;
                case 5:
                    if (!(_c < routesRaw_2.length)) return [3 /*break*/, 10];
                    r = routesRaw_2[_c];
                    _d = _getExchangeMultipleArgs(r.route, curveObj), _route = _d._route, _swapParams = _d._swapParams, _factorySwapAddresses = _d._factorySwapAddresses;
                    _j.label = 6;
                case 6:
                    _j.trys.push([6, 8, , 9]);
                    _f = (_e = _outputs).push;
                    return [4 /*yield*/, contract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curveObj.constantOptions)];
                case 7:
                    _f.apply(_e, [_j.sent()]);
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _j.sent();
                    _outputs.push(curveObj.parseUnits('-1', 0));
                    return [3 /*break*/, 9];
                case 9:
                    _c++;
                    return [3 /*break*/, 5];
                case 10:
                    for (i = 0; i < _outputs.length; i++) {
                        if (_outputs[i] < 0) {
                            console.log("Route ".concat((routesRaw[i].route.map(function (s) { return s.poolId; })).join(" --> "), " is unavailable"));
                            continue;
                        }
                        routesRaw[i]._output = _outputs[i];
                        routes.push(routesRaw[i]);
                    }
                    return [3 /*break*/, 11];
                case 11:
                    if (routes.length === 0)
                        return [2 /*return*/, []];
                    if (routes.length === 1)
                        return [2 /*return*/, routes[0].route];
                    return [4 /*yield*/, Promise.all([
                            _estimateGasForDifferentRoutes(routes.map(function (r) { return r.route; }), inputCoinAddress, outputCoinAddress, _amount, curveObj),
                            _getUsdRate(outputCoinAddress, curveObj),
                            axios.get("https://api.curve.fi/api/getGas"),
                            _getUsdRate(ETH_ADDRESS, curveObj),
                        ])];
                case 12:
                    _h = _j.sent(), gasAmounts = _h[0], outputCoinUsdRate = _h[1], gasData = _h[2], ethUsdRate = _h[3];
                    gasPrice = gasData.data.data.gas.standard;
                    expectedAmounts = (routes).map(function (route) { return Number(curveObj.formatUnits(route._output, outputCoinDecimals)); });
                    expectedAmountsUsd = expectedAmounts.map(function (a) { return a * outputCoinUsdRate; });
                    txCostsUsd = gasAmounts.map(function (a) { return ethUsdRate * a * gasPrice / 1e18; });
                    routes.forEach(function (route, i) {
                        route.outputUsd = expectedAmountsUsd[i];
                        route.txCostUsd = txCostsUsd[i];
                    });
                    return [2 /*return*/, routes.reduce(function (route1, route2) {
                            var diff = (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd);
                            if (diff > 0)
                                return route1;
                            if (diff === 0 && route1.route.length < route2.route.length)
                                return route1;
                            return route2;
                        }).route];
            }
        });
    });
}, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var getOutputForRoute = memoize(function (route, _amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _route, _swapParams, _factorySwapAddresses;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].contract;
                    _a = _getExchangeMultipleArgs(route), _route = _a._route, _swapParams = _a._swapParams, _factorySwapAddresses = _a._factorySwapAddresses;
                    return [4 /*yield*/, contract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curveObj.constantOptions)];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}, {
    promise: true,
    maxAge: 15 * 1000, // 15s
});
export var getBestRouteAndOutput = function (inputCoin, outputCoin, amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, route, _output;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = _getCoinAddresses(curveObj, inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _b = _getCoinDecimals(curveObj, inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                    return [4 /*yield*/, getBestRoute(inputCoinAddress, outputCoinAddress, amount, curveObj)];
                case 1:
                    route = _c.sent();
                    if (route.length === 0)
                        return [2 /*return*/, { route: route, output: '0.0' }];
                    return [4 /*yield*/, getOutputForRoute(route, parseUnits(amount, inputCoinDecimals), curveObj)];
                case 2:
                    _output = _c.sent();
                    return [2 /*return*/, { route: route, output: curveObj.formatUnits(_output, outputCoinDecimals) }];
            }
        });
    });
};
export var swapExpected = function (inputCoin, outputCoin, amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBestRouteAndOutput(inputCoin, outputCoin, amount, curveObj)];
                case 1: return [2 /*return*/, (_a.sent())['output']];
            }
        });
    });
};
export var swapPriceImpactFromRoute = function (amount, route, output, inputCoin, outputCoin, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, _amount, _output, smallAmountIntBN, amountIntBN, contract, _smallAmount, _c, _route, _swapParams, _factorySwapAddresses, _smallOutput, e_2, priceImpactBN;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = _getCoinAddresses(curveObj, inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _b = _getCoinDecimals(curveObj, inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                    _amount = parseUnits(amount, inputCoinDecimals);
                    _output = parseUnits(output, outputCoinDecimals);
                    smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                    amountIntBN = toBN(_amount, 0);
                    if (smallAmountIntBN.gte(amountIntBN))
                        return [2 /*return*/, 0];
                    contract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].contract;
                    _smallAmount = fromBN(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                    _c = _getExchangeMultipleArgs(route, curveObj), _route = _c._route, _swapParams = _c._swapParams, _factorySwapAddresses = _c._factorySwapAddresses;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, contract.get_exchange_multiple_amount(_route, _swapParams, _smallAmount, _factorySwapAddresses, curveObj.constantOptions)];
                case 2:
                    _smallOutput = _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _d.sent();
                    _smallAmount = curveObj.parseUnits("1", inputCoinDecimals); // Dirty hack
                    return [4 /*yield*/, contract.get_exchange_multiple_amount(_route, _swapParams, _smallAmount, _factorySwapAddresses, curveObj.constantOptions)];
                case 4:
                    _smallOutput = _d.sent();
                    return [3 /*break*/, 5];
                case 5:
                    priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                    return [2 /*return*/, Number(_cutZeros(priceImpactBN.toFixed(4)))];
            }
        });
    });
};
export var swapPriceImpact = function (inputCoin, outputCoin, amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, route, output;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = _getCoinAddresses(curveObj, inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    return [4 /*yield*/, getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount, curveObj)];
                case 1:
                    _b = _c.sent(), route = _b.route, output = _b.output;
                    return [4 /*yield*/, swapPriceImpactFromRoute(amount, route, output, inputCoin, outputCoin, curveObj)];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    });
};
export var swapIsApproved = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hasAllowance([inputCoin], [amount], curve.signerAddress, curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapApproveEstimateGas = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowanceEstimateGas([inputCoin], [amount], curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapApprove = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowance([inputCoin], [amount], curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapEstimateGas = function (inputCoin, outputCoin, amount, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, inputCoinDecimals, route, _amount, gas;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = _getCoinAddresses(curveObj, inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    inputCoinDecimals = _getCoinDecimals(curveObj, inputCoinAddress, outputCoinAddress)[0];
                    return [4 /*yield*/, getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount, curveObj)];
                case 1:
                    route = (_b.sent()).route;
                    if (route.length === 0)
                        return [2 /*return*/, 0];
                    _amount = parseUnits(amount, inputCoinDecimals);
                    return [4 /*yield*/, _estimateGasForDifferentRoutes([route], inputCoinAddress, outputCoinAddress, _amount, curveObj)];
                case 2:
                    gas = (_b.sent())[0];
                    return [2 /*return*/, gas];
            }
        });
    });
};
export var swap = function (inputCoin, outputCoin, amount, slippage, curveObj) {
    if (slippage === void 0) { slippage = 0.5; }
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, _c, route, output, _d, _route, _swapParams, _factorySwapAddresses, _amount, minRecvAmountBN, _minRecvAmount, contract, value, gasLimit;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = _getCoinAddresses(curveObj, inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _b = _getCoinDecimals(curveObj, inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                    return [4 /*yield*/, swapApprove(inputCoin, amount)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount, curveObj)];
                case 2:
                    _c = _e.sent(), route = _c.route, output = _c.output;
                    if (route.length === 0) {
                        throw new Error("This pair can't be exchanged");
                    }
                    _d = _getExchangeMultipleArgs(route), _route = _d._route, _swapParams = _d._swapParams, _factorySwapAddresses = _d._factorySwapAddresses;
                    _amount = parseUnits(amount, inputCoinDecimals);
                    minRecvAmountBN = BN(output).times(100 - slippage).div(100);
                    _minRecvAmount = fromBN(minRecvAmountBN, outputCoinDecimals);
                    contract = curveObj.contracts[curveObj.constants.ALIASES.registry_exchange].contract;
                    value = isEth(inputCoinAddress) ? _amount : curveObj.parseUnits("0");
                    return [4 /*yield*/, curveObj.updateFeeData()];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, contract.exchange_multiple.estimateGas(_route, _swapParams, _amount, _minRecvAmount, _factorySwapAddresses, __assign(__assign({}, curveObj.constantOptions), { value: value }))];
                case 4:
                    gasLimit = (_e.sent()) * (curveObj.chainId === 1 ? curveObj.parseUnits("130", 0) : curveObj.parseUnits("160", 0)) / curveObj.parseUnits("100", 0);
                    return [4 /*yield*/, contract.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _factorySwapAddresses, __assign(__assign({}, curveObj.options), { value: value, gasLimit: gasLimit }))];
                case 5: return [2 /*return*/, _e.sent()];
            }
        });
    });
};
export var getSwappedAmount = function (tx, outputCoin, curveObj) {
    if (curveObj === void 0) { curveObj = curve; }
    return __awaiter(void 0, void 0, void 0, function () {
        var outputCoinAddress, outputCoinDecimals, txInfo, res, i, abiCoder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputCoinAddress = _getCoinAddresses(curveObj, outputCoin)[0];
                    outputCoinDecimals = _getCoinDecimals(curveObj, outputCoinAddress)[0];
                    return [4 /*yield*/, tx.wait()];
                case 1:
                    txInfo = _a.sent();
                    if (txInfo === null)
                        return [2 /*return*/, '0.0'];
                    for (i = 1; i <= txInfo.logs.length; i++) {
                        try {
                            abiCoder = ethers.AbiCoder.defaultAbiCoder();
                            res = abiCoder.decode(['address[9]', 'uint256[3][4]', 'address[4]', 'uint256', 'uint256'], ethers.dataSlice(txInfo.logs[txInfo.logs.length - i].data, 0));
                            break;
                        }
                        catch (err) { }
                    }
                    if (res === undefined)
                        return [2 /*return*/, '0.0'];
                    return [2 /*return*/, curveObj.formatUnits(res[res.length - 1], outputCoinDecimals)];
            }
        });
    });
};
