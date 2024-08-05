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
import { curve } from "../../curve.js";
import { _ensureAllowance, _getCoinDecimals, fromBN, hasAllowance, isEth, toBN, parseUnits, mulBy1_3, DIGas, smartNumber } from '../../utils.js';
// @ts-ignore
function _swapCheck(inputCoin, outputCoin, amount, estimateGas) {
    if (estimateGas === void 0) { estimateGas = false; }
    return __awaiter(this, void 0, void 0, function () {
        var contractAddress, i, j, inputCoinBalance, _a, _b, _c, _amount;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    contractAddress = this._swapContractAddress();
                    i = this._getCoinIdx(inputCoin);
                    j = this._getCoinIdx(outputCoin);
                    _b = (_a = Object).values;
                    return [4 /*yield*/, this.wallet.underlyingCoinBalances()];
                case 1:
                    inputCoinBalance = _b.apply(_a, [_d.sent()])[i];
                    if (Number(inputCoinBalance) < Number(amount)) {
                        throw Error("Not enough ".concat(this.underlyingCoins[i], ". Actual: ").concat(inputCoinBalance, ", required: ").concat(amount));
                    }
                    _c = estimateGas;
                    if (!_c) return [3 /*break*/, 3];
                    return [4 /*yield*/, hasAllowance([this.underlyingCoinAddresses[i]], [amount], curve.signerAddress, contractAddress)];
                case 2:
                    _c = !(_d.sent());
                    _d.label = 3;
                case 3:
                    if (_c) {
                        throw Error("Token allowance is needed to estimate gas");
                    }
                    if (!!estimateGas) return [3 /*break*/, 5];
                    return [4 /*yield*/, curve.updateFeeData()];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _amount = parseUnits(amount, this.underlyingDecimals[i]);
                    return [2 /*return*/, [i, j, _amount]];
            }
        });
    });
}
function _swapMinAmount(i, j, _amount, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(this, void 0, void 0, function () {
        var _expected, outputCoinDecimals, minAmountBN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this._swapExpected(i, j, _amount)];
                case 1:
                    _expected = _a.sent();
                    outputCoinDecimals = _getCoinDecimals(this.underlyingCoinAddresses[j])[0];
                    minAmountBN = toBN(_expected, outputCoinDecimals).times(100 - slippage).div(100);
                    return [2 /*return*/, fromBN(minAmountBN, outputCoinDecimals)];
            }
        });
    });
}
// @ts-ignore
export var swapTricrypto2Mixin = {
    // @ts-ignore
    _swap: function (i, j, _amount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, _minRecvAmount, contract, exchangeMethod, value, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.underlyingCoinAddresses[i]], [_amount], contractAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _swapMinAmount.call(this, i, j, _amount, slippage)];
                    case 3:
                        _minRecvAmount = _a.sent();
                        contract = curve.contracts[contractAddress].contract;
                        exchangeMethod = 'exchange_underlying' in contract ? 'exchange_underlying' : 'exchange';
                        value = isEth(this.underlyingCoinAddresses[i]) ? _amount : curve.parseUnits("0");
                        return [4 /*yield*/, contract[exchangeMethod].estimateGas(i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract[exchangeMethod](i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    swapEstimateGas: function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount, true)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    swap: function (inputCoin, outputCoin, amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var swapMetaFactoryMixin = {
    // @ts-ignore
    _swap: function (i, j, _amount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, _minRecvAmount, contract, exchangeMethod, value, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.underlyingCoinAddresses[i]], [_amount], contractAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _swapMinAmount.call(this, i, j, _amount, slippage)];
                    case 3:
                        _minRecvAmount = _a.sent();
                        contract = curve.contracts[contractAddress].contract;
                        exchangeMethod = 'exchange_underlying' in contract ? 'exchange_underlying' : 'exchange';
                        value = isEth(this.underlyingCoinAddresses[i]) ? _amount : curve.parseUnits("0");
                        return [4 /*yield*/, contract[exchangeMethod].estimateGas(this.address, i, j, _amount, _minRecvAmount, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = DIGas(gas) * curve.parseUnits("140", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, contract[exchangeMethod](this.address, i, j, _amount, _minRecvAmount, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    swapEstimateGas: function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount, true)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    swap: function (inputCoin, outputCoin, amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var swapCryptoMetaFactoryMixin = {
    // @ts-ignore
    _swap: function (i, j, _amount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, _minRecvAmount, contract, exchangeMethod, value, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.underlyingCoinAddresses[i]], [_amount], contractAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _swapMinAmount.call(this, i, j, _amount, slippage)];
                    case 3:
                        _minRecvAmount = _a.sent();
                        contract = curve.contracts[contractAddress].contract;
                        exchangeMethod = 'exchange_underlying' in contract ? 'exchange_underlying' : 'exchange';
                        value = isEth(this.underlyingCoinAddresses[i]) ? _amount : curve.parseUnits("0");
                        return [4 /*yield*/, contract[exchangeMethod].estimateGas(this.address, i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = DIGas(gas) * curve.parseUnits("140", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, contract[exchangeMethod](this.address, i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    swapEstimateGas: function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount, true)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    swap: function (inputCoin, outputCoin, amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var swapMixin = {
    // @ts-ignore
    _swap: function (i, j, _amount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, _minRecvAmount, contract, exchangeMethod, value, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.underlyingCoinAddresses[i]], [_amount], contractAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _swapMinAmount.call(this, i, j, _amount, slippage)];
                    case 3:
                        _minRecvAmount = _a.sent();
                        contract = curve.contracts[contractAddress].contract;
                        exchangeMethod = 'exchange_underlying' in contract ? 'exchange_underlying' : 'exchange';
                        value = isEth(this.underlyingCoinAddresses[i]) ? _amount : curve.parseUnits("0");
                        return [4 /*yield*/, contract[exchangeMethod].estimateGas(i, j, _amount, _minRecvAmount, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 5:
                        _a.sent();
                        gasLimit = curve.chainId === 137 && this.id === 'ren' ? DIGas(gas) * curve.parseUnits("160", 0) / curve.parseUnits("100", 0) : mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract[exchangeMethod](i, j, _amount, _minRecvAmount, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                    case 6: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    swapEstimateGas: function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount, true)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    swap: function (inputCoin, outputCoin, amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, j, _amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _swapCheck.call(this, inputCoin, outputCoin, amount)];
                    case 1:
                        _a = _b.sent(), i = _a[0], j = _a[1], _amount = _a[2];
                        return [4 /*yield*/, this._swap(i, j, _amount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
