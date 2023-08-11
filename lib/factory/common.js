import { FACTORY_CONSTANTS } from "./constants.js";
import { CRYPTO_FACTORY_CONSTANTS } from "./constants-crypto.js";
export function setFactoryZapContracts(isCrypto) {
    var basePoolIdZapDict = (isCrypto ? CRYPTO_FACTORY_CONSTANTS : FACTORY_CONSTANTS)[this.chainId].basePoolIdZapDict;
    for (var basePoolId in basePoolIdZapDict) {
        if (!Object.prototype.hasOwnProperty.call(basePoolIdZapDict, basePoolId))
            continue;
        var basePool = basePoolIdZapDict[basePoolId];
        if (basePool.address in this.constants)
            continue;
        this.setContract(basePool.address, basePool.ABI);
    }
}
