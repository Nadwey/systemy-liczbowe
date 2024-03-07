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
            blur: 15,
            color: "#222222"
        }} title="Konwersja Systemów" withCloseButton position="right" size="100%" opened={opened} onClose={() => { setOpened(false); }}>
            <Container  maw="1000px">
                <Title order={2}>Konwertowanie z systemu dziesiętnego</Title>
                <Space h="xs" />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid neque temporibus dignissimos atque optio molestias, ipsum esse mollitia ad non quas voluptatibus, cupiditate et est expedita similique dolorem perspiciatis nemo!
            </Container>
        </Drawer>
    </>
}
