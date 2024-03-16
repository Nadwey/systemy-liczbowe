import { base10ToOther, baseOtherTo10, flipZerosAndOnes } from "../../konwersja-systemow/Conversions";
import { isNumberNegative, nearestPower } from "../../utils";

export function decimalToU1(decimal: string) {
    let binary = base10ToOther(decimal, 2);
    const czyUjemna = isNumberNegative(decimal);

    binary = binary.replace("-", "");
    if (binary.includes(".")) binary = binary.substring(0, binary.indexOf(".")); // usuń część ułamkową

    binary = binary.padStart(Math.max(nearestPower(binary.length, 2), 4), "0");

    if (czyUjemna) {
        binary = flipZerosAndOnes(binary);
    }

    return binary;
}

export function u1ToDecimal(u1: string) {
    if (!u1) return "0";
    const czyUjemna = u1[0] == "1";

    if (czyUjemna) u1 = flipZerosAndOnes(u1);

    return (czyUjemna ? "-" : "") + baseOtherTo10(u1, 2);
}
