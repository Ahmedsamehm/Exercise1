let customerDetailsArr = JSON.parse(localStorage.getItem('DataUser'));

let name = customerDetailsArr.map(item => item.name)
let data = customerDetailsArr.map(item => item.Amount)
let date = customerDetailsArr.map(item => item.Date)
const ctx = document.getElementById('myChart');  
  

function createChart() { 
   
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: date,
        data: data ,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      
      scales: {
        y: {
          min: '2023-01-01',
          max: '2023-01-31',
          type: 'time',
          time: {
            unit: 'day',
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
}
 


// function filterChart(date) {
//   console.log(date.value)
//   let year = date.value.substring(0, 4)
//   let month = date.value.substring(5, 7)
//   console.log(year)
//   console.log(month)
//   let startDate=`${data.value}--1`
//   config.options.scales.x.min = startDate
//   chart.update();
  
// }


createChart()
