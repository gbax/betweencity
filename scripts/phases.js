const initControls = () => {
    controls._citiesTable.empty();
    controls._city.val('');
    controls._calc.attr('disabled', true);
    controls._save.attr('disabled', true);
    controls._addCity.removeAttr('disabled');
    controls._loadFileXml.removeAttr('disabled');

    clearMaps();
};

const canCalc = () => {
    controls._calc.removeAttr('disabled');
    controls._save.removeAttr('disabled');
};

const clearMaps = () => {
    mapLeft._map.geoObjects.removeAll();
    mapRight._map.geoObjects.removeAll();
};