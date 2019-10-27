"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    map(data, fieldsMap) {
        if (Array.isArray(fieldsMap)) {
            return fieldsMap.reduce((map, field) => {
                if (typeof data[field] !== "undefined") {
                    map[field] = data[field];
                }
                return map;
            }, {});
        }
        return Object.keys(fieldsMap).reduce((map, field) => {
            if (typeof data[field] !== "undefined") {
                const mapField = fieldsMap[field] || field;
                map[mapField] = data[field];
            }
            return map;
        }, {});
    }
};
//# sourceMappingURL=dataModelMapper.js.map