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
import { _ensureAllowance, fromBN, getEthIndex, hasAllowance, toBN, parseUnits, mulBy1_3, DIGas, smartNumber } from '../../utils.js';
function _depositWrappedCheck(amounts, estimateGas) {
    if (estimateGas === void 0) { estimateGas = false; }
    return __awaiter(this, void 0, void 0, function () {
        var balances, _a, _b, i, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (this.isFake) {
                        throw Error("depositWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                    }
                    if (amounts.length !== this.wrappedCoinAddresses.length) {
                        throw Error("".concat(this.name, " pool has ").concat(this.wrappedCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                    }
                    _b = (_a = Object).values;
                    return [4 /*yield*/, this.wallet.wrappedCoinBalances()];
                case 1:
                    balances = _b.apply(_a, [_d.sent()]);
                    for (i = 0; i < balances.length; i++) {
                        if (Number(balances[i]) < Number(amounts[i])) {
                            throw Error("Not enough ".concat(this.wrappedCoins[i], ". Actual: ").concat(balances[i], ", required: ").concat(amounts[i]));
                        }
                    }
                    _c = estimateGas;
                    if (!_c) return [3 /*break*/, 3];
                    return [4 /*yield*/, hasAllowance(this.wrappedCoinAddresses, amounts, curve.signerAddress, this.address)];
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
                case 5: return [2 /*return*/, amounts.map(function (amount, i) { return parseUnits(amount, _this.wrappedDecimals[i]); })];
            }
        });
    });
}
function _depositWrappedMinAmount(_amounts, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(this, void 0, void 0, function () {
        var _expectedLpTokenAmount, minAmountBN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this._calcLpTokenAmount(_amounts, true, false)];
                case 1:
                    _expectedLpTokenAmount = _a.sent();
                    minAmountBN = toBN(_expectedLpTokenAmount).times(100 - slippage).div(100);
                    return [2 /*return*/, fromBN(minAmountBN)];
            }
        });
    });
}
// @ts-ignore
export var depositWrapped2argsMixin = {
    // @ts-ignore
    _depositWrapped: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minMintAmount, ethIndex, value, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance(this.wrappedCoinAddresses, _amounts, this.address)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _depositWrappedMinAmount.call(this, _amounts, slippage)];
                    case 3:
                        _minMintAmount = _a.sent();
                        ethIndex = getEthIndex(this.wrappedCoinAddresses);
                        value = _amounts[ethIndex] || curve.parseUnits("0");
                        contract = curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.add_liquidity.estimateGas(_amounts, _minMintAmount, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve.options), { gasLimit: gasLimit, value: value }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    depositWrappedEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _depositWrappedCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._depositWrapped(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    depositWrapped: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _depositWrappedCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._depositWrapped(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var depositWrapped3argsMixin = {
    // @ts-ignore
    _depositWrapped: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minMintAmount, ethIndex, value, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance(this.wrappedCoinAddresses, _amounts, this.address)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _depositWrappedMinAmount.call(this, _amounts, slippage)];
                    case 3:
                        _minMintAmount = _a.sent();
                        ethIndex = getEthIndex(this.wrappedCoinAddresses);
                        value = _amounts[ethIndex] || curve.parseUnits("0");
                        contract = curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.add_liquidity.estimateGas(_amounts, _minMintAmount, false, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, false, __assign(__assign({}, curve.options), { gasLimit: gasLimit, value: value }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    depositWrappedEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _depositWrappedCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._depositWrapped(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    depositWrapped: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _depositWrappedCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._depositWrapped(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
