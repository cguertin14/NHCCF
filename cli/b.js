import axios from 'axios';


const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];
        if (rate) return rate;
        else throw new Error();
    } catch (e) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}.`)
    }
};

const getCountries = async (currency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map(country => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currency}.`);
    }
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then(tempCountries => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then(rate => {
        const exchangeAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};

const convertCurrencyAlt = async (from, to, amount) => {
    let countries = await getCountries(to);
    let exchangeRate = await getExchangeRate(from, to);
    const exchangeAmount = amount * exchangeRate;

    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

// getExchangeRate('USD','CAD').then(rate => {
//     console.log(rate);
// });

// convertCurrency('USD','CAD', 100).then(countries => {
//     console.log(countries);
// });

convertCurrencyAlt('USD', 'CAD', 100).then(countries => {
    console.log(countries);
}).catch(e => {
    console.log(e);
});