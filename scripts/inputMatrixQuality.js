const InputMatrixQuality = (function () {

    const container = $('.js-params-4');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => InputMatrixSpeed.init());
    container.find('.js-next').click(() => {
        let _parameters = params.avgRoadQuality;
        let hasEmpty = false;
        Object.keys(_parameters).forEach(par =>
            Object.keys(_parameters[par]).forEach(par2 => {
                if (_parameters[par][par2] === null ||
                    _parameters[par][par2] === undefined ||
                    _parameters[par][par2] === '') {
                    hasEmpty = true;
                }
            }));
        if (hasEmpty) {
            alert('Имеются пустые значения')
        } else {
            InputMatrixNumbersOfLights.init()
        }
    });

    const init = () => {
        $('.container').hide();
        container.show();
        let table = container.find('.params-dynamic-table');
        table.empty();
        let cities = params.cities;
        let matrix = null;
        if (!params.avgRoadQuality && params.avgRoadQuality.length !== cities.length && params.avgRoadQuality[0].length !== cities.length) {
            matrix = Array.from(new Array(cities.length).keys()).map(i => Array.from(new Array(cities.length).keys()).map(y => 1));
            params.avgRoadQuality = matrix;
        } else {
            matrix = params.avgRoadQuality;
        }
        table
            .append('<div></div>')
            .append(cities.map(c => `<div>${c.city ? c.city : c}</div>`).join(''));
        table
            .append(cities.map((c, x) => `<div>${c.city ? c.city : c}</div>${cities.map((cc, y) => `<div><input type="text" class="text-value js-avgRoadQuality-${x}-${y}"/></div>`).join('')}`).join(''));

        table.css('grid-template-columns', Array.from(new Array(cities.length+1).keys()).map(c => '100px ').join(''));
        table.css('grid-template-rows', Array.from(new Array(cities.length+1).keys()).map(c => '50px ').join(''));
        Object.keys(matrix).forEach(par =>
            Object.keys(matrix[par]).forEach(par2 => {
                let field = $(`.js-avgRoadQuality-${par}-${par2}`);
                field.val(matrix[par][par2]);
                field.off('focusout').focusout(() => {
                    let number = field.val();
                    if (number !== '' && !Number.isInteger(+number)) {
                        alert('Введено нечисловое значение');
                        matrix[par][par2] = null;
                        return;
                    } else if ((+number) < 0) {
                        alert('Введено отрицательное значение');
                        matrix[par][par2] = null;
                        return;
                    }
                    matrix[par][par2] = number === '' ? null : +number;
                });
            }))
    };

    return {
        init
    }
})();