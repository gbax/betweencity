
//Присвоенние бесконечности в матрице по диагонали
function AssignInfinityDiagonally(matrixWay) {


    for (let i = 0; i < matrixWay.length; i++)

        for (let j = 0; j < matrixWay.length; j++)
            if (i == j) {
                matrixWay[i][j] = Number.MAX_SAFE_INTEGER;
            }
    //return matrix;
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

    //let MatrixValuesOfCriteria = [[110, 80, 60, 40, 20], [10, 7, 5, 3, 0], [10, 7, 5, 3, 0]];


    //params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmax = MatrixValuesOfCriteria[0][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage075 = MatrixValuesOfCriteria[0][1];
    //params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 = MatrixValuesOfCriteria[0][2];
   // params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage025 = MatrixValuesOfCriteria[0][3];
    //params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmin = MatrixValuesOfCriteria[0][4];

   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmax = MatrixValuesOfCriteria[1][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage075 = MatrixValuesOfCriteria[1][1];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage05 = MatrixValuesOfCriteria[1][2];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage025 = MatrixValuesOfCriteria[1][3];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmin = MatrixValuesOfCriteria[1][4];

   // params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmax = MatrixValuesOfCriteria[2][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage075 = MatrixValuesOfCriteria[2][1];
    //params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage05 = MatrixValuesOfCriteria[2][2];
    //params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage025 = MatrixValuesOfCriteria[2][3];
   // params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmin = MatrixValuesOfCriteria[2][4];


    //let MatrixCriteriaWeight = [[2, 100], [1, 7], [3, 4]];
   // params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.rank = MatrixCriteriaWeight[0][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xСompare = MatrixCriteriaWeight[0][1];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.rank = MatrixCriteriaWeight[1][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xСompare = MatrixCriteriaWeight[1][1];
   // params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.rank = MatrixCriteriaWeight[2][0];
   // params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xСompare = MatrixCriteriaWeight[2][1];
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
    return {
        firstAlgorithmResult: {
            wayBranchAndBoundaryMethod: wayBranchAndBoundaryMethod,
            costWayBranchAndBoundaryMethod: costWayBranchAndBoundaryMethod
        },
        secondAlgorithmResult: {
            wayGeneticAlgorithm: wayGeneticAlgorithm,
            costWayGeneticAlgorithm: costWayGeneticAlgorithm
        },
        thirdAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costWayBranchAndBoundaryMethodWithModification: costWayBranchAndBoundaryMethodWithModification
        },
        forthAlgorithmResult: {
            wayGeneticAlgorithmWithModification: wayGeneticAlgorithmWithModification,
            costWayGeneticAlgorithmWithModification: costWayGeneticAlgorithmWithModification
        }
    };
};

document.addEventListener('DOMContentLoaded', () => CityParams.reset());