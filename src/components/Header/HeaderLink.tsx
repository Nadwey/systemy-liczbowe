import { IconExternalLink } from "@tabler/icons-react";
import styles from "./HeaderLink.module.css";

interface HeaderLinkProps {
    href: string;
    target: string;
    children: React.ReactNode;
}

export default function HeaderLink({ href, target, children }: HeaderLinkProps) {
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
            {isExternal ?
                <IconExternalLink
                    style={{
                        verticalAlign: "text-bottom",
                    }}
                    stroke={2}
                    size={24}
                />
            :   null}
        </a>
    );
}
