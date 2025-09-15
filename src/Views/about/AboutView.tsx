import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";

@Route("#about")
@Route("#about/{page}")
@Component("about-view")
export class AboutView extends BaseComponent<unknown> {
    protected ViewAsync?: () => Promise<HTMLElement>;
    Name: string;
    public constructor() {
        super();

        this.Render();
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(AboutView,{ class: "AboutView ViewComponent"});
    }

    public SetParam(name: string, value: any) {
        if (name === "page"){
            window.document.title = value;
        }
    }

    protected View(): HTMLElement {
        return <>
            <tabview>
                <section title="test1">
                    dgfgd gdgf fdgfd gdf gdgd<br/>
                    dfgdg dfgdgff dfg gdgdgfg<br/>
                </section>
                <section title="test2">
                toiuo uio io uiou uio<br/>
                oi uio uio<br/>
                uiououio<br/>
                </section>              
            </tabview>


        </>;
    }
}
