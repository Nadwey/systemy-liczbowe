import { base10ToOther } from "../../konwersja-systemow/Conversions";
import { decimalToU1 } from "./u1";

/**
 * Dodaje 1 do liczy w postaci binarnej
 *
 * @param {string} number liczba binarna (np. "01101001")
 * @returns {string}
 */
function inc(number) {
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

/**
 *
 * @param {string} decimal
 * @returns {string}
 */
export function decimalToU2(decimal) {
    const czyUjemna = Math.sign(decimal) == -1;
    let binary = decimalToU1(decimal); // pierwszy krok jest taki sam

    if (czyUjemna) {
        binary = inc(binary);
    }

    return binary;
}

/**
 *
 * @param {string} u2
 */
export function u2ToDecimal(u2) {
    let out = BigInt(0);
    for (let i = 0; i < u2.length; i++) {
        let waga = u2.length - i - 1;
        out += u2[i] === "1" ? 2n ** BigInt(waga) * (i === 0 ? -1n : 1n) : 0n;
    }
    return out.toString();
}
