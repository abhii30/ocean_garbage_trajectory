# api.meteomatics.com/validdatetime/parameters/locations/format?optionals
import arrow
import requests
import json

# Get first hour of today
start = arrow.now().floor('day')

# Get last hour of today
end = arrow.now().ceil('day')

response = requests.get(
  'https://api.stormglass.io/v2/weather/point',
  params={
    'lat': 18.4384,
    'lng': 70.3781,
    'params': ','.join(['currentDirection', 'currentSpeed', 'swellDirection', 'waveDirection', 'windSpeed']),
    'start': start.to('UTC').timestamp(),  # Convert to UTC timestamp
    'end': end.to('UTC').timestamp()  # Convert to UTC timestamp
  },
  headers={
    'Authorization': '7e071af0-6f24-11ee-a654-0242ac130002-7e071b4a-6f24-11ee-a654-0242ac130002'
  }
)

# Do something with response data.
json_data = response.json()
with open('data.json') as f:
    json.dump(json_data, f)
