import { curve } from "../curve.js";
export var lowerCasePoolDataAddresses = function (poolsData) {
    for (var poolId in poolsData) {
        if (!Object.prototype.hasOwnProperty.call(poolsData, poolId))
            continue;
        var poolData = poolsData[poolId];
        poolData.swap_address = poolData.swap_address.toLowerCase();
        poolData.token_address = poolData.token_address.toLowerCase();
        poolData.gauge_address = poolData.gauge_address.toLowerCase();
        if (poolData.deposit_address)
            poolData.deposit_address = poolData.deposit_address.toLowerCase();
        if (poolData.sCurveRewards_address)
            poolData.sCurveRewards_address = poolData.sCurveRewards_address.toLowerCase();
        if (poolData.reward_contract)
            poolData.reward_contract = poolData.reward_contract.toLowerCase();
        poolData.underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
        poolData.wrapped_coin_addresses = poolData.wrapped_coin_addresses.map(function (a) { return a.toLowerCase(); });
    }
    return poolsData;
};
export var extractDecimals = function (poolsData) {
    var DECIMALS = {};
    for (var poolId in poolsData) {
        if (!Object.prototype.hasOwnProperty.call(poolsData, poolId))
            continue;
        var poolData = poolsData[poolId];
        // LP token
        DECIMALS[poolData.token_address] = 18;
        // Underlying coins
        for (var i = 0; i < poolData.underlying_coin_addresses.length; i++) {
            DECIMALS[poolData.underlying_coin_addresses[i]] = poolData.underlying_decimals[i];
        }
        // Wrapped coins
        for (var i = 0; i < poolData.wrapped_coin_addresses.length; i++) {
            DECIMALS[poolData.wrapped_coin_addresses[i]] = poolData.wrapped_decimals[i];
        }
    }
    return DECIMALS;
};
export var extractGauges = function (poolsData) {
    var GAUGES = [];
    for (var _i = 0, _a = Object.values(poolsData); _i < _a.length; _i++) {
        var poolData = _a[_i];
        if (poolData.gauge_address === curve.constants.ZERO_ADDRESS)
            continue;
        GAUGES.push(poolData.gauge_address);
    }
    return GAUGES;
};
export var lowerCaseValues = function (dict) {
    // @ts-ignore
    return Object.fromEntries(Object.entries(dict).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
};
export var lowerCaseKeys = function (dict) {
    // @ts-ignore
    return Object.fromEntries(Object.entries(dict).map(function (entry) { return [entry[0].toLowerCase(), entry[1]]; }));
};
