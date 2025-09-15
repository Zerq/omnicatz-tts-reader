import { IOC, RegisterService } from "./IOC.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr, IComponentRegistry, IRouter } from "./types.js";
import { Routmappinng } from "./Routmappinng.js";
export type ParamsObj = { [key: string]: string };

@RegisterService(IRouter)
export class Router implements IRouter {

    private componentRegistry = IOC.Instance.Service(IComponentRegistry);

    private Parse(format: string, data: string): ParamsObj|undefined {
        const rex = /({([^^}]*)})(.?)/g;
        const formatRex = new RegExp(format.replace(rex, "(?<$2>[^\\$3])$3").replace("[^\\]", ".*"), "g");
        const matches = formatRex.exec(data)
        return matches?.groups!;
    }

    public defaultRouteHandler?: (tag, params: ParamsObj) => void;


    public HasMatch(hash: string): boolean {
        const keys =  Array.from(this.routeMappings.keys());
        for (let x in keys){
            let key = keys[x];
            let val = this.routeMappings.get(key);


            const parsed = key.replaceAll(/({([^^}]*)})(.?)/g, "(?<$2>.*)");
            
            const leftOvers = hash.replace(new RegExp(parsed), "");

            if (leftOvers === ""){ //new RegExp(parsed).test(hash)) {
                const params = this.Parse(key, hash);
                const route = this.routeMappings.get(key);
                const func = route?.func;

                if (func) { 
                  return true;
                }
                else {                    
                    if (route=== undefined){
                       return false;
                    }
                    return true;
                    break;
                }
            }
        }
    }


    public HandleRoute(hash: string) {

        
        const keys =  Array.from(this.routeMappings.keys());
        for (let x in keys){
            let key = keys[x];
            let val = this.routeMappings.get(key);


            const parsed = key.replaceAll(/({([^^}]*)})(.?)/g, "(?<$2>.*)");
            const leftOvers = hash.replace(new RegExp(parsed), "");

            
            if (leftOvers === "") {
                const params = this.Parse(key, hash);
                const route = this.routeMappings.get(key);
                const func = route?.func;

                if (func) {void
                    func(params ? params : {});
                    break;
                }
                else {                    
                    if (route=== undefined){
                        throw new Error("Route not defined");
                    }
                    const tag = this.componentRegistry.GetTagByCtrName(route.ctrName);
                    this.defaultRouteHandler?.(tag, params ? params : {});
                    break;
                }
            }


        }
    };

    public routeMappings: Map<string, Routmappinng> = new Map();
}

export function Route<V, T extends BaseComponent<V>>(path: string) {
    return (ctor: Ctr<T>) => {
        const service = IOC.Instance.Service(IRouter);
        service.routeMappings.set(path, new Routmappinng(ctor.name));
    };
}
