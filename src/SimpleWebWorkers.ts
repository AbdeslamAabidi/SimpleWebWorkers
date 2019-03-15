/**
 * Name: Simple Web Workers v0.1
 */

const constants = {
    udf: undefined,
    udf_str: "undefined",
}

class WokerOperations {

    private w: Worker;
    private worker_js: string;

    constructor(obj: any) {

        if(Object.prototype.toString.call(obj) === '[object Function]') {
            // console.log("FUNCTION");
            this.worker_js = this.fn2workerURL(obj);
        }
        else if(Object.prototype.toString.call(obj) === '[object String]') {
            // console.log("STRING");
            this.worker_js = obj;
        }
    }

    public start(): void {
         //console.log("START");
        if(this.supported()) {
            if(this.exist()) {
                this.w = new Worker(this.worker_js);
            }
        }

        this.message();
    }

    public stop(): void {
        // console.log("STOP");
        if(!this.exist()) {
            this.reset();
        }
    }

    private fn2workerURL(fn) {
        var blob = new Blob(['('+fn.toString()+')()'], {type: 'application/javascript'});
        return URL.createObjectURL(blob);
    }

    private message() {
        this.w.onmessage = function(event) {
            console.log(event.data);
        };
    }

    private error() {
        this.w.onerror = function(error) {
            console.log('Worker error: ' + error.message + '\n');
            throw error;
        };
    }

    private reset() {
        this.w.terminate();
        this.w = constants.udf;
    }

    private supported() {
        return this.type() !== constants.udf_str;
    }

    private exist() {
        return typeof(this.w) == constants.udf_str;
    }

    private type() {
        return typeof(Worker);
    }
}

function $_w(obj: any) {
    return new WokerOperations(obj);
}
