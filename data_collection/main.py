from trajectory_model.garbage_math_model import Garbage, simulate_garbage_movement
from data_collection.weatherData import meteomatics_data
import os

latitude = float(input("Enter the latitude: "))
longitude = float(input("Enter the longitude: "))

username = os.getenv("WEATHER_USERNAME")
password = os.getenv("WEATHER_PASSWORD")
parameters_meteomatics = ['wind_speed_2m:ms', 'wind_dir_2m:d', 'ocean_current_speed:ms', 'ocean_current_direction:d']

garbage = Garbage(latitude, longitude)
positions = [[latitude, longitude]]


for i in range(10):
    
    latitude, longitude = garbage.get_position()

    weather_data = meteomatics_data(username, password, latitude, longitude, parameters_meteomatics, i)[0]
    world_map = meteomatics_data(username, password, latitude, longitude, parameters_meteomatics)[1]

    current_velocity = weather_data.iloc[0]*18/5, weather_data.iloc[1]
    air_velocity = weather_data.iloc[2]*18/5, weather_data.iloc[3]
    map_Lon_lim = [-180,180]
    
    if world_map == "Land":
            for i in range(10-i):
                positions.append(list(garbage.get_position()))
            break
    
    positions.append(simulate_garbage_movement(garbage, current_velocity, air_velocity, map_Lon_lim))

print(positions)