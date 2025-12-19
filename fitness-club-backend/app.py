from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness.db'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string-change-in-production'

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Fitness data relationship
    fitness_data = db.relationship('FitnessData', backref='user', lazy=True)
    nutrition_data = db.relationship('NutritionData', backref='user', lazy=True)

# Fitness Data Model
class FitnessData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    bmi = db.Column(db.Float, nullable=False)
    exercises = db.Column(db.Text, nullable=True)  # JSON string of exercises
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Nutrition Data Model
class NutritionData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Float, nullable=False)
    carbs = db.Column(db.Float, nullable=False)
    fats = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables
with app.app_context():
    db.create_all()

# Professional exercise database organized by muscle groups
EXERCISE_DATABASE = {
    'chest': [
        {'name': 'Bench Press', 'description': 'Compound movement targeting pectorals', 'difficulty': 'Intermediate'},
        {'name': 'Push-ups', 'description': 'Bodyweight exercise for chest and triceps', 'difficulty': 'Beginner'},
        {'name': 'Dumbbell Flyes', 'description': 'Isolation exercise for chest muscles', 'difficulty': 'Intermediate'},
        {'name': 'Incline Bench Press', 'description': 'Targets upper chest muscles', 'difficulty': 'Intermediate'},
        {'name': 'Chest Dips', 'description': 'Bodyweight exercise emphasizing lower chest', 'difficulty': 'Advanced'}
    ],
    'back': [
        {'name': 'Pull-ups', 'description': 'Bodyweight exercise for latissimus dorsi', 'difficulty': 'Intermediate'},
        {'name': 'Bent-over Rows', 'description': 'Compound back exercise with barbell', 'difficulty': 'Intermediate'},
        {'name': 'Lat Pulldowns', 'description': 'Machine exercise targeting lats', 'difficulty': 'Beginner'},
        {'name': 'Deadlifts', 'description': 'Full posterior chain compound movement', 'difficulty': 'Advanced'},
        {'name': 'Seated Cable Rows', 'description': 'Isolation exercise for mid-back', 'difficulty': 'Beginner'}
    ],
    'legs': [
        {'name': 'Squats', 'description': 'Compound leg exercise targeting quads and glutes', 'difficulty': 'Intermediate'},
        {'name': 'Lunges', 'description': 'Unilateral leg exercise for balance', 'difficulty': 'Beginner'},
        {'name': 'Leg Press', 'description': 'Machine-based leg exercise', 'difficulty': 'Beginner'},
        {'name': 'Romanian Deadlifts', 'description': 'Hamstring and glute focused exercise', 'difficulty': 'Intermediate'},
        {'name': 'Calf Raises', 'description': 'Isolation exercise for calves', 'difficulty': 'Beginner'}
    ],
    'shoulders': [
        {'name': 'Overhead Press', 'description': 'Compound shoulder exercise', 'difficulty': 'Intermediate'},
        {'name': 'Lateral Raises', 'description': 'Isolation exercise for lateral deltoids', 'difficulty': 'Beginner'},
        {'name': 'Front Raises', 'description': 'Targets anterior deltoids', 'difficulty': 'Beginner'},
        {'name': 'Rear Delt Flyes', 'description': 'Targets posterior deltoids', 'difficulty': 'Intermediate'},
        {'name': 'Arnold Press', 'description': 'Rotational overhead press variation', 'difficulty': 'Advanced'}
    ],
    'arms': [
        {'name': 'Bicep Curls', 'description': 'Isolation exercise for biceps', 'difficulty': 'Beginner'},
        {'name': 'Tricep Dips', 'description': 'Bodyweight exercise for triceps', 'difficulty': 'Beginner'},
        {'name': 'Hammer Curls', 'description': 'Bicep exercise targeting brachialis', 'difficulty': 'Intermediate'},
        {'name': 'Skull Crushers', 'description': 'Lying tricep extension exercise', 'difficulty': 'Intermediate'},
        {'name': 'Preacher Curls', 'description': 'Isolation bicep exercise', 'difficulty': 'Intermediate'}
    ],
    'core': [
        {'name': 'Planks', 'description': 'Isometric core stabilization exercise', 'difficulty': 'Beginner'},
        {'name': 'Russian Twists', 'description': 'Rotational core exercise', 'difficulty': 'Intermediate'},
        {'name': 'Leg Raises', 'description': 'Lower abdominal isolation exercise', 'difficulty': 'Intermediate'},
        {'name': 'Mountain Climbers', 'description': 'Dynamic core and cardio exercise', 'difficulty': 'Intermediate'},
        {'name': 'Dead Bugs', 'description': 'Core stability exercise', 'difficulty': 'Beginner'}
    ]
}

# Professional nutrition database with macronutrient information
FOOD_DATABASE = [
    {'name': 'Chicken Breast', 'calories': 165, 'protein': 31, 'carbs': 0, 'fats': 3.6, 'category': 'Protein'},
    {'name': 'Salmon', 'calories': 208, 'protein': 20, 'carbs': 0, 'fats': 13, 'category': 'Protein'},
    {'name': 'Eggs', 'calories': 155, 'protein': 13, 'carbs': 1.1, 'fats': 11, 'category': 'Protein'},
    {'name': 'Greek Yogurt', 'calories': 59, 'protein': 10, 'carbs': 3.6, 'fats': 0.4, 'category': 'Protein'},
    {'name': 'Quinoa', 'calories': 120, 'protein': 4.4, 'carbs': 21, 'fats': 1.9, 'category': 'Carbs'},
    {'name': 'Brown Rice', 'calories': 111, 'protein': 2.6, 'carbs': 23, 'fats': 0.9, 'category': 'Carbs'},
    {'name': 'Sweet Potato', 'calories': 86, 'protein': 1.6, 'carbs': 20, 'fats': 0.1, 'category': 'Carbs'},
    {'name': 'Broccoli', 'calories': 55, 'protein': 3.7, 'carbs': 11, 'fats': 0.6, 'category': 'Vegetables'},
    {'name': 'Spinach', 'calories': 23, 'protein': 2.9, 'carbs': 3.6, 'fats': 0.4, 'category': 'Vegetables'},
    {'name': 'Avocado', 'calories': 160, 'protein': 2, 'carbs': 9, 'fats': 15, 'category': 'Fats'},
    {'name': 'Almonds', 'calories': 579, 'protein': 21, 'carbs': 22, 'fats': 50, 'category': 'Fats'},
    {'name': 'Olive Oil', 'calories': 884, 'protein': 0, 'carbs': 0, 'fats': 100, 'category': 'Fats'}
]

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate input
        if not data or not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 409
            
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 409
        
        # Hash password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Create user
        user = User(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password,
            age=data.get('age'),
            gender=data.get('gender')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({'message': 'User registered successfully'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate input
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Missing username or password'}), 400
        
        # Find user
        user = User.query.filter_by(username=data['username']).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'age': user.age,
                'gender': user.gender
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'age': user.age,
            'gender': user.gender,
            'created_at': user.created_at
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fitness/data', methods=['POST'])
@jwt_required()
def save_fitness_data():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate input
        required_fields = ['date', 'weight', 'height', 'bmi']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create fitness data record
        fitness_data = FitnessData(
            user_id=current_user_id,
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            weight=float(data['weight']),
            height=float(data['height']),
            bmi=float(data['bmi']),
            exercises=data.get('exercises', '')
        )
        
        db.session.add(fitness_data)
        db.session.commit()
        
        return jsonify({'message': 'Fitness data saved successfully'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fitness/data', methods=['GET'])
@jwt_required()
def get_fitness_data():
    try:
        current_user_id = get_jwt_identity()
        
        # Get fitness data for user
        fitness_data_list = FitnessData.query.filter_by(user_id=current_user_id).order_by(FitnessData.date.desc()).all()
        
        result = []
        for data in fitness_data_list:
            result.append({
                'id': data.id,
                'date': data.date.strftime('%Y-%m-%d'),
                'weight': data.weight,
                'height': data.height,
                'bmi': data.bmi,
                'exercises': data.exercises
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/nutrition/data', methods=['POST'])
@jwt_required()
def save_nutrition_data():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate input
        required_fields = ['date', 'calories', 'protein', 'carbs', 'fats']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create nutrition data record
        nutrition_data = NutritionData(
            user_id=current_user_id,
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            calories=int(data['calories']),
            protein=float(data['protein']),
            carbs=float(data['carbs']),
            fats=float(data['fats'])
        )
        
        db.session.add(nutrition_data)
        db.session.commit()
        
        return jsonify({'message': 'Nutrition data saved successfully'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/nutrition/data', methods=['GET'])
@jwt_required()
def get_nutrition_data():
    try:
        current_user_id = get_jwt_identity()
        
        # Get nutrition data for user
        nutrition_data_list = NutritionData.query.filter_by(user_id=current_user_id).order_by(NutritionData.date.desc()).all()
        
        result = []
        for data in nutrition_data_list:
            result.append({
                'id': data.id,
                'date': data.date.strftime('%Y-%m-%d'),
                'calories': data.calories,
                'protein': data.protein,
                'carbs': data.carbs,
                'fats': data.fats
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New API endpoints for professional fitness/nutrition data
@app.route('/api/exercises/<muscle_group>', methods=['GET'])
def get_exercises_by_muscle_group(muscle_group):
    """Get exercises for a specific muscle group"""
    try:
        if muscle_group in EXERCISE_DATABASE:
            return jsonify(EXERCISE_DATABASE[muscle_group]), 200
        else:
            return jsonify({'error': 'Muscle group not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/exercises', methods=['GET'])
def get_all_exercises():
    """Get all exercises organized by muscle group"""
    try:
        return jsonify(EXERCISE_DATABASE), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/foods', methods=['GET'])
def get_foods():
    """Get all foods with nutritional information"""
    try:
        return jsonify(FOOD_DATABASE), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/foods/category/<category>', methods=['GET'])
def get_foods_by_category(category):
    """Get foods filtered by category"""
    try:
        filtered_foods = [food for food in FOOD_DATABASE if food['category'].lower() == category.lower()]
        return jsonify(filtered_foods), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
@app.route('/api/calculators/bmr', methods=['POST'])
def calculate_bmr():
    """Calculate Basal Metabolic Rate"""
    try:
        data = request.get_json()
        
        # Validate input
        required_fields = ['weight', 'height', 'age', 'gender']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        weight = float(data['weight'])  # kg
        height = float(data['height'])  # cm
        age = int(data['age'])
        gender = data['gender'].lower()
        
        # Mifflin-St Jeor Equation
        if gender == 'male':
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        elif gender == 'female':
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
        else:
            return jsonify({'error': 'Invalid gender. Must be male or female'}), 400
        
        return jsonify({
            'bmr': round(bmr, 2),
            'unit': 'kcal/day'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Calculate TDEE (Total Daily Energy Expenditure)
@app.route('/api/calculators/tdee', methods=['POST'])
def calculate_tdee():
    """Calculate Total Daily Energy Expenditure"""
    try:
        data = request.get_json()
        
        # Validate input
        required_fields = ['weight', 'height', 'age', 'gender', 'activity_level']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        weight = float(data['weight'])  # kg
        height = float(data['height'])  # cm
        age = int(data['age'])
        gender = data['gender'].lower()
        activity_level = data['activity_level']  # sedentary, light, moderate, active, very_active
        
        # First calculate BMR
        if gender == 'male':
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        elif gender == 'female':
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
        else:
            return jsonify({'error': 'Invalid gender. Must be male or female'}), 400
        
        # Activity multipliers
        activity_multipliers = {
            'sedentary': 1.2,      # Little or no exercise
            'light': 1.375,        # Light exercise/sports 1-3 days/week
            'moderate': 1.55,      # Moderate exercise/sports 3-5 days/week
            'active': 1.725,       # Hard exercise/sports 6-7 days/week
            'very_active': 1.9     # Very hard exercise/physical job
        }
        
        if activity_level not in activity_multipliers:
            return jsonify({'error': 'Invalid activity level'}), 400
        
        tdee = bmr * activity_multipliers[activity_level]
        
        return jsonify({
            'bmr': round(bmr, 2),
            'tdee': round(tdee, 2),
            'unit': 'kcal/day'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)