const CityParams = (function () {

    let counter = 0;

    const initCities = [
        'Уфа',
        'Стерлитамак',
        'Салават',
        'Нефтикамск',
        'Октябрьский',
        'Туймазы',
        'Белорецк',
        'Ишимбай',
        'Сибай',
        'Кумертау'
    ];

    let cities = [];

    const cityTemplate = (name, i) => `
        <div class="js-city-${i}">
            <span class="city-name">${name}</span>
            <input type="button" class="city js-delete-city-${i}" value="Удалить"/>
            </div>`;

    const reset = () => {
        $('.container').hide();
        $('.container.cities-params').show();
        cities = initCities;
        $('.js-cities').empty();
        let addCityCallback = city => {
            const i = counter++;
            $('.js-cities').append(cityTemplate(city, i));
            let deleteButton = $('.js-delete-city-' + i);
            deleteButton.click(() => deleteButton.parent().remove());
        };
        initCities.forEach(addCityCallback);
        $('.js-add').click(() => {
            const city = $('.js-city').val().trim();
            if (city && !cities.map(c => c.toUpperCase()).includes(city.toUpperCase())) {
                addCityCallback(city);
                $('.js-city').val('');
            } else {
                alert('Пустое значение или город уже присутствует в списке')
            }
        });
        $('.blocker').hide();
        $('.js-cities-params').find('.js-next').click(() => {
            params.cities = $('.city-name').toArray().map(el => $(el).text());
            InputForOneDimentionalFunction.init();
        });
    };

    return {
        reset: reset
    }

})();