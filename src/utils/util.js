var util = {
    firstUpperCase(str){
        return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
            return $1.toUpperCase() + $2.toLowerCase();
        });
    },
    unique(arr) {
        const map = {};
        arr.forEach(value => {
            map[value] = value
        })
        return Object.keys(map);
    }
}
module.exports = util