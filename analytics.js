// Revenue Line Chart
const revenueCtx = document.getElementById("revenueChart").getContext("2d");
new Chart(revenueCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      label: "Revenue ($)",
      data: [1200, 1900, 3000, 2500, 4000, 5000, 6200],
      borderColor: "rgb(37, 99, 235)",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      tension: 0.4,
      fill: true,
    }]
  },
  options: { responsive: true }
});

// Orders Bar Chart
const ordersCtx = document.getElementById("ordersChart").getContext("2d");
new Chart(ordersCtx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      label: "Orders",
      data: [50, 70, 60, 90, 120, 80, 150],
      backgroundColor: "rgb(16, 185, 129)"
    }]
  },
  options: { responsive: true }
});

// Users Pie Chart
const usersCtx = document.getElementById("usersChart").getContext("2d");
new Chart(usersCtx, {
  type: "pie",
  data: {
    labels: ["Free Users", "Premium Users", "Trial Users"],
    datasets: [{
      label: "Users",
      data: [500, 200, 100],
      backgroundColor: [
        "rgb(37, 99, 235)",
        "rgb(244, 63, 94)",
        "rgb(250, 204, 21)"
      ]
    }]
  },
  options: { responsive: true }
});
