export const mixin = {
  data: function () {
    return {
      weekDayArray: ['日', '月', '火', '水', '木', '金', '土'],
      monthArray: [
        "1月", "2月", "3月",
        "4月", "5月", "6月",
        "7月", "8月", "9月",
        "10月", "11月", "12月"],
      selectDayDate: new Date()
    }
  }
}