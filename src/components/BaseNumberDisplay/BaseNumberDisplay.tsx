import { ActionIcon, Space } from "@mantine/core";
import styles from "./BaseNumberDisplay.module.css";
import { IconTrash } from "@tabler/icons-react";

interface BaseNumberDisplayProps {
    value: string;
    editable: boolean;
    base: string;
    onChange: (value: string) => void;
    size: number;
    denyDeletion: boolean;
    onDelete?: () => void;
    invalid: boolean;
}

export default function BaseNumberDisplay({ value, editable, base, onChange, size, denyDeletion, onDelete, invalid }: BaseNumberDisplayProps) {
    function _onChange(_value: any) {
        if (editable) onChange(_value.target.value);
    }

    function _onDelete() {
        if (!denyDeletion) onDelete?.();
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
                    fontSize: `${size}rem`,
                }}
                disabled={!editable}
                className={styles.BaseNumberDisplay}
                onChange={_onChange}
                type="text"
                value={value}
            />
            <span
                style={{
                    display: "inline-block",
                    transform: "translateY(5px)",
                    marginLeft: "4px",
                    fontSize: `${size / 3}rem`,
                }}
            >
                {base}
            </span>
            <Space w="sm" />
            {denyDeletion ? null : (
                <ActionIcon onClick={_onDelete} size={`${size}rem`} variant="transparent" color="red">
                    <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>
            )}
        </div>
    );
}
