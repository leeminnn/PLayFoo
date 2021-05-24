from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app)

db = SQLAlchemy(app)


@app.route("/gamedetails")
def get_gamesdetails():
    game_id = request.args.get("id")
    games = []
    gamelist = requests.get(
        'https://api.rawg.io/api/games/' + str(game_id) + '?key=d64ef8b888564641b6a7b34f3e2e763c').json()

    game = {}

    game['background_image'] = gamelist['background_image']

    temp = []
    for g in gamelist['genres']:
        temp.append(g['name'])
    game['genre'] = temp

    game['description'] = gamelist['description_raw']
    game['name'] = gamelist['name']
    game['rating'] = gamelist['rating']
    game['released'] = gamelist['released']

    games.append(game)

    return jsonify(games), 200


@app.route("/banner")
def get_banner():
    gamesid = [10213, 3498, 19369]
    games = []
    for gid in gamesid:
        gamelist = requests.get('https://api.rawg.io/api/games/' +
                                str(gid) + '?key=d64ef8b888564641b6a7b34f3e2e763c').json()

        game = {}
        game['background_image'] = gamelist['background_image']

        temp = []
        for g in gamelist['genres']:
            temp.append(g['name'])

        game['genre'] = temp
        game['id'] = gid
        game['description'] = gamelist['description_raw']
        game['name'] = gamelist['name']
        game['rating'] = gamelist['rating']
        game['released'] = gamelist['released']

        games.append(game)

    return jsonify(games), 200


@app.route("/toprated")
def get_toprated():
    games = []
    gamelist = requests.get(
        'https://api.rawg.io/api/games?key=d64ef8b888564641b6a7b34f3e2e763c').json()
    for i in range(len(gamelist['results'])):
        if gamelist['results'][i]['rating'] > 4:
            game = {}

            game['background_image'] = gamelist['results'][i]['background_image']
            temp = []
            for g in gamelist['results'][i]['genres']:
                temp.append(g['name'])
            game['genre'] = temp
            game['id'] = gamelist['results'][i]['id']
            game['name'] = gamelist['results'][i]['name']
            game['rating'] = gamelist['results'][i]['rating']
            game['released'] = gamelist['results'][i]['released']
            game['abc'] = "Must-play titles you don’t want to miss."

            games.append(game)

    return jsonify(games), 200


@app.route("/games", methods=["GET"])
def get_games():
    genre = request.args.get("genre")
    page = request.args.get('page', default=1)
    games = []
    gamelist = requests.get(
        'https://api.rawg.io/api/games?key=d64ef8b888564641b6a7b34f3e2e763c&genres=' + genre + '&page=' + str(page) + '&page_size=10').json()

    list_description = {
        "action": "Not for the weak-hearted.",
        "adventure": "Anyone can be a hero. Write your story today.",
        "shooter": "Miss national service? Let’s practice for WW3.",
        "puzzle": "Games for those with big brains.",
        "role-playing-games-rpg": "Let’s do some role-playing.",
        "indie": "Sometimes old school is the way to go.",
        "casual": "For all you filthy casuals.",
        "simulation": "Probably the only simulation you’ll get tonight.",
        "arcade": "Simple but addictive.",
        "racing": "Vroom vroom mothertruckers.",
        "sports": "Look Mum! I’m exercising.",
        "fighting": "Classic beat-them-up violence.",
        "family": "Sweet Home Alabama",
        "educational": "Games for the nerds.",
        "massively-multiplayer": "Tired of our world? Let’s visit another.",
        "board-games": "More like bored games",
        "strategy": "Outsmart your friends and your foes in these dramatic titles.",
        "card": "Collect, combine and play against countless opponents.",
        "platformer": "Indulge in 2D galore."
    }

    for i in range(len(gamelist['results'])):
        game = {}

        game['background_image'] = gamelist['results'][i]['background_image']

        temp = []
        for g in gamelist['results'][i]['genres']:
            temp.append(g['name'])
        game['genre'] = temp

        game['id'] = gamelist['results'][i]['id']
        game['name'] = gamelist['results'][i]['name']
        game['rating'] = gamelist['results'][i]['rating']
        game['released'] = gamelist['results'][i]['released']
        game['abc'] = list_description[genre]

        games.append(game)

    return jsonify(games), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
