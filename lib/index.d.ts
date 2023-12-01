/// <reference types="memoizee" />
import { ethers, Networkish } from "ethers";
import { PoolTemplate } from "./pools/index.js";
import { Curve, NETWORK_CONSTANTS } from "./curve.js";
declare function init(providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy', providerSettings: {
    url?: string;
    privateKey?: string;
    batchMaxCount?: number;
} | {
    externalProvider: ethers.Eip1193Provider;
} | {
    network?: Networkish;
    apiKey?: string;
}, options?: {
    gasPrice?: number;
    maxFeePerGas?: number;
    maxPriorityFeePerGas?: number;
    chainId?: number;
}): Promise<void>;
declare function setCustomFeeData(customFeeData: {
    gasPrice?: number;
    maxFeePerGas?: number;
    maxPriorityFeePerGas?: number;
}): void;
declare const curve: {
    init: typeof init;
    chainId: number;
    signerAddress: string;
    setCustomFeeData: typeof setCustomFeeData;
    getPoolList: () => string[];
    getMainPoolList: () => string[];
    getUserPoolListByLiquidity: (address?: string) => Promise<string[]>;
    getUserPoolListByClaimable: (address?: string) => Promise<string[]>;
    getUserPoolList: (address?: string, useApi?: boolean) => Promise<string[]>;
    getUserLiquidityUSD: (pools: string[], address?: string) => Promise<string[]>;
    getUserClaimable: (pools: string[], address?: string) => Promise<{
        token: string;
        symbol: string;
        amount: string;
        price: number;
    }[][]>;
    PoolTemplate: typeof PoolTemplate;
    getPool: (poolId: string, curveObj?: Curve) => PoolTemplate;
    getUsdRate: (curveObj: Curve | undefined, coin: string) => Promise<number>;
    getGasPriceFromL1: () => Promise<number>;
    getGasPriceFromL2: () => Promise<number>;
    getTVL: (network?: import("./interfaces.js").INetworkName | import("./interfaces.js").IChainId) => Promise<number>;
    getBalances: (coins: string[], ...addresses: string[] | string[][]) => Promise<string[] | import("./interfaces.js").IDict<string[]>>;
    getAllowance: (coins: string[], address: string, spender: string, curveObj?: Curve) => Promise<string[]>;
    hasAllowance: (coins: string[], amounts: (string | number)[], address: string, spender: string, curveObj?: Curve) => Promise<boolean>;
    ensureAllowance: (coins: string[], amounts: (string | number)[], spender: string, isMax?: boolean, curveObj?: Curve) => Promise<string[]>;
    getCoinsData: (curveObj?: Curve, ...coins: string[] | string[][]) => Promise<{
        name: string;
        symbol: string;
        decimals: number;
    }[]>;
    getVolume: (network?: import("./interfaces.js").INetworkName | import("./interfaces.js").IChainId) => Promise<{
        totalVolume: number;
        cryptoVolume: number;
        cryptoShare: number;
    }>;
    hasDepositAndStake: () => boolean;
    hasRouter: () => boolean;
    factory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        fetchNewPools: () => Promise<string[]>;
        getPoolList: () => string[];
        deployPlainPool: (name: string, symbol: string, coins: string[], A: string | number, fee: string | number, assetType: 0 | 1 | 2 | 3, implementationIdx: 0 | 1 | 2 | 3 | 4 | 5, emaTime?: number, oracleAddress?: string, methodName?: string) => Promise<ethers.ContractTransactionResponse>;
        setOracle: (poolAddress: string, oracleAddress?: string, methodName?: string) => Promise<ethers.ContractTransactionResponse>;
        deployMetaPool: (basePool: string, name: string, symbol: string, coin: string, A: string | number, fee: string | number, implementationIdx: 0 | 1) => Promise<ethers.ContractTransactionResponse>;
        deployGauge: (poolAddress: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeMirror: (chainId: number, salt: string) => Promise<ethers.ContractTransactionResponse>;
        getDeployedPlainPoolAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedMetaPoolAddress: (tx: ethers.ContractTransactionResponse, curveObj?: Curve) => Promise<string>;
        getDeployedGaugeAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedGaugeMirrorAddress: (chainId: number) => Promise<string>;
        getDeployedGaugeMirrorAddressByTx: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        fetchRecentlyDeployedPool: (poolAddress: string) => Promise<string>;
        gaugeImplementation: () => string;
        estimateGas: {
            deployPlainPool: (name: string, symbol: string, coins: string[], A: string | number, fee: string | number, assetType: 0 | 1 | 2 | 3, implementationIdx: 0 | 1 | 2 | 3 | 4 | 5, emaTime?: number, oracleAddress?: string, methodName?: string) => Promise<number>;
            setOracle: (poolAddress: string, oracleAddress?: string, methodName?: string) => Promise<number>;
            deployMetaPool: (basePool: string, name: string, symbol: string, coin: string, A: string | number, fee: string | number, implementationIdx: 0 | 1) => Promise<number>;
            deployGauge: (poolAddress: string) => Promise<number>;
            deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<number>;
            deployGaugeMirror: (chainId: number, salt: string) => Promise<number>;
        };
    };
    crvUSDFactory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        getPoolList: () => string[];
    };
    EYWAFactory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        getPoolList: () => string[];
    };
    stableNgFactory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        getPoolList: () => string[];
    };
    cryptoFactory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        fetchNewPools: () => Promise<string[]>;
        getPoolList: () => string[];
        deployPool: (name: string, symbol: string, coins: string[], A: string | number, gamma: string | number, midFee: string | number, outFee: string | number, allowedExtraProfit: string | number, feeGamma: string | number, adjustmentStep: string | number, maHalfTime: number, initialPrice: string | number) => Promise<ethers.ContractTransactionResponse>;
        deployGauge: (poolAddress: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeMirror: (chainId: number, salt: string) => Promise<ethers.ContractTransactionResponse>;
        getDeployedPoolAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedGaugeAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedGaugeMirrorAddress: (chainId: number) => Promise<string>;
        getDeployedGaugeMirrorAddressByTx: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        fetchRecentlyDeployedPool: (poolAddress: string) => Promise<string>;
        gaugeImplementation: () => string;
        estimateGas: {
            deployPool: (name: string, symbol: string, coins: string[], A: string | number, gamma: string | number, midFee: string | number, outFee: string | number, allowedExtraProfit: string | number, feeGamma: string | number, adjustmentStep: string | number, maHalfTime: number, initialPrice: string | number) => Promise<number>;
            deployGauge: (poolAddress: string) => Promise<number>;
            deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<number>;
            deployGaugeMirror: (chainId: number, salt: string) => Promise<number>;
        };
    };
    tricryptoFactory: {
        fetchPools: (useApi?: boolean) => Promise<void>;
        fetchNewPools: () => Promise<string[]>;
        getPoolList: () => string[];
        deployPool: (name: string, symbol: string, coins: string[], A: string | number, gamma: string | number, midFee: string | number, outFee: string | number, allowedExtraProfit: string | number, feeGamma: string | number, adjustmentStep: string | number, emaTime: number, initialPrices: (string | number)[]) => Promise<ethers.ContractTransactionResponse>;
        deployGauge: (poolAddress: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<ethers.ContractTransactionResponse>;
        deployGaugeMirror: (chainId: number, salt: string) => Promise<ethers.ContractTransactionResponse>;
        getDeployedPoolAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedGaugeAddress: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        getDeployedGaugeMirrorAddress: (chainId: number) => Promise<string>;
        getDeployedGaugeMirrorAddressByTx: (tx: ethers.ContractTransactionResponse) => Promise<string>;
        fetchRecentlyDeployedPool: (poolAddress: string) => Promise<string>;
        gaugeImplementation: () => string;
        estimateGas: {
            deployPool: (name: string, symbol: string, coins: string[], A: string | number, gamma: string | number, midFee: string | number, outFee: string | number, allowedExtraProfit: string | number, feeGamma: string | number, adjustmentStep: string | number, emaTime: number, initialPrices: (string | number)[]) => Promise<number>;
            deployGauge: (poolAddress: string) => Promise<number>;
            deployGaugeSidechain: (poolAddress: string, salt: string) => Promise<number>;
            deployGaugeMirror: (chainId: number, salt: string) => Promise<number>;
        };
    };
    estimateGas: {
        ensureAllowance: (coins: string[], amounts: (string | number)[], spender: string, isMax?: boolean, curveObj?: Curve) => Promise<number | number[]>;
    };
    boosting: {
        getCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces.js").IDict<string>>;
        getLockedAmountAndUnlockTime: (...addresses: string[] | string[][]) => Promise<import("./interfaces.js").IDict<{
            lockedAmount: string;
            unlockTime: number;
        }> | {
            lockedAmount: string;
            unlockTime: number;
        }>;
        getVeCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces.js").IDict<string>>;
        getVeCrvPct: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces.js").IDict<string>>;
        calcUnlockTime: (days: number, start?: number) => number;
        isApproved: (amount: string | number) => Promise<boolean>;
        approve: (amount: string | number) => Promise<string[]>;
        createLock: (amount: string | number, days: number) => Promise<string>;
        increaseAmount: (amount: string | number) => Promise<string>;
        increaseUnlockTime: (days: number) => Promise<string>;
        withdrawLockedCrv: () => Promise<string>;
        claimableFees: (address?: string) => Promise<string>;
        claimFees: (address?: string) => Promise<string>;
        estimateGas: {
            approve: (amount: string | number) => Promise<number | number[]>;
            createLock: (amount: string | number, days: number) => Promise<number>;
            increaseAmount: (amount: string | number) => Promise<number>;
            increaseUnlockTime: (days: number) => Promise<number>;
            withdrawLockedCrv: () => Promise<number>;
            claimFees: (address?: string) => Promise<number>;
        };
        sidechain: {
            lastEthBlock: () => Promise<number>;
            getAnycallBalance: () => Promise<string>;
            topUpAnycall: (amount?: string | number) => Promise<string>;
            lastBlockSent: (chainId: import("./interfaces.js").IChainId) => Promise<number>;
            blockToSend: () => Promise<number>;
            sendBlockhash: (block: number, chainId: import("./interfaces.js").IChainId) => Promise<string>;
            submitProof: (block: number, address?: string) => Promise<string>;
            estimateGas: {
                topUpAnycall: (amount?: string | number) => Promise<number>;
                sendBlockhash: (block: number, chainId: import("./interfaces.js").IChainId) => Promise<number>;
                submitProof: (block: number, address?: string) => Promise<number>;
            };
        };
    };
    router: {
        getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<{
            route: import("./interfaces.js").IRoute;
            output: string;
        }>;
        getArgs: (route: import("./interfaces.js").IRoute) => {
            _route: string[];
            _swapParams: number[][];
            _pools: string[];
            _basePools: string[];
            _baseTokens: string[];
            _secondBasePools: string[];
            _secondBaseTokens: string[];
        };
        expected: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<string>;
        required: (inputCoin: string, outputCoin: string, outAmount: string | number, curveObj?: Curve) => Promise<string>;
        priceImpact: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<number>;
        isApproved: (inputCoin: string, amount: string | number) => Promise<boolean>;
        approve: (inputCoin: string, amount: string | number) => Promise<string[]>;
        swap: (inputCoin: string, outputCoin: string, amount: string | number, slippage?: number, curveObj?: Curve) => Promise<ethers.ContractTransactionResponse>;
        getSwappedAmount: (tx: ethers.ContractTransactionResponse, outputCoin: string, curveObj?: Curve) => Promise<string>;
        estimateGas: {
            approve: (inputCoin: string, amount: string | number) => Promise<number | number[]>;
            swap: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<number | number[]>;
        };
    };
};
declare const router: {
    findAllRoutes: (inputCoinAddress: string, outputCoinAddress: string, curveObj?: Curve) => Promise<import("./interfaces.js").IRoute[]>;
    getBestRoute: ((inputCoinAddress: string, outputCoinAddress: string, amount: string | number, curveObj?: any) => Promise<import("./interfaces.js").IRoute>) & import("memoizee").Memoized<(inputCoinAddress: string, outputCoinAddress: string, amount: string | number, curveObj?: any) => Promise<import("./interfaces.js").IRoute>>;
    getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<{
        route: import("./interfaces.js").IRoute;
        output: string;
    }>;
    getOutputForRoute: ((route: import("./interfaces.js").IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>) & import("memoizee").Memoized<(route: import("./interfaces.js").IRoute, _amount: bigint, curveObj?: any) => Promise<bigint>>;
    expected: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<string>;
    priceImpact: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<number>;
    priceImpactFromRoute: (amount: string | number, route: import("./interfaces.js").IRoute, output: string, inputCoin: string, outputCoin: string, curveObj?: Curve) => Promise<number>;
    isApproved: (inputCoin: string, amount: string | number) => Promise<boolean>;
    approve: (inputCoin: string, amount: string | number) => Promise<string[]>;
    swap: (inputCoin: string, outputCoin: string, amount: string | number, slippage?: number, curveObj?: Curve) => Promise<ethers.ContractTransactionResponse>;
    getSwappedAmount: (tx: ethers.ContractTransactionResponse, outputCoin: string, curveObj?: Curve) => Promise<string>;
    estimateGas: {
        approve: (inputCoin: string, amount: string | number) => Promise<number | number[]>;
        swap: (inputCoin: string, outputCoin: string, amount: string | number, curveObj?: Curve) => Promise<number | number[]>;
    };
};
export { curve, Curve, NETWORK_CONSTANTS, router };
