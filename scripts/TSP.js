// Генетический алгоритм

//Функция для подсчета длины пути в генетическом алгоритме

//Значения построения одномерных функций ценности
const params1 = {
    middleSpeedRestriction: {
        max: 0, average075: 0, average05: 0
    },
    middleQualityRoads: {

    }
};

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
            for (let k = p; k < N; k++)
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

    costWay += matrixWay[way[way.length - 1]][0];
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

    min = 999999;

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
        min = 999999;

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


    if (x <= x1Speed && x > x2Speed) {
        k = (y1Speed - y2Speed) / (x1Speed - x2Speed);
        b = (x1Speed * y2Speed - y1Speed * x2Speed) / (x1Speed - x2Speed);
    }
    else if (x <= x2Speed && x > x3Speed) {
        k = (y2Speed - y3Speed) / (x2Speed - x3Speed);
        b = (x2Speed * y3Speed - y2Speed * x3Speed) / (x2Speed - x3Speed);
    }
    else if (x <= x3Speed && x > x4Speed) {
        k = (y3Speed - y4Speed) / (x3Speed - x4Speed);
        b = (x3Speed * y4Speed - y3Speed * x4Speed) / (x3Speed - x4Speed);
    }
    else {
        k = (y4Speed - y5Speed) / (x4Speed - x5Speed);
        b = (x4Speed * y5Speed - y4Speed * x5Speed) / (x4Speed - x5Speed);
    }


    y = k * x + b;
    return y;
}

//Оценка качества дорог
function vQuality(x) {

    let k = 1, b, y;
    if (x <= x1Quality && x > x2Quality) {
        k = (y1Quality - y2Quality) / (x1Quality - x2Quality);
        b = (x1Quality * y2Quality - y1Quality * x2Quality) / (x1Quality - x2Quality);
    }
    else if (x <= x2Quality && x > x3Quality) {
        k = (y2Quality - y3Quality) / (x2Quality - x3Quality);
        b = (x2Quality * y3Quality - y2Quality * x3Quality) / (x2Quality - x3Quality);
    }
    else if (x <= x3Speed && x > x4Speed) {
        k = (y3Quality - y4Speed) / (x3Speed - x4Quality);
        b = (x3Quality * y4Speed - y3Speed * x4Quality) / (x3Quality - x4Quality);
    }
    else {
        k = (y4Quality - y5Quality) / (x4Quality - x5Quality);
        b = (x4Quality * y5Quality - y4Quality * x5Quality) / (x4Quality - x5Quality);
    }

    y = k * x + b;
    return y;
}

//Оценка светофоров на дороге
function vCost(x) {

    let k = 1, b, y;

    if (x <= x1Cost && x > x2Cost) {

        k = (y2Cost - y1Cost) / (x2Cost - x1Cost);
        b = (x2Cost * y1Cost - y2Cost * x1Cost) / (x2Cost - x1Cost);
    }
    else if (x <= x2Quality && x > x3Quality) {
        k = (y3Cost - y2Cost) / (x3Cost - x2Cost);
        b = (x3Cost * y2Cost - y3Cost * x2Cost) / (x3Cost - x2Cost);
    }
    else if (x <= x3Speed && x > x4Speed) {
        k = (y4Cost - y3Cost) / (x4Cost - x3Cost);
        b = (x4Cost * y3Cost - y4Cost * x3Cost) / (x4Cost - x3Cost);
    }
    else {
        k = (y5Cost - y4Cost) / (x5Cost - x4Cost);
        b = (x5Cost * y4Cost - y5Cost * x4Cost) / (x5Cost - x4Cost);
    }


    y = k * x + b;
    return y;
}

//Оценка дороги
function lambda() {
    if (rank1Speed == 1) {
        lambdaSpeed = 1 / (vSpeed(x3СompareCost) + vSpeed(x2СompareQuality) + 1);
        lambdaQuality = lambdaSpeed * vSpeed(x2СompareQuality);
        lambdaCost = lambdaSpeed * vSpeed(x3СompareCost);
    }
    else if (rank2Quality == 1) {
        lambdaQuality = 1 / (vQuality(x1СompareSpeed) + vQuality(x3СompareCost) + 1);
        lambdaSpeed = lambdaQuality * vQuality(x1СompareSpeed);
        lambdaCost = lambdaQuality * vQuality(x3СompareCost);
    }
    else if (rank3Cost == 1) {
        lambdaCost = 1 / (vCost(x1СompareSpeed) + vCost(x3СompareCost) + 1);
        lambdaSpeed = lambdaCost * vCost(x1СompareSpeed);
        lambdaQuality = lambdaCost * vCost(x2СompareQuality);
    }

}

//Аддитивная оценка дороги
function vAdditiveEstimation(xSpeed, xQuality, xCost) {
    lambda();
    return lambdaSpeed * vSpeed(xSpeed) + lambdaQuality * vQuality(xQuality) + lambdaCost * vCost(xCost);
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

      

        

