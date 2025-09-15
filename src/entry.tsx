
import { IOC } from "./libs/worbl/IOC.js";
import "./libs/worbl/MetaData.js";
import "./libs/worbl/ComponentRegistry.js";
import "./libs/worbl/Router.js";
import "./libs/worbl/JSX.js"


import { JSX, __frag } from "./libs/worbl/JSX.js"
import { CSS } from "./libs/worbl/CSS.js"



import { Component } from "./libs/worbl/Component.js";
import "./libs/worbl/Components/NavMenu/NavMenu.js";
import "./components/Box/Box.js";
import "./components/TabView/TabView.js";

import { LinkLike } from "./libs/worbl/Components/NavMenu/NavMenu.js";
import { BasicAppRoot } from "./libs/worbl/BasicApproot.js";
import "./Views/Home/HomeView.js";
import "./Views/about/AboutView.js";

import { IRouter } from "./libs/worbl/types.js";


@CSS("/layout.css")
@Component("my-app")
export class AppComponent extends BasicAppRoot {
    protected ViewAsync?: () => Promise<HTMLElement>;
    public Route(router: IRouter) {
    }

    protected menuItems: LinkLike[] = [{ Name: "Home", Url: "#home" }, { Name: "About", Url: "#about" }]

    public constructor() {
        super();
        this.setInitialView("#home")
        IOC.Instance.Service(IRouter).defaultRouteHandler = (tag, params) => {
            this.renderView(tag, params, []);
        };
    }

    protected View(): HTMLElement {
        return <>
             
            <main class="MyApp">
            </main>
        </>;
    }
}

(() => {



    document.body.appendChild(<my-app></my-app>);
})();