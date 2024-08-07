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
import { getPool } from "./poolConstructor.js";
import { curve } from "../curve.js";
import { _getRewardsFromApi, _getUsdRate, _setContracts, toBN } from "../utils.js";
import { _getAllPoolsFromApi } from "../external-api.js";
import ERC20Abi from "../constants/abis/ERC20.json" assert { type: 'json' };
// _userLpBalance: { address: { poolId: { _lpBalance: 0, time: 0 } } }
var _userLpBalanceCache = {};
var _isUserLpBalanceCacheExpired = function (address, poolId) { var _a, _b; return (((_b = (_a = _userLpBalanceCache[address]) === null || _a === void 0 ? void 0 : _a[poolId]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 600000 < Date.now(); };
var _getUserLpBalances = function (pools, address, useCache) { return __awaiter(void 0, void 0, void 0, function () {
    var poolsToFetch, calls, _i, poolsToFetch_1, poolId, pool, _rawBalances, _a, poolsToFetch_2, poolId, pool, _balance, _lpBalances, _b, pools_1, poolId;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                poolsToFetch = useCache ? pools.filter(function (poolId) { return _isUserLpBalanceCacheExpired(address, poolId); }) : pools;
                if (!(poolsToFetch.length > 0)) return [3 /*break*/, 2];
                calls = [];
                for (_i = 0, poolsToFetch_1 = poolsToFetch; _i < poolsToFetch_1.length; _i++) {
                    poolId = poolsToFetch_1[_i];
                    pool = getPool(poolId);
                    calls.push(curve.contracts[pool.lpToken].multicallContract.balanceOf(address));
                    if (pool.gauge.address !== curve.constants.ZERO_ADDRESS)
                        calls.push(curve.contracts[pool.gauge.address].multicallContract.balanceOf(address));
                }
                return [4 /*yield*/, curve.multicallProvider.all(calls)];
            case 1:
                _rawBalances = _d.sent();
                for (_a = 0, poolsToFetch_2 = poolsToFetch; _a < poolsToFetch_2.length; _a++) {
                    poolId = poolsToFetch_2[_a];
                    pool = getPool(poolId);
                    _balance = _rawBalances.shift();
                    if (pool.gauge.address !== curve.constants.ZERO_ADDRESS)
                        _balance = _balance + _rawBalances.shift();
                    if (!_userLpBalanceCache[address])
                        _userLpBalanceCache[address] = {};
                    _userLpBalanceCache[address][poolId] = { '_lpBalance': _balance, 'time': Date.now() };
                }
                _d.label = 2;
            case 2:
                _lpBalances = [];
                for (_b = 0, pools_1 = pools; _b < pools_1.length; _b++) {
                    poolId = pools_1[_b];
                    _lpBalances.push((_c = _userLpBalanceCache[address]) === null || _c === void 0 ? void 0 : _c[poolId]._lpBalance);
                }
                return [2 /*return*/, _lpBalances];
        }
    });
}); };
export var getUserPoolListByLiquidity = function (address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pools, _lpBalances, userPoolList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pools = curve.getPoolList();
                    return [4 /*yield*/, _getUserLpBalances(pools, address, false)];
                case 1:
                    _lpBalances = _a.sent();
                    userPoolList = [];
                    for (i = 0; i < pools.length; i++) {
                        if (_lpBalances[i] > 0) {
                            userPoolList.push(pools[i]);
                        }
                    }
                    return [2 /*return*/, userPoolList];
            }
        });
    });
};
export var getUserLiquidityUSD = function (pools, address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _lpBalances, userLiquidityUSD, i, pool, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _getUserLpBalances(pools, address, true)];
                case 1:
                    _lpBalances = _a.sent();
                    userLiquidityUSD = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < pools.length)) return [3 /*break*/, 5];
                    pool = getPool(pools[i]);
                    return [4 /*yield*/, _getUsdRate(pool.lpToken)];
                case 3:
                    price = _a.sent();
                    userLiquidityUSD.push(toBN(_lpBalances[i]).times(price).toFixed(8));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, userLiquidityUSD];
            }
        });
    });
};
// _userClaimable: { address: { poolId: { rewards: [ { token: '0x111...', 'symbol': 'TST', '', 'amount': 0 } ], time: 0 } }
var _userClaimableCache = {};
var _isUserClaimableCacheExpired = function (address, poolId) { var _a, _b; return (((_b = (_a = _userClaimableCache[address]) === null || _a === void 0 ? void 0 : _a[poolId]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 600000 < Date.now(); };
var _getUserClaimable = function (pools, address, useCache) { return __awaiter(void 0, void 0, void 0, function () {
    var poolsToFetch, hasCrvReward, _i, poolsToFetch_3, poolId, pool, gaugeContract, rewardCount, _a, poolsToFetch_4, poolId, pool, gaugeContract, rewardTokenCalls, i, pool, count, gaugeContract, rewardContract, rewardMulticallContract, method, rawRewardTokens, rewardTokens, i, j, rewardAddress, rewardInfoCalls, i, poolId, pool, gaugeContract, gaugeMulticallContract, _b, _c, token, tokenMulticallContract, rawRewardInfo, i, poolId, pool, gaugeContract, token, symbol, decimals, _amount, amount, _d, _e, token, symbol, decimals, _amount, _claimedAmount, amount, _claimable, _f, pools_2, poolId;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                poolsToFetch = useCache ? pools.filter(function (poolId) { return _isUserClaimableCacheExpired(address, poolId); }) : pools;
                if (!(poolsToFetch.length > 0)) return [3 /*break*/, 3];
                hasCrvReward = [];
                for (_i = 0, poolsToFetch_3 = poolsToFetch; _i < poolsToFetch_3.length; _i++) {
                    poolId = poolsToFetch_3[_i];
                    pool = getPool(poolId);
                    if (curve.chainId === 324 || curve.chainId === 2222 || pool.gauge.address === curve.constants.ZERO_ADDRESS) { // TODO remove this for ZkSync and Kava
                        hasCrvReward.push(false);
                        continue;
                    }
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    hasCrvReward.push('inflation_rate()' in gaugeContract || 'inflation_rate(uint256)' in gaugeContract);
                }
                rewardCount = [];
                for (_a = 0, poolsToFetch_4 = poolsToFetch; _a < poolsToFetch_4.length; _a++) {
                    poolId = poolsToFetch_4[_a];
                    pool = getPool(poolId);
                    if (pool.gauge.address === curve.constants.ZERO_ADDRESS) {
                        rewardCount.push(0);
                        continue;
                    }
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    if ("reward_tokens(uint256)" in gaugeContract) { // gauge_v2, gauge_v3, gauge_v4, gauge_v5, gauge_factory, gauge_rewards_only, gauge_child
                        rewardCount.push(8);
                    }
                    else if ('claimable_reward(address)' in gaugeContract) { // gauge_synthetix
                        rewardCount.push(-1);
                    }
                    else { // gauge
                        rewardCount.push(0);
                    }
                }
                rewardTokenCalls = [];
                for (i = 0; i < poolsToFetch.length; i++) {
                    pool = getPool(poolsToFetch[i]);
                    if (rewardCount[i] !== -1) { // no_gauge, gauge, gauge_v2, gauge_v3, gauge_v4, gauge_v5, gauge_factory, gauge_rewards_only, gauge_child
                        for (count = 0; count < rewardCount[i]; count++) {
                            gaugeContract = curve.contracts[pool.gauge.address].multicallContract;
                            rewardTokenCalls.push(gaugeContract.reward_tokens(count));
                        }
                    }
                    else { // gauge_synthetix
                        rewardCount[i] = 1;
                        rewardContract = curve.contracts[pool.sRewardContract].contract;
                        rewardMulticallContract = curve.contracts[pool.sRewardContract].multicallContract;
                        method = "snx()" in rewardContract ? "snx" : "rewardsToken" // susd, tbtc : dusd, musd, rsv, sbtc
                        ;
                        rewardTokenCalls.push(rewardMulticallContract[method]());
                    }
                }
                return [4 /*yield*/, curve.multicallProvider.all(rewardTokenCalls)];
            case 1:
                rawRewardTokens = (_h.sent()).map(function (t) { return t.toLowerCase(); });
                rewardTokens = {};
                for (i = 0; i < poolsToFetch.length; i++) {
                    rewardTokens[poolsToFetch[i]] = [];
                    for (j = 0; j < rewardCount[i]; j++) {
                        rewardAddress = rawRewardTokens.shift();
                        if (rewardAddress === curve.constants.ZERO_ADDRESS)
                            continue;
                        if (curve.chainId !== 1 && rewardAddress === curve.constants.COINS.crv)
                            continue;
                        // REYIELD shitcoin which breaks things, because symbol() throws an error
                        if (rewardAddress === "0xf228ec3476318aCB4E719D2b290bb2ef8B34DFfA".toLowerCase())
                            continue;
                        rewardTokens[poolsToFetch[i]].push(rewardAddress);
                    }
                }
                rewardInfoCalls = [];
                for (i = 0; i < poolsToFetch.length; i++) {
                    poolId = poolsToFetch[i];
                    pool = getPool(poolId);
                    if (pool.gauge.address === curve.constants.ZERO_ADDRESS)
                        continue;
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    gaugeMulticallContract = curve.contracts[pool.gauge.address].multicallContract;
                    if (hasCrvReward[i]) {
                        rewardInfoCalls.push(gaugeMulticallContract.claimable_tokens(address));
                    }
                    for (_b = 0, _c = rewardTokens[poolId]; _b < _c.length; _b++) {
                        token = _c[_b];
                        _setContracts(token, ERC20Abi);
                        tokenMulticallContract = curve.contracts[token].multicallContract;
                        rewardInfoCalls.push(tokenMulticallContract.symbol(), tokenMulticallContract.decimals());
                        if ('claimable_reward(address,address)' in gaugeContract) {
                            rewardInfoCalls.push(gaugeMulticallContract.claimable_reward(address, token));
                        }
                        else if ('claimable_reward(address)' in gaugeContract) { // Synthetix Gauge
                            rewardInfoCalls.push(gaugeMulticallContract.claimable_reward(address), gaugeMulticallContract.claimed_rewards_for(address));
                        }
                    }
                }
                return [4 /*yield*/, curve.multicallProvider.all(rewardInfoCalls)];
            case 2:
                rawRewardInfo = _h.sent();
                for (i = 0; i < poolsToFetch.length; i++) {
                    poolId = poolsToFetch[i];
                    pool = getPool(poolId);
                    if (!_userClaimableCache[address])
                        _userClaimableCache[address] = {};
                    _userClaimableCache[address][poolId] = { rewards: [], time: Date.now() };
                    if (pool.gauge.address === curve.constants.ZERO_ADDRESS)
                        continue;
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    if (hasCrvReward[i]) {
                        token = curve.constants.ALIASES.crv;
                        symbol = 'CRV';
                        decimals = 18;
                        _amount = rawRewardInfo.shift();
                        amount = curve.formatUnits(_amount, decimals);
                        if (Number(amount) > 0)
                            _userClaimableCache[address][poolId].rewards.push({ token: token, symbol: symbol, amount: amount });
                    }
                    for (_d = 0, _e = rewardTokens[poolId]; _d < _e.length; _d++) {
                        token = _e[_d];
                        symbol = rawRewardInfo.shift();
                        decimals = rawRewardInfo.shift();
                        _amount = rawRewardInfo.shift();
                        if ('claimable_reward(address)' in gaugeContract) {
                            _claimedAmount = rawRewardInfo.shift();
                            _amount = _amount - _claimedAmount;
                        }
                        amount = curve.formatUnits(_amount, decimals);
                        if (Number(amount) > 0)
                            _userClaimableCache[address][poolId].rewards.push({ token: token, symbol: symbol, amount: amount });
                    }
                }
                _h.label = 3;
            case 3:
                _claimable = [];
                for (_f = 0, pools_2 = pools; _f < pools_2.length; _f++) {
                    poolId = pools_2[_f];
                    _claimable.push((_g = _userClaimableCache[address]) === null || _g === void 0 ? void 0 : _g[poolId].rewards);
                }
                return [2 /*return*/, _claimable];
        }
    });
}); };
var _getUserClaimableUseApi = function (pools, address, useCache) { return __awaiter(void 0, void 0, void 0, function () {
    var poolsToFetch, hasCrvReward, _i, poolsToFetch_5, poolId, pool, gaugeContract, rewardTokens, i, pool, rewards, rewardInfoCalls, i, poolId, pool, gaugeContract, gaugeMulticallContract, _a, _b, r, rawRewardInfo, i, poolId, pool, gaugeContract, token, symbol, decimals, _amount, amount, _c, _d, r, _amount, _claimedAmount, amount, _claimable, _e, pools_3, poolId;
    var _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                poolsToFetch = useCache ? pools.filter(function (poolId) { return _isUserClaimableCacheExpired(address, poolId); }) : pools;
                if (!(poolsToFetch.length > 0)) return [3 /*break*/, 6];
                hasCrvReward = [];
                for (_i = 0, poolsToFetch_5 = poolsToFetch; _i < poolsToFetch_5.length; _i++) {
                    poolId = poolsToFetch_5[_i];
                    pool = getPool(poolId);
                    if (curve.chainId === 324 || curve.chainId === 2222 || pool.gauge.address === curve.constants.ZERO_ADDRESS) { // TODO remove this for ZkSync and Kava
                        hasCrvReward.push(false);
                        continue;
                    }
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    hasCrvReward.push('inflation_rate()' in gaugeContract || 'inflation_rate(uint256)' in gaugeContract);
                }
                rewardTokens = {};
                i = 0;
                _h.label = 1;
            case 1:
                if (!(i < poolsToFetch.length)) return [3 /*break*/, 4];
                pool = getPool(poolsToFetch[i]);
                return [4 /*yield*/, _getRewardsFromApi()];
            case 2:
                rewards = _h.sent();
                rewardTokens[poolsToFetch[i]] = ((_f = rewards[pool.gauge.address]) !== null && _f !== void 0 ? _f : [])
                    .map(function (r) { return ({ token: r.tokenAddress, symbol: r.symbol, decimals: Number(r.decimals) }); });
                _h.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                rewardInfoCalls = [];
                for (i = 0; i < poolsToFetch.length; i++) {
                    poolId = poolsToFetch[i];
                    pool = getPool(poolId);
                    if (pool.gauge.address === curve.constants.ZERO_ADDRESS)
                        continue;
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    gaugeMulticallContract = curve.contracts[pool.gauge.address].multicallContract;
                    if (hasCrvReward[i]) {
                        rewardInfoCalls.push(gaugeMulticallContract.claimable_tokens(address));
                    }
                    for (_a = 0, _b = rewardTokens[poolId]; _a < _b.length; _a++) {
                        r = _b[_a];
                        _setContracts(r.token, ERC20Abi);
                        if ('claimable_reward(address,address)' in gaugeContract) {
                            rewardInfoCalls.push(gaugeMulticallContract.claimable_reward(address, r.token));
                        }
                        else if ('claimable_reward(address)' in gaugeContract) { // Synthetix Gauge
                            rewardInfoCalls.push(gaugeMulticallContract.claimable_reward(address), gaugeMulticallContract.claimed_rewards_for(address));
                        }
                    }
                }
                return [4 /*yield*/, curve.multicallProvider.all(rewardInfoCalls)];
            case 5:
                rawRewardInfo = _h.sent();
                for (i = 0; i < poolsToFetch.length; i++) {
                    poolId = poolsToFetch[i];
                    pool = getPool(poolId);
                    if (!_userClaimableCache[address])
                        _userClaimableCache[address] = {};
                    _userClaimableCache[address][poolId] = { rewards: [], time: Date.now() };
                    if (pool.gauge.address === curve.constants.ZERO_ADDRESS)
                        continue;
                    gaugeContract = curve.contracts[pool.gauge.address].contract;
                    if (hasCrvReward[i]) {
                        token = curve.constants.ALIASES.crv;
                        symbol = 'CRV';
                        decimals = 18;
                        _amount = rawRewardInfo.shift();
                        amount = curve.formatUnits(_amount, decimals);
                        if (Number(amount) > 0)
                            _userClaimableCache[address][poolId].rewards.push({ token: token, symbol: symbol, amount: amount });
                    }
                    for (_c = 0, _d = rewardTokens[poolId]; _c < _d.length; _c++) {
                        r = _d[_c];
                        _amount = rawRewardInfo.shift();
                        if ('claimable_reward(address)' in gaugeContract) {
                            _claimedAmount = rawRewardInfo.shift();
                            _amount = _amount - _claimedAmount;
                        }
                        amount = curve.formatUnits(_amount, r.decimals);
                        if (Number(amount) > 0)
                            _userClaimableCache[address][poolId].rewards.push({ token: r.token, symbol: r.symbol, amount: amount });
                    }
                }
                _h.label = 6;
            case 6:
                _claimable = [];
                for (_e = 0, pools_3 = pools; _e < pools_3.length; _e++) {
                    poolId = pools_3[_e];
                    _claimable.push((_g = _userClaimableCache[address]) === null || _g === void 0 ? void 0 : _g[poolId].rewards);
                }
                return [2 /*return*/, _claimable];
        }
    });
}); };
export var getUserPoolListByClaimable = function (address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pools, _claimable, userPoolList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pools = curve.getPoolList();
                    return [4 /*yield*/, _getUserClaimable(pools, address, false)];
                case 1:
                    _claimable = _a.sent();
                    userPoolList = [];
                    for (i = 0; i < pools.length; i++) {
                        if (_claimable[i].length > 0) {
                            userPoolList.push(pools[i]);
                        }
                    }
                    return [2 /*return*/, userPoolList];
            }
        });
    });
};
export var getUserClaimable = function (pools, address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _claimable, claimableWithPrice, i, _i, _a, c, price;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _getUserClaimable(pools, address, true)];
                case 1:
                    _claimable = _b.sent();
                    claimableWithPrice = [];
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < pools.length)) return [3 /*break*/, 7];
                    claimableWithPrice.push([]);
                    _i = 0, _a = _claimable[i];
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    c = _a[_i];
                    return [4 /*yield*/, _getUsdRate(c.token)];
                case 4:
                    price = _b.sent();
                    claimableWithPrice[claimableWithPrice.length - 1].push(__assign(__assign({}, c), { price: price }));
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, claimableWithPrice];
            }
        });
    });
};
export var getUserPoolList = function (address, useApi) {
    if (address === void 0) { address = curve.signerAddress; }
    if (useApi === void 0) { useApi = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pools, _a, _lpBalances, _claimable, userPoolList, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pools = curve.getPoolList();
                    return [4 /*yield*/, Promise.all([
                            _getUserLpBalances(pools, address, false),
                            useApi ? _getUserClaimableUseApi(pools, address, false) : _getUserClaimable(pools, address, false),
                        ])];
                case 1:
                    _a = _b.sent(), _lpBalances = _a[0], _claimable = _a[1];
                    userPoolList = [];
                    for (i = 0; i < pools.length; i++) {
                        if (_lpBalances[i] > 0 || _claimable[i].length > 0) {
                            userPoolList.push(pools[i]);
                        }
                    }
                    return [2 /*return*/, userPoolList];
            }
        });
    });
};
export var _getAmplificationCoefficientsFromApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var network, allTypesExtendedPoolData, amplificationCoefficientDict, _i, allTypesExtendedPoolData_1, extendedPoolData, _a, _b, pool;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                network = curve.constants.NETWORK_NAME;
                return [4 /*yield*/, _getAllPoolsFromApi(network)];
            case 1:
                allTypesExtendedPoolData = _c.sent();
                amplificationCoefficientDict = {};
                for (_i = 0, allTypesExtendedPoolData_1 = allTypesExtendedPoolData; _i < allTypesExtendedPoolData_1.length; _i++) {
                    extendedPoolData = allTypesExtendedPoolData_1[_i];
                    for (_a = 0, _b = extendedPoolData.poolData; _a < _b.length; _a++) {
                        pool = _b[_a];
                        amplificationCoefficientDict[pool.address.toLowerCase()] = Number(pool.amplificationCoefficient);
                    }
                }
                return [2 /*return*/, amplificationCoefficientDict];
        }
    });
}); };
