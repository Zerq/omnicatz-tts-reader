var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Box_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { __frag, JSX } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";
let Box = Box_1 = class Box extends BaseComponent {
    ViewAsync;
    makeContainer() {
        const defaultOrientation = "Vertical";
        return this.makeContainerDefault(Box_1, { "class": "Box", "data-orientation": defaultOrientation });
    }
    SetParam(name, value) {
        if (name === "orientation") {
            this.Model = value;
            this.Container.setAttribute("data-orientation", this.Model);
        }
    }
    View() {
        if (typeof (this.children) === "object" && Object.getPrototypeOf(this.children).constructor.name === "Array") {
            return JSX(__frag, null, ...this.children);
        }
        return JSX("div", null);
    }
};
Box = Box_1 = __decorate([
    CSS("./Box.css", import.meta),
    Component("box")
], Box);
export { Box };
//# sourceMappingURL=Box.js.map