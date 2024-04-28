const { createApp } = Vue

createApp({
  data() {
    return {
      currencyExchanges: [],
      currencies: [
        { name: 'USA Dollár', symbol: "$", label: "USD" },
        { name: 'Magyar Forint', symbol: "Ft", label: "HUF" },
        { name: 'Euró', symbol: "€", label: "EUR" },
        { name: 'Orosz Rubel', symbol: "₽", label: "RUB" },
      ],
      apiKey: "fca_live_3xfF8Xuiy34LLipENUTfQHHkyVu83CqLQWEGtLSS",
      value: 1,
      what: "EUR",
      to: "HUF",
      helpTotal: null,
      total: null
    };
  },
  async mounted() {
    await this.getCurrencyExchanges();
    await this.onClickCounts();
  },
  methods: {
    async getCurrencyExchanges() {
      const response = await fetch(this.url);
      const data = await response.json();
      this.currencyExchanges = data.data;
    },
    async onClickCounts() {
      await this.getCurrencyExchanges();
      this.total = (this.value * this.currencyExchanges[this.to]).toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' });
    }
  },
  computed: {
    url() {
      return `https://api.freecurrencyapi.com/v1/latest?apikey=${this.apiKey}&currencies=${this.currenciesLabel}&base_currency=${this.what}`;
    },
    currenciesLabel() {
      return this.currencies
        .map((c) => c.label)
        .join("%2C");
    },
    valueFormatted() {
      const formatter = new Intl.NumberFormat('hu-HU', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

      const formattedValue = formatter.format(this.value);
      return formattedValue;
    }
  }
}).mount('#app')