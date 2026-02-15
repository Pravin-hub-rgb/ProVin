# https://itunes.apple.com/search?entity=song&limit=1&term=weezer
import requests
import sys
import json

if len(sys.argv) != 2:
    sys.exit()

# response = requests.get("https://itunes.apple.com/search?entity=song&limit=1&term=" + sys.argv[1])
response = requests.get("https://itunes.apple.com/search?entity=song&limit=10&term=" + sys.argv[1])
# print(json.dumps(response.json(), indent=2)[1]["trackName"])
print(response.json()["results"][0]["trackName"])

o = response.json()

for result in o["results"]:
    print(result["trackName"])