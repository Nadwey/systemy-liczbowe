import { ActionIcon, Container, Drawer, Space, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function BaseConversionInfo() {
    const [opened, setOpened] = useState(false);

    return <>
        <ActionIcon style={{
            verticalAlign: "middle"
        }} size="3rem" color="darkgray" variant="transparent" onClick={() => { setOpened(true); }}>
            <IconInfoCircle style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>

        <Drawer overlayProps={{
            blur: 20,
            color: "#202020"
        }} title="Konwersja Systemów" withCloseButton position="right" size="100%" opened={opened} onClose={() => { setOpened(false); }}>
            <Container  maw="1000px">
                <Title order={2}>Konwertowanie z systemu dziesiętnego</Title>
                <Space h="xs" />
                Tu w przyszłości będą ciekawe rzeczy.
            </Container>
        </Drawer>
    </>
}
