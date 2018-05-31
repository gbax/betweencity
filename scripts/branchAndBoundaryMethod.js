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