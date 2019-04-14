<template>
  <div class="calendar">
    <header class="header">
      <button @click="previousWeek">&lt;&lt;</button>
      <span>{{ WcurrentYear }}　{{ WcurrentMonthLabel }}</span>
      <button @click="nextWeek">&gt;&gt;</button>
    </header>
    <!--  曜日の箇所 -->
    <div class="headings" v-for="dayLabel in dayLabels" :key='dayLabel'>
      {{ dayLabel }}
    </div>
    <!--  日の箇所 -->
    <div v-for="(day, index) in WdaysArray"
        class="day"
        :class="WdayClassObj(day)" :key='index'>
      <button @click="setSelectedDate(day)">
        {{ day.date | formatDateToDay }}
      </button>
    </div>
  </div>
</template>

<script>
import dateFns from 'date-fns'
const weekDayArray = ['日', '月', '火', '水', '木', '金', '土'];
const monthArray = [
        "1月", "2月", "3月",
        "4月", "5月", "6月",
        "7月", "8月", "9月",
        "10月", "11月", "12月"];
let selectDayDate = new Date();

export default {
  name: 'week',
  data() {
      return {
        today: null,
        selectedDate: null,
        currDateCursor: null,
        dayLabels: null,
      };
    },
    props: ['selectDate'],
    // created
    // インスタンスの初期化が済んで props や computed にアクセスできる
    // DOMにはアクセスできない
    // propsにデータを設定するだけの場合は、 created を使う
    // DOMを構築してる間にも、HTTPの通信を行えるから
    // DOMがでかいと、Edgeだと、mountedよりも体感できるレベルで早くなる
    created() {
      this.dayLabels = weekDayArray.slice();
      this.today = selectDayDate;
      this.selectedDate = selectDayDate;
      this.currDateCursor = this.today;
    },
    // キャッシュが残らない
    computed: {
      WcurrentMonth() {
        return this.currDateCursor.getMonth();
      },
      WcurrentYear() {
        return this.currDateCursor.getFullYear();
      },
      WcurrentMonthLabel() {
        return monthArray[this.WcurrentMonth];
      },
      WdaysArray() {
        const date = this.currDateCursor;
        // ここにスタートとエンドの日付の設定をする
        const startOfWeek = dateFns.startOfWeek(this.currDateCursor);
        const endOfWeek = dateFns.endOfWeek(this.currDateCursor);
        // ここで日付を配列で入れている
        const days = dateFns.eachDay(startOfWeek, endOfWeek).map((day) => ({
          date: day,
          isCurrentMonth:  dateFns.isSameMonth(new Date(this.currentYear, this.currentMonth), day),
          isToday: dateFns.isToday(day),
          isSelected: dateFns.isSameDay(this.selectedDate, day)
        }));
  
        // 戻るときの週
        let previousWeekCursor = dateFns.lastDayOfWeek(dateFns.addWeeks(date, -1));
        // 日付配列の最初を指定する
        const begIndex = dateFns.getDay(days[0].date);
        // ここで配列の削除をしている
        for (let i = begIndex; i > 0; i--) {
          days.unshift({
            date: previousWeekCursor,
            isCurrentMonth: false,
            isToday: dateFns.isToday(previousWeekCursor),
            isSelected: dateFns.isSameDay(this.selectedDate, previousWeekCursor)
          });
          previousWeekCursor = dateFns.addDays(previousWeekCursor, -1);
        }
        
        // gen days for next month
        // 進むときの週
        const daysNeededAtEnd = (days.length % 7 > 0) ? (7 -(days.length % 7)) : 0;
        let nextWeekCursor = dateFns.startOfWeek(date);
        for (let x = 1; x <= daysNeededAtEnd; x++) {
          days.push({
            date: nextWeekCursor,
            isCurrentMonth: false,
            isToday: dateFns.isToday(nextWeekCursor),
            isSelected: dateFns.isSameDay(this.selectedDate, nextWeekCursor)
          });
          nextWeekCursor = dateFns.addDays(nextWeekCursor, 1);
        }
        return days;
      }
    },
    mounted() {
      if (this.startDate) {
        this.currDateCursor = this.startDate;
        this.selectedDate = this.startDate;
      }
    },
    // キャッシュに残る
    methods: {
      WdayClassObj(day) {
        return {
          'today' : day.isToday,
          'current': day.isCurrentMonth,
          'selected': day.isSelected,
        };
      },
      nextWeek() {
        this.currDateCursor = dateFns.addWeeks(this.currDateCursor, 1);
        console.log(this.currDateCursor);
        selectDayDate = this.currDateCursor;
      },
      previousWeek() {
        this.currDateCursor = dateFns.addWeeks(this.currDateCursor, -1);
        console.log(this.currDateCursor);
        selectDayDate = this.currDateCursor;
      },
      setSelectedDate(day) {
        console.log(day);
        this.selectedDate = day.date;
        selectDayDate = this.selectedDate;
        this.$emit('input', this.selectedDate);
      }
    },
    // 日付を表示する
    filters: {
      formatDateToDay(val) {
        return dateFns.format(val, 'D');
      }
    }
};
</script>


<style lang='scss' scoped>
:root {
  --white: hsl(0, 0%, 100%);
  --blue-grey: hsl(210, 28%, 85%);
  --grey: hsl(0, 0%, 96%);
  --black: hsl(0, 0%, 20%);
}

html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

body {
  background: var(--white);
  color: var(--black);
  display: flex;
  justify-content: center;
}

.calendar {
  border: 1px solid var(--blue-grey);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 322px;

  > .header {
    padding: .75rem;
    font-size: 1.25rem;
    grid-column: 1 / span 7;
    
    >span {
      flex: 1;
      text-align: center;
    }
    
    button {
      border: none;
      background: var(--white);
      margin: 0 1rem;
      padding: .25rem .5rem;
      
      &:hover {
        background: var(--grey);
        transition: background 150ms;
      }
    }
  }

  > * {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  > .day {
    color: var(--blue-grey);
    font-size: 1rem;
    
    &.selected {
      border: 1px solid var(--blue-grey);
    }
    
    &.current {
      color: var(--black);
    }

    &::before {
      content: "";
      display: inline-block;
      height: 0;
      padding-bottom: 100%;
      width: 1px;
    }
    
    button {
      color: inherit;
      background: transparent;
      border: none;
      height: 100%;
      width: 100%;
      &:hover {
        background: var(--grey);
        transition: background 150ms;
      }
    }
  }

  > .today {
    background: var(--grey);
    border-radius: 2px;
  }
}



.text-center {
  text-align: center;
}

.calendar__wrapper{
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
</style>
