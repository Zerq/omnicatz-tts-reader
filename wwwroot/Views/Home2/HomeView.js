var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeView_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";
let HomeView = HomeView_1 = class HomeView extends BaseComponent {
    ViewAsync;
    Name;
    constructor() {
        super();
        this.Model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
        this.Render();
    }
    makeContainer() {
        return this.makeContainerDefault(HomeView_1, { class: "HomeView ViewComponent" });
    }
    SetParam(name, value) {
        if (name === "Name") {
            this.Name = value;
        }
        if (this.IsInitialized) {
            this.Render();
        }
    }
    changed(e) {
        console.log("checkbox changed to " + e.detail);
    }
    View() {
        return JSX(__frag, null,
            JSX("box", { orientation: "V" },
                JSX("div", null, "Bork1-1 ghjjg jgh jg jgh jg ghj ghjg fdgdfgd gfd dgdf gddgf gd gd g df dgdfgdg "),
                JSX("div", null, "Bork1-2"),
                JSX("div", null,
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
                            JSX("br", null))))));
    }
};
HomeView = HomeView_1 = __decorate([
    Route("#home"),
    Component("home-view"),
    __metadata("design:paramtypes", [])
], HomeView);
export { HomeView };
//# sourceMappingURL=HomeView.js.map