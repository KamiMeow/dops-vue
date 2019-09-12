<template>
  <json-excel
    :data="dataForExcel"
    name="report.xls"
  >
    <slot />
  </json-excel>
</template>

<script>
import JsonExcel from 'vue-json-excel';
 
export default {
  name: 'ReportExport',
  components: {
    JsonExcel
  },
  props: {
    report: { type: Object },
  },
  computed: {
    dataForExcel() {
      const headers = [
        'ID',
        'Номер заявления',
        'ФИО клиента',
        'Тарифный план',
        'Плата за месяц',
        'Срок оформления',
        'Плата за весь период',
      ];

      const result = this.report.items.map(item => {
        const row = {},
              keys = Object.keys(item);

        headers.forEach((head, index) => {
          row[head] = item[keys[index]];
        });
        return row;
      });

      result.push({}, {}, {
        [headers[1]]: `Выручка: ${Number(this.report.budget).toLocaleString()}`,
        [headers[3]]: `НДС: ${Number(this.report.budgetWithNDC).toLocaleString()}`,
      });
      result.push({}, {
        [headers[1]]: `Всего записей ${this.report.items.length}, на суммму ${Number(this.report.budget).toLocaleString()}</strong>`,
      });
      result.push({
        [headers[1]]: this.report.russianBudget,
      });

      return result;
    },
  },
};
</script> 