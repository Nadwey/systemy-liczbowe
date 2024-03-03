import { useState } from "react";
import BaseNumberDisplay from "../components/BaseNumberDisplay/BaseNumberDisplay.jsx";

export default function BinaryRepresentation() {
    const [number, setNumber] = useState(0);
    console.log(number);

    return <>
        <BaseNumberDisplay size={3} base="ZM" editable denyDeletion value={number} onChange={setNumber} />
        <BaseNumberDisplay size={3} base="U1" editable denyDeletion value={number} onChange={setNumber} />
        <BaseNumberDisplay size={3} base="U2" editable denyDeletion value={number} onChange={setNumber} />
    </>
}
