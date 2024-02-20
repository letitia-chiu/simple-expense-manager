import Chart from 'react-apexcharts'

const DonutChart = ({ labels, series }) => {
  const options = {
    labels: labels || [],
    chart: {
      foreColor: ({ theme }) => theme.mainTextColor,
      width: '100%'
    },
    legend: {
      position: 'bottom'
    }
  }

  // Render the component
  return (
    <Chart options={options} series={series} type="donut" width="100%" />
  )
}

export default DonutChart
