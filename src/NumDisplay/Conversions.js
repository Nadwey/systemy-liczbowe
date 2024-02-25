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
    if (base > DIGITS.length) throw "System musi być mniejszy od 36";

    if (!CORRECT_NUM_REGEX.test(number)) return false;

    const correctDigits = DIGITS.slice(0, base); // dostępne cyfry w systemie

    if (number.split("").some((digit) => !correctDigits.includes(digit) && !"-.".includes(digit))) return false; // sprawdza czy w liczbie są nieprawidłowe znaki w tym systemie

    return true;
}

/**
 * Konwertuje liczbę dziesiętną na liczbę w podanym systemie liczbowym
 *
 * @param {number} inputNumber
 * @param {number} outBase
 * @returns {string}
 */
export function base10ToOther(inputNumber, outBase) {
    if (inputNumber === 0) return "0";
    const czyUjemna = inputNumber < 0;
    if (czyUjemna) inputNumber = -inputNumber;

    //
    // część z liczbami całkowitymi (nie chciało mi się wymyślać angielskich nazw)
    //
    let calkowita = Math.floor(inputNumber); // część całkowita wejściowej liczby
    let reszty = [];
    let iloraz = calkowita;
    while (iloraz !== 0) {
        const reszta = iloraz % outBase;
        iloraz = (iloraz - reszta) / outBase;
        reszty.push(reszta);
    }
    const nowaCalkowita =
        (czyUjemna ? "-" : "") +
        reszty
            .map((cyfra) => DIGITS[cyfra])
            .toReversed()
            .join("");

    //
    // część ułamkowa
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

    return nowaCalkowita + nowyUlamek;
}
