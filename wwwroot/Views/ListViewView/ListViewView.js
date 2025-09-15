var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ListViewView_1;
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";
export class MyIconSource {
    GetIcon(key) {
        throw new Error("Method not implemented.");
    }
}
class ListViewModel {
    Data;
}
let ListViewView = ListViewView_1 = class ListViewView extends BaseComponent {
    Name;
    constructor() {
        super();
        this.Model = {};
        this.Render();
    }
    makeContainer() {
        return this.makeContainerDefault(ListViewView_1, { class: "ListViewView ViewComponent" });
    }
    SetParam(name, value) {
        if (name.toLowerCase() === "name") {
            this.Name = value;
        }
        if (name.toLowerCase() === "iconSource") {
        }
        if (name.toLowerCase() === "data") {
        }
        if (this.IsInitialized) {
            this.RenderAsync();
        }
    }
    changed(e) {
        console.log("checkbox changed to " + e.detail);
    }
    testData = new Array({ burklax: 1, blarg: false, splarg: "a" }, { burklax: 2, blarg: true, splarg: "b" }, { burklax: 3, blarg: false, splarg: "c" }, { burklax: 4, blarg: false, splarg: "d" }, { burklax: 5, blarg: true, splarg: "e" });
    getters = [
        {
            "Title": "Blarg",
            "Getter": n => n.blarg.toString()
        },
        {
            "Title": "Burklax",
            "Getter": n => n.burklax.toString()
        },
        {
            "Title": "Splarg",
            "Getter": n => n.splarg
        }
    ];
    View() {
        return JSX(__frag, null);
    }
    ViewAsync = async () => {
        return JSX(__frag, null,
            JSX("listview", { data: this.testData, getters: (n) => n.splarg }));
    };
};
ListViewView = ListViewView_1 = __decorate([
    Route("#listviewview"),
    Component("ListView-View"),
    __metadata("design:paramtypes", [])
], ListViewView);
export { ListViewView };
//# sourceMappingURL=ListViewView.js.map