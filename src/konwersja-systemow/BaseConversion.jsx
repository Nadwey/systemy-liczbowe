import { Button, Group, NumberInput, Popover } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import NumInput from "./NumInput/NumInput.jsx";
import { useState } from "react";
import { base10ToOther, baseOtherTo10, checkIfCorrectNumber } from "./Conversions.js";

export function BaseConvertion() {
    const [newBaseInputValue, setNewBaseInputValue] = useState("");
    const [numberDisplays, setNumberDisplays] = useState([
        {
            base: 10,
            fontSize: "3.5rem",
            value: "0",
            invalid: false,
        },
        {
            base: 2,
            fontSize: "1.8rem",
            value: "0",
            invalid: false,
        },
        {
            base: 8,
            fontSize: "1.8rem",
            value: "0",
            invalid: false,
        },
        {
            base: 16,
            fontSize: "1.8rem",
            value: "0",
            invalid: false,
        },
        {
            base: 36,
            fontSize: "1.8rem",
            value: "0",
            invalid: false,
        },
    ]);

    /**
     *
     * @param {string} newNumber
     * @param {number} base
     */
    function numberUpdated(newNumber, base) {
        console.time("baseOtherTo10");
        const base10Number = baseOtherTo10(newNumber, base);
        console.timeEnd("baseOtherTo10");

        if (!checkIfCorrectNumber(newNumber, base)) {
            setNumberDisplays((oldNumberDisplays) => {
                return oldNumberDisplays.map((numberDisplay) => {
                    if (numberDisplay.base === base)
                        return {
                            ...numberDisplay,
                            value: newNumber,
                            invalid: true,
                        };
                    return numberDisplay;
                });
            });
            return;
        }

        setNumberDisplays((oldNumberDisplays) => {
            return oldNumberDisplays.map((numberDisplay) => {
                let newValue;
                if (base !== numberDisplay.base) {
                    console.time("base10ToOther");
                    newValue = base10ToOther(base10Number, numberDisplay.base);
                    console.timeEnd("base10ToOther");
                } else newValue = newNumber;

                return {
                    ...numberDisplay,
                    value: newValue,
                    invalid: false,
                };
            });
        });
    }

    function onBaseDelete(base) {
        setNumberDisplays((oldNumberDisplays) => {
            return oldNumberDisplays.filter((numberDisplay) => {
                if (numberDisplay.base !== base) return numberDisplay;
            });
        });
    }

    function onBaseAdd() {
        const newBase = Math.max(Math.min(newBaseInputValue, 36), 2);
        if (numberDisplays.some((numberDisplay) => numberDisplay.base === newBase)) throw "System już jest dodany";

        setNumberDisplays((oldNumberDisplays) => {
            return [
                ...oldNumberDisplays,
                {
                    base: newBase,
                    fontSize: "1.8rem",
                    value: "0",
                    invalid: false,
                },
            ];
        });

        setNewBaseInputValue("");
    }

    return (
        <>
            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button color="#202020" size="md" m="auto" w="30%">
                        <IconPlus />
                    </Button>
                </Popover.Target>
                <Popover.Dropdown w={400}>
                    <Group gap="xs">
                        <NumberInput
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onBaseAdd();
                            }}
                            value={newBaseInputValue}
                            onChange={setNewBaseInputValue}
                            flex="1 1"
                            placeholder="Dodaj system liczbowy"
                            min={2}
                            max={36}
                        />
                        <Button onClick={onBaseAdd}>Ok</Button>
                    </Group>
                </Popover.Dropdown>
            </Popover>
            {numberDisplays.map((numberDisplay) => {
                return (
                    <NumInput
                        key={numberDisplay.base}
                        value={numberDisplay.value}
                        onChange={numberUpdated}
                        onDelete={onBaseDelete}
                        fontSize={numberDisplay.fontSize}
                        base={numberDisplay.base}
                        invalid={numberDisplay.invalid}
                    />
                );
            })}
        </>
    );
}
