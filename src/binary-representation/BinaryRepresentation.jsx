import { useState } from "react";
import BaseNumberDisplay from "../components/BaseNumberDisplay/BaseNumberDisplay.jsx";
import { Space } from "@mantine/core";
import { checkIfCorrectNumber } from "../konwersja-systemow/Conversions.js";
import { decimalToZm, zmToDecimal } from "./types/zm.js";

// TODO: Refactor
export default function BinaryRepresentation() {
    const [number, setNumber] = useState("0");

    const [decimalInput, setDecimalInput] = useState("0");
    const [decimalInputValid, setDecimalInputValid] = useState(true);

    const [zmInput, setZmInput] = useState("0");
    const [zmInputValid, setZmInputValid] = useState(true);

    function decimalChange(newNumber) {
        setDecimalInput(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 10);
        setDecimalInputValid(isValid);

        if (!isValid) return;

        setZmInput(decimalToZm(newNumber));
    }

    function zmChange(newNumber) {
        setZmInput(newNumber);
        const isValid = checkIfCorrectNumber(newNumber, 2, false, true);
        setZmInputValid(isValid);

        if (!isValid) return;

        setDecimalInput(zmToDecimal(newNumber));
    }

    return <>
        <BaseNumberDisplay size={3} base="10" invalid={!decimalInputValid} editable denyDeletion value={decimalInput} onChange={decimalChange} />
        <Space h="md" />
        <BaseNumberDisplay size={2.5} base="ZM" invalid={!zmInputValid} editable denyDeletion value={zmInput} onChange={zmChange} />
        {/* <BaseNumberDisplay size={2.5} base="U1" editable denyDeletion value={number} onChange={setNumber} />
        <BaseNumberDisplay size={2.5} base="U2" editable denyDeletion value={number} onChange={setNumber} /> */}
    </>
}
