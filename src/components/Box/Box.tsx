import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { __frag, JSX } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";

declare type Orientation = "Vertical" | "Horizontal"| "V" | "H";

@CSS("./Box.css", import.meta)
@Component("box")
export class Box extends BaseComponent<Orientation> {
    protected ViewAsync?: () => Promise<HTMLElement>;
    protected makeContainer(): HTMLElement {
        const defaultOrientation: Orientation = "Vertical";
        return this.makeContainerDefault(Box, { "class": "Box", "data-orientation": defaultOrientation } as any);
    }

    public SetParam(name: string, value: any) {
        if (name === "orientation") {
            this.Model = value as Orientation;
            this.Container.setAttribute("data-orientation", this.Model);
        }
    }

    protected View(): HTMLElement {
        if (typeof( this.children) === "object" && Object.getPrototypeOf(this.children).constructor.name === "Array"){
            return <>{...this.children}</>;
        }
    
        return <div></div>;
    }
}