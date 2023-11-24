from flask import Flask, request, jsonify
from flask_cors import CORS
from trajectory_model.garbage_math_model import Garbage, simulate_garbage_movement
from data_collection.weatherData import meteomatics_data
import os
import datetime as dt

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def simulate_garbage():
    try:
        latitude = float(request.json['latitude'])
        longitude = float(request.json['longitude'])
        
        
        # Your simulation logic here
        positions = simulate_positions(latitude, longitude)

        return jsonify({'positions': positions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def simulate_positions(latitude, longitude):
    username = os.getenv("WEATHER_USERNAME")
    password = os.getenv("WEATHER_PASSWORD")
    parameters_meteomatics = ['wind_speed_2m:ms', 'wind_dir_2m:d', 'ocean_current_speed:ms', 'ocean_current_direction:d']
    # Your simulation code here
    # This is a simplified version of your original code
    positions = [[latitude,longitude]]
    garbage = Garbage(latitude,longitude)
    startdate = dt.datetime.utcnow()
    interval = dt.timedelta(hours=12)
    year_balance = dt.timedelta(hours=8760)

    for i in range(40):
    
        latitude, longitude = garbage.get_position()

        weather_data = meteomatics_data(username, password, latitude, longitude, parameters_meteomatics, startdate)[0]
        world_map = meteomatics_data(username, password, latitude, longitude, parameters_meteomatics)[1]

        current_velocity = weather_data.iloc[0]*18/5, weather_data.iloc[1]
        air_velocity = weather_data.iloc[2]*18/5, weather_data.iloc[3]
        map_Lon_lim = [-180,180]
        
        if world_map == "Land":
                for i in range(10-i):
                    positions.append(list(garbage.get_position()))
                break
        positions.append(simulate_garbage_movement(garbage, current_velocity, air_velocity, map_Lon_lim))
        # Your simulation logic here
        
        # Append simulated position to the positions list
        # positions.append(garbage.get_position())
        startdate = startdate

    return positions

if __name__ == '__main__':
    app.run(debug=True)
