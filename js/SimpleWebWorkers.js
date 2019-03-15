/**
 * Name: Simple Web Workers v0.1
 */
var constants = {
    udf: undefined,
    udf_str: "undefined",
};
var WokerOperations = /** @class */ (function () {
    function WokerOperations(obj) {
        if (Object.prototype.toString.call(obj) === '[object Function]') {
            // console.log("FUNCTION");
            this.worker_js = this.fn2workerURL(obj);
        }
        else if (Object.prototype.toString.call(obj) === '[object String]') {
            // console.log("STRING");
            this.worker_js = obj;
        }
    }
    WokerOperations.prototype.start = function () {
        //console.log("START");
        if (this.supported()) {
            if (this.exist()) {
                this.w = new Worker(this.worker_js);
            }
        }
        this.message();
    };
    WokerOperations.prototype.stop = function () {
        // console.log("STOP");
        if (!this.exist()) {
            this.reset();
        }
    };
    WokerOperations.prototype.fn2workerURL = function (fn) {
        var blob = new Blob(['(' + fn.toString() + ')()'], { type: 'application/javascript' });
        return URL.createObjectURL(blob);
    };
    WokerOperations.prototype.message = function () {
        this.w.onmessage = function (event) {
            console.log(event.data);
        };
    };
    WokerOperations.prototype.error = function () {
        this.w.onerror = function (error) {
            console.log('Worker error: ' + error.message + '\n');
            throw error;
        };
    };
    WokerOperations.prototype.reset = function () {
        this.w.terminate();
        this.w = constants.udf;
    };
    WokerOperations.prototype.supported = function () {
        return this.type() !== constants.udf_str;
    };
    WokerOperations.prototype.exist = function () {
        return typeof (this.w) == constants.udf_str;
    };
    WokerOperations.prototype.type = function () {
        return typeof (Worker);
    };
    return WokerOperations;
}());
function $_w(obj) {
    return new WokerOperations(obj);
}
