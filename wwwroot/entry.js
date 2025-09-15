var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IOC } from "./libs/worbl/IOC.js";
import "./libs/worbl/MetaData.js";
import "./libs/worbl/ComponentRegistry.js";
import "./libs/worbl/Router.js";
import "./libs/worbl/JSX.js";
import { JSX, __frag } from "./libs/worbl/JSX.js";
import { CSS } from "./libs/worbl/CSS.js";
import { Component } from "./libs/worbl/Component.js";
import "./libs/worbl/Components/NavMenu/NavMenu.js";
import "./components/Box/Box.js";
import "./components/TabView/TabView.js";
import { BasicAppRoot } from "./libs/worbl/BasicApproot.js";
import "./Views/Home/HomeView.js";
import "./Views/about/AboutView.js";
import { IRouter } from "./libs/worbl/types.js";
let AppComponent = class AppComponent extends BasicAppRoot {
    ViewAsync;
    Route(router) {
    }
    menuItems = [{ Name: "Home", Url: "#home" }, { Name: "About", Url: "#about" }];
    constructor() {
        super();
        this.setInitialView("#home");
        IOC.Instance.Service(IRouter).defaultRouteHandler = (tag, params) => {
            this.renderView(tag, params, []);
        };
    }
    View() {
        return JSX(__frag, null,
            JSX("main", { class: "MyApp" }));
    }
};
AppComponent = __decorate([
    CSS("/layout.css"),
    Component("my-app"),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
(() => {
    document.body.appendChild(JSX("my-app", null));
})();
//# sourceMappingURL=entry.js.map