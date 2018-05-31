//Метод Кини - Райфа

//Оценка скорости
function vSpeed(x) {
    let k = 1, b=0, y=0;


    let speedRestriction = params.oneDimentionalFunctionValue.speedRestriction;
    if (x <= speedRestriction.xmax && x > speedRestriction.xavg075) {
        k = (speedRestriction.ymax - speedRestriction.yaverage075) / (speedRestriction.xmax - speedRestriction.xavg075);
        b = (speedRestriction.xmax * speedRestriction.yaverage075 - speedRestriction.ymax * speedRestriction.xavg075) / (speedRestriction.xmax - speedRestriction.xavg075);
    }
    else if (x <= speedRestriction.xavg075 && x > speedRestriction.xavg05) {
        k = (speedRestriction.yaverage075 - speedRestriction.yaverage05) / (speedRestriction.xavg075 - speedRestriction.xavg05);
        b = (speedRestriction.xavg075 * speedRestriction.yaverage05 - speedRestriction.yaverage075 * speedRestriction.xavg05) / (speedRestriction.xavg075 - speedRestriction.xavg05);
    }
    else if (x <= speedRestriction.xavg075 && x > speedRestriction.xavg025) {
        k = (speedRestriction.yaverage05 - speedRestriction.yaverage025) / (speedRestriction.xavg05 - speedRestriction.xavg025);
        b = (speedRestriction.xavg05 * speedRestriction.yaverage025 - speedRestriction.yaverage05 * speedRestriction.xavg025) / (speedRestriction.xavg05 - speedRestriction.xavg025);
    }
    else if  (x <= speedRestriction.xavg025 && x > speedRestriction.xmin) {
        k = (speedRestriction.yaverage025 - speedRestriction.ymin) / (speedRestriction.xavg025 - speedRestriction.xmin);
        b = (speedRestriction.xavg025 * speedRestriction.ymin - speedRestriction.yaverage025 * speedRestriction.xmin) / (speedRestriction.xavg025 - speedRestriction.xmin);
    }


    y = k * x + b;
    return y;
}

//Оценка качества дорог
function vQuality(x) {

    let k = 1, b=0, y=0;
    let roadQuality = params.oneDimentionalFunctionValue.roadQuality;
    if (x <= roadQuality.xmax && x > roadQuality.xavg075) {
        k = (roadQuality.ymax - roadQuality.yaverage075) / (roadQuality.xmax - roadQuality.xavg075);
        b = (roadQuality.xmax * roadQuality.yaverage075 - roadQuality.ymax * roadQuality.xavg075) / (roadQuality.xmax - roadQuality.xavg075);
    }
    else if (x <= roadQuality.xavg075 && x > roadQuality.xavg05) {
        k = (roadQuality.yaverage075 - roadQuality.yaverage05) / (roadQuality.xavg075 - roadQuality.xavg05);
        b = (roadQuality.xavg075 * roadQuality.yaverage05 - roadQuality.yaverage075 * roadQuality.xavg05) / (roadQuality.xavg075 - roadQuality.xavg05);
    }
    else if (x <= roadQuality.xavg05 && x > roadQuality.xavg025) {
        k = (roadQuality.yaverage05 - roadQuality.yaverage025) / (roadQuality.xavg05 - roadQuality.xavg025);
        b = (roadQuality.xavg05 * roadQuality.yaverage025 - roadQuality.yaverage05 * roadQuality.xavg025) / (roadQuality.xavg05 - roadQuality.xavg025);
    }
    else if (x <= roadQuality.xavg025 && x >= roadQuality.xmin){
        k = (roadQuality.yaverage025 - roadQuality.xmin) / (roadQuality.xavg025 - roadQuality.xmin);
        b = (roadQuality.xavg025 * roadQuality.xmin - roadQuality.yaverage025 * roadQuality.xmin) / (roadQuality.xavg025 - roadQuality.xmin);
    }

    y = k * x + b;
    return y;
}

//Оценка светофоров на дороге
function vCost(x) {

    let k = 1, b=0, y=0;

    let avgLightCount = params.oneDimentionalFunctionValue.avgLightCount;
    if (x <= avgLightCount.xmax && x > avgLightCount.xavg075) {

        k = (avgLightCount.yaverage075 - avgLightCount.ymax) / (avgLightCount.xavg075 - avgLightCount.xmax);
        b = (avgLightCount.xavg075 * avgLightCount.ymax - avgLightCount.yaverage075 * avgLightCount.xmax) / (avgLightCount.xavg075 - avgLightCount.xmax);
    }
    else if (x <= avgLightCount.xavg075 && x > avgLightCount.xavg05) {
        k = (avgLightCount.yaverage05 - avgLightCount.yaverage075) / (avgLightCount.xavg05 - avgLightCount.xavg075);
        b = (avgLightCount.xavg05 * avgLightCount.yaverage075 - avgLightCount.yaverage05 * avgLightCount.xavg075) / (avgLightCount.xavg05 - avgLightCount.xavg075);
    }
    else if (x <= avgLightCount.xavg05 && x > avgLightCount.xavg025) {
        k = (avgLightCount.yaverage025 - avgLightCount.yaverage05) / (avgLightCount.xavg025 - avgLightCount.xavg05);
        b = (avgLightCount.xavg025 * avgLightCount.yaverage05 - avgLightCount.yaverage025 * avgLightCount.xavg05) / (avgLightCount.xavg025 - avgLightCount.xavg05);
    }
    else if (x <= avgLightCount.xavg025 && x >= avgLightCount.xmin){
        k = (avgLightCount.ymin - avgLightCount.yaverage025) / (avgLightCount.xmin - avgLightCount.xavg025);
        b = (avgLightCount.xmin * avgLightCount.yaverage025 - avgLightCount.ymin * avgLightCount.xavg025) / (avgLightCount.xmin - avgLightCount.xavg025);
    }


    y = k * x + b;
    return y;
}

//Оценка дороги
function lambda() {
    let speedRestriction = params.coefficientCriteria.speedRestriction;
    let avgLightCount = params.coefficientCriteria.avgLightCount;
    let roadQuality = params.coefficientCriteria.roadQuality;
    if (speedRestriction.rating == 1) {
        speedRestriction.lambda = 1 / (vSpeed(avgLightCount.avgWeightCriteria) + vSpeed(roadQuality.avgWeightCriteria) + 1);
        roadQuality.lambda = speedRestriction.lambda * vSpeed(roadQuality.avgWeightCriteria);
        avgLightCount.lambda = speedRestriction.lambda * vSpeed(avgLightCount.avgWeightCriteria);
    }
    else if (roadQuality.rating == 1) {
        roadQuality.lambda = 1 / (vQuality(speedRestriction.avgWeightCriteria) + vQuality(avgLightCount.avgWeightCriteria) + 1);
        speedRestriction.lambda = roadQuality.lambda * vQuality(speedRestriction.avgWeightCriteria);
        avgLightCount.lambda = roadQuality.lambda * vQuality(avgLightCount.avgWeightCriteria);
    }
    else if (avgLightCount.rating == 1) {
        avgLightCount.lambda = 1 / (vCost(speedRestriction.avgWeightCriteria) + vCost(avgLightCount.avgWeightCriteria) + 1);
        speedRestriction.lambda = avgLightCount.lambda * vCost(speedRestriction.avgWeightCriteria);
        roadQuality.lambda = avgLightCount.lambda * vCost(roadQuality.avgWeightCriteria);
    }

}

//Аддитивная оценка дороги
function vAdditiveEstimation(xSpeed, xQuality, xCost) {
    lambda();
    return params.coefficientCriteria.speedRestriction.lambda * vSpeed(xSpeed) + params.coefficientCriteria.roadQuality.lambda * vQuality(xQuality) + params.coefficientCriteria.avgLightCount.lambda * vCost(xCost);
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
