// Генетический алгоритм

//Функция для подсчета длины пути в генетическом алгоритме



function CostWayGeneticAlgorithm(matrixWay, way) {
    let costWay = 0;

    for (let i = 0; i < way.length - 1; i++) {
        costWay += matrixWay[way[i]][way[i + 1]];
    }

    return costWay;
}

//Создание популяции
function PrimaryPopulation(sizePopulation, sizeReshuffle, firstCity) {

    let population = [];
    for (let i = 0; i < sizePopulation; i++) {
        let reshuffle = [];
        let flag;
        let city;

        reshuffle[0] = reshuffle[sizeReshuffle] = firstCity;
        for (let j = 1; j < sizeReshuffle; j++) {
            flag = 0;
            while (flag == 0) {

                city = Math.floor(Math.random() * sizeReshuffle);
                if (!reshuffle.includes(city)) {
                    flag = 1;
                    reshuffle[j] = city;
                }
            }
        }

        //population[i] = reshuffle;
        population.push(reshuffle);
    }
    return population;
}

//let g = PrimaryPopulation(5, 5, 0)
//alert(g);
//Кроссинговер
function Crossing(population) {

    let index = [];
    let newPopulation = [];

    let flag;
    let k = 0;
    let l = 0;
    let k2 = 0;
    let l2 = 0;


    for (let i = 0; i < population.length; i++)//по наборам
    {
        newPopulation[i] = [];
        for (let j = 0; j < population[0].length; j++)//по набору
        {

            //newPopulation[i].push(population[i][j]);
            newPopulation[i][j] = population[i][j];
        }
    }
    while ((index.length != population.length) && (index.length != (population.length - 1))) {
        flag = 0;

        while (flag == 0) {
            k = Math.floor(Math.random() * population.length);
            l = Math.floor(Math.random() * population.length);

            if (k != l && !index.includes(k) && !index.includes(l)) {
                flag = 1;
                index.push(k);
                index.push(l);
            }

        }

        l2 = Math.floor(Math.random() * ((population[0].length - 2) - 1)) + 1;
        k2 = Math.floor(Math.random() * ((population[0].length - 1) - (l2 + 1))) + (l2 + 1);


        for (let i = l2; i < k2; i++) {

            newPopulation[k][i] = population[l][i];
            newPopulation[l][i] = population[k][i];
        }
        CheckOnUniqueness(newPopulation[k]);
        CheckOnUniqueness(newPopulation[l]);

    }
    return newPopulation;
}

//Проверка на уникальность
function CheckOnUniqueness(reshuffle) {
    let flag;
    let city;

    for (let i = 1; i < reshuffle.length - 1; i++)
        for (let j = 0; j < i; j++)
            if (reshuffle[i] == reshuffle[j]) {

                flag = 0;
                while (flag == 0) {
                    city = Math.floor(Math.random() * (reshuffle.length - 1));
                    if (!reshuffle.includes(city)) {
                        reshuffle[i] = city;
                        flag = 1;
                    }
                }
            }
    return reshuffle;
}


//Создание новой популяции
function CreatingANewPopulation(population, matrixWay, firstCity) {
    let newPopulation = [];

    newPopulation = Crossing(population);

    let costWays = [];

    for (let i = 0; i < population.length; i++)//по наборам
    {
        costWays[i] = CostWayGeneticAlgorithm(matrixWay, newPopulation[i]);
    }

    let newPopulation2 = [];

    for (let i = 0; i < population.length; i++)//по наборам
    {
        newPopulation2[i] = [];
        for (let j = 0; j < population[0].length; j++)//по набору
        {

            //newPopulation2[i].push(newPopulation[i][j]);
            newPopulation2[i][j] = newPopulation[i][j];
        }
    }

    //Расположим наборы в порядке возрастания F
    newPopulation2 = Sort(costWays, newPopulation, newPopulation2);
    let R;

    let flag = 0;

    //Генерируем новые наборы вместо последних
    for (let i = Math.floor(population.length / 2); i < population.length; i++) {
        let newReshuffle = [];
        newReshuffle[0] = newReshuffle[population[0].length - 1] = firstCity;
        for (let j = 1; j < population[0].length - 1; j++) {
            flag = 0;
            while (flag == 0) {
                R = Math.floor(Math.random() * (population[0].length - 1));
                if (!newReshuffle.includes(R)) {
                    flag = 1;
                    newReshuffle[j] = R;
                }
            }
        }
        newPopulation2[i] = newReshuffle;
    }

    return newPopulation2;
}

// Получить  i-ый набор из популяции
function GetSet(population, i) {
    let reshuffle = [];
    for (let j = 0; j < population[0].length; j++)
        reshuffle[j] = population[i][j];
    return reshuffle;
}

//сортировка путей по стоимости
function Sort(costWays, population, newPopulation) {

    let tmp;
    for (let i = 1, j; i < costWays.length; ++i) // цикл проходов, i - номер прохода
    {
        tmp = costWays[i];
        for (j = i - 1; j >= 0 && costWays[j] < tmp; --j) // поиск места элемента в готовой последовательности
        {
            costWays[j + 1] = costWays[j];    // сдвигаем элемент направо, пока не дошли
            newPopulation[j + 1] = newPopulation[j];
        }
        costWays[j + 1] = tmp; // место найдено, вставить элемент
        newPopulation[j + 1] = population[i];
    }
    let newPopulation2 = [];
    //копируем пути в новую матрицу с конца
    <!-- for (let j = 0; j < costWays.length; j++) -->
    <!-- { -->
    <!-- newPopulation2.Add(newPopulation[costWays.length - j - 1]); -->
    <!-- } -->
    for (let i = 0; i < population.length; i++) {
        newPopulation2[i] = []
        for (let j = 0; j < population[0].length; j++) {
            newPopulation2[i][j] = newPopulation[costWays.length - i - 1][j];
        }
    }
    return newPopulation2;
}

//alert(GetSet(g,0));
//alert(CreatingANewPopulation(g, matrix,0));
//alert(CreatingANewPopulation(PrimaryPopulation(5, 5, 0), [[1, 2, 3],[4, 5, 6],[7, 8, 9]],0));

//Генетический алгоритм
function GeneticAlgorithm(matrixWay, sizePopulation, firstCity) {

    let numberIteration = 100000;
    let bestWay = [];

    let bestCostWay = Number.MAX_SAFE_INTEGER;

    let population = [];
    let newPopulation = [];


    population = PrimaryPopulation(sizePopulation, matrixWay.length, firstCity);
    let tmp;

    for (let i = 0; i < sizePopulation; i++)//по наборам
    {
        //newPopulation.push(GetSet(population, matrixWay.length + 1, i));
        tmp = GetSet(population, i);
        newPopulation[i] = [];
        for (let j = 0; j < population[i].length; j++)//по наборам
        {
            newPopulation[i][j] = tmp[j];
        }
    }
    let costWay;

    //Поиск текущего рекорда
    for (let i = 0; i < sizePopulation; i++)//по наборам
    {
        costWay = CostWayGeneticAlgorithm(matrixWay, population[i]);
        if (costWay < bestCostWay) {
            bestCostWay = costWay;
            //bestWay = population[i];
            for (let j = 0; j < population[i].length; j++)//по наборам
            {
                bestWay[j] = population[i][j];
            }
        }
    }


    while (numberIteration > 0) {
        newPopulation = CreatingANewPopulation(newPopulation, matrixWay, firstCity);

        for (let i = 0; i < sizePopulation; i++)//по наборам
        {
            costWay = CostWayGeneticAlgorithm(matrixWay, newPopulation[i]);
            if (costWay < bestCostWay) {
                bestCostWay = costWay;
                //bestWay = GetSet(newPopulation, i);

                //newPopulation.push(GetSet(population, matrixWay.length + 1, i));
                tmp = GetSet(newPopulation, i);
                for (let j = 0; j < population[i].length; j++)//по наборам
                {
                    bestWay[j] = tmp[j];
                }

            }
        }


        numberIteration--;
    }


    return bestWay;

}


let bestCostWayBranchAndBoundaryMethod = Number.MAX_SAFE_INTEGER;


//Метод ветвей и границ
function Branch_And_Boundary_Method(A, I, J, X0) {
    let N = A.length;
    let C = [];
    for (let i = 0; i < N; i++)
        C[i] = [];

    let p = 0;

    //Считаем количество городов во множестве I
    for (let i = 0; i < N; i++)
        if (I[i] != Number.MAX_SAFE_INTEGER)
            p += 1;
    let q = 0;

    //Считаем количество городов во множестве J
    for (let i = 0; i < N; i++)
        if (J[i] != Number.MAX_SAFE_INTEGER)
            q += 1;

    //Считаем матрицу допустимых переходов
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++)
            C[i][j] = A[i][j];


    //Запрещаем проезд из городов множества I в города множества J


    for (let j = 0; j < q; j++)
        C[I[p - 1]][J[j]] = Number.MAX_SAFE_INTEGER;


    //Если количество городов во множестве I больше 1, то
    //1) Запрещаем проезд из города I[i+1] в город I[i]
    //2) Запрещаем проезд из города I[i] во все города, кроме I[i+1]
    //3) Запрещаем проезд в город I[i+1] для всех, кроме I[i]


    if (p > 1) {
        //2)
        for (let k = 0; k < p - 1; k++)// по множеству I
            for (let j = 0; j < N; j++)
                if (j != I[k + 1])
                    C[I[k]][j] = Number.MAX_SAFE_INTEGER;

        //1)
        //C[I[p - 2], I[p - 1]] = Number.MAX_SAFE_INTEGER;

        //3)
        for (let k = 1; k < p; k++)// по множеству I
            for (let j = 0; j < N; j++)
                if (j != I[k - 1])
                //if (I[k] != I[k + 1])
                    C[j][I[k]] = Number.MAX_SAFE_INTEGER;


    }


    let Alpha = [];
    let Betta = [];
    let min;


    for (let i = 0; i < N; i++) {
        if (!I.includes(i) || (I.includes(i) && I[i] == I[p - 1])) {

            min = Number.MAX_SAFE_INTEGER;
            for (let k = 0; k < N; k++)
                if (C[i][k] < min)
                    min = C[i][k];
            Alpha[i] = min;
        }
        else Alpha[i] = 0;
    }


    for (let k = 0; k < N; k++) {
        if (!I.includes(k) || (I.includes(k) && I[k] == I[0])) {
            min = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < N; i++)
                if (!I.includes(i) || (I.includes(i) && I[i] == I[p - 1])) {
                    if (C[i][k] - Alpha[i] < min)
                        min = C[i][k] - Alpha[i];
                }
            Betta[k] = min;
        }
        else Betta[k] = 0;
    }
    //Вычисление верхней оценки
    let LB = 0;

    for (let i = 0; i < p - 1; i++)
        //LB += A[i, i + 1];
        LB += A[I[i]][I[i + 1]];

    for (let i = p - 1; i < N; i++)
        LB += Alpha[i];

    for (let i = p; i < N; i++)
        LB += Betta[i];
    LB += Betta[0];

    //Вычисление нижней оценки
    let UB;
    let Y = [];
    Y = GreedyAlgorithm(C, I, J);
    UB = CostWayBranchAndBoundaryMethod(C, Y);

    if (UB < bestCostWayBranchAndBoundaryMethod) {
        bestCostWayBranchAndBoundaryMethod = UB;
        for (let i = 0; i < N; i++)
            X0[i] = Y[i];

    }

    //Если верхняя оценка равна нижней оценки, то конец алгоритма, выводим рекорд
    if (LB == UB) {
        return X0;
    }


    if (LB < bestCostWayBranchAndBoundaryMethod) {
        // Осуществляем ветвление D на два подмножества

        for (let i = 0; i < N; i++) {
            if (!I.includes(i) && !J.includes(i)) {

                let I1 = [];
                let J1 = [];
                let J2 = [];

                for (let j = 0; j < N; j++) {
                    I1[j] = Number.MAX_SAFE_INTEGER;
                    J1[j] = Number.MAX_SAFE_INTEGER;
                    J2[j] = Number.MAX_SAFE_INTEGER;
                }

                for (let j = 0; j < N; j++)
                    I1[j] = I[j];

                I1[p] = i;


                for (let j = 0; j < N; j++) {
                    J2[j] = J[j];
                }

                J2[q] = i;


                X0 = Branch_And_Boundary_Method(A, I1, J1, X0);
                X0 = Branch_And_Boundary_Method(A, I, J2, X0);
                break;
            }

        }


    }
    return X0;

}

//Функция для подсчета стоимости дороги
function CostWayBranchAndBoundaryMethod(matrixWay, way) {
    let costWay = 0;


    for (let i = 0; i < way.length - 1; i++) {
        costWay += matrixWay[way[i]][way[i + 1]];
    }

    costWay += matrixWay[way[way.length - 1]][way[0]];
    return costWay;
}

//Жадный алгоритм
function GreedyAlgorithm(matrixWay, I, J) {

    let n = matrixWay.length;
    let Y = [];

    for (let i = 0; i < n; i++)
        Y[i] = Number.MAX_SAFE_INTEGER;

    let p = 0;

    for (let i = 0; i < n; i++)
        if (I[i] != Number.MAX_SAFE_INTEGER)
            p += 1;

    let l = 0;
    let min;
    let count = p;

    for (let i = 0; i < p; i++) {
        Y[i] = I[i];
    }

    let k = p - 1;

    min = Number.MAX_SAFE_INTEGER;

    let flag = false;

    for (let j = 0; j < n; j++) {

        if (min > matrixWay[I[k]][j] && !Y.includes(j) && !J.includes(j)) {
            min = matrixWay[I[k]][j];
            l = j;
            flag = true;
        }

    }
    if (flag == true) {
        Y[count] = l;
        count += 1;
        k = l;
    }


    while (count != n) {
        min = Number.MAX_SAFE_INTEGER;

        for (let j = 0; j < n; j++) {

            if (min > matrixWay[k][j] && !Y.includes(j)) {
                min = matrixWay[k][j];
                l = j;
            }

        }
        Y[count] = l;
        count += 1;
        k = l;
    }

    return Y;
}


//Присвоенние бесконечности в матрице по диагонали
function AssignInfinityDiagonally(matrixWay) {


    for (let i = 0; i < matrixWay.length; i++)

        for (let j = 0; j < matrixWay.length; j++)
            if (i == j) {
                matrixWay[i][j] = Number.MAX_SAFE_INTEGER;
            }
    //return matrix;
}

//Метод Кини - Райфа

//Оценка скорости
function vSpeed(x) {
    let k = 1, b, y;


    let middleEstimatesOfPermittedVelocities = params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities;
    if (x <= middleEstimatesOfPermittedVelocities.xmax && x > middleEstimatesOfPermittedVelocities.xaverage075) {
        k = (middleEstimatesOfPermittedVelocities.ymax - middleEstimatesOfPermittedVelocities.yaverage075) / (middleEstimatesOfPermittedVelocities.xmax - middleEstimatesOfPermittedVelocities.xaverage075);
        b = (middleEstimatesOfPermittedVelocities.xmax * middleEstimatesOfPermittedVelocities.yaverage075 - middleEstimatesOfPermittedVelocities.ymax * middleEstimatesOfPermittedVelocities.xaverage075) / (middleEstimatesOfPermittedVelocities.xmax - middleEstimatesOfPermittedVelocities.xaverage075);
    }
    else if (x <= middleEstimatesOfPermittedVelocities.xaverage075 && x > middleEstimatesOfPermittedVelocities.xaverage05) {
        k = (middleEstimatesOfPermittedVelocities.yaverage075 - middleEstimatesOfPermittedVelocities.yaverage05) / (middleEstimatesOfPermittedVelocities.xaverage075 - middleEstimatesOfPermittedVelocities.xaverage05);
        b = (middleEstimatesOfPermittedVelocities.xaverage075 * middleEstimatesOfPermittedVelocities.yaverage05 - middleEstimatesOfPermittedVelocities.yaverage075 * middleEstimatesOfPermittedVelocities.xaverage05) / (middleEstimatesOfPermittedVelocities.xaverage075 - middleEstimatesOfPermittedVelocities.xaverage05);
    }
    else if (x <= middleEstimatesOfPermittedVelocities.xaverage05 && x > middleEstimatesOfPermittedVelocities.xaverage025) {
        k = (middleEstimatesOfPermittedVelocities.yaverage05 - middleEstimatesOfPermittedVelocities.yaverage025) / (middleEstimatesOfPermittedVelocities.xaverage05 - middleEstimatesOfPermittedVelocities.xaverage025);
        b = (middleEstimatesOfPermittedVelocities.xaverage05 * middleEstimatesOfPermittedVelocities.yaverage025 - middleEstimatesOfPermittedVelocities.yaverage05 * middleEstimatesOfPermittedVelocities.xaverage025) / (middleEstimatesOfPermittedVelocities.xaverage05 - middleEstimatesOfPermittedVelocities.xaverage025);
    }
    else {
        k = (middleEstimatesOfPermittedVelocities.yaverage025 - middleEstimatesOfPermittedVelocities.ymin) / (middleEstimatesOfPermittedVelocities.xaverage025 - middleEstimatesOfPermittedVelocities.xmin);
        b = (middleEstimatesOfPermittedVelocities.xaverage025 * middleEstimatesOfPermittedVelocities.ymin - middleEstimatesOfPermittedVelocities.yaverage025 * middleEstimatesOfPermittedVelocities.xmin) / (middleEstimatesOfPermittedVelocities.xaverage025 - middleEstimatesOfPermittedVelocities.xmin);
    }


    y = k * x + b;
    return y;
}

//Оценка качества дорог
function vQuality(x) {

    let k = 1, b, y;
    let middleQualityOfRoads = params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads;
    if (x <= middleQualityOfRoads.xmax && x > middleQualityOfRoads.xaverage075) {
        k = (middleQualityOfRoads.ymax - middleQualityOfRoads.yaverage075) / (middleQualityOfRoads.xmax - middleQualityOfRoads.xaverage075);
        b = (middleQualityOfRoads.xmax * middleQualityOfRoads.yaverage075 - middleQualityOfRoads.ymax * middleQualityOfRoads.xaverage075) / (middleQualityOfRoads.xmax - middleQualityOfRoads.xaverage075);
    }
    else if (x <= middleQualityOfRoads.xaverage075 && x > middleQualityOfRoads.xaverage05) {
        k = (middleQualityOfRoads.yaverage075 - middleQualityOfRoads.yaverage05) / (middleQualityOfRoads.xaverage075 - middleQualityOfRoads.xaverage05);
        b = (middleQualityOfRoads.xaverage075 * middleQualityOfRoads.yaverage05 - middleQualityOfRoads.yaverage075 * middleQualityOfRoads.xaverage05) / (middleQualityOfRoads.xaverage075 - middleQualityOfRoads.xaverage05);
    }
    else if (x <= params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 && x > params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage025) {
        k = (middleQualityOfRoads.yaverage05 - middleQualityOfRoads.yaverage025) / (params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 - middleQualityOfRoads.xaverage025);
        b = (middleQualityOfRoads.xaverage05 * middleQualityOfRoads.yaverage025 - middleQualityOfRoads.yaverage05 * middleQualityOfRoads.xaverage025) / (middleQualityOfRoads.xaverage05 - middleQualityOfRoads.xaverage025);
    }
    else {
        k = (middleQualityOfRoads.yaverage025 - middleQualityOfRoads.xmin) / (middleQualityOfRoads.xaverage025 - middleQualityOfRoads.xmin);
        b = (middleQualityOfRoads.xaverage025 * middleQualityOfRoads.xmin - middleQualityOfRoads.yaverage025 * middleQualityOfRoads.xmin) / (middleQualityOfRoads.xaverage025 - middleQualityOfRoads.xmin);
    }

    y = k * x + b;
    return y;
}

//Оценка светофоров на дороге
function vCost(x) {

    let k = 1, b, y;

    let middleNumberOfTrafficLights = params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights;
    if (x <= middleNumberOfTrafficLights.xmax && x > middleNumberOfTrafficLights.xaverage075) {

        k = (middleNumberOfTrafficLights.yaverage075 - middleNumberOfTrafficLights.ymax) / (middleNumberOfTrafficLights.xaverage075 - middleNumberOfTrafficLights.xmax);
        b = (middleNumberOfTrafficLights.xaverage075 * middleNumberOfTrafficLights.ymax - middleNumberOfTrafficLights.yaverage075 * middleNumberOfTrafficLights.xmax) / (middleNumberOfTrafficLights.xaverage075 - middleNumberOfTrafficLights.xmax);
    }
    else if (x <= params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage075 && x > params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.xaverage05) {
        k = (middleNumberOfTrafficLights.yaverage05 - middleNumberOfTrafficLights.yaverage075) / (middleNumberOfTrafficLights.xaverage05 - middleNumberOfTrafficLights.xaverage075);
        b = (middleNumberOfTrafficLights.xaverage05 * middleNumberOfTrafficLights.yaverage075 - middleNumberOfTrafficLights.yaverage05 * middleNumberOfTrafficLights.xaverage075) / (middleNumberOfTrafficLights.xaverage05 - middleNumberOfTrafficLights.xaverage075);
    }
    else if (x <= params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage05 && x > params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.xaverage025) {
        k = (middleNumberOfTrafficLights.yaverage025 - middleNumberOfTrafficLights.yaverage05) / (middleNumberOfTrafficLights.xaverage025 - middleNumberOfTrafficLights.xaverage05);
        b = (middleNumberOfTrafficLights.xaverage025 * middleNumberOfTrafficLights.yaverage05 - middleNumberOfTrafficLights.yaverage025 * middleNumberOfTrafficLights.xaverage05) / (middleNumberOfTrafficLights.xaverage025 - middleNumberOfTrafficLights.xaverage05);
    }
    else {
        k = (middleNumberOfTrafficLights.ymin - middleNumberOfTrafficLights.yaverage025) / (middleNumberOfTrafficLights.xmin - middleNumberOfTrafficLights.xaverage025);
        b = (middleNumberOfTrafficLights.xmin * middleNumberOfTrafficLights.yaverage025 - middleNumberOfTrafficLights.ymin * middleNumberOfTrafficLights.xaverage025) / (middleNumberOfTrafficLights.xmin - middleNumberOfTrafficLights.xaverage025);
    }


    y = k * x + b;
    return y;
}

//Оценка дороги
function lambda() {
    let middleEstimatesOfPermittedVelocities = params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities;
    let middleNumberOfTrafficLights = params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights;
    let middleQualityOfRoads = params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads;
    if (middleEstimatesOfPermittedVelocities.rank == 1) {
        middleEstimatesOfPermittedVelocities.lambda = 1 / (vSpeed(middleNumberOfTrafficLights.xСompare) + vSpeed(middleQualityOfRoads.xСompare) + 1);
        middleQualityOfRoads.lambda = middleEstimatesOfPermittedVelocities.lambda * vSpeed(middleQualityOfRoads.xСompare);
        middleNumberOfTrafficLights.lambda = middleEstimatesOfPermittedVelocities.lambda * vSpeed(middleNumberOfTrafficLights.xСompare);
    }
    else if (middleQualityOfRoads.rank == 1) {
        middleQualityOfRoads.lambda = 1 / (vQuality(middleEstimatesOfPermittedVelocities.xСompare) + vQuality(middleNumberOfTrafficLights.xСompare) + 1);
        middleEstimatesOfPermittedVelocities.lambda = middleQualityOfRoads.lambda * vQuality(middleEstimatesOfPermittedVelocities.xСompare);
        middleNumberOfTrafficLights.lambda = middleQualityOfRoads.lambda * vQuality(middleNumberOfTrafficLights.xСompare);
    }
    else if (middleNumberOfTrafficLights.rank == 1) {
        middleNumberOfTrafficLights.lambda = 1 / (vCost(middleEstimatesOfPermittedVelocities.xСompare) + vCost(middleNumberOfTrafficLights.xСompare) + 1);
        middleEstimatesOfPermittedVelocities.lambda = middleNumberOfTrafficLights.lambda * vCost(middleEstimatesOfPermittedVelocities.xСompare);
        middleQualityOfRoads.lambda = middleNumberOfTrafficLights.lambda * vCost(middleQualityOfRoads.xСompare);
    }

}

//Аддитивная оценка дороги
function vAdditiveEstimation(xSpeed, xQuality, xCost) {
    lambda();
    return params.valuesForValueFunctionsAndForScalingFactors.middleEstimatesOfPermittedVelocities.lambda * vSpeed(xSpeed) + params.valuesForValueFunctionsAndForScalingFactors.middleQualityOfRoads.lambda * vQuality(xQuality) + params.valuesForValueFunctionsAndForScalingFactors.middleNumberOfTrafficLights.lambda * vCost(xCost);
}

//Функция модификации матрицы стоимости
function ModificationOfMatrix(Matrix, MatrixOfEstimatesOfPermittedVelocities, MatrixOfQualityOfRoads, MatrixOfFare) {

    for (let i = 0; i < Matrix.length; i++)
        for (let j = 0; j < Matrix[0].length; j++) {
            if (i != j)
                Matrix[i][j] *= (1 - vAdditiveEstimation(MatrixOfEstimatesOfPermittedVelocities[i][j], MatrixOfQualityOfRoads[i][j], MatrixOfFare[i][j]));
        }
    return Matrix;
}

      

        

