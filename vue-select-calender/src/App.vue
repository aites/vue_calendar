<template>
  <html lang="ja">
  <head>
      <meta charset="utf-8">
      <title>カレンダー切り替え機能</title>
  </head>
  <body>
      <div id="app">
          <button @click="transPage('calender_w')">week</button>
          <button @click="transPage('calender_m')">month</button>
          <button @click="transPage('calender_y')">year</button>
          <component :is="current_calender" v-bind:val="selectDayDate"></component>
      </div>
  </body>
  </html>
</template>

<script>
import Month from '../src/components/Month.vue';
import Week from '../src/components/Week.vue';
import Year from '../src/components/Year.vue';

export default {
  name: 'app',
  data: function() {
return {
      current_calender : 'calender_m',
      selectDate: '',
      selectDayDate: new Date()
  };
},
  methods : {
    /**
     * currentPageを変更します。
     * @param {string} page : 変更先のコンポーネント名
     */
    transPage : function(page){
        this.current_calender = page;
    }
  },
  components: {
    'calender_w': Week,
    'calender_m': Month,
    'calender_y': Year
  }
}



</script>

<style lang='scss' scoped>
// @import "../style/global.scss";
</style>
