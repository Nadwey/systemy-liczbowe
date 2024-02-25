import { useState } from "react";
import styles from "./App.module.css";
import NumDisplay from "./NumDisplay/NumDisplay.jsx";
import { AppShell, Center, Container, Group, Stack } from "@mantine/core";
import { base10ToOther, checkIfCorrectNumber } from "./NumDisplay/Conversions.js";
import HeaderLink from "./components/HeaderLink.jsx";

function App() {
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
        const base10Number = parseFloat(newNumber); // TODO

        if (!checkIfCorrectNumber(newNumber, base)) {
            setNumberDisplays((oldNumberDisplays) => {
                return oldNumberDisplays.map((numberDisplay) => {
                    if (numberDisplay.base === base) return {
                        ...numberDisplay,
                        value: newNumber,
                        invalid: true,
                    }
                    return numberDisplay;
                });
            });
            return;
        }

        setNumberDisplays((oldNumberDisplays) => {
            return oldNumberDisplays.map((numberDisplay) => {
                let newValue;
                if (base !== numberDisplay.base) {
                    newValue = base10ToOther(base10Number, numberDisplay.base);
                } else newValue = newNumber;

                return {
                    ...numberDisplay,
                    value: newValue,
                    invalid: false,
                };
            });
        });
    }

    return (
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 40 }}>
            <AppShell.Header style={{
                backgroundColor: "#00000080",
                backdropFilter: "blur(5px)"
            }}>
                <Container h={60} display="flex" style={{
                    alignItems: "center",
                    maxWidth: "1300px"
                }}>
                    <Group w="100%" justify="space-between">
                        <Group>
                            <span style={{
                                fontFamily: "Inter",
                                fontWeight: "900",
                                fontSize: "1.4rem"
                            }}>
                                Systemy liczb
                            </span>
                        </Group>

                        <Group>
                            <HeaderLink href="https://github.com/Nadwey/systemy-liczb" target="_blank">Kod</HeaderLink>
                        </Group>
                    </Group>
                </Container>


            </AppShell.Header>

            <AppShell.Main>
                <Center w="100%">
                    <span className={styles.sectionTitle}>Konwersja systemów</span>
                </Center>
                <Center>
                    <Stack px="10%" w="100%" align="end">
                        {numberDisplays.map((numberDisplay) => {
                            return (
                                <NumDisplay
                                    key={numberDisplay.base}
                                    value={numberDisplay.value}
                                    onChange={numberUpdated}
                                    fontSize={numberDisplay.fontSize}
                                    base={numberDisplay.base}
                                    invalid={numberDisplay.invalid}
                                />
                            );
                        })}
                    </Stack>
                </Center>
            </AppShell.Main>

            <AppShell.Footer>
                <Center h="100%">
                    Bartosz K
                </Center>
            </AppShell.Footer>
        </AppShell>

    );
}

export default App;
