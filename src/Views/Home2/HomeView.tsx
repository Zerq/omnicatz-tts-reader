import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";

type TestTypeItem = { burklax: number, blarg: boolean, splarg: string };

type TestType = {
    checked: boolean,
    list: Array<TestTypeItem>;
}

@Route("#home")
@Component("home-view")
export class HomeView extends BaseComponent<TestType> {
    protected ViewAsync?: () => Promise<HTMLElement>;
    Name: string;

    public constructor() {
        super();
        this.Model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
        this.Render();
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(HomeView, { class: "HomeView ViewComponent" });
    }

    public SetParam(name: string, value: any) {
        if (name === "Name") {
            this.Name = value;

        }
        if (this.IsInitialized) {
            this.Render();
        }
    }

    changed(e: CustomEvent) {
        console.log("checkbox changed to " + e.detail);
    }

    protected View(): HTMLElement {
        return <>
            <box orientation="V">
 
                        <div>Bork1-1 ghjjg jgh jg jgh jg ghj ghjg fdgdfgd gfd dgdf gddgf gd gd g df dgdfgdg </div>
                        <div>Bork1-2</div>
                        <div> 

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
            

                        </div>
 


  
            </box>
        </>;
    }
}
