import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Dumbbell, 
  Scale, 
  Ruler, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  User,
  Apple,
  Beef,
  Wheat,
  Waves,
  Zap,
  Heart,
  Bone,
  Calculator
} from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';
import { AuthModal } from './AuthModal';

// Professional exercise database organized by muscle groups
const exerciseDatabase = {
  chest: [
    { name: 'Bench Press', description: 'Compound movement targeting pectorals', difficulty: 'Intermediate' },
    { name: 'Push-ups', description: 'Bodyweight exercise for chest and triceps', difficulty: 'Beginner' },
    { name: 'Dumbbell Flyes', description: 'Isolation exercise for chest muscles', difficulty: 'Intermediate' },
    { name: 'Incline Bench Press', description: 'Targets upper chest muscles', difficulty: 'Intermediate' },
    { name: 'Chest Dips', description: 'Bodyweight exercise emphasizing lower chest', difficulty: 'Advanced' }
  ],
  back: [
    { name: 'Pull-ups', description: 'Bodyweight exercise for latissimus dorsi', difficulty: 'Intermediate' },
    { name: 'Bent-over Rows', description: 'Compound back exercise with barbell', difficulty: 'Intermediate' },
    { name: 'Lat Pulldowns', description: 'Machine exercise targeting lats', difficulty: 'Beginner' },
    { name: 'Deadlifts', description: 'Full posterior chain compound movement', difficulty: 'Advanced' },
    { name: 'Seated Cable Rows', description: 'Isolation exercise for mid-back', difficulty: 'Beginner' }
  ],
  legs: [
    { name: 'Squats', description: 'Compound leg exercise targeting quads and glutes', difficulty: 'Intermediate' },
    { name: 'Lunges', description: 'Unilateral leg exercise for balance', difficulty: 'Beginner' },
    { name: 'Leg Press', description: 'Machine-based leg exercise', difficulty: 'Beginner' },
    { name: 'Romanian Deadlifts', description: 'Hamstring and glute focused exercise', difficulty: 'Intermediate' },
    { name: 'Calf Raises', description: 'Isolation exercise for calves', difficulty: 'Beginner' }
  ],
  shoulders: [
    { name: 'Overhead Press', description: 'Compound shoulder exercise', difficulty: 'Intermediate' },
    { name: 'Lateral Raises', description: 'Isolation exercise for lateral deltoids', difficulty: 'Beginner' },
    { name: 'Front Raises', description: 'Targets anterior deltoids', difficulty: 'Beginner' },
    { name: 'Rear Delt Flyes', description: 'Targets posterior deltoids', difficulty: 'Intermediate' },
    { name: 'Arnold Press', description: 'Rotational overhead press variation', difficulty: 'Advanced' }
  ],
  arms: [
    { name: 'Bicep Curls', description: 'Isolation exercise for biceps', difficulty: 'Beginner' },
    { name: 'Tricep Dips', description: 'Bodyweight exercise for triceps', difficulty: 'Beginner' },
    { name: 'Hammer Curls', description: 'Bicep exercise targeting brachialis', difficulty: 'Intermediate' },
    { name: 'Skull Crushers', description: 'Lying tricep extension exercise', difficulty: 'Intermediate' },
    { name: 'Preacher Curls', description: 'Isolation bicep exercise', difficulty: 'Intermediate' }
  ],
  core: [
    { name: 'Planks', description: 'Isometric core stabilization exercise', difficulty: 'Beginner' },
    { name: 'Russian Twists', description: 'Rotational core exercise', difficulty: 'Intermediate' },
    { name: 'Leg Raises', description: 'Lower abdominal isolation exercise', difficulty: 'Intermediate' },
    { name: 'Mountain Climbers', description: 'Dynamic core and cardio exercise', difficulty: 'Intermediate' },
    { name: 'Dead Bugs', description: 'Core stability exercise', difficulty: 'Beginner' }
  ]
};

// Professional nutrition database with macronutrient information
const foodDatabase = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, category: 'Protein' },
  { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fats: 13, category: 'Protein' },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fats: 11, category: 'Protein' },
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: 'Protein' },
  { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: 'Carbs' },
  { name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fats: 0.9, category: 'Carbs' },
  { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: 'Carbs' },
  { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fats: 0.6, category: 'Vegetables' },
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, category: 'Vegetables' },
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, category: 'Fats' },
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fats: 50, category: 'Fats' },
  { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fats: 100, category: 'Fats' }
];

const workoutPlans = [
  {
    id: 1,
    name: 'Beginner Strength',
    description: 'Perfect for those starting their fitness journey',
    difficulty: 'Beginner',
    duration: '8 weeks',
    focus: ['Strength', 'Endurance'],
    muscleGroups: ['chest', 'back', 'legs']
  },
  {
    id: 2,
    name: 'Intermediate Power',
    description: 'For those with some fitness experience',
    difficulty: 'Intermediate',
    duration: '12 weeks',
    focus: ['Power', 'Muscle Building'],
    muscleGroups: ['chest', 'back', 'legs', 'shoulders', 'arms']
  },
  {
    id: 3,
    name: 'Advanced Performance',
    description: 'For experienced athletes seeking peak performance',
    difficulty: 'Advanced',
    duration: '16 weeks',
    focus: ['Performance', 'Conditioning'],
    muscleGroups: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core']
  }
];

export const FitnessTracking = () => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    selectedPlan: null as number | null,
    age: '',
    gender: 'male' as 'male' | 'female'
  });
  const [bmi, setBmi] = useState<number | null>(null);
  const [dailyExercises, setDailyExercises] = useState<{name: string, muscleGroup: string}[]>([]);
  const [newExercise, setNewExercise] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('chest');
  const [advice, setAdvice] = useState('');
  const [progressData, setProgressData] = useState<any[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Calorie tracking state
  const [nutritionData, setNutritionData] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const [dailyNutrition, setDailyNutrition] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState('');

  // Dynamic UI state based on user input
  const [dynamicCardClass, setDynamicCardClass] = useState('glass-card-hover p-6');
  
  // Professional calculators
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [activityLevel, setActivityLevel] = useState('moderate');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('fitnessUserData');
    const savedProgressData = localStorage.getItem('fitnessProgressData');
    const savedExercises = localStorage.getItem('fitnessDailyExercises');
    const savedNutritionData = localStorage.getItem('fitnessNutritionData');
    const token = localStorage.getItem('fitnessToken');
    const user = localStorage.getItem('currentUser');
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    
    if (savedProgressData) {
      setProgressData(JSON.parse(savedProgressData));
    }
    
    if (savedExercises) {
      setDailyExercises(JSON.parse(savedExercises));
    }
    
    if (savedNutritionData) {
      setDailyNutrition(JSON.parse(savedNutritionData));
    }
    
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Update dynamic card class based on user data
  useEffect(() => {
    let newClass = 'glass-card-hover p-6 ';
    
    // Change based on BMI
    if (bmi) {
      if (bmi < 18.5) {
        newClass += 'border-l-4 border-yellow-500 ';
      } else if (bmi >= 18.5 && bmi < 25) {
        newClass += 'border-l-4 border-green-500 ';
      } else if (bmi >= 25 && bmi < 30) {
        newClass += 'border-l-4 border-orange-500 ';
      } else {
        newClass += 'border-l-4 border-red-500 ';
      }
    }
    
    // Change based on selected plan
    if (userData.selectedPlan) {
      const plan = workoutPlans.find(p => p.id === userData.selectedPlan);
      if (plan) {
        if (plan.difficulty === 'Beginner') {
          newClass += 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 ';
        } else if (plan.difficulty === 'Intermediate') {
          newClass += 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 ';
        } else {
          newClass += 'bg-gradient-to-br from-red-900/30 to-orange-900/30 ';
        }
      }
    }
    
    setDynamicCardClass(newClass);
  }, [bmi, userData.selectedPlan]);

  // Save userData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitnessUserData', JSON.stringify(userData));
  }, [userData]);

  // Save progressData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitnessProgressData', JSON.stringify(progressData));
  }, [progressData]);

  // Save dailyExercises to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitnessDailyExercises', JSON.stringify(dailyExercises));
  }, [dailyExercises]);

  // Save dailyNutrition to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitnessNutritionData', JSON.stringify(dailyNutrition));
  }, [dailyNutrition]);

  // Calculate BMI when weight or height changes
  useEffect(() => {
    if (userData.weight && userData.height) {
      const weight = parseFloat(userData.weight);
      const height = parseFloat(userData.height) / 100; // Convert cm to meters
      if (weight > 0 && height > 0) {
        const calculatedBmi = weight / (height * height);
        setBmi(parseFloat(calculatedBmi.toFixed(1)));
        
        // Generate random advice based on BMI
        if (calculatedBmi < 18.5) {
          setAdvice("Your BMI indicates you're underweight. Focus on strength training and increased caloric intake with nutrient-dense foods.");
        } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
          setAdvice("Great job! Your BMI is in the healthy range. Maintain your current routine and focus on consistency.");
        } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
          setAdvice("Your BMI indicates you're overweight. Incorporate more cardio and monitor portion sizes while maintaining strength training.");
        } else {
          setAdvice("Your BMI indicates obesity. Focus on a combination of cardio and strength training, and consult with a nutritionist for dietary guidance.");
        }
      }
    }
  }, [userData.weight, userData.height]);

  // Calculate BMR and TDEE when relevant user data changes
  useEffect(() => {
    if (userData.weight && userData.height && userData.age && userData.gender) {
      calculateProfessionalMetrics();
    }
  }, [userData.weight, userData.height, userData.age, userData.gender, activityLevel]);

  const calculateProfessionalMetrics = async () => {
    try {
      // Calculate BMR using our backend API
      const bmrResponse = await fetch('http://localhost:5000/api/calculators/bmr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          weight: parseFloat(userData.weight),
          height: parseFloat(userData.height),
          age: parseInt(userData.age),
          gender: userData.gender
        })
      });
      
      const bmrData = await bmrResponse.json();
      if (bmrResponse.ok) {
        setBmr(bmrData.bmr);
      }
      
      // Calculate TDEE using our backend API
      const tdeeResponse = await fetch('http://localhost:5000/api/calculators/tdee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          weight: parseFloat(userData.weight),
          height: parseFloat(userData.height),
          age: parseInt(userData.age),
          gender: userData.gender,
          activity_level: activityLevel
        })
      });
      
      const tdeeData = await tdeeResponse.json();
      if (tdeeResponse.ok) {
        setTdee(tdeeData.tdee);
      }
    } catch (error) {
      console.error('Error calculating professional metrics:', error);
    }
  };

  // Filter data for current week display
  const getCurrentWeekData = () => {
    const startIndex = Math.max(0, progressData.length - 7 + currentWeekOffset);
    const endIndex = Math.min(progressData.length, startIndex + 7);
    return progressData.slice(startIndex, endIndex);
  };

  const getCurrentWeekNutrition = () => {
    const startIndex = Math.max(0, dailyNutrition.length - 7 + currentWeekOffset);
    const endIndex = Math.min(dailyNutrition.length, startIndex + 7);
    return dailyNutrition.slice(startIndex, endIndex);
  };

  const currentWeekData = getCurrentWeekData();
  const currentWeekNutrition = getCurrentWeekNutrition();
  const selectedPlan = workoutPlans.find(plan => plan.id === userData.selectedPlan);

  const handleAddExercise = () => {
    if (newExercise.trim()) {
      setDailyExercises([...dailyExercises, {name: newExercise.trim(), muscleGroup: selectedMuscleGroup}]);
      setNewExercise('');
    }
  };

  const handleAddFood = () => {
    if (selectedFood) {
      const food = foodDatabase.find(f => f.name === selectedFood);
      if (food) {
        setNutritionData({
          calories: (parseInt(nutritionData.calories || '0') + food.calories).toString(),
          protein: (parseFloat(nutritionData.protein || '0') + food.protein).toString(),
          carbs: (parseFloat(nutritionData.carbs || '0') + food.carbs).toString(),
          fats: (parseFloat(nutritionData.fats || '0') + food.fats).toString()
        });
        setSelectedFood('');
      }
    }
  };

  const handleRemoveExercise = (index: number) => {
    setDailyExercises(dailyExercises.filter((_, i) => i !== index));
  };

  const handleSaveData = async () => {
    if (userData.weight && userData.height) {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(userData.weight),
        height: parseFloat(userData.height),
        workoutCompleted: dailyExercises.length > 0,
        caloriesBurned: dailyExercises.length * 50 // Estimate
      };
      
      const updatedProgressData = [...progressData, newEntry];
      setProgressData(updatedProgressData);
      
      // If logged in, save to backend
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('fitnessToken');
          await fetch('http://localhost:5000/api/fitness/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              date: newEntry.date,
              weight: newEntry.weight,
              height: newEntry.height,
              bmi: bmi || 0,
              exercises: JSON.stringify(dailyExercises)
            })
          });
        } catch (error) {
          console.error('Failed to save to backend:', error);
        }
      }
      
      alert('Data saved successfully!');
    } else {
      alert('Please enter your weight and height first.');
    }
  };

  const handleSaveNutrition = async () => {
    if (nutritionData.calories && nutritionData.protein && nutritionData.carbs && nutritionData.fats) {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        calories: parseInt(nutritionData.calories),
        protein: parseFloat(nutritionData.protein),
        carbs: parseFloat(nutritionData.carbs),
        fats: parseFloat(nutritionData.fats)
      };
      
      const updatedNutritionData = [...dailyNutrition, newEntry];
      setDailyNutrition(updatedNutritionData);
      
      // If logged in, save to backend
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('fitnessToken');
          await fetch('http://localhost:5000/api/nutrition/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newEntry)
          });
        } catch (error) {
          console.error('Failed to save nutrition data to backend:', error);
        }
      }
      
      // Reset form
      setNutritionData({
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
      });
      
      alert('Nutrition data saved successfully!');
    } else {
      alert('Please fill in all nutrition fields.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all your data?')) {
      setUserData({
        weight: '',
        height: '',
        selectedPlan: null,
        age: '',
        gender: 'male'
      });
      setDailyExercises([]);
      setProgressData([]);
      setDailyNutrition([]);
      setBmr(null);
      setTdee(null);
      localStorage.removeItem('fitnessUserData');
      localStorage.removeItem('fitnessProgressData');
      localStorage.removeItem('fitnessDailyExercises');
      localStorage.removeItem('fitnessNutritionData');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fitnessToken');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleAuthSuccess = () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  };

  return (
    <Section id="fitness-tracking" className="min-h-screen">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />
      
      <SectionTitle subtitle="Track your progress and transform your fitness journey">
        Fitness <span className="gradient-text">Tracking</span>
        {isLoggedIn && (
          <div className="text-sm font-normal mt-2">
            Welcome, {currentUser?.username}! 
            <button 
              onClick={handleLogout}
              className="ml-2 text-cyber-purple hover:text-cyber-blue"
            >
              (Logout)
            </button>
          </div>
        )}
      </SectionTitle>

      {!isLoggedIn && (
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
          >
            Login / Register to Save Your Data
          </button>
        </div>
      )}

      {/* User Data Input */}
      <GlassCard className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <User className="w-5 h-5 mr-2" />
            Your Profile
          </h3>
          <button 
            onClick={handleResetData}
            className="text-sm text-gray-400 hover:text-red-400"
          >
            Reset Data
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              value={userData.weight}
              onChange={(e) => setUserData({...userData, weight: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
              placeholder="Enter your weight"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              value={userData.height}
              onChange={(e) => setUserData({...userData, height: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
              placeholder="Enter your height"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
              placeholder="Enter your age"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              value={userData.gender}
              onChange={(e) => setUserData({...userData, gender: e.target.value as 'male' | 'female'})}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        
        {(bmi || bmr || tdee) && (
          <div className={`mt-4 p-4 rounded-lg ${bmi && bmi < 18.5 ? 'bg-yellow-900/20 border border-yellow-700/30' : bmi && bmi < 25 ? 'bg-green-900/20 border border-green-700/30' : bmi && bmi < 30 ? 'bg-orange-900/20 border border-orange-700/30' : bmi ? 'bg-red-900/20 border border-red-700/30' : 'bg-gray-800/50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bmi && (
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Your BMI:</span>
                    <span className="text-xl font-bold gradient-text">{bmi}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">{advice}</div>
                </div>
              )}
              
              {bmr && (
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">BMR:</span>
                    <span className="text-xl font-bold gradient-text">{Math.round(bmr)} kcal</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">Basal Metabolic Rate</div>
                </div>
              )}
              
              {tdee && (
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">TDEE:</span>
                    <span className="text-xl font-bold gradient-text">{Math.round(tdee)} kcal</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">Total Daily Energy Expenditure</div>
                </div>
              )}
            </div>
            
            {tdee && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (twice per day)</option>
                </select>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Workout Plan Selection */}
      <GlassCard className="mb-8">
        <h3 className="text-xl font-bold mb-4">Select Your Plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workoutPlans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setUserData({...userData, selectedPlan: plan.id})}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                userData.selectedPlan === plan.id 
                  ? plan.difficulty === 'Beginner' 
                    ? 'border-blue-500 bg-blue-900/20' 
                    : plan.difficulty === 'Intermediate' 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-red-500 bg-red-900/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <h4 className="font-bold">{plan.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              <div className="flex justify-between mt-3">
                <span className={`text-xs px-2 py-1 rounded ${
                  plan.difficulty === 'Beginner' 
                    ? 'bg-blue-700/30 text-blue-300' 
                    : plan.difficulty === 'Intermediate' 
                      ? 'bg-purple-700/30 text-purple-300' 
                      : 'bg-red-700/30 text-red-300'
                }`}>
                  {plan.difficulty}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-700 rounded">{plan.duration}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {plan.focus.map((focus, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded">
                    {focus}
                  </span>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700/30">
                <div className="text-xs text-gray-400">Muscle Groups:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plan.muscleGroups.map((group, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded capitalize">
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedPlan && (
          <div className={`mt-4 p-4 rounded-lg ${
            selectedPlan.difficulty === 'Beginner' 
              ? 'bg-blue-900/20 border border-blue-700/30' 
              : selectedPlan.difficulty === 'Intermediate' 
                ? 'bg-purple-900/20 border border-purple-700/30' 
                : 'bg-red-900/20 border border-red-700/30'
          }`}>
            <h4 className="font-bold">Selected Plan: {selectedPlan.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{selectedPlan.description}</p>
            
            <div className="mt-3">
              <div className="text-sm font-medium mb-2">Recommended Exercises:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {selectedPlan.muscleGroups.map((group) => (
                  <div key={group} className="text-xs">
                    <div className="font-medium capitalize">{group}:</div>
                    <div className="text-gray-400 truncate">
                      {exerciseDatabase[group as keyof typeof exerciseDatabase]?.[0]?.name || 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Muscle Group Selector and Exercise Logger */}
      <GlassCard className="mb-8">
        <h3 className="text-xl font-bold mb-4">Today's Exercises</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Select Muscle Group</label>
            <select
              value={selectedMuscleGroup}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
            >
              {Object.keys(exerciseDatabase).map((group) => (
                <option key={group} value={group} className="capitalize">
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Quick Add Exercise</label>
            <select
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
            >
              <option value="">Select an exercise</option>
              {exerciseDatabase[selectedMuscleGroup as keyof typeof exerciseDatabase]?.map((exercise, index) => (
                <option key={index} value={exercise.name}>
                  {exercise.name} ({exercise.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
            placeholder="Or add a custom exercise..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddExercise()}
          />
          <button
            onClick={handleAddExercise}
            className="px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {dailyExercises.length > 0 ? (
          <div className="space-y-2">
            {dailyExercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-xs ml-2 px-2 py-1 bg-gray-700 rounded capitalize">
                    {exercise.muscleGroup}
                  </span>
                </div>
                <button 
                  onClick={() => handleRemoveExercise(index)}
                  className="p-1 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No exercises added yet. Select a muscle group and add exercises above!
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveData}
            className="px-6 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
          >
            Save Today's Data
          </button>
        </div>
      </GlassCard>

      {/* Food Database and Nutrition Tracking */}
      <GlassCard className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Apple className="w-5 h-5 mr-2" />
          Daily Nutrition Tracking
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Add Food from Database</label>
            <div className="flex gap-2">
              <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple"
              >
                <option value="">Select a food item</option>
                {foodDatabase.map((food, index) => (
                  <option key={index} value={food.name}>
                    {food.name} ({food.category}) - {food.calories} kcal
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddFood}
                className="px-4 py-2 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-lg hover:shadow-[0_0_20px_rgba(72,187,120,0.5)] transition-all"
              >
                Add
              </button>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Nutrition Facts</h4>
              {selectedFood && (
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  {(() => {
                    const food = foodDatabase.find(f => f.name === selectedFood);
                    return food ? (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Calories: <span className="font-medium">{food.calories}</span></div>
                        <div>Protein: <span className="font-medium">{food.protein}g</span></div>
                        <div>Carbs: <span className="font-medium">{food.carbs}g</span></div>
                        <div>Fats: <span className="font-medium">{food.fats}g</span></div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Manual Entry</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1 flex items-center">
                  <Waves className="w-3 h-3 mr-1" />
                  Calories
                </label>
                <input
                  type="number"
                  value={nutritionData.calories}
                  onChange={(e) => setNutritionData({...nutritionData, calories: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple text-sm"
                  placeholder="kcal"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1 flex items-center">
                  <Beef className="w-3 h-3 mr-1" />
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={nutritionData.protein}
                  onChange={(e) => setNutritionData({...nutritionData, protein: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple text-sm"
                  placeholder="grams"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1 flex items-center">
                  <Wheat className="w-3 h-3 mr-1" />
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={nutritionData.carbs}
                  onChange={(e) => setNutritionData({...nutritionData, carbs: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple text-sm"
                  placeholder="grams"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Fats (g)</label>
                <input
                  type="number"
                  value={nutritionData.fats}
                  onChange={(e) => setNutritionData({...nutritionData, fats: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-purple text-sm"
                  placeholder="grams"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSaveNutrition}
            className="px-6 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
          >
            Log Nutrition
          </button>
        </div>
      </GlassCard>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard className={`${dynamicCardClass} text-center`}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center mx-auto mb-4">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            {userData.weight || '---'} kg
          </h3>
          <p className="text-gray-400">Current Weight</p>
          <div className="flex items-center justify-center mt-2 text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {progressData.length > 1 
                ? `${(progressData[0].weight - progressData[progressData.length-1].weight).toFixed(1)} kg lost` 
                : '0 kg lost'}
            </span>
          </div>
        </GlassCard>

        <GlassCard className={`${dynamicCardClass} text-center`}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center mx-auto mb-4">
            <Ruler className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            {userData.height || '---'} cm
          </h3>
          <p className="text-gray-400">Height</p>
          <div className="mt-2 text-sm text-gray-400">Unchanged</div>
        </GlassCard>

        <GlassCard className={`${dynamicCardClass} text-center`}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center mx-auto mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            {dailyExercises.length}
          </h3>
          <p className="text-gray-400">Exercises Today</p>
          <div className="mt-2 text-sm text-cyber-purple">Keep it up!</div>
        </GlassCard>

        <GlassCard className={`${dynamicCardClass} text-center`}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            {bmi ? `${bmi}` : '---'}
          </h3>
          <p className="text-gray-400">BMI</p>
          <div className="mt-2 text-sm text-gray-400">
            {bmi ? (bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese') : 'Not calculated'}
          </div>
        </GlassCard>
      </div>

      {/* Weekly Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Weekly Fitness Progress</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentWeekOffset(Math.max(-progressData.length + 7, currentWeekOffset - 7))}
                disabled={currentWeekOffset <= -progressData.length + 7}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentWeekOffset(Math.min(0, currentWeekOffset + 7))}
                disabled={currentWeekOffset >= 0}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center text-sm text-gray-400">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {currentWeekData.map((data, index) => (
              <div key={data.date} className="flex flex-col items-center">
                <div 
                  className={`w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 ${
                    data.workoutCompleted 
                      ? 'bg-gradient-to-t from-cyber-purple/30 to-cyber-blue/10 border border-cyber-purple/30' 
                      : 'bg-gray-800/50 border border-gray-700'
                  }`}
                >
                  <div 
                    className={`w-3/4 rounded-t ${
                      data.workoutCompleted 
                        ? 'bg-gradient-to-t from-cyber-purple to-cyber-blue' 
                        : 'bg-gray-600'
                    }`}
                    style={{ height: `${Math.max(10, (75 - data.weight) * 3)}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(data.date).getDate()}
                </div>
                <div className="text-xs font-semibold">
                  {data.weight.toFixed(1)}kg
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Weekly Nutrition Chart */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Weekly Nutrition</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentWeekOffset(Math.max(-dailyNutrition.length + 7, currentWeekOffset - 7))}
                disabled={currentWeekOffset <= -dailyNutrition.length + 7}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentWeekOffset(Math.min(0, currentWeekOffset + 7))}
                disabled={currentWeekOffset >= 0}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center text-sm text-gray-400">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {currentWeekNutrition.map((data, index) => (
              <div key={data.date} className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 bg-gradient-to-t from-cyber-green/30 to-cyber-blue/10 border border-cyber-green/30">
                  <div 
                    className="w-3/4 rounded-t bg-gradient-to-t from-cyber-green to-cyber-blue"
                    style={{ height: `${Math.min(100, data.calories / 30)}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(data.date).getDate()}
                </div>
                <div className="text-xs font-semibold">
                  {data.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
};