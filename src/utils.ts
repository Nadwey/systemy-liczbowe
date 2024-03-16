export function numberSign(number: string | number) {
    // @ts-ignore: Math.sign() doesn't care
    return Math.sign(number);
}

export function isNumberNegative(number: string | number) {
    return numberSign(number) === -1;
}

export function nearestPower(number: number, base: number = 2) {
    return base ** Math.ceil(Math.log2(number));
}
