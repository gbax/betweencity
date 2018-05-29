const Params7 = (function () {

    const container = $('.js-params-6');
    container.find('.js-to-begin').click(() => CityParams.reset());
    container.find('.js-prev').click(() => Params6.init());
    container.find('.js-next').click(() => {
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
        field.focusout(() => {
            params.iterationCount = +field.val();
        });
    };

    return {
        init
    }
})();
