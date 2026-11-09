import { ExerciseItem } from '@/types';

export const EXERCISE_DATABASE: ExerciseItem[] = [
  // 1. WALKING
  {
    id: 'ex-brisk-walk',
    name: 'Outdoor Brisk Walking & Posture Drill',
    nameTelugu: 'చురుకైన నడక',
    category: 'walking',
    difficulty: 'beginner',
    equipmentRequired: ['Comfortable walking shoes'],
    recommendedDurationMins: 30,
    caloriesBurnedPerMin: 4.5,
    instructions: [
      'Maintain an upright posture with your shoulders back and relaxed, gaze 15-20 feet ahead.',
      'Bend elbows at a 90-degree angle and swing naturally from your shoulders.',
      'Strike the ground lightly heel-to-toe, engaging your calves and glutes.',
      'Maintain a conversational pace where you can speak in sentences without gasping.'
    ],
    safetyNotes: [
      'Stay hydrated, especially during humid Indian summer mornings.',
      'Wear supportive footwear with cushioned arches to protect knees and plantar fascia.'
    ],
    targetMuscles: ['Calves', 'Quadriceps', 'Glutes', 'Cardiovascular System'],
    mediaUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 2. JOGGING
  {
    id: 'ex-interval-jogging',
    name: 'Gentle Aerobic Interval Jogging',
    nameTelugu: 'తేలికపాటి పరుగు (జాగింగ్)',
    category: 'jogging',
    difficulty: 'intermediate',
    equipmentRequired: ['Running shoes'],
    recommendedDurationMins: 25,
    caloriesBurnedPerMin: 8.5,
    instructions: [
      'Warm up with 5 minutes of brisk walking and dynamic leg swings.',
      'Jog at a steady pace for 2 minutes, followed by 1 minute of recovery walking.',
      'Repeat 6-8 cycles while maintaining rhythmic nasal-oral breathing.',
      'Cool down with a 3-minute slow walk.'
    ],
    safetyNotes: [
      'Avoid running exclusively on hard concrete pavements if you experience joint soreness; choose unpaved paths or parks.',
      'Not recommended for acute knee inflammation or unmanaged hypertension.'
    ],
    targetMuscles: ['Cardiovascular System', 'Hamstrings', 'Calves', 'Core Stabilizers'],
    mediaUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    homeFriendly: false,
  },

  // 3. CYCLING
  {
    id: 'ex-cadence-cycling',
    name: 'Steady-State Cadence Cycling',
    nameTelugu: 'సైక్లింగ్',
    category: 'cycling',
    difficulty: 'beginner',
    equipmentRequired: ['Bicycle or Stationary Gym Bike', 'Helmet (if outdoors)'],
    recommendedDurationMins: 30,
    caloriesBurnedPerMin: 7.0,
    instructions: [
      'Adjust saddle height so your knee has a slight 25-30 degree bend at the bottom of the pedal stroke.',
      'Keep your chest proud and avoid hunching your lower back.',
      'Maintain a smooth pedaling cadence of 70-85 RPM with moderate resistance.',
      'Keep core lightly braced to absorb vibration.'
    ],
    safetyNotes: [
      'Ensure proper knee alignment without allowing knees to bow outward or inward.',
      'Stay visible with reflectors or front lights when riding outdoors at dusk.'
    ],
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hip Flexors', 'Calves'],
    mediaUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 4. YOGA
  {
    id: 'ex-surya-namaskar',
    name: 'Classical Surya Namaskar (Sun Salutations - 12 Asanas)',
    nameTelugu: 'సూర్య నమస్కారాలు',
    category: 'yoga',
    difficulty: 'beginner',
    equipmentRequired: ['Yoga mat'],
    recommendedDurationMins: 20,
    caloriesBurnedPerMin: 5.5,
    instructions: [
      'Begin in Pranamasana (Prayer Pose) with palms together at chest level.',
      'Inhale into Hastauttanasana (Raised Arms Pose), extending through the spine.',
      'Exhale into Hastapadasana (Standing Forward Bend), keeping knees softly unlocked.',
      'Step back into Ashwa Sanchalanasana (Equestrian Pose) and flow through Plank to Ashtanga Namaskara.',
      'Rise into Bhujangasana (Cobra) and transition to Parvatasana (Mountain Pose).',
      'Step forward to complete the cycle and repeat alternating leading legs for 6-12 rounds.'
    ],
    safetyNotes: [
      'Synchronize breath deliberately with each posture; do not hold breath.',
      'Modify forward bends if you have acute disc herniation or lower back pain.'
    ],
    targetMuscles: ['Full Body', 'Spine Flexibility', 'Core', 'Shoulders', 'Hamstrings'],
    mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },
  {
    id: 'ex-vrikshasana-warrior',
    name: 'Vrikshasana (Tree Pose) & Virabhadrasana Series',
    nameTelugu: 'వృక్షాసనం మరియు వీరభద్రాసనం',
    category: 'yoga',
    difficulty: 'beginner',
    equipmentRequired: ['Yoga mat'],
    recommendedDurationMins: 15,
    caloriesBurnedPerMin: 4.0,
    instructions: [
      'Root down through your left foot and place right sole on inner thigh or calf (avoid direct knee joint).',
      'Find a steady focal point (Drishti) and bring hands into prayer at heart center or overhead.',
      'Hold for 5 deep breaths per side.',
      'Step outward into Warrior II, lunging front knee to 90 degrees while gazing over front fingertips.'
    ],
    safetyNotes: [
      'Use a wall for balance support if feeling unsteady.',
      'Keep pelvis level and do not collapse into the standing hip.'
    ],
    targetMuscles: ['Ankles', 'Hip Stabilizers', 'Quadriceps', 'Mental Focus'],
    mediaUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 5. STRETCHING & MOBILITY
  {
    id: 'ex-spine-mobility-desk',
    name: 'Thoracic Spine Mobility & Cat-Cow Flow',
    nameTelugu: 'వెన్నెముక సాగదీత (క్యాట్-కౌ)',
    category: 'mobility',
    difficulty: 'beginner',
    equipmentRequired: ['Mat or soft floor'],
    recommendedDurationMins: 10,
    caloriesBurnedPerMin: 3.0,
    instructions: [
      'Start on all fours with hands directly under shoulders and knees under hips.',
      'Inhale: Drop your belly towards the floor, lift your chest and tailbone (Cow Pose).',
      'Exhale: Draw your navel towards your spine, rounding your back and tucking chin (Cat Pose).',
      'Move slowly through 10-15 conscious breath cycles.'
    ],
    safetyNotes: [
      'Do not crank your neck upward; keep the cervical curve natural.',
      'Place a folded towel under knees if sensitive to hard surfaces.'
    ],
    targetMuscles: ['Thoracic Spine', 'Erector Spinae', 'Rectus Abdominis', 'Neck Extensors'],
    mediaUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 6. BODYWEIGHT EXERCISES
  {
    id: 'ex-bodyweight-squats',
    name: 'Ergonomic Bodyweight Squats & Wall Sits',
    nameTelugu: 'బాడీవెయిట్ స్క్వాట్స్',
    category: 'bodyweight',
    difficulty: 'beginner',
    equipmentRequired: ['None'],
    recommendedDurationMins: 15,
    caloriesBurnedPerMin: 6.0,
    instructions: [
      'Stand with feet shoulder-width apart, toes turned slightly outward (10-15 degrees).',
      'Initiate movement by sending hips back and down, as if sitting into an invisible chair.',
      'Descend until thighs are parallel to ground, keeping chest lifted and heels flat.',
      'Drive through the whole foot to stand back up, squeezing glutes at the top.',
      'Perform 3 sets of 12-15 controlled repetitions.'
    ],
    safetyNotes: [
      'Ensure knees track in the same direction as your second toe and do not collapse inward.',
      'Sit back onto a sturdy chair if learning proper mechanics.'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves', 'Core'],
    mediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },
  {
    id: 'ex-incline-pushups',
    name: 'Incline Push-ups & Plank Hold',
    nameTelugu: 'పుషప్స్ మరియు ప్లాంక్',
    category: 'bodyweight',
    difficulty: 'beginner',
    equipmentRequired: ['Sturdy table, bench or floor mat'],
    recommendedDurationMins: 15,
    caloriesBurnedPerMin: 5.5,
    instructions: [
      'Place hands slightly wider than shoulder-width on an elevated bench or floor.',
      'Form a straight rigid line from heels through hips to head, engaging glutes and core.',
      'Lower your chest until 2 inches above the surface, elbows flaring at a 45-degree arrow shape.',
      'Push firmly away to return to starting position without sagging hips.',
      'Follow with a 30-45 second forearm plank hold.'
    ],
    safetyNotes: [
      'Never allow the lower back to sway or hyperextend.',
      'Start on an incline bench or wall if floor push-ups place excessive strain on wrists.'
    ],
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps', 'Transverse Abdominis'],
    mediaUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 7. STRENGTH TRAINING
  {
    id: 'ex-dumbbell-romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL) & Rows',
    nameTelugu: 'డంబెల్ డెడ్‌లిఫ్ట్ & రోస్',
    category: 'strength',
    difficulty: 'intermediate',
    equipmentRequired: ['Pair of Dumbbells or Water Jugs'],
    recommendedDurationMins: 25,
    caloriesBurnedPerMin: 6.5,
    instructions: [
      'Hold dumbbells in front of thighs with feet hip-width apart and knees soft.',
      'Hinge at the hips, pushing your butt backward while keeping your back flat like a tabletop.',
      'Lower weights just below knees until feeling a strong stretch in hamstrings.',
      'From this position, pull elbows back toward ribcage for a dumbbell row, release, and drive hips forward to stand.',
      'Perform 3 sets of 10-12 repetitions.'
    ],
    safetyNotes: [
      'The movement is a hip hinge, not a squat. Avoid rounding the upper or lumbar spine.',
      'Keep dumbbells skimming close to your shins throughout.'
    ],
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Latissimus Dorsi', 'Rhomboids', 'Lower Back'],
    mediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    homeFriendly: true,
  },

  // 8. SPORTS & AGILITY
  {
    id: 'ex-badminton-footwork',
    name: 'Badminton Agility Shadow Footwork & Drills',
    nameTelugu: 'బ్యాడ్మింటన్ పాదాల కదలికలు (ఫుట్‌వర్క్)',
    category: 'sports',
    difficulty: 'intermediate',
    equipmentRequired: ['Court or open flat ground', 'Sports shoes'],
    recommendedDurationMins: 30,
    caloriesBurnedPerMin: 8.0,
    instructions: [
      'Start in athletic ready stance in center position (knees bent, weight on balls of feet).',
      'Execute quick chassé split steps toward front left net corner, simulate a net kill, and recover to center.',
      'Push off backwards into deep rear court with scissor-jump overhead stroke simulation.',
      'Execute 6-point corner shadowing for 4 sets of 90 seconds with 45s rest.'
    ],
    safetyNotes: [
      'Ensure proper court shoes with non-marking gum soles for grip to avoid ankle rolls.',
      'Warm up ankles and calf muscles thoroughly prior to rapid direction changes.'
    ],
    targetMuscles: ['Agility', 'Quadriceps', 'Calves', 'Lateral Hip Stabilizers', 'Cardio'],
    mediaUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    homeFriendly: false,
  },
];
