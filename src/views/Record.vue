<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Record'|localize}}</h3>
    </div>

    <Loader v-if="loader"/>

    <p class="center" v-else-if="!categories.length">{{'Message_NoCategoriesYet'|localize}}. <router-link to='/categories'>{{'Message_CreateCategory'|localize}}</router-link></p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>{{'Message_SelectCategory'|localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{'Income'|localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{'Outcome'|localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}"
        >
        <label for="amount">{{'Sum'|localize}}</label>
        <span
           class="helper-text invalid"
           v-if="($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)"
           >
           {{'Message_MinValue'|localize}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
             :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{'Description'|localize}}</label>
        <span
           class="helper-text invalid"
           v-if="$v.description.$dirty && !$v.description.required"
           >
           {{'Message_EnterDescription'|localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Menu_Record')
    }
  },
  data: () => ({
    loader: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loader = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    };

    setTimeout(()=> {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0); 
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      if (this.canCreateRecord) {
        try {
            await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount;

          await this.$store.dispatch(`updateInfo`, {bill});
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1
          this.description = ''
        } catch (error) {

        }
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>
