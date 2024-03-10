import { base10ToOther, baseOtherTo10, flipZerosAndOnes, zapisModulu } from "../../konwersja-systemow/Conversions";

/**
 *
 * @param {string} decimal
 * @returns {string}
 */
export function decimalToU1(decimal) {
    let binary = base10ToOther(decimal, 2);
    const czyUjemna = Math.sign(binary) === -1;
    binary = binary.replace("-", "");
    if (binary.includes(".")) binary = binary.substring(0, binary.indexOf(".")); // usuń część ułamkową

    // let zapisModulu_zera = decimal_zapisModulu.padStart(Math.max(2 ** Math.ceil(Math.log2(decimal_zapisModulu.length)), 8), "0");

    binary = binary.padStart(Math.max(2 ** Math.ceil(Math.log2(binary.length)), 4), "0");

    if (czyUjemna) {
        binary = flipZerosAndOnes(binary);
    }

    return binary;
}

export function u1ToDecimal(u1) {
    if (!u1) return "0";
    const czyUjemna = u1[0] == "1";

    if (czyUjemna) u1 = flipZerosAndOnes(u1);

    return (czyUjemna ? "-" : "") + baseOtherTo10(u1, 2);
}
