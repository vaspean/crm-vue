<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p 
        v-for="cur of currencies"
        :key="cur"
        class="currency-line">
          <span>
            {{getCurrency(cur)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data:()=> ({
    currencies: ['RUB', 'EUR', 'USD']
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill;
    }
  },
  methods: {
    getCurrency(currency) {
      return currency == `RUB`? this.bill : Math.floor(this.bill/this.rates[`${currency}_RUB`]);
    }
  }
}
</script>
