const AdjustmentOfAlgorithmParameters = (function () {

    const container = $('.js-params-6');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => InputMatrixNumbersOfLights.init());
    container.find('.js-next').click(() => {
        if (params.iterationCount === '' || params.iterationCount === undefined || params.iterationCount === null) {
            alert('Введено пустое значение');
            return
        }
        $('.blocker').show();
        MapParams.init();
    });

    const init = () => {
        $('.container').hide();
        container.show();
        const checkbox = $('.js-use-mutation');
        checkbox.prop('checked', params.useMutation);
        checkbox.change(() => {
            params.useMutation = checkbox.prop('checked');
        });
        const field = $('.js-iteration-count');
        field.val(params.iterationCount);
        field.off('focusout').focusout(() => {
            params.iterationCount = +field.val();
        });
    };

    return {
        init
    }
})();
