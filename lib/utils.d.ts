import { BrowserProvider, Contract, JsonRpcProvider, Signer } from 'ethers';
import { Contract as MulticallContract } from "@curvefi/ethcall";
import BigNumber from 'bignumber.js';
import { IBasePoolShortItem, IChainId, IDict, INetworkName, IRewardFromApi, IVolumeAndAPYs, REFERENCE_ASSET } from './interfaces';
export declare const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export declare const MAX_ALLOWANCE: bigint;
export declare const _cutZeros: (strn: string) => string;
export declare const checkNumber: (n: number | string) => number | string;
export declare const formatNumber: (n: number | string, decimals?: number) => string;
export declare const parseUnits: (n: number | string, decimals?: number) => bigint;
export declare const BN: (val: number | string) => BigNumber;
export declare const toBN: (n: bigint, decimals?: number) => BigNumber;
export declare const toStringFromBN: (bn: BigNumber, decimals?: number) => string;
export declare const fromBN: (bn: BigNumber, decimals?: number) => bigint;
export declare const isEth: (address: string) => boolean;
export declare const getEthIndex: (addresses: string[]) => number;
export declare const mulBy1_3: (n: bigint) => bigint;
export declare const smartNumber: (abstractNumber: bigint | bigint[]) => number | number[];
export declare const DIGas: (gas: bigint | Array<bigint>) => bigint;
export declare const getGasFromArray: (gas: number[]) => number | number[];
export declare const gasSum: (gas: number[], currentGas: number | number[]) => number[];
export declare const _getCoinAddressesNoCheck: (...coins: string[] | string[][]) => string[];
export declare const _getCoinAddresses: (...coins: string[] | string[][]) => string[];
export declare const _getCoinDecimals: (...coinAddresses: string[] | string[][]) => number[];
export declare const _getBalances: (coins: string[], addresses: string[]) => Promise<IDict<string[]>>;
export declare const _prepareAddresses: (addresses: string[] | string[][]) => string[];
export declare const _getAddress: (address: string) => string;
export declare const getBalances: (coins: string[], ...addresses: string[] | string[][]) => Promise<IDict<string[]> | string[]>;
export declare const _getAllowance: (coins: string[], address: string, spender: string) => Promise<bigint[]>;
export declare const getAllowance: (coins: string[], address: string, spender: string) => Promise<string[]>;
export declare const hasAllowance: (coins: string[], amounts: (number | string)[], address: string, spender: string) => Promise<boolean>;
export declare const _ensureAllowance: (coins: string[], amounts: bigint[], spender: string, isMax?: boolean) => Promise<string[]>;
export declare const ensureAllowanceEstimateGas: (coins: string[], amounts: (number | string)[], spender: string, isMax?: boolean) => Promise<number | number[]>;
export declare const ensureAllowance: (coins: string[], amounts: (number | string)[], spender: string, isMax?: boolean) => Promise<string[]>;
export declare const getPoolIdBySwapAddress: (swapAddress: string) => string;
export declare const _getUsdPricesFromApi: () => Promise<IDict<number>>;
export declare const _getCrvApyFromApi: () => Promise<IDict<[number, number]>>;
export declare const _getRewardsFromApi: () => Promise<IDict<IRewardFromApi[]>>;
export declare const _getUsdRate: (assetId: string) => Promise<number>;
export declare const getUsdRate: (coin: string) => Promise<number>;
export declare const getBaseFeeByLastBlock: () => Promise<number>;
export declare const getGasPrice: () => Promise<number>;
export declare const getGasPriceFromL1: () => Promise<number>;
export declare const getGasPriceFromL2: () => Promise<number>;
export declare const getGasInfoForL2: () => Promise<Record<string, number | null>>;
export declare const getTxCostsUsd: (ethUsdRate: number, gasPrice: number, gas: number | number[], gasPriceL1?: number) => number;
export declare const getTVL: (network?: INetworkName | IChainId) => Promise<number>;
export declare const getVolumeApiController: (network: INetworkName) => Promise<IVolumeAndAPYs>;
export declare const getVolume: (network?: INetworkName | IChainId) => Promise<{
    totalVolume: number;
    cryptoVolume: number;
    cryptoShare: number;
}>;
export declare const _setContracts: (address: string, abi: any) => void;
export declare const _get_small_x: (_x: bigint, _y: bigint, x_decimals: number, y_decimals: number) => BigNumber;
export declare const _get_price_impact: (_x: bigint, _y: bigint, _small_x: bigint, _small_y: bigint, x_decimals: number, y_decimals: number) => BigNumber;
export declare const getCoinsData: (...coins: string[] | string[][]) => Promise<{
    name: string;
    symbol: string;
    decimals: number;
}[]>;
export declare const hasDepositAndStake: () => boolean;
export declare const hasRouter: () => boolean;
export declare const getCountArgsOfMethodByContract: (contract: Contract, methodName: string) => number;
export declare const isMethodExist: (contract: Contract, methodName: string) => boolean;
export declare const getPoolName: (name: string) => string;
export declare const isStableNgPool: (name: string) => boolean;
export declare const assetTypeNameHandler: (assetTypeName: string) => REFERENCE_ASSET;
export declare const getBasePools: () => Promise<IBasePoolShortItem[]>;
export declare const memoizedContract: () => (address: string, abi: any, provider: BrowserProvider | JsonRpcProvider | Signer) => Contract;
export declare const memoizedMulticallContract: () => (address: string, abi: any) => MulticallContract;
