import { base10ToOther, baseOtherTo10 } from "../../konwersja-systemow/Conversions";

/**
 * 
 * @param {string} decimal 
 */
export function decimalToZm(decimal) {
    const czyUjemna = Math.sign(decimal) === -1;
    decimal = decimal.replace("-", "");

    const base2Absolute = base10ToOther(decimal, 2);

    if (base2Absolute === "0") return "0";

    return (czyUjemna ? "1" : "0") + base2Absolute;
}

/**
 * 
 * @param {string} zm 
 */
export function zmToDecimal(zm) {
    if (Math.sign(zm) === "0") return "0"; // sprawdza 0 i -0
    const czyUjemna = zm[0] === "1";
    zm = zm.slice(1); // usuń bit znaku
    console.log(zm);

    return (czyUjemna ? "-" : "") + baseOtherTo10(zm, 2);
}