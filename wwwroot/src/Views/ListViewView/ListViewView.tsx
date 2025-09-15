
import { FieldGetter, IconLike, IconSouceLikeLike } from "../../components/ListView/ListView.js";
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";

type TestTypeItem = { burklax: number, blarg: boolean, splarg: string };

type TestType = {
    checked: boolean,
    data: Array<TestTypeItem>;
}

export class MyIconSource implements IconSouceLikeLike {
    GetIcon(key: string): Promise<IconLike> {
        throw new Error("Method not implemented.");
    }
}




class ListViewModel<T> {
    Data: Array<T>;
}


@Route("#listviewview")
@Component("ListView-View")
export class ListViewView<T> extends BaseComponent<T> {

    Name: string;

    public constructor() {
        super();
        this.Model = {} as T;
        this.Render();
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(ListViewView, { class: "ListViewView ViewComponent" });
    }

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "name") {
            this.Name = value;
        }

        if (name.toLowerCase() === "iconSource"){

        }

        if (name.toLowerCase() === "data"){


        }


        if (this.IsInitialized) {
            this.RenderAsync();
        }
    }

    changed(e: CustomEvent) {
        console.log("checkbox changed to " + e.detail);
    }




    private testData = new Array<TestTypeItem>(
        { burklax: 1, blarg: false, splarg: "a" } as TestTypeItem,
        { burklax: 2, blarg: true, splarg: "b" } as TestTypeItem,
        { burklax: 3, blarg: false, splarg: "c" } as TestTypeItem,
        { burklax: 4, blarg: false, splarg: "d" } as TestTypeItem,
        { burklax: 5, blarg: true, splarg: "e" } as TestTypeItem
    );

    private getters: Array<FieldGetter<TestTypeItem>> = [
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


    protected View(): HTMLElement {
        return <></>;
    }

    protected ViewAsync?: () => Promise<HTMLElement> = async () => {
        return <>
            <listview
                data={this.testData}
                getters={(n: TestTypeItem) => n.splarg}
            ></listview>
        </>;
    };
}
