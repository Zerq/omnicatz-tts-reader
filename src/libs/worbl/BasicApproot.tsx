import { LinkLike } from "./Components/NavMenu/NavMenu.js";
import { IOC } from "./IOC.js";
import { JSX } from "./JSX.js";
import { BaseComponent } from "./BaseComponent.js";
import { IComponentRegistry, IRouter } from "./types.js";
export abstract class BasicAppRoot extends BaseComponent<unknown> {
    public constructor() {
        super();
        window.addEventListener("hashchange", e => {
            this.#router.HandleRoute(location.hash);
        });

    }

    public get router(): IRouter{
      return  this.#router;
    }

    #router = IOC.Instance.Service(IRouter);
    #componentRegistry = IOC.Instance.Service(IComponentRegistry);

    protected setInitialView(view: string) {
        requestAnimationFrame(() => {
            location.hash = view
            this.#router.HandleRoute(location.hash);
        });
    }

   
    public renderView(view: string, params: { [name: string]: any }, children: Array<string | HTMLElement>) {
        const result = this.#componentRegistry.CreateElement(view, params, children);
        this.Container.querySelector("main").innerHTML = "";
        result.Render();
        this.Container.querySelector("main").appendChild(result.Container);
    }

    protected abstract menuItems: Array<LinkLike>;

    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();
        return <div class="appContainer" id={this.Id}></div>;
    }

    public SetParam(name: string, value: any) { }
}