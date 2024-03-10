import { useState } from "react";
import BaseNumberDisplay from "../components/BaseNumberDisplay/BaseNumberDisplay.jsx";
import { Space } from "@mantine/core";
import { checkIfCorrectNumber } from "../konwersja-systemow/Conversions.js";
import { decimalToZm, zmToDecimal } from "./types/zm.js";
import { decimalToU1, u1ToDecimal } from "./types/u1.js";
import { decimalToU2, u2ToDecimal } from "./types/u2.js";

// TODO: Refactor for god's sake
export default function BinaryRepresentation() {
    const [decimalInput, setDecimalInput] = useState("0");
    const [decimalInputValid, setDecimalInputValid] = useState(true);

    const [zmInput, setZmInput] = useState("0");
    const [zmInputValid, setZmInputValid] = useState(true);

    const [u1Input, setU1Input] = useState("0");
    const [u1InputValid, setU1InputValid] = useState(true);

    const [u2Input, setU2Input] = useState("0");
    const [u2InputValid, setU2InputValid] = useState(true);

    function decimalChange(newNumber) {
        setDecimalInput(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 10);
        setDecimalInputValid(isValid);

        if (!isValid) return;

        setZmInput(decimalToZm(newNumber));
        setU1Input(decimalToU1(newNumber));
        setU2Input(decimalToU2(newNumber));
    }

    function zmChange(newNumber) {
        setZmInput(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 2, false, true);
        setZmInputValid(isValid);

        if (!isValid) return;

        // refactor
        const decimal = zmToDecimal(newNumber);
        setDecimalInput(decimal);
        setU1Input(decimalToU1(decimal));
        setU2Input(decimalToU2(decimal));
    }

    function u1Change(newNumber) {
        setU1Input(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 2, false, false);
        setU1InputValid(isValid);

        if (!isValid) return;

        // this
        const decimal = u1ToDecimal(newNumber);
        setDecimalInput(decimal);
        setZmInput(decimalToZm(decimal));
        setU2Input(decimalToU2(decimal));
    }

    function u2Change(newNumber) {
        setU2Input(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 2, false, false);
        setU2InputValid(isValid);

        if (!isValid) return;

        // fuckery
        const decimal = u2ToDecimal(newNumber);
        setDecimalInput(decimal);
        setU1Input(decimalToU1(decimal));
        setZmInput(decimalToZm(decimal));
    }

    return (
        <>
            <BaseNumberDisplay size={3} base="10" invalid={!decimalInputValid} editable denyDeletion value={decimalInput} onChange={decimalChange} />
            <Space h="md" />
            <BaseNumberDisplay size={2.5} base="ZM" invalid={!zmInputValid} editable denyDeletion value={zmInput} onChange={zmChange} />
            <BaseNumberDisplay size={2.5} base="U1" invalid={!u1InputValid} editable denyDeletion value={u1Input} onChange={u1Change} />
            <BaseNumberDisplay size={2.5} base="U2" invalid={!u2InputValid} editable denyDeletion value={u2Input} onChange={u2Change} />
        </>
    );
}
