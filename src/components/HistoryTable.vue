<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'HistoryTable_Sum'|localize}}</th>
      <th>{{'HistoryTable_Date'|localize}}</th>
      <th>{{'HistoryTable_Category'|localize}}</th>
      <th>{{'HistoryTable_Type'|localize}}</th>
      <th>{{'HistoryTable_Open'|localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span 
          class="white-text badge" 
          :class="[record.typeClass]"
        >{{ record.typeText | localize}}</span>
      </td>
      <td>
        <button 
        class="btn-small btn" 
        @click="$router.push(`/detail-record/${record.id}`)" 
        v-tooltip="localizeFilter('Tooltip_OpenRecord')">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    localizeFilter
  }
}
</script>
