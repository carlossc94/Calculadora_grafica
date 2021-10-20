let x = document.getElementById('x')
let y = document.getElementById('y')
let addPoint = document.getElementById('addPoint')
let deletePoints = document.getElementById('deletePoints')
let planoCartesiano = document.getElementById('planoCartesiano')
let grafica = document.getElementById('grafica')
let offset = 10 

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
  scales.x.min = offset * -1 
  scales.x.max = offset
  scales.y.min = offset * -1
  scales.y.max = offset
}

addPoint.addEventListener('click', () => {
  myChart.data.datasets[0].data.push({
    x: parseFloat(x.value),
    y: parseFloat(y.value),
  })

  xAux=Math.abs(parseFloat(x.value))
  yAux=Math.abs(parseFloat(y.value))
  console.log(xAux + ","+yAux)
  if(xAux > offset || yAux > offset){
    if(xAux > yAux){
      offset = parseInt(xAux) + 5
    }else{
      offset = parseInt(yAux) + 5
    }
    changeScaleConfig(config.options.scales, myChart.data.datasets[0].data, offset)
  }
    

  myChart.update()
})

deletePoints.addEventListener('click', () => {
  offset= 10
  RenderInitial(0, 0, offset)
})

RenderInitial(0, 0, offset)
