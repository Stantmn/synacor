import { Weather } from "./weather.js";

window.onload = function() {
    main();
};

const main = async () => {
    const weather = new Weather();
    await weather.getIp();
    await weather.getWeather();
    await weather.setData();
};
