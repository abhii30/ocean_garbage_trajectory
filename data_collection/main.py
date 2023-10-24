import meteomatics.api as api
import datetime as dt
from dotenv import load_dotenv
import os

def meteomatics_data(username, password, latitude, longitude, parameters, startdate=None, enddate=None, interval=None):
    if not startdate:
        startdate = dt.datetime.utcnow()
    if not enddate:
        enddate = startdate + dt.timedelta(days=1)
    if not interval:
        interval = dt.timedelta(hours=1)
        
    coordinates = [(latitude, longitude)]
    df = api.query_time_series(coordinates, startdate, enddate, interval, parameters, username, password)
    return df
  
load_dotenv()
username = os.getenv("WEATHER_USERNAME")
password = os.getenv("WEATHER_PASSWORD")
latitude = float(input("Enter Latitude: "))
longitude = float(input("Enter Longitude: "))
parameters_meteomatics = ['wind_speed_2m:ms', 'wind_dir_2m:d', 'ocean_current_speed:ms', 'ocean_current_direction:d']

weather_data = meteomatics_data(username, password, latitude, longitude, parameters_meteomatics)
print(weather_data)