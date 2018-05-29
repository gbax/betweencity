//TODO Удалить
let MatrixOfEstimatesOfPermittedVelocities =
    [[0, 70, 80, 60, 90, 90, 80, 60, 100, 60],
        [90, 0, 85, 70, 60, 65, 70, 80, 90, 100],
        [90, 90, 0, 50, 70, 65, 55, 90, 70, 75],
        [95, 85, 60, 0, 65, 70, 75, 80, 65, 70],
        [80, 90, 50, 60, 0, 70, 80, 90, 100, 85],
        [90, 60, 75, 80, 90, 0, 100, 55, 60, 75],
        [80, 85, 90, 50, 100, 105, 0, 60, 70, 80],
        [85, 90, 95, 100, 80, 70, 60, 0, 65, 10],
        [90, 40, 50, 80, 90, 95, 75, 85, 0, 80],
        [100, 90, 75, 50, 60, 70, 80, 95, 100, 0]];
let MatrixOfQualityOfRoads =
    [[0, 7, 8, 6, 9, 4, 3, 2, 5, 6],
        [9, 0, 5, 7, 6, 5, 7, 8, 9, 5],
        [9, 9, 0, 5, 7, 5, 5, 9, 7, 5],
        [5, 8, 6, 0, 6, 7, 7, 8, 5, 7],
        [6, 9, 5, 6, 0, 7, 8, 9, 5, 5],
        [4, 6, 5, 4, 4, 0, 9, 5, 6, 7],
        [8, 5, 9, 5, 8, 5, 0, 7, 5, 8],
        [4, 9, 3, 8, 8, 7, 6, 0, 5, 2],
        [3, 4, 5, 8, 9, 5, 5, 5, 0, 8],
        [6, 7, 5, 5, 6, 7, 8, 5, 7, 0]];
let MatrixOfNumberOfTrafficLights =
    [[0, 5, 3, 5, 7, 4, 3, 2, 7, 6],
        [7, 0, 5, 7, 6, 9, 2, 8, 9, 5],
        [3, 9, 0, 5, 8, 5, 8, 9, 7, 5],
        [9, 8, 6, 0, 6, 7, 8, 8, 5, 5],
        [6, 9, 3, 6, 0, 1, 8, 9, 7, 5],
        [4, 6, 5, 4, 5, 0, 9, 5, 7, 7],
        [8, 2, 9, 5, 3, 5, 0, 7, 4, 8],
        [4, 4, 3, 8, 4, 7, 6, 0, 4, 2],
        [3, 4, 5, 8, 9, 5, 5, 5, 0, 8],
        [6, 7, 5, 5, 6, 7, 8, 5, 7, 0]];

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
    let wayGeneticAlgorithml = GeneticAlgorithm(matrix, 10, 0);
    console.log(wayGeneticAlgorithml);
    let costWayGeneticAlgorithml = CostWayGeneticAlgorithm(matrix, wayGeneticAlgorithml);
    console.log(costWayGeneticAlgorithml);


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
    let costwayBranchAndBoundaryMethod = CostWayBranchAndBoundaryMethod(matrix, wayBranchAndBoundaryMethod);

    wayBranchAndBoundaryMethod[matrix.length] = first;
    console.log(wayBranchAndBoundaryMethod);
    console.log(costwayBranchAndBoundaryMethod);


    //Модификация матрицы методов Кини-Райфа
    let matrixWithModification = [];

    for (let i = 0; i < matrix.length; i++) {
        matrixWithModification[i] = [];
        for (let j = 0; j < matrix[0].length; j++) {
            matrixWithModification[i][j] = matrix[i][j];
        }
    }

    let MatrixValuesOfCriteria = [[110, 80, 60, 40, 20], [10, 7, 5, 3, 0], [10, 7, 5, 3, 0]];


    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmax = MatrixValuesOfCriteria[0][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage075 = MatrixValuesOfCriteria[0][1];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 = MatrixValuesOfCriteria[0][2];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage025 = MatrixValuesOfCriteria[0][3];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xmin = MatrixValuesOfCriteria[0][4];

    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmax = MatrixValuesOfCriteria[1][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage075 = MatrixValuesOfCriteria[1][1];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage05 = MatrixValuesOfCriteria[1][2];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage025 = MatrixValuesOfCriteria[1][3];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xmin = MatrixValuesOfCriteria[1][4];

    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmax = MatrixValuesOfCriteria[2][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage075 = MatrixValuesOfCriteria[2][1];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage05 = MatrixValuesOfCriteria[2][2];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xaverage025 = MatrixValuesOfCriteria[2][3];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xmin = MatrixValuesOfCriteria[2][4];


    let MatrixCriteriaWeight = [[2, 100], [1, 7], [3, 4]];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.rank = MatrixCriteriaWeight[0][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xСompare = MatrixCriteriaWeight[0][1];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.rank = MatrixCriteriaWeight[1][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xСompare = MatrixCriteriaWeight[1][1];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.rank = MatrixCriteriaWeight[2][0];
    params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.xСompare = MatrixCriteriaWeight[2][1];
    //Генетический алгоритм с модификацией
    matrixWithModification = ModificationOfMatrix(matrixWithModification, MatrixOfEstimatesOfPermittedVelocities, MatrixOfQualityOfRoads, MatrixOfNumberOfTrafficLights);
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
    let costwayBranchAndBoundaryMethodWithModification = CostWayBranchAndBoundaryMethod(matrix, wayBranchAndBoundaryMethodWithModification);

    wayBranchAndBoundaryMethodWithModification[matrix.length] = first;

    return {
        firstAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costwayBranchAndBoundaryMethodWithModification: costwayBranchAndBoundaryMethodWithModification
        },
        secondAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costwayBranchAndBoundaryMethodWithModification: costwayBranchAndBoundaryMethodWithModification
        },
        thirdAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costwayBranchAndBoundaryMethodWithModification: costwayBranchAndBoundaryMethodWithModification
        },
        forthAlgorithmResult: {
            wayBranchAndBoundaryMethodWithModification: wayBranchAndBoundaryMethodWithModification,
            costwayBranchAndBoundaryMethodWithModification: costwayBranchAndBoundaryMethodWithModification
        }
    };
};

document.addEventListener('DOMContentLoaded', () => CityParams.reset());