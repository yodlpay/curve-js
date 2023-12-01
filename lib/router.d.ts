import memoize from "memoizee";
import { ethers } from "ethers";
import { IRoute } from "./interfaces";
export declare const _findRoutes: (inputCoinAddress: string, outputCoinAddress: string, curveObj?: import("./curve.js").Curve) => Promise<IRoute[]>;
export declare const _getBestRoute: ((inputCoinAddress: string, outputCoinAddress: string, amount: number | string, curveObj?: any) => Promise<IRoute>) & memoize.Memoized<(inputCoinAddress: string, outputCoinAddress: string, amount: number | string, curveObj?: any) => Promise<IRoute>>;
export declare const _getOutputForRoute: ((route: IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>) & memoize.Memoized<(route: IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>>;
export declare const getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<{
    route: IRoute;
    output: string;
}>;
export declare const getArgs: (route: IRoute) => {
    _route: string[];
    _swapParams: number[][];
    _pools: string[];
    _basePools: string[];
    _baseTokens: string[];
    _secondBasePools: string[];
    _secondBaseTokens: string[];
};
export declare const swapExpected: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<string>;
export declare const swapRequired: (inputCoin: string, outputCoin: string, outAmount: number | string, curveObj?: import("./curve.js").Curve) => Promise<string>;
export declare const swapPriceImpactFromRoute: (amount: number | string, route: IRoute, output: string, inputCoin: string, outputCoin: string, curveObj?: import("./curve.js").Curve) => Promise<number>;
export declare const swapPriceImpact: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<number>;
export declare const swapIsApproved: (inputCoin: string, amount: number | string) => Promise<boolean>;
export declare const swapApproveEstimateGas: (inputCoin: string, amount: number | string) => Promise<number | number[]>;
export declare const swapApprove: (inputCoin: string, amount: number | string) => Promise<string[]>;
export declare const swapEstimateGas: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<number | number[]>;
export declare const swap: (inputCoin: string, outputCoin: string, amount: number | string, slippage?: number, curveObj?: import("./curve.js").Curve) => Promise<ethers.ContractTransactionResponse>;
export declare const getSwappedAmount: (tx: ethers.ContractTransactionResponse, outputCoin: string, curveObj?: import("./curve.js").Curve) => Promise<string>;
