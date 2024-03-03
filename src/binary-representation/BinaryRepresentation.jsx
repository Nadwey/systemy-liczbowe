import { NumberInput } from "@mantine/core";
import { useState } from "react";

export default function BinaryRepresentation() {
    const [number, setNumber] = useState(0);
    console.log(number);

    return <>
        <NumberInput value={number} onChange={setNumber} />
        {number}
    </>
}
