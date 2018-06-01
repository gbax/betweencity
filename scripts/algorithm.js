
//Присвоенние бесконечности в матрице по диагонали
function AssignInfinityDiagonally(matrixWay) {


    for (let i = 0; i < matrixWay.length; i++)

        for (let j = 0; j < matrixWay.length; j++)
            if (i == j) {
                matrixWay[i][j] = Number.MAX_SAFE_INTEGER;
            }
}

const getMatrixSimple = () => params.cities.map(c =>
    params.cities.map(cc => {
        const pair = [cc.city, c.city];
        let r = params.routes.find(r => pair.includes(r.path[0]) && pair.includes(r.path[1]));
        return r ? r.length : 0;
    }));

const calcAlgorithm = () => {
    params.cities.map((c, index) => {
        c.number = index + 1;
    });
    let matrix = getMatrixSimple();

    AssignInfinityDiagonally(matrix);

    //Генетический алгоритм
    let wayGeneticAlgorithm = GeneticAlgorithm(matrix, 10, 0);
    console.log(wayGeneticAlgorithm);
    let costWayGeneticAlgorithm = CostWayGeneticAlgorithm(matrix, wayGeneticAlgorithm);
    console.log(costWayGeneticAlgorithm);


    //Метод ветвей и границ
    let X0 = [];
    let I = [];
    let J = [];
    for (let i = 0; i < matrix.length; i++) {
        I[i] = Number.MAX_SAFE_INTEGER;
        J[i] = Number.MAX_SAFE_INTEGER;
    }

    let first = 0;
    I[0] = 0;
    let wayBranchAndBoundaryMethod = Branch_And_Boundary_Method(matrix, I, J, X0);
    let costWayBranchAndBoundaryMethod = CostWayBranchAndBoundaryMethod(matrix, wayBranchAndBoundaryMethod);

    wayBranchAndBoundaryMethod[matrix.length] = first;
    console.log(wayBranchAndBoundaryMethod);
    console.log(costWayBranchAndBoundaryMethod);


    //Модификация матрицы методов Кини-Райфа
    let matrixWithModification = [];

    for (let i = 0; i < matrix.length; i++) {
        matrixWithModification[i] = [];
        for (let j = 0; j < matrix[0].length; j++) {
            matrixWithModification[i][j] = matrix[i][j];
        }
    }

    //Генетический алгоритм с модификацией
    matrixWithModification = ModificationOfMatrix(matrixWithModification, params.avgSpeedMatrix, params.avgRoadQuality, params.avgLightCountMatrix);
    let wayGeneticAlgorithmWithModification = GeneticAlgorithm(matrixWithModification, 10, 0);
    let costWayGeneticAlgorithmWithModification = CostWayGeneticAlgorithm(matrix, wayGeneticAlgorithmWithModification);


    console.log(wayGeneticAlgorithmWithModification);
    console.log(costWayGeneticAlgorithmWithModification);


    //Метод ветвей и границ с модификацией
    X0 = [];
    bestCostWayBranchAndBoundaryMethod = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < matrix.length; i++) {
        I[i] = Number.MAX_SAFE_INTEGER;
        J[i] = Number.MAX_SAFE_INTEGER;
    }
    I[0] = 0;
    let wayBranchAndBoundaryMethodWithModification = Branch_And_Boundary_Method(matrixWithModification, I, J, X0);
    let costWayBranchAndBoundaryMethodWithModification = CostWayBranchAndBoundaryMethod(matrix, wayBranchAndBoundaryMethodWithModification);

    wayBranchAndBoundaryMethodWithModification[matrix.length] = first;
    console.log(wayBranchAndBoundaryMethodWithModification);
    console.log(costWayBranchAndBoundaryMethodWithModification);

    //const getWayCities = (way) =>{
        //return way.map(i => params.cities.find(с => c.number === (i+1)).city).join('<br/>')
   // }
    function getWayCities(way) {
        let wayCitiesName = "";
        for (let i=0;i<way.length-1;i++)
        {
           wayCitiesName +=  (params.cities.find(c => c.number === (way[i]+1))).city;
            wayCitiesName+="-";
        }
        wayCitiesName +=  (params.cities.find(c => c.number === (way[way.length-1]+1))).city;
        return wayCitiesName;
    }

    return {
        firstAlgorithmResult: {
            wayBranchAndBoundaryMethod: getWayCities(wayBranchAndBoundaryMethod),
            //wayBranchAndBoundaryMethod:wayBranchAndBoundaryMethod,
            costWayBranchAndBoundaryMethod: costWayBranchAndBoundaryMethod
        },
        secondAlgorithmResult: {
            wayGeneticAlgorithm: getWayCities(wayGeneticAlgorithm),
            //wayGeneticAlgorithm: wayGeneticAlgorithm,
            costWayGeneticAlgorithm: costWayGeneticAlgorithm
        },
        thirdAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: getWayCities(wayBranchAndBoundaryMethodWithModification),
            //wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costWayBranchAndBoundaryMethodWithModification: costWayBranchAndBoundaryMethodWithModification
        },
        forthAlgorithmResult: {
            wayGeneticAlgorithmWithModification: getWayCities(wayGeneticAlgorithmWithModification),
            //wayGeneticAlgorithmWithModification: wayGeneticAlgorithmWithModification,
            costWayGeneticAlgorithmWithModification: costWayGeneticAlgorithmWithModification
        }
    };
};

document.addEventListener('DOMContentLoaded', () => CityParams.reset());