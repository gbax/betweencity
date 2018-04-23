let cities = [];
let routes = [];
const controls = {};
const mapLeft = {_map: null};
const mapRight = {_map: null};
let isFileLoading = false;

const loadPage = async () => {
    const deferredLeft = new Deferred();
    const deferredRight = new Deferred();
    initMap(mapLeft, "map", deferredLeft);
    initMap(mapRight, "map2", deferredRight);
    await deferredLeft.promise;
    await deferredRight.promise;
    bindControls();
    cities = [];
    routes = [];
    initControls();
    $('.blocker').hide();
};

const bindControls = () => {
    controls._addCity = $('.js-add');
    controls._calc = $('.js-calc');
    controls._city = $('.js-city');
    controls._citiesTable = $('.js-cities');
    controls._save = $('.js-save');
    controls._clean = $('.js-clean');
    controls._files = $('#files');
    controls._loadFileXml = $('#loadFileXml');
    controls._addCity.click(addCityCallback);
    controls._calc.click(calcClickCallback);
    controls._save.click(saveCallback);
    controls._files.change(fileChooseCallback);
    controls._clean.click(() => {
        cities = [];
        routes = [];
        isFileLoading = false;
        initControls();
    });

};

const addCityCallback = () => {
    const city = controls._city.val();
    controls._city.val('');
    cities.push(city);
    if (cities.length > 2) {
        canCalc();
    }
    controls._citiesTable.append(city + '<br/>');
};

const calcClickCallback = () => {
    $('.blocker').show();
    if (isFileLoading) {
        calc();
        return
    }
    let cityPairs = flatten(
        cities.map(c => cities.map(ci => ({arr: [c, ci].sort((a, b) => a > b ? 1 : a < b ? -1 : 0)})))
    )
        .map(p => p.arr);

    let groupedPairs = groupBy(cityPairs, p => p);
    routes.push(...groupedPairs.map(p => p[0]).filter(p => p[0] !== p[1]).map(p => ({path: p})));
    cities = cities.map(c => ({city: c, coordinates: null}));
    getCoordinates();
};

const saveCallback = () => fileSaver(JSON.stringify({cities, routes}));

const getCoordinates = () => {
    Promise.all(cities.map(city => {
        return new Promise(resolve =>
            $.get(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city.city}&results=1`, (data) => {
            })
                .done(data => {
                    city.coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                    resolve();
                }));
    })).then(() => getPaths());
};

const calcAlgo = () => {
    cities.map((c, index) => {
        c.number = index + 1;
    })

    //TODO Алгортм писать тут
};

const calc = () => {
    clearMaps();
    calcAlgo();
    drawCitiesPoints(mapLeft);
    drawRoutes(mapLeft);
    drawCitiesPoints(mapRight);
    drawRoutes(mapRight);
    $('.blocker').hide();
};
const getPaths = () => {
    Promise.all(routes.map(r => new Promise(resolve => {
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


const loadData = (parsed) => {
    initControls();
    cities = parsed.cities;
    controls._citiesTable.append(cities.map(c => c.city + '<br/>'));
    routes = parsed.routes;
    isFileLoading = true;
    canCalc();
    calc();
};

const fileChooseCallback = (evt) => {
    const _this = this;
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        let reader = new FileReader();
        reader.onload = (reader => {
            return () => {
                let contents = reader.result;
                let parsed = JSON.parse(contents);
                loadData(parsed);
            }
        })(reader);
        reader.readAsText(f);
    }
};

const drawCitiesPoints = (map) => {
    cities.map(c =>
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
    routes.forEach(r => {
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


document.addEventListener('DOMContentLoaded', loadPage);