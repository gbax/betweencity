const InputForOneDimentionalFunction = (function () {

    const container = $('.js-params-1');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => CityParams.reset());
    container.find('.js-next').click(() => InputCoefficientCriteria.init());

    const init = () => {
        $('.container').hide();
        container.show();

        let _parameters = params.oneDimentionalFunctionValue;
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