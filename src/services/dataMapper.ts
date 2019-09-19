interface IObj {
  [key: string]: any;
}

export default {
  map(data: IObj, fieldsMap: string[]|IObj) {
    if (Array.isArray(fieldsMap)) {
      return fieldsMap.reduce((map: IObj, field) => {
        if (typeof data[field] !== "undefined") {
          map[field] = data[field];
        }
        return map;
      }, {});
    }

    return Object.keys(fieldsMap).reduce((map: IObj, field) => {
      if (typeof data[field] !== "undefined") {
        const mapField = fieldsMap[field] || field;
        map[mapField] = data[field];
      }
      return map;
    }, {});
  }
};
