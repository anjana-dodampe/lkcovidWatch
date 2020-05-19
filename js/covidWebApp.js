window.addEventListener("load", function () {
  getData()
    .then(function (data) {
      showData(data.data);
    })
    .catch(function (e) {
      console.log(e);
      window.alert("Sorry!, Something went wrong.");
    });
});

function showData(data) {
  document.getElementById("lblLastUpdated").textContent = data.update_date_time;

  document.getElementById("lblNewCases").textContent = data.local_new_cases;

  document.getElementById("lblActiveCases").textContent =
    data.local_active_cases;

  document.getElementById("lblTotalCases").textContent = data.local_total_cases;

  document.getElementById("lblTotalRecovered").textContent =
    data.local_recovered;

  document.getElementById("lblTotalDeaths").textContent = data.local_deaths;

  var labels = [];
  var counts = [];

  data.daily_pcr_testing_data.forEach(function (d) {
    labels.push(d.date);
    counts.push(d.count);
  });

  labels.reverse();
  counts.reverse();

  var chartPcr = document.getElementById("chartPcr").getContext("2d");

  var chart = new Chart(chartPcr, {
    type: "horizontalBar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "No of PCR Tests",
          data: counts,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

async function getData() {
  var response = await fetch(
    "https://www.hpb.health.gov.lk/api/get-current-statistical"
  );
  var data = response.json();
  return data;
}
