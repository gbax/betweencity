const initMap = (parent, id, deffered) => {
    ymaps.ready(() => {
        parent._map = new ymaps.Map(id, {
            center: [55.76, 37.64],
            zoom: 7,
            controls: []
        });
        parent._map.controls.add(new ymaps.control.ZoomControl());
        deffered.resolve()
    });
};