var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IOC, RegisterService } from "./IOC.js";
import { IComponentRegistry, IRouter } from "./types.js";
import { Routmappinng } from "./Routmappinng.js";
let Router = class Router {
    componentRegistry = IOC.Instance.Service(IComponentRegistry);
    Parse(format, data) {
        const rex = /({([^^}]*)})(.?)/g;
        const formatRex = new RegExp(format.replace(rex, "(?<$2>[^\\$3])$3").replace("[^\\]", ".*"), "g");
        const matches = formatRex.exec(data);
        return matches?.groups;
    }
    defaultRouteHandler;
    HasMatch(hash) {
        const keys = Array.from(this.routeMappings.keys());
        for (let x in keys) {
            let key = keys[x];
            let val = this.routeMappings.get(key);
            const parsed = key.replaceAll(/({([^^}]*)})(.?)/g, "(?<$2>.*)");
            const leftOvers = hash.replace(new RegExp(parsed), "");
            if (leftOvers === "") { //new RegExp(parsed).test(hash)) {
                const params = this.Parse(key, hash);
                const route = this.routeMappings.get(key);
                const func = route?.func;
                if (func) {
                    return true;
                }
                else {
                    if (route === undefined) {
                        return false;
                    }
                    return true;
                    break;
                }
            }
        }
    }
    HandleRoute(hash) {
        const keys = Array.from(this.routeMappings.keys());
        for (let x in keys) {
            let key = keys[x];
            let val = this.routeMappings.get(key);
            const parsed = key.replaceAll(/({([^^}]*)})(.?)/g, "(?<$2>.*)");
            const leftOvers = hash.replace(new RegExp(parsed), "");
            if (leftOvers === "") {
                const params = this.Parse(key, hash);
                const route = this.routeMappings.get(key);
                const func = route?.func;
                if (func) {
                    void func(params ? params : {});
                    break;
                }
                else {
                    if (route === undefined) {
                        throw new Error("Route not defined");
                    }
                    const tag = this.componentRegistry.GetTagByCtrName(route.ctrName);
                    this.defaultRouteHandler?.(tag, params ? params : {});
                    break;
                }
            }
        }
    }
    ;
    routeMappings = new Map();
};
Router = __decorate([
    RegisterService(IRouter)
], Router);
export { Router };
export function Route(path) {
    return (ctor) => {
        const service = IOC.Instance.Service(IRouter);
        service.routeMappings.set(path, new Routmappinng(ctor.name));
    };
}
//# sourceMappingURL=Router.js.map