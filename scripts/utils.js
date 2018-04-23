const flatten  = (list) => {
    return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
};

const groupBy = (array, f) => {
    var groups = {};
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
};

const fileSaver = text => {
    var blob = new Blob([text], { type: 'text/plain' }),
        anchor = document.createElement('a');

    anchor.download = "cities.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
};
