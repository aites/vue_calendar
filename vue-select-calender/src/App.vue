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
          <component :is="current_calender"></component>
      </div>
      <div id="ca"></div>
  </body>
  </html>
</template>

<script>
import Month from '../src/components/Month.vue';
// import Week from '../src/components/week.vue';
// import Year from '../src/components/year.vue';

// const weekDayArray = ['日', '月', '火', '水', '木', '金', '土'];
// const monthArray = [
//         "1月", "2月", "3月",
//         "4月", "5月", "6月",
//         "7月", "8月", "9月",
//         "10月", "11月", "12月"];
// let selectDayDate = new Date();
// import dateFns from 'date-fns'

// const month = {
//   template: `
//   <div class="calendar">
//     <header class="header">
//       aaaaaaaaa
//       <button @click="previousMonth">&lt;&lt;</button>
//       <span>{{ currentYear }} {{ currentMonthLabel }}</span>
//       <button @click="nextMonth">&gt;&gt;</button>
//     </header>
//     <!--  曜日の箇所 -->
//     <div class="headings" v-for="dayLabel in dayLabels">
//       {{ dayLabel }}
//     </div>
//     <!--  日の箇所 -->
//     <div v-for="(day, index) in daysArray"
//         class="day"
//         :class="dayClassObj(day)">
//       <button @click="setSelectedDate(day)">
//         {{ day.date | formatDateToDay }}
//       </button>
//     </div>
//   </div>
//   `,
//   data() {
//     return {
//       today: null,
//       selectedDate: null,
//       currDateCursor: null,
//       dayLabels: null,
//     };
//   },
//   // created
//     // インスタンスの初期化が済んで props や computed にアクセスできる
//     // DOMにはアクセスできない
//   // propsにデータを設定するだけの場合は、 created を使う
//   // DOMを構築してる間にも、HTTPの通信を行えるから
//   // DOMがでかいと、Edgeだと、mountedよりも体感できるレベルで早くなる
//   created() {
//     this.dayLabels = weekDayArray.slice();
//     this.today = selectDayDate;
//     this.selectedDate = selectDayDate;
//     this.currDateCursor = this.today;
//   },
//   props: ['selectDate'],
//   computed: {
//     currentMonth() {
//       return this.currDateCursor.getMonth();
//     },
//     currentYear() {
//       return this.currDateCursor.getFullYear();
//     },
//     currentMonthLabel() {
//       return monthArray[this.currentMonth];
//     },
//     daysArray() {
//       const date = this.currDateCursor;
//       // const startOfMonth = dateFns.startOfMonth(date);
//       // const endOfMonth = dateFns.endOfMonth(date);
//       const startOfMonth = dateFns.startOfMonth(this.currDateCursor);
//       const endOfMonth = dateFns.endOfMonth(this.currDateCursor);
      
//       const days = dateFns.eachDay(startOfMonth, endOfMonth).map((day) => ({
//         date: day,
//         isCurrentMonth:  dateFns.isSameMonth(new Date(this.currentYear, this.currentMonth), day),
//         isToday: dateFns.isToday(day),
//         isSelected: dateFns.isSameDay(this.selectedDate, day)
//       }));

//       // gen the days from last month
//       let previousMonthCursor = dateFns.lastDayOfMonth(dateFns.addMonths(date, -1));
//       const begIndex = dateFns.getDay(days[0].date);
//       for (let i = begIndex; i > 0; i--) {
//         days.unshift({
//           date: previousMonthCursor,
//           isCurrentMonth: false,
//           isToday: dateFns.isToday(previousMonthCursor),
//           isSelected: dateFns.isSameDay(this.selectedDate, previousMonthCursor)
//         });
//         previousMonthCursor = dateFns.addDays(previousMonthCursor, -1);
//       }
      
//       // gen days for next month
//       const daysNeededAtEnd = (days.length % 7 > 0) ? (7 -(days.length % 7)) : 0;
//       let nextMonthCursor = dateFns.addMonths(date, 1);
//       nextMonthCursor = dateFns.setDate(nextMonthCursor, 1);
//       for (let x = 1; x <= daysNeededAtEnd; x++) {
//         days.push({
//           date: nextMonthCursor,
//           isCurrentMonth: false,
//           isToday: dateFns.isToday(nextMonthCursor),
//           isSelected: dateFns.isSameDay(this.selectedDate, nextMonthCursor)
//         });
//         nextMonthCursor = dateFns.addDays(nextMonthCursor, 1);
//       }
//       return days;
//     }
//   },
//   // DOMにアクセスする必要があるときは、 mounted を使う
//   // レスポンスが即返ってきた場合に、DOMの構築が終わっていない可能性がある
//   // jQuery 時代をひきずったようなDOMを直接指定するライブラリを使うときはこっち
//   // created + DOMにアクセスできる
//   mounted() {
//     if (this.startDate) {
//       this.currDateCursor = this.startDate;
//       this.selectedDate = this.startDate;
//     }
//   },
//   methods: {
//     dayClassObj(day) {
//       return {
//         'today' : day.isToday,
//         'current': day.isCurrentMonth,
//         'selected': day.isSelected,
//       };
//     },
//     nextMonth() {
//       this.currDateCursor = dateFns.addMonths(this.currDateCursor, 1);
//       selectDayDate = this.currDateCursor;
//     },
//     previousMonth() {
//       this.currDateCursor = dateFns.addMonths(this.currDateCursor, -1);
//       selectDayDate = this.currDateCursor;
//     },
//     setSelectedDate(day) {
//       this.selectedDate = day.date;
//       selectDayDate = this.selectedDate;
//       this.$emit('input', this.selectedDate);
//     }
//   },
//   filters: {
//     formatDateToDay(val) {
//       return dateFns.format(val, 'D');
//     }
//   }
// };


export default {
  name: 'app',
  data: function() {
return {
      current_calender : 'calender_m',
      selectDate: ''
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
