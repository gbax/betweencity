let params = {
        //Значения для построения одномерных функций ценности и для определения шкалирующих коэффициентов

        oneDimentionalFunctionValue: {
            speedRestriction: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            },
            roadQuality: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            },
            avgLightCount: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            }
        },
        coefficientCriteria: {
            speedRestriction: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
            },
            roadQuality: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
            },
            avgLightCount: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
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

const defaultParams = {
        //Значения для построения одномерных функций ценности и для определения шкалирующих коэффициентов

        oneDimentionalFunctionValue: {
            speedRestriction: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            },
            roadQuality: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            },
            avgLightCount: {
                xmax: 0,
                xavg075: 0,
                xavg05: 0,
                xavg025: 0,
                xmin: 0,

                ymax: 1,
                yaverage075: 0.75,
                yaverage05: 0.5,
                yaverage025: 0.25,
                ymin: 0
            }
        },
        coefficientCriteria: {
            speedRestriction: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
            },
            roadQuality: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
            },
            avgLightCount: {
                rating: 0,
                avgWeightCriteria: 0,
                lambda: 0
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