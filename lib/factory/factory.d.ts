import { IDict, IPoolData, ICurve } from "../interfaces";
export declare const BLACK_LIST: {
    [index: number]: any;
};
export declare function getFactoryPoolData(this: ICurve, fromIdx?: number, swapAddress?: string, factoryAddress?: string): Promise<IDict<IPoolData>>;
