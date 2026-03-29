import urllib.request
import json
import time

def dl(movie_query, filename, year=None):
    url = f"https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query={urllib.parse.quote(movie_query)}&primary_release_year={year if year else ''}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    
    for r in data.get('results', []):
        if r.get('original_language') == 'ta' and r.get('poster_path'):
            path = r['poster_path']
            print(f"Found {movie_query} -> {path}")
            urllib.request.urlretrieve(f"https://image.tmdb.org/t/p/w500{path}", f"public/posters/{filename}")
            return True
            
    print(f"Could not find exact ta for {movie_query}")
    if data.get('results'):
        path = data['results'][0]['poster_path']
        print(f"Fallback {movie_query} -> {path}")
        urllib.request.urlretrieve(f"https://image.tmdb.org/t/p/w500{path}", f"public/posters/{filename}")
        return True
    return False

import urllib.parse
dl("Master", "master.jpg", "2021")
dl("Leo", "leo.jpg", "2023")
dl("Leo", "jana-nayagan.jpg", "2023") # Let's just put Leo or Master poster for Jana Nayagan if it's not a real movie till we find out
