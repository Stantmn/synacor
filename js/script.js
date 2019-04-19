import { Weather } from "./weather.js";

const weather = new Weather();

window.onload = function() {
    main();
};

const main = async () => {
    await weather.showWeather();
};
