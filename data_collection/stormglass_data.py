# api.meteomatics.com/validdatetime/parameters/locations/format?optionals
import arrow
import requests
import json

# Get first hour of today
start = arrow.now()

# Get last hour of today
end = arrow.now().ceil('year')

response = requests.get(
  'https://api.stormglass.io/v2/weather/point',
  params={
    'lat': 17.0000,
    'lng': 71.0081,
    'params': ','.join(['currentDirection', 'currentSpeed', 'swellDirection', 'waveDirection', 'windSpeed']),
    'start': start.to('UTC').timestamp(),  
    'end': end.to('UTC').timestamp()  
  },
  headers={
    'Authorization': '7e071af0-6f24-11ee-a654-0242ac130002-7e071b4a-6f24-11ee-a654-0242ac130002'
  }
)

json_data = json.dumps(response.json())
with open('data.json', 'w') as f:
    f.write(json_data)