export const getResultFromData = (data) => data?.data?.result;

export function generateUUID() {
    var date = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        date += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    });
}

export function ObjectFrom(cols, object) {
    let result = {};
    for (let i of cols) {
        if (object[i]) {
            result[i] = object[i];
        }
    }
    return result;
}
