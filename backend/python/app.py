from flask import Flask, jsonify, request
from flask_cors import CORS
from api.solver import solver_blueprint
from core.solver import PokerSolver

app = Flask(__name__)
CORS(app)  # Enable CORS for development

# Register blueprints
app.register_blueprint(solver_blueprint, url_prefix='/api')

@app.route('/')
def home():
    return "Poker Solver Pro Backend"

if __name__ == '__main__':
    app.run(port=5000, debug=True)