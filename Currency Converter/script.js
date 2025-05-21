const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("result");

const countryCodeMap = {
"AED": "AE",
  "AFN": "AF",
  "XCD": "AG",
  "ALL": "AL",
  "AMD": "AM",
  "ANG": "AN",
  "AOA": "AO",
  "ARS": "AR",
  "AUD": "AU",
  "AZN": "AZ",
  "BAM": "BA",
  "BBD": "BB",
  "BDT": "BD",
  "XOF": "BE",
  "BGN": "BG",
  "BHD": "BH",
  "BIF": "BI",
  "BMD": "BM",
  "BND": "BN",
  "BOB": "BO",
  "BRL": "BR",
  "BSD": "BS",
  "CAD": "CA",
  "CDF": "CD",
  "CHF": "CH",
  "CLP": "CL",
  "CNY": "CN",
  "COP": "CO",
  "CRC": "CR",
  "CUP": "CU",
  "CVE": "CV",
  "CZK": "CZ",
  "DJF": "DJ",
  "DKK": "DK",
  "DOP": "DO",
  "DZD": "DZ",
  "EGP": "EG",
  "EUR": "FR",
  "FJD": "FJ",
  "FKP": "FK",
  "GBP": "GB",
  "GEL": "GE",
  "GHS": "GH",
  "GIP": "GI",
  "GMD": "GM",
  "GNF": "GN",
  "GTQ": "GT",
  "GYD": "GY",
  "HKD": "HK",
  "HNL": "HN",
  "HRK": "HR",
  "HTG": "HT",
  "HUF": "HU",
  "IDR": "ID",
  "ILS": "IL",
  "INR": "IN",
  "IQD": "IQ",
  "IRR": "IR",
  "ISK": "IS",
  "JMD": "JM",
  "JOD": "JO",
  "JPY": "JP",
  "KES": "KE",
  "KGS": "KG",
  "KHR": "KH",
  "KRW": "KR",
  "KWD": "KW",
  "KZT": "KZ",
  "LAK": "LA",
  "LBP": "LB",
  "LKR": "LK",
  "LRD": "LR",
  "LTL": "LT",
  "MAD": "MA",
  "MDL": "MD",
  "MGA": "MG",
  "MKD": "MK",
  "MMK": "MM",
  "MNT": "MN",
  "MOP": "MO",
  "MRO": "MR",
  "MUR": "MU",
  "MVR": "MV",
  "MWK": "MW",
  "MXN": "MX",
  "MYR": "MY",
  "MZN": "MZ",
  "NAD": "NA",
  "NGN": "NG",
  "NIO": "NI",
  "NOK": "NO",
  "NPR": "NP",
  "NZD": "NZ",
  "OMR": "OM",
  "PAB": "PA",
  "PEN": "PE",
  "PGK": "PG",
  "PHP": "PH",
  "PKR": "PK",
  "PLN": "PL",
  "PYG": "PY",
  "QAR": "QA",
  "RON": "RO",
  "RSD": "RS",
  "RUB": "RU",
  "RWF": "RW",
  "SAR": "SA",
  "SBD": "SB",
  "SCR": "SC",
  "SEK": "SE",
  "SGD": "SG",
  "SLL": "SL",
  "SOS": "SO",
  "SRD": "SR",
  "STD": "ST",
  "SVC": "SV",
  "SYP": "SY",
  "THB": "TH",
  "TJS": "TJ",
  "TMT": "TM",
  "TND": "TN",
  "TOP": "TO",
  "TRY": "TR",
  "TTD": "TT",
  "TWD": "TW",
  "TZS": "TZ",
  "UAH": "UA",
  "UGX": "UG",
  "USD": "US",
  "UYU": "UY",
  "UZS": "UZ",
  "VEF": "VE",
  "VND": "VN",
  "YER": "YE",
  "ZAR": "ZA",
  "ZMK": "ZM",
  "ZWD": "ZW"
};

// Populate dropdowns
function populateCurrencies() {
  const currencies = Object.keys(countryCodeMap);
  currencies.forEach(code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = code;
    option1.text = option2.text = code;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

function updateFlag(type) {
  const currency = document.getElementById(`${type}-currency`).value;
  const flag = document.getElementById(`${type}-flag`);
  flag.src = `https://flagcdn.com/48x36/${countryCodeMap[currency].toLowerCase()}.png`;

}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlag("from");
  updateFlag("to");
  getExchangeRate();
}

async function getExchangeRate() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultText.innerText = "Enter a valid amount!";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultText.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    resultText.innerText = "Error fetching exchange rate.";
  }
}

populateCurrencies();
updateFlag("from");
updateFlag("to");
getExchangeRate();
