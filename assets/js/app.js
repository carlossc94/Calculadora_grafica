let x = document.getElementById('x')
let y = document.getElementById('y')
let addPoint = document.getElementById('addPoint')
let deletePoints = document.getElementById('deletePoints')
let planoCartesiano = document.getElementById('planoCartesiano')
let grafica = document.getElementById('grafica')

let data = {
  datasets: [
    {
      data: [],
      backgroundColor: 'rgba(51,177,58,0.8)',
    },
  ],
}

const config = {
  type: 'scatter',
  data: data,
  options: {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        ticks: {
          stepSize: 1,
          font: { size: 16 },
        },
      },
      y: {
        type: 'linear',
        ticks: {
          stepSize: 1,
          font: { size: 16 },
        },
      },
    },
  },
}

var myChart = new Chart(document.getElementById('myChart'), config)

planoCartesiano.addEventListener('click', () => {
  if (!planoCartesiano.classList.contains('active')) {
    grafica.classList.remove('active')
    planoCartesiano.classList.add('active')
  }
  myChart.data.datasets[0].label = 'Plano Cartesiano X Y'
  config.type = 'scatter'
  myChart.update()
})

grafica.addEventListener('click', () => {
  if (!grafica.classList.contains('active')) {
    planoCartesiano.classList.remove('active')
    grafica.classList.add('active')
  }
  myChart.data.datasets[0].label = 'Grafica de Barras'
  config.type = 'bar'
  myChart.update()
})


const InicialScale = (offset) => {
  config.options.scales.x.min = -1 * offset

  config.options.scales.x.max = offset
  config.options.scales.y.min = -1 * offset

  config.options.scales.y.max = offset
}

const RenderInitial = (x, y, offset) => {
  x.value = x
  y.value = y

  myChart.data.datasets[0].pointRadius = 5

  planoCartesiano.classList.contains('active')
    ? (myChart.data.datasets[0].label = 'Plano Cartesiano')
    : (myChart.data.datasets[0].label = 'Grafica de Barras')

  myChart.data.datasets[0].data = []

  InicialScale(offset)
  myChart.update()
}

const changeScaleConfig = (scales, data, offset) => {

  scales.x.min = Math.min(...data.map((item) => item.x)) - offset

  scales.x.max = Math.max(...data.map((item) => item.x)) + offset

  scales.y.min = Math.min(...data.map((item) => item.y)) - offset

  scales.y.max = Math.max(...data.map((item) => item.y)) + offset
}

addPoint.addEventListener('click', () => {
  myChart.data.datasets[0].data.push({
    x: parseFloat(x.value),
    y: parseFloat(y.value),
  })

  //changeScaleConfig(config.options.scales, myChart.data.datasets[0].data, 5)

  myChart.update()
})

deletePoints.addEventListener('click', () => {
  RenderInitial(0, 0, 10)
})

RenderInitial(0, 0, 10)
