let uid = 1000;
const nextId = () => `id-${uid++}`;

export const PLAN_OPTIONS = ["Basic Monthly", "Unlimited Monthly", "Unlimited Annual"];
export const CATEGORIES = ["All", "Strength", "Cardio", "Mind & Body"];
export const SCAN_POOL = ["Sara Ahmed", "Priya N.", "Wei Chen", "Fatima Noor", "Daniel Osei", "Elena R."];

export const initialState = {
  membership: { plan: "Unlimited Monthly", autoRenew: true, frozen: false, daysUsed: 18, daysTotal: 30, renewDate: "Aug 14" },
  classes: [
    { id: 1, name: "Sunrise Strength", time: "6:30 AM", duration: "45 min", instructor: "Marcus K.", category: "Strength", cap: 12, filled: 9, waitlistCount: 0 },
    { id: 2, name: "Power Zumba", time: "8:00 AM", duration: "50 min", instructor: "Elena R.", category: "Cardio", cap: 20, filled: 20, waitlistCount: 3 },
    { id: 3, name: "Slow Flow Yoga", time: "12:15 PM", duration: "60 min", instructor: "Priya N.", category: "Mind & Body", cap: 15, filled: 6, waitlistCount: 0 },
    { id: 4, name: "HIIT Circuit", time: "5:30 PM", duration: "40 min", instructor: "Marcus K.", category: "Strength", cap: 14, filled: 14, waitlistCount: 1 },
    { id: 5, name: "Evening Pilates", time: "7:00 PM", duration: "50 min", instructor: "Priya N.", category: "Mind & Body", cap: 15, filled: 4, waitlistCount: 0 },
  ],
  bookedClassIds: {},
  waitlistedClassIds: {},
  services: [
    { id: 1, name: "Personal Training", icon: "Dumbbell", blurb: "1:1 strength & conditioning",
      trainers: [{ name: "Marcus K.", slots: ["9:00 AM", "4:00 PM"] }, { name: "Jonah T.", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] }] },
    { id: 2, name: "Nutrition Consult", icon: "Utensils", blurb: "Personalized meal planning",
      trainers: [{ name: "Priya N.", slots: ["11:00 AM", "2:00 PM"] }] },
    { id: 3, name: "Recovery & Massage", icon: "Sparkles", blurb: "Deep tissue & mobility work",
      trainers: [{ name: "Elena R.", slots: ["2:00 PM", "4:00 PM"] }] },
  ],
  bookings: [
    { id: nextId(), type: "class", classId: null, title: "HIIT Circuit", when: "Mon, Jul 21", status: "completed" },
    { id: nextId(), type: "service", title: "Personal Training – Marcus K.", when: "Fri, Jul 18", status: "completed" },
    { id: nextId(), type: "class", classId: null, title: "Slow Flow Yoga", when: "Wed, Jul 16", status: "completed" },
  ],
  checkins: [
    { id: nextId(), member: "Sara Ahmed", context: "Sunrise Strength", when: "Today, 6:28 AM" },
    { id: nextId(), member: "Ayesha Malik", context: "Sunrise Strength", when: "Today, 8:42 AM" },
    { id: nextId(), member: "Sara Ahmed", context: "Gym floor", when: "Yesterday, 6:41 PM" },
    { id: nextId(), member: "Jonah T.", context: "Sunrise Strength", when: "Today, 8:40 AM" },
  ],
  schedule: [
    { id: nextId(), time: "6:30 AM", title: "Sunrise Strength", sub: "Class · 9/12 booked" },
    { id: nextId(), time: "8:00 AM", title: "Power Zumba", sub: "Class · Full" },
    { id: nextId(), time: "11:00 AM", title: "1:1 – Ayesha Malik", sub: "Personal Training" },
    { id: nextId(), time: "5:30 PM", title: "HIIT Circuit", sub: "Class · Full" },
  ],
  metrics: { weights: [72.4, 72.1, 71.8, 71.9, 71.5, 71.2, 70.9], height: 1.68 },
  workoutPlan: [
    { exercise: "Back Squat", sets: "4 × 6", load: "70 kg" },
    { exercise: "Romanian Deadlift", sets: "3 × 8", load: "60 kg" },
    { exercise: "Plank", sets: "3 × 45s", load: "—" },
  ],
  dietPlan: [
    { meal: "Breakfast", item: "Oats, banana, whey" },
    { meal: "Lunch", item: "Grilled chicken, rice, greens" },
    { meal: "Dinner", item: "Salmon, sweet potato, broccoli" },
  ],
  clients: [
    { id: 1, name: "Ayesha Malik", last: "Yesterday", note: "Progressing well on squat form – increase load next week.", planAssigned: false, workout: [], diet: [] },
    { id: 2, name: "Daniel Osei", last: "3 days ago", note: "Reported knee soreness, modified lunges.", planAssigned: false, workout: [], diet: [] },
    { id: 3, name: "Wei Chen", last: "Today", note: "New deadlift PR: 120 kg.", planAssigned: true,
      workout: [{ exercise: "Deadlift", sets: "5 × 3", load: "120 kg" }, { exercise: "Front Squat", sets: "4 × 6", load: "80 kg" }],
      diet: [{ meal: "Breakfast", item: "+20g protein (add whey or eggs)" }] },
    { id: 4, name: "Fatima Noor", last: "1 week ago", note: "Missed last 2 sessions – follow up.", planAssigned: false, workout: [], diet: [] },
  ],
  toast: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "BOOK_CLASS": {
      const cls = state.classes.find((c) => c.id === action.id);
      if (!cls || cls.filled >= cls.cap) return state;
      return {
        ...state,
        classes: state.classes.map((c) => (c.id === action.id ? { ...c, filled: c.filled + 1 } : c)),
        bookedClassIds: { ...state.bookedClassIds, [action.id]: true },
        bookings: [{ id: nextId(), type: "class", classId: action.id, title: cls.name, when: `${cls.time} · Today`, status: "upcoming" }, ...state.bookings],
        toast: `Booked ${cls.name}`,
      };
    }
    case "CANCEL_CLASS": {
      const cls = state.classes.find((c) => c.id === action.id);
      if (!cls) return state;
      const backfill = cls.waitlistCount > 0;
      const bookedClassIds = { ...state.bookedClassIds };
      delete bookedClassIds[action.id];
      return {
        ...state,
        classes: state.classes.map((c) => c.id === action.id
          ? { ...c, filled: backfill ? c.filled : Math.max(0, c.filled - 1), waitlistCount: backfill ? c.waitlistCount - 1 : c.waitlistCount }
          : c),
        bookedClassIds,
        bookings: state.bookings.map((b) => (b.type === "class" && b.classId === action.id && b.status === "upcoming") ? { ...b, status: "cancelled" } : b),
        toast: backfill ? `Cancelled – spot filled from waitlist` : `Cancelled ${cls.name}`,
      };
    }
    case "JOIN_WAITLIST": {
      const cls = state.classes.find((c) => c.id === action.id);
      return {
        ...state,
        classes: state.classes.map((c) => (c.id === action.id ? { ...c, waitlistCount: c.waitlistCount + 1 } : c)),
        waitlistedClassIds: { ...state.waitlistedClassIds, [action.id]: true },
        toast: `Added to waitlist for ${cls.name}`,
      };
    }
    case "LEAVE_WAITLIST": {
      const waitlistedClassIds = { ...state.waitlistedClassIds };
      delete waitlistedClassIds[action.id];
      return {
        ...state,
        classes: state.classes.map((c) => (c.id === action.id ? { ...c, waitlistCount: Math.max(0, c.waitlistCount - 1) } : c)),
        waitlistedClassIds,
      };
    }
    case "BOOK_SERVICE": {
      const { serviceId, serviceName, trainerName, slot } = action;
      return {
        ...state,
        services: state.services.map((s) => s.id === serviceId
          ? { ...s, trainers: s.trainers.map((t) => t.name === trainerName ? { ...t, slots: t.slots.filter((sl) => sl !== slot) } : t) }
          : s),
        bookings: [{ id: nextId(), type: "service", title: `${serviceName} – ${trainerName}`, when: slot, status: "upcoming" }, ...state.bookings],
        schedule: [{ id: nextId(), time: slot, title: "1:1 – Sara Ahmed", sub: serviceName }, ...state.schedule],
        toast: `Booked ${serviceName} with ${trainerName}`,
      };
    }
    case "CANCEL_BOOKING": {
      const booking = state.bookings.find((b) => b.id === action.id);
      if (!booking || booking.status !== "upcoming") return state;
      if (booking.type === "class") return reducer(state, { type: "CANCEL_CLASS", id: booking.classId });
      return {
        ...state,
        bookings: state.bookings.map((b) => (b.id === action.id ? { ...b, status: "cancelled" } : b)),
        schedule: state.schedule.filter((s) => !(s.time === booking.when && s.title === "1:1 – Sara Ahmed")),
        toast: "Booking cancelled",
      };
    }
    case "TOGGLE_AUTORENEW":
      return { ...state, membership: { ...state.membership, autoRenew: !state.membership.autoRenew } };
    case "TOGGLE_FREEZE":
      return { ...state, membership: { ...state.membership, frozen: !state.membership.frozen }, toast: state.membership.frozen ? "Membership resumed" : "Membership frozen" };
    case "CHANGE_PLAN":
      return { ...state, membership: { ...state.membership, plan: action.plan }, toast: `Switched to ${action.plan}` };
    case "CHECK_IN":
      return { ...state, checkins: [{ id: nextId(), member: action.member, context: action.context, when: "Just now" }, ...state.checkins] };
    case "ADD_WEIGHT":
      return { ...state, metrics: { ...state.metrics, weights: [...state.metrics.weights, action.value].slice(-8) } };
    case "ASSIGN_PLAN":
      return { ...state, clients: state.clients.map((cl) => cl.id === action.clientId ? { ...cl, planAssigned: true, workout: action.workout, diet: action.diet } : cl) };
    case "UPDATE_NOTE":
      return { ...state, clients: state.clients.map((cl) => cl.id === action.clientId ? { ...cl, note: action.note } : cl) };
    case "CLEAR_TOAST":
      return { ...state, toast: null };
    default:
      return state;
  }
}
