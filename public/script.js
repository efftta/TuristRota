// API'den veriyi çekme
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/places');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function showCategory(category) {
  const data = await fetchData();
  if (!data) {
    document.getElementById("content").innerHTML = "<p>Error loading data.</p>";
    return;
  }

  document.getElementById("categoryTitle").innerText = category.toUpperCase();
  const container = document.getElementById("content");
  container.innerHTML = "";

  const places = data[category];
  if (!places) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  places.forEach(place => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <a href="https://www.metro.istanbul/Home/DownloadResim?pth=651e2fa0-ccf7-4a82-86ff-226ca4dc3e77.jpg&ad=istanbul-raylisistemler-haritasi&mim=image%2Fjpg" download="istanbul_rayli_sistem_haritasi.jpg">
        View Istanbul transportation map
      </a>
      <button onclick="openMap(${place.lat}, ${place.lon}, '${place.name}')">View on Maps</button>
    `;
    container.appendChild(card);
  });
}

function openMap(lat, lon, name) {
  if (!navigator.geolocation) {
    alert("Your browser does not support location services.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${lat},${lon}&travelmode=driving`;
      window.open(mapsUrl, "_blank");
    },
    (error) => {
      alert("Unable to retrieve location. Please allow location access or try again later.");
      console.error("Location error:", error);
    }
  );
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

document.getElementById("locate-btn").addEventListener("click", async function() {
  const data = await fetchData();
  if (!data) {
    document.getElementById("content").innerHTML = "<p>Error loading data.</p>";
    return;
  }

  getUserLocation()
    .then(position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const container = document.getElementById("content");
      container.innerHTML = "";
      document.getElementById("categoryTitle").innerText = "NEARBY PLACES";

      let nearbyPlaces = [];
      Object.keys(data).forEach(category => {
        data[category].forEach(place => {
          const distance = calculateDistance(userLat, userLon, place.lat, place.lon);
          if (distance <= 10) {
            nearbyPlaces.push({ ...place, category, distance });
          }
        });
      });

      if (nearbyPlaces.length === 0) {
        container.innerHTML = "<p>No nearby places found.</p>";
        return;
      }

      nearbyPlaces.sort((a, b) => a.distance - b.distance);
      nearbyPlaces.forEach(place => {
        const card = document.createElement("div");
        card.className = "place-card";
        card.innerHTML = `
          <img src="${place.image}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <p>Distance: ${place.distance.toFixed(2)} km</p>
          <button onclick="openMap(${place.lat}, ${place.lon}, '${place.name}')">View on Maps</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      document.getElementById("content").innerHTML = `<p>Error: ${error.message}</p>`;
      console.error("Location error:", error);
    });
});