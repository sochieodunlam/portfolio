


// const days = {
//     0: "Sun",
//     1: "Mon",
//     2: "Tue",
//     3: "Wed",
//     4: "Thu",
//     5: "Fri",
//     6: "Sat"
// }
// const months = {
//     0: "Jan",
//     1: "Feb", 
//     2: "Mar",
//     3: "Apr",
//     4: "May",
//     5: "Jun", 
//     6: "Jul",
//     7: "Aug", 
//     8: "Sep", 
//     9: "Oct",
//     10: "Nov", 
//     11: "Dec"
// }

const date = new Date()
terminalDate = days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + " " 
+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on ttys001"

const lastLogin = document.getElementById("last-login")
lastLogin.textContent = "Last login: " + terminalDate