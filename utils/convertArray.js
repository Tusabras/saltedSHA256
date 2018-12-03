exports.toObjectAndAddFieldNameAsField = function (arr, fieldName) {
    return arr.reduce((acc, cur, i) => {
        acc[cur[fieldName].toLowerCase()] = cur[fieldName];
        return acc;
    }, {});
}