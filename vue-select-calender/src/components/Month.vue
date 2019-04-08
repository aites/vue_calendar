<template>
  <div class="calendar">
    <header class="header">
      <button @click="previousMonth">&lt;&lt;</button>
      <span>{{ currentYear }} {{ currentMonthLabel }}</span>
      <button @click="nextMonth">&gt;&gt;</button>
    </header>
    <!--  曜日の箇所 -->
    <div class="headings" v-for="dayLabel in dayLabels" :key='dayLabel'>
      {{ dayLabel }}
    </div>
    <!--  日の箇所 -->
    <div v-for="(day, index) in daysArray"
        class="day"
        :class="dayClassObj(day)" :key='index'>
      <button @click="setSelectedDate(day)">
        {{ day.date | formatDateToDay }}
      </button>
    </div>
  </div>
</template>

<script>
import {Mixin} from '../mixin/mixin'
import {dateFns} from 'date-fns'

export default {
  name: 'month',
  mixins:[Mixin],
  data() {
    return {
      today: null,
      selectedDate: null,
      currDateCursor: null,
      dayLabels: null,
    };
  },
  // created
    // インスタンスの初期化が済んで props や computed にアクセスできる
    // DOMにはアクセスできない
  // propsにデータを設定するだけの場合は、 created を使う
  // DOMを構築してる間にも、HTTPの通信を行えるから
  // DOMがでかいと、Edgeだと、mountedよりも体感できるレベルで早くなる
  created() {
    this.dayLabels = this.$data.weekDayArray.slice();
    this.today = this.$data.selectDayDate;
    this.selectedDate = this.$data.selectDayDate;
    this.currDateCursor = this.today;
  },
  props: ['selectDate'],
  computed: {
    currentMonth() {
      return this.currDateCursor.getMonth();
    },
    currentYear() {
      return this.currDateCursor.getFullYear();
    },
    currentMonthLabel() {
      return this.$data.monthArray[this.currentMonth];
    },
    daysArray() {
      const date = this.currDateCursor;
      // const startOfMonth = dateFns.startOfMonth(date);
      // const endOfMonth = dateFns.endOfMonth(date);
      const startOfMonth = dateFns.startOfMonth(this.currDateCursor);
      const endOfMonth = dateFns.endOfMonth(this.currDateCursor);
      
      const days = dateFns.eachDay(startOfMonth, endOfMonth).map((day) => ({
        date: day,
        isCurrentMonth:  dateFns.isSameMonth(new Date(this.currentYear, this.currentMonth), day),
        isToday: dateFns.isToday(day),
        isSelected: dateFns.isSameDay(this.selectedDate, day)
      }));

      // gen the days from last month
      let previousMonthCursor = dateFns.lastDayOfMonth(dateFns.addMonths(date, -1));
      const begIndex = dateFns.getDay(days[0].date);
      for (let i = begIndex; i > 0; i--) {
        days.unshift({
          date: previousMonthCursor,
          isCurrentMonth: false,
          isToday: dateFns.isToday(previousMonthCursor),
          isSelected: dateFns.isSameDay(this.selectedDate, previousMonthCursor)
        });
        previousMonthCursor = dateFns.addDays(previousMonthCursor, -1);
      }
      
      // gen days for next month
      const daysNeededAtEnd = (days.length % 7 > 0) ? (7 -(days.length % 7)) : 0;
      let nextMonthCursor = dateFns.addMonths(date, 1);
      nextMonthCursor = dateFns.setDate(nextMonthCursor, 1);
      for (let x = 1; x <= daysNeededAtEnd; x++) {
        days.push({
          date: nextMonthCursor,
          isCurrentMonth: false,
          isToday: dateFns.isToday(nextMonthCursor),
          isSelected: dateFns.isSameDay(this.selectedDate, nextMonthCursor)
        });
        nextMonthCursor = dateFns.addDays(nextMonthCursor, 1);
      }
      return days;
    }
  },
  // DOMにアクセスする必要があるときは、 mounted を使う
  // レスポンスが即返ってきた場合に、DOMの構築が終わっていない可能性がある
  // jQuery 時代をひきずったようなDOMを直接指定するライブラリを使うときはこっち
  // created + DOMにアクセスできる
  mounted() {
    if (this.startDate) {
      this.currDateCursor = this.startDate;
      this.selectedDate = this.startDate;
    }
  },
  methods: {
    dayClassObj(day) {
      return {
        'today' : day.isToday,
        'current': day.isCurrentMonth,
        'selected': day.isSelected,
      };
    },
    nextMonth() {
      this.currDateCursor = dateFns.addMonths(this.currDateCursor, 1);
      this.$data.selectDayDate = this.currDateCursor;
    },
    previousMonth() {
      this.currDateCursor = dateFns.addMonths(this.currDateCursor, -1);
      this.$data.selectDayDate = this.currDateCursor;
    },
    setSelectedDate(day) {
      this.selectedDate = day.date;
      this.$data.selectDayDate = this.selectedDate;
      this.$emit('input', this.selectedDate);
    }
  },
  filters: {
    formatDateToDay(val) {
      return dateFns.format(val, 'D');
    }
  }
}
</script>


<style lang='scss' scoped>
@import "../style/global.scss";
</style>
