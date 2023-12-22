async function fetchData() {
  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Islamabad";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2fd21b855dmshfe4b2a6a41bc50dp17016djsn2c745bfc876d",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Call the async function
fetchData();
