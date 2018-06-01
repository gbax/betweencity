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


        population.push(reshuffle);
    }
    return population;
}


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

    for (let i = 0; i < population.length; i++) {
        newPopulation2[i] = []
        for (let j = 0; j < population[0].length; j++) {
            newPopulation2[i][j] = newPopulation[costWays.length - i - 1][j];
        }
    }
    return newPopulation2;
}

function Mutation(population)
{
    let k = 0;
    let l = 0;
    let tmp;
    let flag;


    for (let i = 0; i < population.length; i++)
    {
        flag = 0;
        while (flag == 0)
        {
            k = Math.floor(Math.random() * ((population[0].length - 1) - 1) + 1);
            l = Math.floor(Math.random() * ((population[0].length - 1) - 1) + 1);

            if (k != l)
            {
                tmp = population[i][k];
                population[i][k] = population[i][l];
                population[i][l] = tmp;
                flag = 1;
            }


        }

    }
    return population;
}
//Генетический алгоритм
function GeneticAlgorithm(matrixWay, sizePopulation, firstCity) {

    let numberIteration = params.iterationCount;
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

        if(params.useMutation == true) {
            for (let i = 0; i < sizePopulation; i++)//по наборам
            {
                Mutation(newPopulation);
            }
        }
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







      

        

