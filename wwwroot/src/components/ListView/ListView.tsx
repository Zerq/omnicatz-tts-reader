import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { __frag, JSX } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";
 

export interface IconLike {
    Vector?: string;
    Icon16?: string;
    Icon32?: string;
    Icon48?: string;
    Icon64?: string;
    Icon128?: string;
    Icon256?: string;
    Alt: string;
}

export interface IconSouceLikeLike {
    GetIcon(key: string): Promise<IconLike>;
}

export type ListViewRenderMode = "Big" | "Small" | "List";
export function IsValidRenederMode(val: unknown) {
    return val === "Big" || val === "Small" || val === "List";
}

export interface Seleciton {
    Start?: number;
    End?: number;
    Indexes?: Array<number>;
}

export interface FieldGetter<T> {
    Title: string;
    Getter: (item: T) => string;
}

export interface ListViewModelLike<T> {
    IconSource: IconSouceLikeLike;
    RenderMode: ListViewRenderMode;
    Data: Array<T>;
    Getters: Array<FieldGetter<T>>;
    Selection: Selection;
    GetIcon: (item: T) => string;
}

@CSS("./ListView.css", import.meta)
@Component("listview")
export class ListView<T> extends BaseComponent<ListViewModelLike<T>> {
    protected ViewAsync?: () => Promise<HTMLElement>;
   
    public constructor() {
        super();
        this.Model = {} as ListViewModelLike<T>;
        this.Model.RenderMode = "List";
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(ListView, { "class": "ListView" } as any);
    }

    public SetParam(name: string, value: any) {
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


    readonly #RenderAsync = async () => {
        if (!this.Model) {
            return <></>;
        }

        if (!this.Model.Data) {
            return <></>;
        }

        if (!this.Model.GetIcon) {
            return <></>;
        }

        if (!this.Model.IconSource) {
            return <></>;
        }

        if (this.Model.RenderMode === "Big") {
            return <div class="BigList">
                {... await this.Model.Data.map(async n => {
                    let key = this.Model.GetIcon(n);
                    let icon = await this.Model.IconSource.GetIcon(key);
                    let iconPath = icon.Vector ?? icon.Icon256 ?? icon.Icon128 ?? icon.Icon64 ?? icon.Icon48 ?? icon.Icon32 ?? icon.Icon16;
                    return <div>
                        <img src={iconPath} alt={icon.Alt} />
                        {this.Model.Getters.map(x => {
                            <span title={x.Title}>
                                return x.Getter(n)
                            </span>
                        })}
                    </div>;
                })}
            </div>;
        }

        if (this.Model.RenderMode === "Small") {
            return <div class="SmallList">
                {...await this.Model.Data.map(async n => {
                    let key = this.Model.GetIcon(n);
                    let icon = await this.Model.IconSource.GetIcon(key);
                    let iconPath = icon.Vector ?? icon.Icon48 ?? icon.Icon32 ?? icon.Icon16;
                    return <div>
                        <img src={iconPath} alt={icon.Alt} />
                        {...this.Model.Getters.map(x => {
                            <span title={x.Title}>
                                return x.Getter(n)
                            </span>
                        })}
                    </div>;
                })}
            </div>;
        }

        if (this.Model.RenderMode === "List") {
            return <table class="List">
                <thead>
                    <tr>
                        {...this.Model.Getters.map(x => {
                            <td>
                                {x.Title}
                            </td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {...this.Model.Data.map(n => {
                        return <tr>

                            {...this.Model.Getters.map(x => {
                                <td>
                                    return x.Getter(n)
                                </td>
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>;
        }

        return <></>;
    };


    protected View(): HTMLElement {
      

 

        return <></>;
    }
}