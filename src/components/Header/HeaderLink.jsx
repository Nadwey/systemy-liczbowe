import { IconExternalLink } from "@tabler/icons-react";
import styles from "./HeaderLink.module.css";

export default function HeaderLink({ href, target, children }) {
    let isExternal = false;

    try {
        const hrefHostname = new URL(href).hostname;
        const currentHostname = new URL(window.location.href).hostname;

        isExternal = hrefHostname !== currentHostname;
    } catch {
        isExternal = true;
    }

    return (
        <a className={styles.link} href={href} target={target}>
            {children}
            <IconExternalLink
                style={{
                    verticalAlign: "text-bottom",
                }}
                stroke={2}
                size={24}
            />
        </a>
    );
}
