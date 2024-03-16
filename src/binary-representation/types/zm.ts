import { base10ToOther, baseOtherTo10 } from "../../konwersja-systemow/Conversions";
import { isNumberNegative, numberSign } from "../../utils";

export function decimalToZm(decimal: string) {
    const czyUjemna = isNumberNegative(decimal);
    decimal = decimal.replace("-", "");

    const base2Absolute = base10ToOther(decimal, 2);

    if (base2Absolute === "0") return "0";

    return (czyUjemna ? "1" : "0") + base2Absolute;
}

export function zmToDecimal(zm: string) {
    if (numberSign(zm) === 0) return "0";
    const czyUjemna = zm[0] === "1";
    zm = zm.slice(1); // usuń bit znaku

    return (czyUjemna ? "-" : "") + baseOtherTo10(zm, 2);
}
