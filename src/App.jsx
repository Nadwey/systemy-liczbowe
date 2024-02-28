import styles from "./App.module.css";
import { AppShell, Center, Container, Group, Stack } from "@mantine/core";
import HeaderLink from "./components/HeaderLink.jsx";
import { BaseConvertion } from "./konwersja-systemow/BaseConversion.jsx";
import BinaryRepresentation from "./binary-representation/BinaryRepresentation.jsx";

function App() {
    return (
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 40 }}>
            <AppShell.Header
                style={{
                    backgroundColor: "#00000080",
                    backdropFilter: "blur(5px)",
                }}
            >
                <Container
                    h={60}
                    display="flex"
                    style={{
                        alignItems: "center",
                        maxWidth: "1100px",
                    }}
                >
                    <Group w="100%" justify="space-between">
                        <Group>
                            <span
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: "900",
                                    fontSize: "1.4rem",
                                }}
                            >
                                Systemy Liczbowe
                            </span>
                            - Bartosz K
                        </Group>

                        <Group>
                            <HeaderLink href="https://github.com/Nadwey/systemy-liczbowe" target="_blank">
                                Kod
                            </HeaderLink>
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>

            <AppShell.Main>
                <Center w="100%">
                    <span className={styles.sectionTitle}>Konwersja systemów</span>
                </Center>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20vh",
                }}>
                    <Stack px="10%" w="100%" h="100%" align="end">
                        <BaseConvertion />
                    </Stack>
                </div>
                <Center w="100%">
                    <span className={styles.sectionTitle}>Reprezentacja binarna</span>
                </Center>
                <Center w="100%">
                    <BinaryRepresentation />
                </Center>
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
