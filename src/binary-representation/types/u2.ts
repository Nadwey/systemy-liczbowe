import { isNumberNegative } from "../../utils";
import { decimalToU1 } from "./u1";

/**
 * Dodaje 1 do liczby w postaci binarnej
 * 
 * @param number liczba (np. "01011001101")
 */
function inc(number: string) {
    let arr = number.split("");
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == "1") {
            arr[i] = "0";
        } else {
            arr[i] = "1";
            break;
        }
    }
    return arr.join("");
}

export function decimalToU2(decimal: string) {
    const czyUjemna = isNumberNegative(decimal);
    let binary = decimalToU1(decimal); // pierwszy krok jest taki sam

    if (czyUjemna) {
        binary = inc(binary);
    }

    return binary;
}

export function u2ToDecimal(u2: string) {
    let out = BigInt(0);
    for (let i = 0; i < u2.length; i++) {
        let waga = u2.length - i - 1;
        out += u2[i] === "1" ? 2n ** BigInt(waga) * (i === 0 ? -1n : 1n) : 0n;
    }
    return out.toString();
}
