function createWeatherWidget(data) {
    const container = document.createElement('div');
    const shadow = container.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .weather {
            width:fit-content;
          border: 1px solid #ccc;
          padding: 10px;
          font-family: sans-serif;
          background: #f0f8ff;
        }
      </style>
      <div class="weather">
        <strong>${data.city}</strong><br>
        <span>${data.temp}°C</span><br>
        <img src="${data.icon}" alt="weather icon" width="50">
      </div>
    `;

    // document.body.appendChild(container);
    return container;
  }

  const paris = createWeatherWidget({
    city: 'Paris',
    temp: 18,
    icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png'
  });

  document.body.append(paris);