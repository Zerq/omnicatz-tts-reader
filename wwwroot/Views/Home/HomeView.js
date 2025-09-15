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
class Book {
    Name;
    RawText;
    Selected;
    Pages;
    IsPlaying = false;
}
function readInChunks(file) {
    return new Promise((resolve, reject) => {
        let CHUNK_SIZE = 512 * 1024; // 512KB
        let offset = 0;
        let reader = new FileReader();
        let text = "";
        reader.onload = function (event) {
            if (event.target.result["length"] || event.target.result.length > 0) {
                text += event.target.result;
                offset += CHUNK_SIZE;
                readNext();
            }
            else {
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
let HomeView = HomeView_1 = class HomeView extends BaseComponent {
    #lineCountPerPage = 5;
    Name;
    constructor() {
        super();
        this.Model = {};
        this.Render();
        this.#getVoicesAsync();
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
    #select = (index) => {
        this.Model.Selected = index;
        this.Render();
    };
    #load = async () => {
        return new Promise(async (resolve, reject) => {
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
            const files = await window.showOpenFilePicker(pickerOpts);
            if (files.length === 1) {
                let fileData = await (await files[0].getFile());
                this.Model = new Book();
                this.Model.Name = fileData.name;
                document.title = "Omnicatz Speech reader: " + fileData.name;
                this.Model.Pages = [];
                const model = JSON.parse(localStorage.getItem(this.Model.Name));
                if (model) {
                    this.Model.Selected = model.bookmark;
                    this.#getVoicesAsync().then(voices => {
                        this.#voice = voices.find(n => n.name === this.Model.Name);
                    });
                }
                else {
                    this.Model.Selected = 0;
                }
                const rawText = (await readInChunks(fileData)).replaceAll(/\n+/g, "\n");
                ;
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
    #back = () => {
        if (this.Model.Selected > 0) {
            this.Model.Selected--;
            this.RenderAsync().then();
            this.#save();
        }
    };
    #next = () => {
        if (this.Model.Selected < this.Model.Pages.length - 1) {
            this.Model.Selected++;
            this.RenderAsync().then();
            this.#save();
        }
    };
    #save = () => {
        localStorage.setItem(this.Model.Name, JSON.stringify({ bookmark: this.Model.Selected, voice: this.#voice.name }));
    };
    #uterance;
    #pauseAsync(timeout) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
    #getVoicesAsync = async () => {
        return new Promise((resolve, reject) => {
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
    #eject = () => {
        this.Model = undefined;
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        this.#uterance = undefined;
        this.Render();
    };
    #play = () => {
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
    #pause = () => {
        if (this.#uterance) {
            speechSynthesis.pause();
            this.Model.IsPlaying = false;
        }
    };
    View() {
        return JSX("div", null,
            JSX("button", { onClick: this.#load }, "Load"));
    }
    #voice;
    #voices;
    #changeVoice = (e) => {
        const ctrl = e.target;
        this.#getVoicesAsync().then(voices => {
            this.#voice = voices.find(n => n.name === ctrl.value);
        });
    };
    ViewAsync = async () => {
        const voices = await this.#getVoicesAsync();
        if (this.Model.Pages === undefined) {
            return JSX("div", null,
                JSX("button", { onClick: this.#load }, "Load"));
        }
        return JSX(__frag, null,
            JSX("box", { orientation: "V" },
                JSX("nav", { class: "controlls" },
                    JSX("span", { class: "title" }, this.Model.Name),
                    JSX("select", { onInput: this.#changeVoice }, ...voices.map(n => {
                        let attr = {};
                        if (this.#voice && this.#voice.name === n.name) {
                            attr["selected"] = "";
                        }
                        return JSX("option", { ...attr, value: n.name },
                            n.name,
                            " (",
                            n.lang,
                            ")");
                    })),
                    JSX("div", { class: "pages" },
                        JSX("button", { onClick: this.#back }, "\u2B05\uFE0F"),
                        JSX("span", null, this.Model.Selected + 1),
                        " ",
                        JSX("span", null, "of"),
                        " ",
                        JSX("span", null, this.Model.Pages.length),
                        JSX("button", { onClick: this.#next }, "\u27A1\uFE0F")),
                    JSX("button", { class: "play", onClick: this.#play }, "\u23EF\uFE0F"),
                    JSX("button", { class: "eject", onClick: this.#eject }, "\uD83D\uDD3C")),
                JSX("article", { class: "spring" }, ...this.Model.Pages[this.Model.Selected].map(n => JSX("p", null, n)))));
    };
};
HomeView = HomeView_1 = __decorate([
    Route("#home"),
    Component("home-view"),
    __metadata("design:paramtypes", [])
], HomeView);
export { HomeView };
//# sourceMappingURL=HomeView.js.map