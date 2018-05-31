const InputCoefficientCriteria = (function () {

    const container = $('.js-params-2');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => InputForOneDimentionalFunction.init());
    container.find('.js-next').click(() => InputMatrixSpeed.init());

    const init = () => {
        $('.container').hide();
        container.show();

        let _parameters = params.coefficientCriteria;
        Object.keys(_parameters).forEach(par =>
            Object.keys(_parameters[par]).forEach(par2 => {
                let field = $(`.js-${par}-${par2}`);
                field.val(_parameters[par][par2]);
                field.focusout(() => {
                    _parameters[par][par2] = +field.val();
                });
            }))
    };

    return {
        init
    }
})();