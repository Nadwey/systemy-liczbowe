import styles from "./App.module.css";
import { AppShell, Center, Stack } from "@mantine/core";
import { BaseConvertion } from "./konwersja-systemow/BaseConversion.jsx";
import BinaryRepresentation from "./binary-representation/BinaryRepresentation.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
    return (
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 40 }}>
            <AppShell.Header
                style={{
                    backgroundColor: "#00000080",
                    backdropFilter: "blur(5px)",
                }}
            >
                <Header />
            </AppShell.Header>

            <AppShell.Main>
                <Center w="100%">
                    <span className={styles.sectionTitle}>Konwersja systemów</span>
                </Center>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "90vh",
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
