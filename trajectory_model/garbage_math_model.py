from math import sin, cos, radians
import numpy as np
import random

class Garbage:
    def __init__(self, latitude: float, longitude: float):           #defining properties of garbage
        self.latitude = latitude
        self.longitude = longitude

    def update_position(self, current_velocity, air_velocity, eddy_dispersion_velocity, map_Lon_lim ,alpha=[0.1,0.1]):
        new_velocity=[1,1]
        # 0 - current speed and 1 - theta
        new_velocity[0] = -1*(current_velocity[0] * sin(current_velocity[1]) + alpha[0] * air_velocity[0] * sin(air_velocity[1]) + 0.01*eddy_dispersion_velocity[0])
        new_velocity[1] = -1*(current_velocity[0] * cos(current_velocity[1]) + alpha[1] * air_velocity[0] * cos(air_velocity[1]) + 0.01*eddy_dispersion_velocity[1])      #velocity calculation
        self.latitude += 12* new_velocity[0]  * cos(radians(self.latitude)) / 111.321                                                      #updating displacement based on velocity
        self.longitude += 12* new_velocity[1] * cos(radians(self.latitude)) / 111.321 
        #teleportation jutsu
        if(self.longitude)<map_Lon_lim[0]:
            self.longitude=map_Lon_lim[1]
        if(self.longitude)>map_Lon_lim[1]:
            self.longitude=map_Lon_lim[0]

    def get_position(self):
        return float(self.latitude), self.longitude        #fetch position

def simulate_garbage_movement(garbage, current_velocity, air_velocity, map_Lon_lim):

    eddy_dispersion_velocity = []
    for j in range(2):
        eddy_dispersion_velocity.append(-1 + random.random() * 2)#generate a random vel vector

    # Update the garbage's position
    garbage.update_position(current_velocity, air_velocity, eddy_dispersion_velocity, map_Lon_lim )

    return list(garbage.get_position())