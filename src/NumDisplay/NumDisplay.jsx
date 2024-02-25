import styles from "./NumDisplay.module.css";

export default function NumInput({ fontSize, value, onChange, base, invalid }) {
    function _onChange(_value) {
        onChange(_value.target.value, base);
    }

    console.log(invalid);

    return (
        <div className={styles.container} style={{
            borderBottom: invalid ? "solid 1px #ff0000" : "solid 1px transparent"
        }}>
            <input
                style={{
                    fontSize,
                }}
                className={styles.NumDisplay}
                onChange={_onChange}
                type="text"
                value={value}
            />
            <span style={{
                display: "inline-block",
                transform: "translateY(5px)",
                marginLeft: "4px"
            }}>{base}</span>
        </div>
    );
}
