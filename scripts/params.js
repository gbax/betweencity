const params = {
        //Значения для построения одномерных функций ценности и для определения шкалирующих коэффициентов
    // TODO надо удалить
        valuesForValueFunctionsAndForScalingFactors: {
            middleEstimatesOfPermittedVelocities: {
                xmax: 0, xaverage075: 0, xaverage05: 0, xaverage025: 0, xmin: 0, lambda: 0, rank: 0, xСompare: 0,
                ymax: 1, yaverage075: 0.75, yaverage05: 0.5, yaverage025: 0.25, ymin: 0
            },
            middleQualityOfRoads: {
                xmax: 0, xaverage075: 0, xaverage05: 0, xaverage025: 0, xmin: 0, lambda: 0, rank: 0, xСompare: 0,
                ymax: 0, yaverage075: 0.25, yaverage05: 0.5, yaverage025: 0.75, ymin: 1
            },
            middleNumberOfTrafficLights: {
                xmax: 0, xaverage075: 0, xaverage05: 0, xaverage025: 0, xmin: 0, lambda: 0, rank: 0, xСompare: 0,
                ymax: 0, yaverage075: 0.25, yaverage05: 0.5, yaverage025: 0.75, ymin: 1
            }

        },


        // TODO Эти параметры хранят значения с форм, используй их
        oneDimentionalFunctionValue: {
            speedRestriction: {
                max: 0,
                avg075: 0,
                avg05: 0,
                avg025: 0,
                min: 0
            },
            roadQuality: {
                max: 0,
                avg075: 0,
                avg05: 0,
                avg025: 0,
                min: 0
            },
            avgLightCount: {
                max: 0,
                avg075: 0,
                avg05: 0,
                avg025: 0,
                min: 0
            }
        },
        coefficientCriteria: {
            speedRestriction: {
                rating: 0,
                avgWeightCriteria: 0
            },
            roadQuality: {
                rating: 0,
                avgWeightCriteria: 0
            },
            avgLightCount: {
                rating: 0,
                avgWeightCriteria: 0
            }
        },
        avgRoadQuality: [],
        avgSpeedMatrix: [],
        avgLightCountMatrix: [],
        useMutation: false,
    iterationCount: 10000,
        cities:
            [],
        routes:
            []
    }
;