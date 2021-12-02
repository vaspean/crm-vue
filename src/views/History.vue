<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_History'|localize}}</h3>
    </div>
    <h5 class="center">{{'OutcomeByCategories'|localize}}:</h5>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавьте свою первую запись :)</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Pagination_Previous'|localize"
        :next-text="'Pagination_Next'|localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'
export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data:()=>({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories)
    this.loading = false;
  },
  methods: {
    setup(categories) {
      console.log(categories.length)
      this.setupPagination(this.records.map(record => {
        return{
          ...record,
          categoryName: categories.find(category=> category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome'
        }
      }))
      const colorsArray = [];
      for (let category in categories) {
        colorsArray.push(this.dynamicColors());
      }
      console.log(colorsArray)
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(category => {
              return this.records.reduce((total, record)=>{
                if (record.categoryId === category.id && record.type === 'outcome') {
                  total += record.amount
                }
                return total
              },0)
            }),
            backgroundColor: [...colorsArray],
            borderWidth: 1
        }]
      },)
    },
    dynamicColors() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
    },
  },
  components: {
    HistoryTable
  }
}
</script>
