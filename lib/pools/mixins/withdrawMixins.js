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
import { curve } from "../../curve.js";
import { _ensureAllowance, fromBN, hasAllowance, toBN, parseUnits, mulBy1_3, smartNumber, DIGas } from '../../utils.js';
// @ts-ignore
function _withdrawCheck(lpTokenAmount, estimateGas) {
    if (estimateGas === void 0) { estimateGas = false; }
    return __awaiter(this, void 0, void 0, function () {
        var lpTokenBalance, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, this.wallet.lpTokenBalances()];
                case 1:
                    lpTokenBalance = (_c.sent())['lpToken'];
                    if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                        throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                    }
                    _b = estimateGas && this.zap;
                    if (!_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, hasAllowance([this.lpToken], [lpTokenAmount], curve.signerAddress, this.zap)];
                case 2:
                    _b = !(_c.sent());
                    _c.label = 3;
                case 3:
                    if (_b) {
                        throw Error("Token allowance is needed to estimate gas");
                    }
                    if (!!estimateGas) return [3 /*break*/, 5];
                    return [4 /*yield*/, curve.updateFeeData()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/, parseUnits(lpTokenAmount)];
            }
        });
    });
}
function _withdrawMinAmounts(_lpTokenAmount, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(this, void 0, void 0, function () {
        var expectedAmounts, _expectedAmounts, minRecvAmountsBN;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.withdrawExpected(curve.formatUnits(_lpTokenAmount))];
                case 1:
                    expectedAmounts = _b.sent();
                    _expectedAmounts = expectedAmounts.map(function (a, i) { return curve.parseUnits(a, _this.underlyingDecimals[i]); });
                    minRecvAmountsBN = _expectedAmounts.map(function (_a, i) { return toBN(_a, _this.underlyingDecimals[i]).times(100 - slippage).div(100); });
                    return [2 /*return*/, minRecvAmountsBN.map(function (a, i) { return fromBN(a, _this.underlyingDecimals[i]); })];
            }
        });
    });
}
// @ts-ignore
export var withdrawMetaFactoryMixin = {
    // @ts-ignore
    _withdraw: function (_lpTokenAmount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minAmounts, contract, gas, gasLimit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.lpToken], [_lpTokenAmount], this.zap)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, _withdrawMinAmounts.call(this, _lpTokenAmount, slippage)];
                    case 3:
                        _minAmounts = _b.sent();
                        contract = curve.contracts[this.zap].contract;
                        return [4 /*yield*/, contract.remove_liquidity.estimateGas(this.address, _lpTokenAmount, _minAmounts, curve.constantOptions)];
                    case 4:
                        gas = _b.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.remove_liquidity(this.address, _lpTokenAmount, _minAmounts, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_b.sent()).hash];
                }
            });
        });
    },
    withdrawEstimateGas: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount, true)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    withdraw: function (lpTokenAmount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var withdrawCryptoMetaFactoryMixin = {
    // @ts-ignore
    _withdraw: function (_lpTokenAmount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minAmounts, contract, gas, gasLimit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.lpToken], [_lpTokenAmount], this.zap)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, _withdrawMinAmounts.call(this, _lpTokenAmount, slippage)];
                    case 3:
                        _minAmounts = _b.sent();
                        contract = curve.contracts[this.zap].contract;
                        return [4 /*yield*/, contract.remove_liquidity.estimateGas(this.address, _lpTokenAmount, _minAmounts, true, curve.constantOptions)];
                    case 4:
                        gas = _b.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.remove_liquidity(this.address, _lpTokenAmount, _minAmounts, true, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_b.sent()).hash];
                }
            });
        });
    },
    withdrawEstimateGas: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount, true)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    withdraw: function (lpTokenAmount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var withdrawZapMixin = {
    // @ts-ignore
    _withdraw: function (_lpTokenAmount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minAmounts, contract, args, gas, gasLimit;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, _ensureAllowance([this.lpToken], [_lpTokenAmount], this.zap)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2: return [4 /*yield*/, _withdrawMinAmounts.call(this, _lpTokenAmount, slippage)];
                    case 3:
                        _minAmounts = _c.sent();
                        contract = curve.contracts[this.zap].contract;
                        args = [_lpTokenAmount, _minAmounts];
                        if ("remove_liquidity(uint256,uint256[".concat(this.underlyingCoinAddresses.length, "],bool)") in contract)
                            args.push(true);
                        return [4 /*yield*/, (_b = contract.remove_liquidity).estimateGas.apply(_b, __spreadArray(__spreadArray([], args, false), [curve.constantOptions], false))];
                    case 4:
                        gas = _c.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.remove_liquidity.apply(contract, __spreadArray(__spreadArray([], args, false), [__assign(__assign({}, curve.options), { gasLimit: gasLimit })], false))];
                    case 5: return [2 /*return*/, (_c.sent()).hash];
                }
            });
        });
    },
    withdrawEstimateGas: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount, true)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    withdraw: function (lpTokenAmount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var withdrawLendingOrCryptoMixin = {
    // @ts-ignore
    _withdraw: function (_lpTokenAmount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minAmounts, contract, gas, gasLimit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawMinAmounts.call(this, _lpTokenAmount, slippage)];
                    case 1:
                        _minAmounts = _b.sent();
                        contract = curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.remove_liquidity.estimateGas(_lpTokenAmount, _minAmounts, true, curve.constantOptions)];
                    case 2:
                        gas = _b.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, true, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_b.sent()).hash];
                }
            });
        });
    },
    withdrawEstimateGas: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount, true)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    withdraw: function (lpTokenAmount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
// @ts-ignore
export var withdrawPlainMixin = {
    // @ts-ignore
    _withdraw: function (_lpTokenAmount, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _minAmounts, contract, gas, gasLimit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawMinAmounts.call(this, _lpTokenAmount, slippage)];
                    case 1:
                        _minAmounts = _b.sent();
                        contract = curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.remove_liquidity.estimateGas(_lpTokenAmount, _minAmounts, curve.constantOptions)];
                    case 2:
                        gas = _b.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_b.sent()).hash];
                }
            });
        });
    },
    withdrawEstimateGas: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount, true)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    withdraw: function (lpTokenAmount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _withdrawCheck.call(this, lpTokenAmount)];
                    case 1:
                        _lpTokenAmount = _b.sent();
                        return [4 /*yield*/, this._withdraw(_lpTokenAmount, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
