import { ActionIcon, Space } from "@mantine/core";
import styles from "./NumDisplay.module.css";
import { IconTrash } from "@tabler/icons-react";

export default function NumInput({ fontSize, value, onChange, onDelete, base, invalid }) {
    function _onChange(_value) {
        onChange(_value.target.value, base);
    }

    function _onDelete() {
        onDelete(base);
    }

    return (
        <div
            className={styles.container}
            style={{
                borderBottom: invalid ? "solid 1px #ff0000" : "solid 1px transparent",
            }}
        >
            <input
                style={{
                    fontSize,
                }}
                className={styles.NumDisplay}
                onChange={_onChange}
                type="text"
                value={value}
            />
            <span
                style={{
                    display: "inline-block",
                    transform: "translateY(5px)",
                    marginLeft: "4px",
                }}
            >
                {base}
            </span>
            <Space w="sm" />
            {base !== 10 ? ( // nie pokazuj przycisku usuwania przy systemie dziesiętnym
                <ActionIcon onClick={_onDelete} size={fontSize} variant="transparent" color="red">
                    <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>
            ) : null}
        </div>
    );
}
