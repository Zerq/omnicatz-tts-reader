var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TabView_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { __frag, JSX } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";
let TabView = TabView_1 = class TabView extends BaseComponent {
    ViewAsync;
    constructor() {
        super();
        this.Model = 0;
    }
    makeContainer() {
        return this.makeContainerDefault(TabView_1, { "class": "TabView" });
    }
    SetParam(name, value) {
        if (name === "index") {
            this.Model = value;
        }
    }
    #click = (index) => {
        this.Model = index;
        this.Render();
    };
    View() {
        if (typeof (this.children) === "object" && Object.getPrototypeOf(this.children).constructor.name === "Array") {
            return JSX(__frag, null,
                JSX("ul", null, ...this.children.map((n, index) => {
                    if (index === this.Model) {
                        return JSX("li", { class: "selected", onClick: e => this.#click(index) }, n.title);
                    }
                    else {
                        return JSX("li", { onClick: e => this.#click(index) }, n.title);
                    }
                })),
                this.children[this.Model]);
        }
        return JSX(__frag, null);
    }
};
TabView = TabView_1 = __decorate([
    CSS("./TabView.css", import.meta),
    Component("tabview"),
    __metadata("design:paramtypes", [])
], TabView);
export { TabView };
//# sourceMappingURL=TabView.js.map