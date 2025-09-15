var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NavMenu_1;
import { Component } from "../../Component.js";
import { CSS } from "../../CSS.js";
import { JSX } from "../../JSX.js";
import { BaseComponent } from "../../BaseComponent.js";
let NavMenu = NavMenu_1 = class NavMenu extends BaseComponent {
    ViewAsync;
    get Component() {
        return this;
    }
    constructor() {
        super();
        this.Model = { Title: "", Items: [] };
        this.Render();
    }
    makeContainer() {
        return this.makeContainerDefault(NavMenu_1, { class: "navMenu" });
    }
    SetParam(name, value) {
        if (name.toLowerCase() === "title") {
            this.Model.Title = value;
        }
        if (name.toLowerCase() === "items") {
            this.Model.Items = value;
        }
        this.Render();
    }
    View() {
        return JSX("header", null,
            JSX("span", { class: "branding" },
                JSX("h1", null, this.Model.Title)),
            JSX("nav", null,
                JSX("ul", null, ...this.Model.Items.map(n => JSX("li", null,
                    JSX("a", { href: n.Url }, n.Name))))));
    }
};
NavMenu = NavMenu_1 = __decorate([
    Component("nav-box"),
    CSS("./NavMenu.css", import.meta),
    __metadata("design:paramtypes", [])
], NavMenu);
export { NavMenu };
//# sourceMappingURL=NavMenu.js.map