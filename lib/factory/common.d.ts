import { ICurve, IPoolDataShort } from "../interfaces";
import type { Curve } from "../curve";
export declare function setFactoryZapContracts(this: ICurve, isCrypto: boolean): void;
export declare function getPoolIdByAddress(poolList: IPoolDataShort[], address: string, curveObj: Curve): string;
