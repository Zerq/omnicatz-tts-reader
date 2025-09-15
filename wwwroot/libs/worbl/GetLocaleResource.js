import { whiteList } from "../../locals/config.js";
export async function GetLocaleResource(template) {
    if (whiteList.length == 0) {
        throw new Error("Must white list at least one language");
    }
    let lang = navigator.language;
    if (whiteList.indexOf(lang) - 1) {
        lang = whiteList[0];
    }
    const i = await import(`${location.origin}/locals/${template.name}_${lang}.js`);
    let ctr = i[`${template.name}_${lang}`];
    return new ctr();
}
//# sourceMappingURL=GetLocaleResource.js.map