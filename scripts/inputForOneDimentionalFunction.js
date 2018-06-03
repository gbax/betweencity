const InputForOneDimentionalFunction = (function () {

    const container = $('.js-params-1');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => CityParams.show());
    container.find('.js-next').click(() => {
        let _parameters = params.oneDimentionalFunctionValue;
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
            InputCoefficientCriteria.init()
        }
    });

    const init = () => {
        $('.container').hide();
        container.show();

        let _parameters = params.oneDimentionalFunctionValue;
        Object.keys(_parameters).forEach(par =>
            Object.keys(_parameters[par]).forEach(par2 => {
                let field = $(`.js-${par}-${par2}`);
                field.val(_parameters[par][par2]);
                field.off('focusout').focusout(() => {
                    let number = field.val();
                    if (number !== '' && !Number.isInteger(+number)) {
                        alert('Введено нечисловое значение');
                        _parameters[par][par2] = null;
                        return;
                    } else if ((+number) < 0) {
                        alert('Введено отрицательное значение');
                        _parameters[par][par2] = null;
                        return;
                    }
                    _parameters[par][par2] = number === '' ? null : +number;
                });
            }))
    };

    return {
        init
    }
})();