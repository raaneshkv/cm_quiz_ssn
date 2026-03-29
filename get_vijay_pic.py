import os
import urllib.request
import time
import json

def get_vijay_pic():
    url = f"https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=Vijay"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    if data.get('results') and data['results'][0].get('profile_path'):
        return f"https://image.tmdb.org/t/p/w500{data['results'][0]['profile_path']}"
    return None

vurl = get_vijay_pic()
if vurl:
    print(f"Downloading Vijay pic from {vurl}")
    urllib.request.urlretrieve(vurl, f"public/posters/jana-nayagan.jpg")
else:
    print("Could not fetch Vijay pic")
