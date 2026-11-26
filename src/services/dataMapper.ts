interface IObj {
  [key: string]: any;
}

export default {
  map(data: IObj, fieldsMap: string[]|IObj) {
    if (Array.isArray(fieldsMap)) {
      const fields: string[] = fieldsMap;
      return fields.reduce<IObj>((map, field) => {
        if (typeof data[field] !== "undefined") {
          map[field] = data[field];
        }
        return map;
      }, {});
    }

    return Object.keys(fieldsMap).reduce<IObj>((map, field) => {
      if (typeof data[field] !== "undefined") {
        const mapField = fieldsMap[field] || field;
        map[mapField] = data[field];
      }
      return map;
    }, {});
  }
};
