export function nearestPower(number, base = 2) {
    return base ** Math.ceil(Math.log2(number));
}