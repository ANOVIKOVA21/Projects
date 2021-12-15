import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

const sliderQuantity = <target>document.querySelector('.filters-by-range__quantity');
const sliderQuantityValues = document.querySelectorAll('.filters-by-range__quantity-value');

noUiSlider.create(sliderQuantity, {
    start: [1, 12],
    connect: true,
    range: {
        min: 1,
        max: 12,
    },
    step: 1,
});

sliderQuantity.noUiSlider.on('update', function (values, handle) {
    sliderQuantityValues[handle].innerHTML = (parseInt(values[handle] as string) as unknown) as string;
});

const sliderYear = <target>document.querySelector('.filters-by-range__year');
const sliderYearValues = document.querySelectorAll('.filters-by-range__year-value');
noUiSlider.create(sliderYear, {
    start: [1940, 2020],
    connect: true,
    range: {
        min: 1940,
        max: 2020,
    },
    step: 1,
});

sliderYear.noUiSlider.on('update', function (values, handle) {
    sliderYearValues[handle].innerHTML = (parseInt(values[handle] as string) as unknown) as string;
});