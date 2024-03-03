import bigDecimal from "js-big-decimal";
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

/**
 * Sprawdza czy licza jest poprawna w wybranym systemie
 * np. checkIfCorrectNumber(123, 10) zwróci nam true, a checkIfCorrectNumber(123a, 10) zwróci false
 *
 *
 * @param {string} number
 * @param {number} base
 */
export function checkIfCorrectNumber(number, base) {
    const CORRECT_NUM_REGEX = /^-?([0-9a-z]+)(\.[0-9a-z]+)?$/;

    if (base < 2) throw "System musi wynosić conajmniej 2";
    if (base > DIGITS.length) throw `System musi być mniejszy od ${DIGITS.length}`;

    if (!CORRECT_NUM_REGEX.test(number)) return false;

    const correctDigits = DIGITS.slice(0, base); // dostępne cyfry w systemie

    if (number.split("").some((digit) => !correctDigits.includes(digit) && !"-.".includes(digit))) return false; // sprawdza czy w liczbie są nieprawidłowe znaki w tym systemie

    return true;
}

/**
 * Konwertuje liczbę dziesiętną na liczbę w podanym systemie liczbowym
 *
 * @param {string} inputNumber
 * @param {number} outBase
 * @returns {string}
 */
export function base10ToOther(inputNumber, outBase) {
    const czyUjemna = inputNumber.includes("-");
    const znak = czyUjemna ? "-" : "";
    inputNumber = inputNumber.replace("-", "");

    const inputNumberParts = inputNumber.split(".");

    //
    // część z liczbami całkowitymi (nie chciało mi się wymyślać angielskich nazw)
    //
    let reszty = [];
    let iloraz = BigInt(inputNumberParts[0]);
    while (iloraz > 0) {
        const reszta = iloraz % BigInt(outBase);
        iloraz = (iloraz - reszta) / BigInt(outBase);
        reszty.push(reszta);
    }
    const nowaCalkowita =
        (czyUjemna ? "-" : "") +
        reszty
            .map((cyfra) => DIGITS[cyfra])
            .toReversed()
            .join("");

    //
    // część ułamkowa // TODO
    //
    let nowyUlamek = "";
    if (inputNumber % 1 !== 0) {

        let czesci = [];
        let ulamek = inputNumber % 1;

        for (let pos = 0; pos < 10; pos++) {
            if (ulamek === 0) break;
            czesci.push(Math.floor(ulamek * outBase));
            ulamek = (ulamek * outBase) % 1;
        }
        nowyUlamek = "." + czesci.map((cyfra) => DIGITS[cyfra]).join("");
    }

    return (nowaCalkowita || "0") + nowyUlamek;
}

/**
 *
 * @param {string} inputNumber
 * @param {number} inputBase
 * @returns {string}
 */
export function baseOtherTo10(inputNumber, inputBase) {
    const czyUjemna = inputNumber.includes("-");
    const znak = czyUjemna ? "-" : "";
    inputNumber = inputNumber.replace("-", "");

    const inputNumberParts = inputNumber.split(".");

    // część całkowita
    let outInteger = 0n; // javascriptowi BigInt w teorii dający nieskończone liczby
    for (let i = 0; i < inputNumberParts[0].length; i++) {
        const digit = inputNumberParts[0][i];

        outInteger = BigInt(inputBase) * outInteger + BigInt(DIGITS.indexOf(digit));
    }

    // część ułamkowa
    if (inputNumberParts[1] !== undefined) {
        let outFraction = new bigDecimal("0"); // nie javascriptowi bigdecimal który też w teorii daje nieskończoną dokładność
        for (let i = inputNumberParts[1].length - 1; i >= 0; i--) {
            const digit = inputNumberParts[1][i];

            outFraction = outFraction.add(new bigDecimal(DIGITS.indexOf(digit)));
            outFraction = outFraction.divide(new bigDecimal(inputBase));
        }

        return znak + (outInteger.toString() || "0") + "." + outFraction.getValue().slice(2);
    }

    return znak + outInteger.toString();
}