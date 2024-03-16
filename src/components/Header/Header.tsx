import { Container, Group } from "@mantine/core";
import HeaderLink from "./HeaderLink";

export default function Header() {
    return (
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
    );
}
