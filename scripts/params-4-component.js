const Params4 = (function () {

    const container = $('.js-params-3');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => Params3.init());
    container.find('.js-next').click(() => Params5.init());

    const init = () => {
        $('.container').hide();
        container.show();
        let table = container.find('.params-dynamic-table');
        table.empty();
        let cities = params.cities;
        const matrix = Array.from(new Array(cities.length).keys()).map(i => Array.from(new Array(cities.length).keys()).map(y => 1));
        params.avgSpeedMatrix = matrix;
        table
            .append('<div></div>')
            .append(cities.map(c => `<div>${c}</div>`).join(''));
        table
            .append(cities.map((c, x) => `<div>${c}</div>${cities.map((cc, y) => `<div><input type="text" class="text-value js-avgSpeedMatrix-${x}-${y}"/></div>`).join('')}`).join(''));
        table.css('grid-template-columns', Array.from(new Array(cities.length+1).keys()).map(c => '100px ').join(''));
        table.css('grid-template-rows', Array.from(new Array(cities.length+1).keys()).map(c => '50px ').join(''));
        Object.keys(matrix).forEach(par =>
            Object.keys(matrix[par]).forEach(par2 => {
                let field = $(`.js-avgSpeedMatrix-${par}-${par2}`);
                field.val(matrix[par][par2]);
                field.focusout(() => {
                    matrix[par][par2] = +field.val();
                });
            }))
    };

    return {
        init
    }
})();