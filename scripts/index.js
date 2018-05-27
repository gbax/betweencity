let cities = [];
let routes = [];
const controls = {};
const mapLeft = {_map: null};
const mapRight = {_map: null};
let isFileLoading = false;




let MatrixOfEstimatesOfPermittedVelocities =
    [[0,70,80,60,90,90,80,60,100,60],
        [90,0,85,70,60,65,70,80,90,100],
        [90,90,0,50,70,65,55,90,70,75],
        [95,85,60,0,65,70,75,80,65,70],
        [80,90,50,60,0,70,80,90,100,85],
        [90,60,75,80,90,0,100,55,60,75],
        [80,85,90,50,100,105,0,60,70,80],
        [85,90,95,100,80,70,60,0,65,10],
        [90,40,50,80,90,95,75,85,0,80],
        [100,90,75,50,60,70,80,95,100,0]];
let MatrixOfQualityOfRoads =
    [[0,7,8,6,9,4,3,2,5,6],
        [9,0,5,7,6,5,7,8,9,5],
        [9,9,0,5,7,5,5,9,7,5],
        [5,8,6,0,6,7,7,8,5,7],
        [6,9,5,6,0,7,8,9,5,5],
        [4,6,5,4,4,0,9,5,6,7],
        [8,5,9,5,8,5,0,7,5,8],
        [4,9,3,8,8,7,6,0,5,2],
        [3,4,5,8,9,5,5,5,0,8],
        [6,7,5,5,6,7,8,5,7,0]];
let MatrixOfNumberOfTrafficLights =
    [[0,5,3,5,7,4,3,2,7,6],
        [7,0,5,7,6,9,2,8,9,5],
        [3,9,0,5,8,5,8,9,7,5],
        [9,8,6,0,6,7,8,8,5,5],
        [6,9,3,6,0,1,8,9,7,5],
        [4,6,5,4,5,0,9,5,7,7],
        [8,2,9,5,3,5,0,7,4,8],
        [4,4,3,8,4,7,6,0,4,2],
        [3,4,5,8,9,5,5,5,0,8],
        [6,7,5,5,6,7,8,5,7,0]];




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

const getMatrix = () => cities.map(c =>
    cities.map(cc => {
        const pair = [cc.city, c.city];
        let r = routes.find(r => pair.includes(r.path[0]) && pair.includes(r.path[1]));
        return {length: r ? r.length : 0, pair: pair};
    }));

const getMatrixSimple = () => cities.map(c =>
    cities.map(cc => {
        const pair = [cc.city, c.city];
        let r = routes.find(r => pair.includes(r.path[0]) && pair.includes(r.path[1]));
        return r ? r.length : 0;
    }));


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
/*Уфа
Стерлитамак
Салават
Нефтикамск
Октябрьский
Туймазы
Белорецк
Ишимбай
Сибай
Кумертау*/

const calcAlgo = () => {
    cities.map((c, index) => {
        c.number = index + 1;
    });
    let matrix = getMatrixSimple();

    AssignInfinityDiagonally(matrix);

    //Генетический алгоритм
    let wayGeneticAlgorithml = GeneticAlgorithm(matrix, 10, 0);
    console.log(wayGeneticAlgorithml);
    let costWayGeneticAlgorithml =CostWayGeneticAlgorithm(matrix,wayGeneticAlgorithml);
    console.log(costWayGeneticAlgorithml);


    //Метод ветвей и границ
    let X0 = [];
    let I =[];
    let J =[];
    for(let i=0;i<matrix.length;i++)
    {
        I[i] = Number.MAX_SAFE_INTEGER;
        J[i] = Number.MAX_SAFE_INTEGER;
    }

    let first = 0;
    I[0]=0;
    let wayBranchAndBoundaryMethod = Branch_And_Boundary_Method(matrix, I,J, X0);
    let costwayBranchAndBoundaryMethod =CostWayBranchAndBoundaryMethod(matrix,wayBranchAndBoundaryMethod);

    wayBranchAndBoundaryMethod[matrix.length] = first;
    console.log(wayBranchAndBoundaryMethod);
    console.log(costwayBranchAndBoundaryMethod);


    //Модификация матрицы методов Кини-Райфа
    let matrixWithModification = [];

    for(let i=0;i<matrix.length;i++)
    {
        matrixWithModification[i] = [];
        for(let j=0;j<matrix[0].length;j++)
        {
            matrixWithModification[i][j] = matrix[i][j];
        }
    }

    let MatrixValuesOfCriteria = [[110,80,60,40,20],[10,7,5,3,0],[10,7,5,3,0]];


    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmax = MatrixValuesOfCriteria[0][0];
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage075 = MatrixValuesOfCriteria[0][1];
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 = MatrixValuesOfCriteria[0][2];
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage025 = MatrixValuesOfCriteria[0][3];
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmin = MatrixValuesOfCriteria[0][4];

    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmax = MatrixValuesOfCriteria[1][0];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage075 = MatrixValuesOfCriteria[1][1];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage05 = MatrixValuesOfCriteria[1][2];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage025 = MatrixValuesOfCriteria[1][3];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmin = MatrixValuesOfCriteria[1][4];

    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmax = MatrixValuesOfCriteria[2][0];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage075 = MatrixValuesOfCriteria[2][1];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage05 = MatrixValuesOfCriteria[2][2];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage025 = MatrixValuesOfCriteria[2][3];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmin = MatrixValuesOfCriteria[2][4];


    let MatrixCriteriaWeight = [[2,100],[1,7],[3,4]]
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.rank = MatrixCriteriaWeight[0][0];
    valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xСompare = MatrixCriteriaWeight[0][1];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.rank = MatrixCriteriaWeight[1][0];
    valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xСompare = MatrixCriteriaWeight[1][1];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.rank = MatrixCriteriaWeight[2][0];
    valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xСompare= MatrixCriteriaWeight[2][1];
    //Генетический алгоритм с модификацией
    matrixWithModification = ModificationOfMatrix(matrixWithModification, MatrixOfEstimatesOfPermittedVelocities, MatrixOfQualityOfRoads, MatrixOfNumberOfTrafficLights);
    let wayGeneticAlgorithmWithModification  = GeneticAlgorithm(matrixWithModification, 10, 0);
    let costWayGeneticAlgorithmWithModification= CostWayGeneticAlgorithm(matrix,wayGeneticAlgorithmWithModification);


    console.log(wayGeneticAlgorithmWithModification);
    console.log(costWayGeneticAlgorithmWithModification);


    //Метод ветвей и границ с модификацией
    X0 = [];
    bestCostWayBranchAndBoundaryMethod = Number.MAX_SAFE_INTEGER;
    for(let i=0;i<matrix.length;i++)
    {
        I[i] = Number.MAX_SAFE_INTEGER;
        J[i] = Number.MAX_SAFE_INTEGER;
    }
    I[0]=0;
    let wayBranchAndBoundaryMethodWithModification  = Branch_And_Boundary_Method(matrixWithModification,I,J,X0);
    let costwayBranchAndBoundaryMethodWithModification =CostWayBranchAndBoundaryMethod(matrix,wayBranchAndBoundaryMethodWithModification);

    wayBranchAndBoundaryMethodWithModification[matrix.length] = first;
    console.log(wayBranchAndBoundaryMethodWithModification);
    console.log(costwayBranchAndBoundaryMethodWithModification);

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