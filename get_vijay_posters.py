import os
import urllib.request
import time

movies = {
    "master.jpg": "https://image.tmdb.org/t/p/w500/gxbwRHsQ2v6DQv28ttp7pIx7Utj.jpg", # The previous one downloaded was a different Master
    "leo.jpg": "https://image.tmdb.org/t/p/w500/A7EByudX0eOzEsqS8n5g0KTMxS.jpg", # Leo (2023) Tamil poster
    "jana-nayagan.jpg": "https://wallpapercave.com/wp/wp14251786.jpg" # Some generic cool Thalapathy Vijay background since it's Thalapathy 69
}

print("Fetching correct TMDB links for Master and Leo...")
# Let's get Master 2021
import json

def fetch_poster(query, year):
    import urllib.parse
    url = f"https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query={urllib.parse.quote(query)}&primary_release_year={year}&language=en-US"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    for r in data.get('results', []):
        if r.get('original_language') == 'ta' and r.get('poster_path'):
            return f"https://image.tmdb.org/t/p/w500{r['poster_path']}"
    return None

master_url = fetch_poster("Master", "2021")
if master_url: movies["master.jpg"] = master_url

leo_url = fetch_poster("Leo", "2023")
if leo_url: movies["leo.jpg"] = leo_url

# Jana Nayagan (Thalapathy 69 / H. Vinoth)
# Download a cool Thalapathy Vijay picture from TMDB actor profile
def fetch_actor(query):
    import urllib.parse
    url = f"https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    if data.get('results') and data['results'][0].get('profile_path'):
        return f"https://image.tmdb.org/t/p/w500{data['results'][0]['profile_path']}"
    return None

vijay_url = fetch_actor("Vijay")
if vijay_url: movies["jana-nayagan.jpg"] = vijay_url

for filename, url in movies.items():
    print(f"Downloading {filename} from {url}")
    urllib.request.urlretrieve(url, f"public/posters/{filename}")

print("Done downloading exact Vijay posters.")
