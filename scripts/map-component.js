const MapParams = (function () {

    const container = $('.js-params-map');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => Params7.init());

    const mapLeft = {_map: null};
    const mapRight = {_map: null};
    const mapThird = {_map: null};
    const mapForth = {_map: null};

    const init = async () => {
        $('.container').hide();
        container.show();
        if (mapLeft._map === null) {
            const deferredLeft = new Deferred();
            const deferredRight = new Deferred();
            const deferredThird = new Deferred();
            const deferredForth = new Deferred();
            initMap(mapLeft, "map", deferredLeft);
            initMap(mapRight, "map2", deferredRight);
            initMap(mapThird, "map3", deferredThird);
            initMap(mapForth, "map4", deferredForth);
            await deferredLeft.promise;
            await deferredRight.promise;
            await deferredThird.promise;
            await deferredForth.promise;
        }
        mapLeft._map.geoObjects.removeAll();
        mapRight._map.geoObjects.removeAll();
        mapThird._map.geoObjects.removeAll();
        mapForth._map.geoObjects.removeAll();

        let cityPairs = flatten(
            params.cities.map(c => params.cities.map(ci => ({arr: [c.city ? c.city : c, ci.city ? ci.city : ci].sort((a, b) => a > b ? 1 : a < b ? -1 : 0)})))
        )
            .map(p => p.arr);

        let groupedPairs = groupBy(cityPairs, p => p);
        params.routes = groupedPairs.map(p => p[0]).filter(p => p[0] !== p[1]).map(p => ({path: p}));
        params.cities = params.cities.map(c => ({city: c.city ? c.city : c, coordinates: null}));
        getCoordinates();

    };

    const getCoordinates = () => {
        Promise.all(params.cities.map(city => {
            return new Promise(resolve =>
                $.get(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city.city}&results=1`, (data) => {
                })
                    .done(data => {
                        city.coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                        resolve();
                    }));
        })).then(() => getPaths());
    };

    const initMap = (parent, id, deffered) => {
        ymaps.ready(() => {
            parent._map = new ymaps.Map(id, {
                center: [55.965231, 54.782331],
                zoom: 7,
                controls: []
            });
            parent._map.controls.add(new ymaps.control.ZoomControl());
            deffered.resolve()
        });
    };


    const getPaths = () => {
        Promise.all(params.routes.map(r => new Promise(resolve => {
                ymaps.route(r.path).then((route) => {
                    r.length = route.getLength();
                    let paths = route.getPaths();
                    const allSegments = [];
                    for (let j = 0; j < paths.getLength(); j++) {
                        paths.get(j).getSegments().forEach(s => allSegments.push(...s.getCoordinates()));
                    }
                    r.routeCoordinates = allSegments;
                    resolve();
                }, function (error) {
                    alert('Возникла ошибка: ' + error.message);
                });
            })
        )).then(() => {
            calc();
            console.log('getPaths done');
        });
    };

    const calc = () => {

        let results = calcAlgorithm();

        drawCitiesPoints(mapLeft);
        drawRoutes(mapLeft);
        drawCitiesPoints(mapRight);
        drawRoutes(mapRight);
        drawCitiesPoints(mapThird);
        drawRoutes(mapThird);
        drawCitiesPoints(mapForth);
        drawRoutes(mapForth);

        $('.map-result.map1')
            .append(results.firstAlgorithmResult.costwayBranchAndBoundaryMethodWithModification )
            .append('<br/>')
            .append(results.firstAlgorithmResult.wayBranchAndBoundaryMethodWithModification );

        $('.map-result.map2')
            .append(results.secondAlgorithmResult.costwayBranchAndBoundaryMethodWithModification )
            .append('<br/>')
            .append(results.secondAlgorithmResult.wayBranchAndBoundaryMethodWithModification );

        $('.map-result.map3')
            .append(results.thirdAlgorithmResult.costwayBranchAndBoundaryMethodWithModification )
            .append('<br/>')
            .append(results.thirdAlgorithmResult.wayBranchAndBoundaryMethodWithModification );

        $('.map-result.map4')
            .append(results.forthAlgorithmResult.costwayBranchAndBoundaryMethodWithModification )
            .append('<br/>')
            .append(results.forthAlgorithmResult.wayBranchAndBoundaryMethodWithModification );

        $('.blocker').hide();
    };

    const drawCitiesPoints = (map) => {
        params.cities.map(c =>
            new ymaps.GeoObject({
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [+c.coordinates[1], +c.coordinates[0]]
                },
                // Свойства.
                properties: {
                    // Контент метки.
                    iconContent: c.number,
                    data: c
                }
            }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
            })
        ).forEach(c => map._map.geoObjects.add(c));
    };

    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const drawRoutes = (map) => {
        params.routes.forEach(r => {
            // Создаем ломаную.
            let myPolyline = new ymaps.Polyline(r.routeCoordinates, {
                properties: {
                    // Контент метки.
                    iconContent: '1',
                    data: r
                }
            }, {
                // Задаем опции геообъекта.
                // Цвет с прозрачностью.
                strokeColor: getRandomColor(),
                // Ширину линии.
                strokeWidth: 4

            });
            // Добавляем линию на карту.
            map._map.geoObjects.add(myPolyline);

        });
    };

    return {
        init
    }
})();
