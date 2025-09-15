import { ChangeEvent } from "react";
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";


class Book {
    Name: string;
    RawText: string;
    Selected: number;
    Pages: Array<Array<string>>;
    IsPlaying: boolean = false;
}




declare interface Xwindow extends Window {
    showOpenFilePicker(any): Promise<Array<FileSystemFileHandle>>
}


function readInChunks(file: File) {
    return new Promise<string>((resolve, reject) => {
        let CHUNK_SIZE = 512 * 1024; // 512KB
        let offset = 0;
        let reader = new FileReader();

        let text = "";

        reader.onload = function (event: ProgressEvent<FileReader>) {

            if (event.target.result["length"] || (event.target.result as string).length > 0) {
                text += event.target.result as string;
                offset += CHUNK_SIZE;
                readNext();
            } else {
                resolve(text);
            }
        };



        function readNext() {
            let slice = file.slice(offset, offset + CHUNK_SIZE);
            reader.readAsText(slice);
        }

        readNext();
    });

}





@Route("#home")
@Component("home-view")
export class HomeView extends BaseComponent<Book> {

    #lineCountPerPage = 5;
    Name: string;


    public constructor() {
        super();
        this.Model = {} as Book;
        this.Render();
        this.#getVoicesAsync();
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

    readonly #select = (index: number) => {
        this.Model.Selected = index;
        this.Render();
    };


    readonly #load = async () => {
        return new Promise<string>(async (resolve, reject) => {
            const pickerOpts = {
                types: [
                    {
                        description: "Text",
                        accept: {
                            "text/plain": [".txt"],
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
            };


            const files = await (window as unknown as Xwindow).showOpenFilePicker(pickerOpts);
            if (files.length === 1) {

                let fileData = await (await files[0].getFile())
                this.Model = new Book();
                this.Model.Name = fileData.name;
                document.title = "Omnicatz Speech reader: "+ fileData.name;


                this.Model.Pages = [];

                const model = JSON.parse(localStorage.getItem(this.Model.Name)) as { bookmark: number, voice: string };

                if (model) {
                    this.Model.Selected = model.bookmark;

                    this.#getVoicesAsync().then(voices => {
                        this.#voice = voices.find(n => n.name === this.Model.Name);
                    });

                } else {
                    this.Model.Selected = 0;
                }




                const rawText = (await readInChunks(fileData)).replaceAll(/\n+/g, "\n");;
                const lines = rawText.split("\n");



                var lineCount = 0;
                let pageLines = [];
                lines.forEach(line => {
                    pageLines.push(line);
                    lineCount++;

                    if (lineCount >= this.#lineCountPerPage) {
                        lineCount = 0;
                        pageLines = [];
                        this.Model.Pages.push(pageLines);
                    }
                });


                await this.RenderAsync();


            }
        });
    };

    readonly #back = () => {
        if (this.Model.Selected > 0) {
            this.Model.Selected--;
            this.RenderAsync().then();
            this.#save();
        }
    };

    readonly #next = () => {
        if (this.Model.Selected < this.Model.Pages.length - 1) {
            this.Model.Selected++;
            this.RenderAsync().then();
            this.#save();
        }
    };


    readonly #save = () => {



        localStorage.setItem(this.Model.Name, JSON.stringify({ bookmark: this.Model.Selected, voice: this.#voice.name }));

    };



    #uterance: SpeechSynthesisUtterance;

    #pauseAsync(timeout: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    readonly #getVoicesAsync = async () => {
        return new Promise<Array<SpeechSynthesisVoice>>((resolve, reject) => {

            if (this.#voices) {
                resolve(this.#voices);
            }


            window.speechSynthesis.onvoiceschanged = () => {
                const voices = window.speechSynthesis.getVoices();

                this.#voices = voices.sort((a, b) => `${a.lang}_${a.name}`.localeCompare(`${b.lang}_${b.name}`));

                resolve(voices);
            };



        });
    };


    readonly #eject = () => {
        this.Model = undefined;
        if (speechSynthesis.speaking){
            speechSynthesis.cancel();
        }

        this.#uterance = undefined;
     


        this.Render();
    };


    readonly #play = () => {

        if (speechSynthesis?.paused) {
            speechSynthesis.resume();
            return;
        }
        if (speechSynthesis?.speaking) {
            speechSynthesis.cancel();
            this.#uterance = null;
            return;
        }

        const text = this.Model.Pages[this.Model.Selected].join("\n");
        this.#uterance = new SpeechSynthesisUtterance(text);
        this.#uterance.voice = this.#voice;
        this.#uterance.lang = this.#voice.lang;
        this.#uterance.addEventListener("end", () => {
            this.#next();
            this.#play();
        });


        speechSynthesis.speak(this.#uterance);



    };
    readonly #pause = () => {
        if (this.#uterance) {
            speechSynthesis.pause();
            this.Model.IsPlaying = false;
        }

    };

    protected View(): HTMLElement {


        return <div>
            <button onClick={this.#load}>Load</button>
        </div>

    }

    #voice: SpeechSynthesisVoice;
    #voices: Array<SpeechSynthesisVoice>;




    readonly #changeVoice = (e: InputEvent) => {
        const ctrl = e.target as HTMLSelectElement;
        this.#getVoicesAsync().then(voices => {

            this.#voice = voices.find(n => n.name === ctrl.value);

        })

    };

    protected ViewAsync?: () => Promise<HTMLElement> = async () => {

        const voices = await this.#getVoicesAsync();

        if (this.Model.Pages === undefined) {
            return <div>
                <button onClick={this.#load}>Load</button>
            </div>
        }


 

        return <>
            <box orientation="V">
                <nav class="controlls">
                    <span class="title" >
                        {this.Model.Name}
                    </span>

                    <select onInput={this.#changeVoice}>
                        {...voices.map(n => { 
                            
                            let attr = {};
                            
                            if (this.#voice && this.#voice.name === n.name ){
                                 attr["selected"] = "";
                            }



                            return <option {...attr} value={n.name}>{n.name} ({n.lang})</option>;
                            
                            })}

                    </select>


                    <div class="pages">
                        <button onClick={this.#back}>⬅️</button>


                        <span>{this.Model.Selected + 1}</span> <span>of</span> <span>{this.Model.Pages.length}</span>



                        <button onClick={this.#next}>➡️</button>
                    </div>


                    <button class="play" onClick={this.#play}>⏯️</button>
                            <button class="eject" onClick={this.#eject}>🔼</button>

                </nav>
                <article class="spring">
                    {...this.Model.Pages[this.Model.Selected].map(n => <p>{n}</p>)}
                </article>
            </box>
        </>;
    };


}
