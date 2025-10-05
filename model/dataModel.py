import openmeteo_requests
import pandas as pd
import requests_cache
from retry_requests import retry
import json
import numpy as np

# --- 1. Setup API Client and Base URL ---
# Setup the Open-Meteo API client with cache (1 hour) and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

# Define the base URL for the Air Quality API
url = "https://air-quality-api.open-meteo.com/v1/air-quality"

# --- 2. Configuration for Data Fetch ---
# Define the single day you want to fetch historical data for.
# **CHANGE THIS DATE to fetch data for a different day.**
START_DATE = "2025-10-01"
END_DATE = "2025-10-01"

# List to store the results before saving to JSON
carbon_data = []

# --- 3. Load Coordinates from CSV with Whitespace Separator ---
print("Attempting to read coordinate.csv...")
try:
    # FIX: Use sep='\s+' and engine='python' to correctly handle whitespace 
    # as a separator for files like yours.
    coordinates_df = pd.read_csv('coordinate.csv', sep='\s+', engine='python')
    
    # Check if the expected columns are present
    required_cols = ['Location', 'latitude', 'longitude']
    if not all(col in coordinates_df.columns for col in required_cols):
        print("Error: Could not find required columns ('Location', 'latitude', 'longitude') in the CSV.")
        print("Columns found:", coordinates_df.columns.tolist())
        exit()
        
except FileNotFoundError:
    print("Error: 'coordinate.csv' not found. Please ensure it is in the same directory.")
    exit()
except Exception as e:
    print(f"An error occurred while reading the CSV: {e}")
    exit()

print(f"Starting data fetch for dates: {START_DATE} to {END_DATE}")

# --- 4. Loop Through Locations and Fetch Data ---
for index, row in coordinates_df.iterrows():
    try:
        location_name = row['Location']
        lat = float(row['latitude'])
        lon = float(row['longitude'])
    except Exception as e:
        print(f"  Skipping row {index}: Invalid data format in CSV. Error: {e}")
        continue
        
    print(f"\nFetching data for: {location_name} (Lat: {lat}, Lon: {lon})")

    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "carbon_dioxide",
        "start_date": START_DATE,
        "end_date": END_DATE,
    }

    try:
        responses = openmeteo.weather_api(url, params=params)
    except Exception as e:
        print(f"  Error fetching data for {location_name} from API: {e}")
        continue
        
    response = responses[0]
    hourly = response.Hourly()
    
    if hourly is not None and hourly.Variables(0).ValuesAsNumpy().size > 0:
        hourly_carbon_dioxide = hourly.Variables(0).ValuesAsNumpy()
        
        # Calculate the Average CO2
        avg_co2 = np.nanmean(hourly_carbon_dioxide)
        
        print(f"  Total hours fetched: {hourly_carbon_dioxide.size}")
        print(f"  Calculated Average CO2: {avg_co2:.2f} ppm")

        # Store the result
        carbon_data.append({
            "location": location_name,
            "latitude": lat,
            "longitude": lon,
            "date": START_DATE,
            # FIX: Cast to float() to make it JSON serializable
            "avg_carbon_dioxide_ppm": float(round(avg_co2, 2)) 
        })
    else:
        print(f"  No carbon dioxide data found for {location_name} on {START_DATE}.")

# --- 6. Save to JSON File (Key Modification Here) ---
# Create the filename using the START_DATE variable
output_filename = f'{START_DATE}.json'

try:
    with open(output_filename, 'w') as f:
        json.dump(carbon_data, f, indent=4)
    print(f"\n✅ Data collection complete. Results for {len(carbon_data)} locations saved to {output_filename}")
except Exception as e:
    print(f"\nFailed to write data to JSON file: {e}")