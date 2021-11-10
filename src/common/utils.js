//防抖操作
export  function deboundce(func,delay){
  let timer = null;
  return function (...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

//时间转换
export function formatDate(date, fmt) {
  //y+ ：一个或者多个Y
  //Y? :0个或者1个Y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

// export function formatDate(date, formatStr) {
//   let str = formatStr;
//   let Week = ['日', '一', '二', '三', '四', '五', '六'];
//   str = str.replace(/yyyy|YYYY/, date.getFullYear());
//   str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
//   let month = date.getMonth() + 1;
//   str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
//   str = str.replace(/M/g, month);
//   str = str.replace(/w|W/g, Week[date.getDay()]);
//   str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
//   str = str.replace(/d|D/g, date.getDate());
//   str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
//   str = str.replace(/h|H/g, date.getHours());
//   str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
//   str = str.replace(/m/g, date.getMinutes());
//   str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
//   str = str.replace(/s|S/g, date.getSeconds());
//   return str;
// }
