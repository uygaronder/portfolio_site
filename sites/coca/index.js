const radioButtons = [
    document.getElementById("testamonial1"),
    document.getElementById("testamonial2"),
    document.getElementById("testamonial3"),
    document.getElementById("testamonial4"),
];

const selector = document.getElementById("testamonialSelector");
const workflowSlider = document.getElementById("workflowSlider");
const workflowSliderInput = document.getElementById("workflowSliderInput");
const slides = document.getElementById("slides");
const testamonialsContainer = document.getElementById("testamonials");

radioButtons.forEach((button) =>
    button.addEventListener("click", () => changeRadioTo(button.id))
);

var radioValue = document.querySelector(
    "input[name='testamonialRadioScroll']:checked"
);

function changeRadioTo(to) {
    switch (to) {
        case "testamonial2":
            selector.className = "testa2";
            testamonialsContainer.scrollTo(
                testamonialsContainer.offsetWidth,
                0
            );
            break;
        case "testamonial3":
            selector.className = "testa3";
            testamonialsContainer.scrollTo(
                testamonialsContainer.offsetWidth * 2,
                0
            );
            break;
        case "testamonial4":
            selector.className = "testa4";
            testamonialsContainer.scrollTo(
                testamonialsContainer.offsetWidth * 3,
                0
            );
            break;
        default:
            selector.className = "testa1";
            testamonialsContainer.scrollTo(0, 0);
            break;
    }
}

workflowSliderInput.addEventListener("input", () => {
    slides.scrollTo(
        ((workflowSliderInput.value / 100) * slides.offsetWidth) / 2,
        0
    );
});
