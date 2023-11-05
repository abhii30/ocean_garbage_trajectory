import numpy as np
import random

class Garbage:
    def __init__(self, latitude, longitude):           #defining properties of garbage
        self.latitude = latitude
        self.longitude = longitude

    def update_position(self, current_velocity, air_velocity, eddy_dispersion_velocity, map_Lat_lim ,alpha=[0.1,0.1]):
        new_velocity=[1,1]
        new_velocity[0] = current_velocity[0] + alpha[0] * air_velocity[0] + eddy_dispersion_velocity[0]
        new_velocity[1] = current_velocity[1] + alpha[1] * air_velocity[1] + eddy_dispersion_velocity[1]       #velocity calculation
        self.latitude += new_velocity[0]                                                          #updating displacement based on velocity
        self.longitude += new_velocity[1]
        #teleportation jutsu
        if(self.latitude)<map_Lat_lim[0]:
            self.latitude=map_Lat_lim[1]
        if(self.latitude)>map_Lat_lim[1]:
            self.latitude=map_Lat_lim[0]

    def get_position(self):
        return self.latitude, self.longitude        #fetch position

def simulate_garbage_movement(garbage, current_velocity_field, air_velocity_field, map ,map_Lat_lim , time_steps):
    positions = []
    for i in range(time_steps):

        gar_lat,gar_long = garbage.get_position()

        #check if garbage is on land
        if map[gar_lat,gar_long] == 0:
            for i in range(time_steps-i):
                positions.append(garbage.get_position())
            break

        current_velocity = current_velocity_field[gar_lat,gar_long, i]
        air_velocity = air_velocity_field[gar_lat,gar_long, i]

        eddy_dispersion_velocity = []
        for j in range(2):
            eddy_dispersion_velocity.append(-1 + random.random() * 2)        #generate a random vel vector

        # Update the garbage's position
        garbage.update_position(current_velocity, air_velocity, eddy_dispersion_velocity, map_Lat_lim )

        # Add the garbage's new position to the positions list
        positions.append(garbage.get_position())

    return positions


garbage = Garbage(37.7833, -122.4167)      #define garbage location and a velocity
current_velocity_field = np.load("current_velocity_field.npy")
air_velocity_field = np.load("air_velocity_field.npy")
map = np.load("map.npy")
map_Lat_lim=[0,360]

positions = simulate_garbage_movement(garbage, current_velocity_field, air_velocity_field, map ,map_Lat_lim , 100)    # 100 - no of time steps

    #add garbage teleport functionaliy (at left and right limits and also top and bottom)
    #units bachta hai