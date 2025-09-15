var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ListView_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { __frag, JSX } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";
export function IsValidRenederMode(val) {
    return val === "Big" || val === "Small" || val === "List";
}
let ListView = ListView_1 = class ListView extends BaseComponent {
    ViewAsync;
    constructor() {
        super();
        this.Model = {};
        this.Model.RenderMode = "List";
    }
    makeContainer() {
        return this.makeContainerDefault(ListView_1, { "class": "ListView" });
    }
    SetParam(name, value) {
        if (name.toLowerCase() === "data" && typeof (value) === "object" && Object.getPrototypeOf(value).constructor.name === "Array") {
            this.Model.Data = value;
        }
        if (name.toLowerCase() === "iconsource" && typeof (value) === "object") {
            this.Model.IconSource = value;
        }
        if (name.toLowerCase() === "geticon" && typeof (value) === "function") {
            this.Model.GetIcon = value;
        }
        if (name.toLowerCase() === "getters" && typeof (value) === "object" && Object.getPrototypeOf(value).constructor.name === "Array") {
            this.Model.Getters = value;
        }
        if (name.toLowerCase() === "selection" && typeof (value) === "object") {
            this.Model.Selection = value;
        }
        if (name.toLowerCase() === "rendermode" && IsValidRenederMode(value)) {
            this.Model.RenderMode = value;
        }
        if (this.IsInitialized) {
            this.RenderAsync().then();
        }
    }
    #RenderAsync = async () => {
        if (!this.Model) {
            return JSX(__frag, null);
        }
        if (!this.Model.Data) {
            return JSX(__frag, null);
        }
        if (!this.Model.GetIcon) {
            return JSX(__frag, null);
        }
        if (!this.Model.IconSource) {
            return JSX(__frag, null);
        }
        if (this.Model.RenderMode === "Big") {
            return JSX("div", { class: "BigList" }, ...await this.Model.Data.map(async (n) => {
                let key = this.Model.GetIcon(n);
                let icon = await this.Model.IconSource.GetIcon(key);
                let iconPath = icon.Vector ?? icon.Icon256 ?? icon.Icon128 ?? icon.Icon64 ?? icon.Icon48 ?? icon.Icon32 ?? icon.Icon16;
                return JSX("div", null,
                    JSX("img", { src: iconPath, alt: icon.Alt }),
                    this.Model.Getters.map(x => {
                        JSX("span", { title: x.Title }, "return x.Getter(n)");
                    }));
            }));
        }
        if (this.Model.RenderMode === "Small") {
            return JSX("div", { class: "SmallList" }, ...await this.Model.Data.map(async (n) => {
                let key = this.Model.GetIcon(n);
                let icon = await this.Model.IconSource.GetIcon(key);
                let iconPath = icon.Vector ?? icon.Icon48 ?? icon.Icon32 ?? icon.Icon16;
                return JSX("div", null,
                    JSX("img", { src: iconPath, alt: icon.Alt }),
                    ...this.Model.Getters.map(x => {
                        JSX("span", { title: x.Title }, "return x.Getter(n)");
                    }));
            }));
        }
        if (this.Model.RenderMode === "List") {
            return JSX("table", { class: "List" },
                JSX("thead", null,
                    JSX("tr", null, ...this.Model.Getters.map(x => {
                        JSX("td", null, x.Title);
                    }))),
                JSX("tbody", null, ...this.Model.Data.map(n => {
                    return JSX("tr", null, ...this.Model.Getters.map(x => {
                        JSX("td", null, "return x.Getter(n)");
                    }));
                })));
        }
        return JSX(__frag, null);
    };
    View() {
        return JSX(__frag, null);
    }
};
ListView = ListView_1 = __decorate([
    CSS("./ListView.css", import.meta),
    Component("listview"),
    __metadata("design:paramtypes", [])
], ListView);
export { ListView };
//# sourceMappingURL=ListView.js.map