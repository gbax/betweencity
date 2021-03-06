const CityParams = (function () {

    let counter = 0;

    const fileChooseCallback = (evt) => {
        const _this = this;
        let files = evt.target.files;
        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();
            reader.onload = (reader => {
                return () => {
                    let contents = reader.result;
                    params = JSON.parse(contents);
                    cities = params.cities.map(c => c.city);
                    initApp();
                }
            })(reader);
            reader.readAsText(f);
        }
    };
    $('#files').change(fileChooseCallback);

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
            <input type="button" class="city js-delete-city-${i}" value="-" style=" height: 18px"/>
            </div>`;

    const reset = () => {
        $('.container').hide();
        $('.container.cities-params').show();
        cities = initCities;
        params = jQuery.extend(true, {}, defaultParams);
        initApp();
    };

    const initApp = () => {
        $('.js-cities').empty();
        let addCityCallback = city => {
            const i = counter++;
            $('.js-cities').append(cityTemplate(city, i));
            let deleteButton = $('.js-delete-city-' + i);
            deleteButton.click(() => deleteButton.parent().remove());
        };
        cities.forEach(addCityCallback);
        $('.js-add').click(async () => {
            const city = $('.js-city').val().trim();
            if (city && !cities.map(c => c.toUpperCase()).includes(city.toUpperCase())) {
                $('.blocker').show();
                let isExsist = await new Promise(resolve =>
                    $.get(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city}&results=1`, (data) => {
                    })
                        .done(data => {
                            resolve(data.response.GeoObjectCollection.featureMember.length !== 0);
                        }));
                if (isExsist) {
                    cities.push(city);
                    addCityCallback(city);
                    $('.js-city').val('');
                } else {
                    alert('Введен несуществующий город');
                }
                $('.blocker').hide();
            } else {
                alert('Пустое значение или город уже присутствует в списке')
            }
        });
        $('.blocker').hide();
        $('.js-cities-params').find('.js-next').click(() => {
            params.cities = $('.city-name').toArray().map(el => $(el).text());
            if (!params.cities.length) {
                alert('Не введено ни одного города!');
                return;
            }
            InputForOneDimentionalFunction.init();
        });
    };

    const show = () => {
        $('.container').hide();
        $('.container.cities-params').show();
    };


    return {
        reset: reset,
        show: show
    }

})();