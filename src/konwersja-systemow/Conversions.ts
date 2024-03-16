import Big from "big.js";
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

/**
 * Zamienia 0 na 1 i 1 na 0
 *
 * @param {string} input
 * @returns {string}
 */
export function flipZerosAndOnes(input) {
    return input
        .split("")
        .map((cyfra) =>
            cyfra == "0" ? "1"
            : cyfra == "1" ? "0"
            : cyfra,
        )
        .join("");
}

/**
 * Sprawdza czy licza jest poprawna w wybranym systemie
 * np. checkIfCorrectNumber(123, 10) zwróci nam true, a checkIfCorrectNumber(123a, 10) zwróci false
 *
 *
 * @param {string} number
 * @param {number} base
 */
export function checkIfCorrectNumber(number, base, minusAllowed = true, fractionsAllowed = true) {
    const CORRECT_NUM_REGEX = /^-?([0-9a-z]+)(\.[0-9a-z]+)?$/;

    if (base < 2) throw "System musi wynosić conajmniej 2";
    if (base > DIGITS.length) throw `System musi być mniejszy od ${DIGITS.length}`;

    if (!minusAllowed && number.includes("-")) return false;
    if (!fractionsAllowed && number.includes(".")) return false;

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
    Big.DP = 100;

    const czyUjemna = Math.sign(inputNumber) === -1;
    inputNumber = inputNumber.replace("-", "");

    const bigInputNumber = new Big(inputNumber);
    const czescCalkowita = bigInputNumber.round(0, Big.roundDown);
    const czescUlamkowa = bigInputNumber.mod(1);

    //
    // część z liczbami całkowitymi
    //
    const nowaCalkowita = zapisModulu(czescCalkowita.toFixed(), outBase);

    //
    // TODO: Wykrywanie powtarzania, Poprawienie tego
    // część ułamkowa
    //
    let nowyUlamek = "";
    if (!czescUlamkowa.eq(0)) {
        let czesci = [];
        let ulamek = czescUlamkowa;

        for (let pos = 0; pos < 10; pos++) {
            if (ulamek.eq(0)) break;

            czesci.push(ulamek.mul(outBase).round(0, Big.roundDown));

            ulamek = ulamek.mul(outBase).mod(1);
        }

        nowyUlamek = "." + czesci.map((cyfra) => DIGITS[cyfra.toNumber()]).join("");
    }

    return (czyUjemna ? "-" : "") + (nowaCalkowita || "0") + nowyUlamek;
}

/**
 *
 * @param {string} inputNumber
 * @param {number} inputBase
 * @returns {string}
 */
export function baseOtherTo10(inputNumber, inputBase) {
    Big.DP = 100;

    const czyUjemna = Math.sign(inputNumber) === -1;
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
        let outFraction = new Big(0);
        for (let i = inputNumberParts[1].length - 1; i >= 0; i--) {
            const digit = inputNumberParts[1][i];

            outFraction = outFraction.add(DIGITS.indexOf(digit));
            outFraction = outFraction.div(inputBase);
        }

        return znak + (outInteger.toString() || "0") + "." + outFraction.toFixed().slice(2);
    }

    return znak + outInteger.toString();
}

/**
 *
 * @param {string} inputNumber - liczba dziesiętna, nieujemna
 * @param {number} outBase
 * @returns {string}
 */
export function zapisModulu(inputNumber, outBase) {
    let reszty = [];
    let iloraz = BigInt(inputNumber);
    while (iloraz > 0) {
        const reszta = iloraz % BigInt(outBase);
        iloraz = (iloraz - reszta) / BigInt(outBase);
        reszty.push(reszta);
    }
    return reszty
        .map((cyfra) => DIGITS[cyfra])
        .toReversed()
        .join("");
}