import { JSX } from "./JSX.js";
export function CSS(href, meta) {
    if (!meta) {
        return (ctor) => {
            const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
            if (possiblecss.length === 0) {
                document.head.appendChild(JSX("link", { rel: "stylesheet", href: location.origin + href }));
            }
        };
    }
    const url = meta.resolve(href);
    if (url.startsWith("http")) {
        return (ctor) => {
            const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{url}"]`);
            if (possiblecss.length === 0) {
                document.head.appendChild(JSX("link", { rel: "stylesheet", href: url }));
            }
        };
    }
    return (ctor) => {
        const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
        if (possiblecss.length === 0) {
            document.head.appendChild(JSX("link", { rel: "stylesheet", href: href }));
        }
    };
}
//# sourceMappingURL=CSS.js.map