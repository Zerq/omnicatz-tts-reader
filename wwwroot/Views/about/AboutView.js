var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AboutView_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";
let AboutView = AboutView_1 = class AboutView extends BaseComponent {
    ViewAsync;
    Name;
    constructor() {
        super();
        this.Render();
    }
    makeContainer() {
        return this.makeContainerDefault(AboutView_1, { class: "AboutView ViewComponent" });
    }
    SetParam(name, value) {
        if (name === "page") {
            window.document.title = value;
        }
    }
    View() {
        return JSX(__frag, null,
            JSX("tabview", null,
                JSX("section", { title: "test1" },
                    "dgfgd gdgf fdgfd gdf gdgd",
                    JSX("br", null),
                    "dfgdg dfgdgff dfg gdgdgfg",
                    JSX("br", null)),
                JSX("section", { title: "test2" },
                    "toiuo uio io uiou uio",
                    JSX("br", null),
                    "oi uio uio",
                    JSX("br", null),
                    "uiououio",
                    JSX("br", null))));
    }
};
AboutView = AboutView_1 = __decorate([
    Route("#about"),
    Route("#about/{page}"),
    Component("about-view"),
    __metadata("design:paramtypes", [])
], AboutView);
export { AboutView };
//# sourceMappingURL=AboutView.js.map