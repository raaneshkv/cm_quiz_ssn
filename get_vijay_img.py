import urllib.request
import json
import time

API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb"
url = f"https://api.themoviedb.org/3/search/person?api_key={API_KEY}&query=Vijay"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
res = urllib.request.urlopen(req)
data = json.loads(res.read().decode())

for person in data['results']:
    if person['name'] == 'Vijay':
        print(f"Vijay ID: {person['id']}, Poster: {person['profile_path']}")
        img_url = f"https://image.tmdb.org/t/p/w500{person['profile_path']}"
        urllib.request.urlretrieve(img_url, "public/posters/jana-nayagan.jpg")
        print("Success")
        break
