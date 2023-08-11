import memoize from "memoizee";
import { ethers } from "ethers";
import { IRoute } from "./interfaces";
export declare const findAllRoutes: ((inputCoinAddress: string, outputCoinAddress: string, curveObj?: any) => Promise<IRoute[]>) & memoize.Memoized<(inputCoinAddress: string, outputCoinAddress: string, curveObj?: any) => Promise<IRoute[]>>;
export declare const getBestRoute: ((inputCoinAddress: string, outputCoinAddress: string, amount: number | string, curveObj?: any) => Promise<IRoute>) & memoize.Memoized<(inputCoinAddress: string, outputCoinAddress: string, amount: number | string, curveObj?: any) => Promise<IRoute>>;
export declare const getOutputForRoute: ((route: IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>) & memoize.Memoized<(route: IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>>;
export declare const getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<{
    route: IRoute;
    output: string;
}>;
export declare const swapExpected: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<string>;
export declare const swapPriceImpact: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<number>;
export declare const swapIsApproved: (inputCoin: string, amount: number | string) => Promise<boolean>;
export declare const swapApproveEstimateGas: (inputCoin: string, amount: number | string) => Promise<number>;
export declare const swapApprove: (inputCoin: string, amount: number | string) => Promise<string[]>;
export declare const swapEstimateGas: (inputCoin: string, outputCoin: string, amount: number | string, curveObj?: import("./curve.js").Curve) => Promise<number>;
export declare const swap: (inputCoin: string, outputCoin: string, amount: number | string, slippage?: number, curveObj?: import("./curve.js").Curve) => Promise<ethers.ContractTransactionResponse>;
export declare const getSwappedAmount: (tx: ethers.ContractTransactionResponse, outputCoin: string, curveObj?: import("./curve.js").Curve) => Promise<string>;
