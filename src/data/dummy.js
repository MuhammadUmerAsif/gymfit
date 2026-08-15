export const NOTIFICATIONS = [
  { id: "n1", title: "Class reminder", body: "Sunrise Strength starts in 30 minutes.", when: "8 min ago", read: false },
  { id: "n2", title: "Streak alert", body: "You're on a 6 day streak — don't break it today!", when: "2 hr ago", read: false },
  { id: "n3", title: "Trainer message", body: "Marcus K. left a note on your Lower Body plan.", when: "Yesterday", read: true },
  { id: "n4", title: "Membership", body: "Your Unlimited Monthly plan renews Aug 14.", when: "2 days ago", read: true },
  { id: "n5", title: "Waitlist promoted", body: "A spot opened in Power Zumba — you're in!", when: "3 days ago", read: true },
];

export const WORKOUT_DETAILS = {
  lower_body: {
    title: "Lower Body Workout",
    duration: "30 mins",
    level: "Intermediate",
    kcal: 320,
    equipment: "Bodyweight, dumbbells",
    exercises: [
      { name: "Bodyweight Squats", sets: "4", reps: "15", rest: "45s" },
      { name: "Walking Lunges", sets: "3", reps: "12 / leg", rest: "45s" },
      { name: "Glute Bridges", sets: "3", reps: "20", rest: "30s" },
      { name: "Bulgarian Split Squats", sets: "3", reps: "10 / leg", rest: "60s" },
      { name: "Calf Raises", sets: "4", reps: "20", rest: "30s" },
    ],
  },
  upper_body: {
    title: "Upper Body Workout",
    duration: "20 mins",
    level: "Intermediate",
    kcal: 240,
    equipment: "Dumbbells",
    exercises: [
      { name: "Dumbbell Shoulder Press", sets: "4", reps: "10", rest: "60s" },
      { name: "Bent-Over Rows", sets: "3", reps: "12", rest: "45s" },
      { name: "Bicep Curls", sets: "3", reps: "12", rest: "30s" },
      { name: "Tricep Dips", sets: "3", reps: "15", rest: "45s" },
      { name: "Push-Ups", sets: "3", reps: "To failure", rest: "60s" },
      { name: "Lateral Raises", sets: "3", reps: "12", rest: "30s" },
    ],
  },
  progress: {
    title: "Lower Body — Cardio",
    duration: "10 mins",
    level: "Beginner",
    kcal: 538,
    equipment: "None",
    exercises: [
      { name: "Jumping Jacks", sets: "1", reps: "60s", rest: "15s" },
      { name: "High Knees", sets: "1", reps: "45s", rest: "15s" },
      { name: "Mountain Climbers", sets: "1", reps: "45s", rest: "15s" },
      { name: "Butt Kicks", sets: "1", reps: "45s", rest: "15s" },
      { name: "Speed Skaters", sets: "1", reps: "45s", rest: "cooldown" },
    ],
  },
};

export const TODAYS_CHALLENGE = {
  title: "Today's Challenge",
  deadline: "9:00 AM",
  reward: "+50 XP",
  description: "Complete your full workout plan before 9:00 AM to keep your streak alive and earn bonus XP.",
  steps: [
    { label: "Warm up", done: true },
    { label: "Complete Lower Body plan", done: false },
    { label: "Log your weight", done: false },
    { label: "Check in at the gym", done: false },
  ],
};

export const STEPS_DETAIL = {
  today: 1840,
  goal: 8000,
  weekly: [
    { day: "M", steps: 6200 },
    { day: "T", steps: 7400 },
    { day: "W", steps: 1840 },
    { day: "T", steps: 0 },
    { day: "F", steps: 0 },
    { day: "S", steps: 0 },
    { day: "S", steps: 0 },
  ],
};

export const GOALS_DETAIL = {
  progress: 42,
  goals: [
    { id: "g1", label: "Lose 3kg", progress: 60 },
    { id: "g2", label: "Run 5km under 30 min", progress: 35 },
    { id: "g3", label: "Workout 4x / week", progress: 75 },
    { id: "g4", label: "Drink 2L water daily", progress: 20 },
  ],
};

export const CALORIES_DETAIL = {
  target: 1200,
  burned: 328,
  remaining: 872,
  breakdown: [
    { label: "Sunrise Strength class", kcal: 210, when: "6:30 AM" },
    { label: "Walk to work", kcal: 68, when: "8:10 AM" },
    { label: "Stretching", kcal: 50, when: "12:00 PM" },
  ],
};

export const ACTIVITY_HISTORY = [
  { id: "a1", type: "Running", title: "Morning Run", when: "Today, 6:00 AM", kcal: 310, duration: "28 min" },
  { id: "a2", type: "Cycling", title: "Evening Ride", when: "Yesterday, 6:15 PM", kcal: 420, duration: "45 min" },
  { id: "a3", type: "Running", title: "Interval Sprints", when: "2 days ago", kcal: 260, duration: "20 min" },
  { id: "a4", type: "Cycling", title: "Weekend Loop", when: "4 days ago", kcal: 610, duration: "1 hr 10 min" },
];

export const CALENDAR_WEEKS = [
  { month: "April 2024", days: [{ d: "M", date: 29 }, { d: "T", date: 30 }, { d: "W", date: 1 }, { d: "T", date: 2 }, { d: "F", date: 3 }, { d: "S", date: 4 }, { d: "S", date: 5 }] },
  { month: "May 2024", days: [{ d: "M", date: 16 }, { d: "T", date: 17 }, { d: "W", date: 18 }, { d: "T", date: 19 }, { d: "F", date: 20 }, { d: "S", date: 21 }, { d: "S", date: 22 }] },
  { month: "June 2024", days: [{ d: "M", date: 3 }, { d: "T", date: 4 }, { d: "W", date: 5 }, { d: "T", date: 6 }, { d: "F", date: 7 }, { d: "S", date: 8 }, { d: "S", date: 9 }] },
];

export const TRAINER_PROFILE = {
  name: "Marcus K.",
  role: "Strength & Conditioning Coach",
  memberSince: "Mar 2023",
  bio: "Certified strength coach specializing in hypertrophy and powerlifting programming. 8 years coaching experience.",
  certifications: ["NASM-CPT", "CSCS", "Precision Nutrition L1"],
  rating: 4.9,
  reviewCount: 128,
};

export const TRAINER_STATS = {
  activeClients: 12,
  sessionsThisWeek: 18,
  hoursThisWeek: 15.5,
  earningsThisWeek: 940,
  weeklySessions: [
    { day: "M", count: 4 },
    { day: "T", count: 3 },
    { day: "W", count: 2 },
    { day: "T", count: 4 },
    { day: "F", count: 3 },
    { day: "S", count: 2 },
    { day: "S", count: 0 },
  ],
};

export const TRAINER_REVIEWS = [
  { id: "r1", member: "Ayesha Malik", rating: 5, comment: "Marcus pushed me way past what I thought I could do. Squat PR every month!", when: "3 days ago" },
  { id: "r2", member: "Wei Chen", rating: 5, comment: "Best coach I've worked with. Explains the why behind every exercise.", when: "1 week ago" },
  { id: "r3", member: "Daniel Osei", rating: 4, comment: "Great programming, sessions run a little long sometimes.", when: "2 weeks ago" },
];
