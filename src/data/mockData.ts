export interface SportInfo {
  id: string;
  name: string;
  image: string;
  playersText: string;
  type: string;
  minPlayers: number;
  maxPlayers: number;
  feePerPlayer: number;
  fee: number;
}

export const SPORTS: SportInfo[] = [
  {
    id: "cricket",
    name: "Cricket",
    image: "/images/cricket-card.jpg",
    playersText: "12 to 14 players",
    type: "Team Event",
    minPlayers: 12,
    maxPlayers: 14,
    feePerPlayer: 150,
    fee: 1800, // 12 players * 150
  },
  {
    id: "football",
    name: "Football",
    image: "/images/football-card.jpg",
    playersText: "8 to 10 players",
    type: "Team Event",
    minPlayers: 8,
    maxPlayers: 10,
    feePerPlayer: 150,
    fee: 1200, // 8 players * 150
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "/images/badminton-card.jpg",
    playersText: "Singles (1v1) / Doubles (2v2)",
    type: "Individual / Doubles",
    minPlayers: 1,
    maxPlayers: 2,
    feePerPlayer: 150,
    fee: 200, // 1v1 is 200, 2v2 is 300 total (150/person)
  },
  {
    id: "volleyball",
    name: "Volleyball",
    image: "/images/volleyball-card.jpg",
    playersText: "Exactly 8 players",
    type: "Team Event",
    minPlayers: 8,
    maxPlayers: 8,
    feePerPlayer: 150,
    fee: 1200, // 8 players * 150
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/images/basketball-card.jpg",
    playersText: "8 to 12 players",
    type: "Team Event",
    minPlayers: 8,
    maxPlayers: 12,
    feePerPlayer: 150,
    fee: 1200, // 8 players * 150
  },
];

export interface Player {
  id: string;
  name: string;
  enrollmentNo: string;
  mobileNo: string;
}

export interface Registration {
  id: string;
  sportId: string;
  sportName: string;
  teamName: string;
  captainName: string;
  captainEnrollment: string;
  captainMobile: string;
  players: Player[];
  amount: number;
  utr: string;
  screenshotName?: string;
  screenshotSize?: string;
  screenshotUrl?: string;
  status: "Confirmed" | "Pending" | "Rejected";
  seed?: string;
  createdAt: string;
}

export const INITIAL_REGISTRATIONS: Registration[] = [];

export const ADMIN_STATS = {
  totalTeams: 87,
  totalPlayers: 742,
  pendingPayments: 8,
  totalRevenue: "₹1,31,000",
  registrationsBySport: [
    { sport: "Cricket", count: 18, total: 30, percentage: 60 },
    { sport: "Football", count: 12, total: 20, percentage: 60 },
    { sport: "Basketball", count: 15, total: 20, percentage: 75 },
    { sport: "Volleyball", count: 14, total: 20, percentage: 70 },
    { sport: "Badminton", count: 28, total: 32, percentage: 87 },
  ],
};

export const TOURNAMENT_MATCHES = [
  {
    id: "m1",
    round: "Quarter Finals",
    teamA: "SEST Strikers",
    teamB: "Team D (CS Warriors)",
    time: "10:30 AM",
    date: "16 April 2025",
    ground: "Ground 1 (Main Pitch)",
    status: "Upcoming",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m2",
    round: "Quarter Finals",
    teamA: "The Titans",
    teamB: "Super Eleven",
    time: "01:30 PM",
    date: "16 April 2025",
    ground: "Ground 2",
    status: "Upcoming",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m3",
    round: "Quarter Finals",
    teamA: "Smashers",
    teamB: "Royal Falcons",
    time: "03:30 PM",
    date: "16 April 2025",
    ground: "Ground 1",
    status: "Upcoming",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m4",
    round: "Quarter Finals",
    teamA: "Volley Kings",
    teamB: "Night Riders",
    time: "05:00 PM",
    date: "16 April 2025",
    ground: "Ground 2",
    status: "Upcoming",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m5",
    round: "Semi Finals",
    teamA: "TBD (Match 1 Winner)",
    teamB: "TBD (Match 2 Winner)",
    time: "11:00 AM",
    date: "18 April 2025",
    ground: "Ground 1 (Main Pitch)",
    status: "Scheduled",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m6",
    round: "Semi Finals",
    teamA: "TBD (Match 3 Winner)",
    teamB: "TBD (Match 4 Winner)",
    time: "02:30 PM",
    date: "18 April 2025",
    ground: "Ground 1 (Main Pitch)",
    status: "Scheduled",
    scoreA: null,
    scoreB: null,
  },
  {
    id: "m7",
    round: "Final",
    teamA: "TBD (Semi 1 Winner)",
    teamB: "TBD (Semi 2 Winner)",
    time: "04:00 PM",
    date: "22 April 2025",
    ground: "Central Stadium",
    status: "Scheduled",
    scoreA: null,
    scoreB: null,
  },
];

export const POINTS_TABLE = [
  { rank: 1, team: "SEST Strikers", played: 3, won: 3, lost: 0, points: 6, nrr: "+2.450" },
  { rank: 2, team: "The Titans", played: 3, won: 2, lost: 1, points: 4, nrr: "+1.120" },
  { rank: 3, team: "Smashers", played: 3, won: 2, lost: 1, points: 4, nrr: "+0.850" },
  { rank: 4, team: "Volley Kings", played: 3, won: 1, lost: 2, points: 2, nrr: "-0.410" },
  { rank: 5, team: "Ace Attackers", played: 3, won: 0, lost: 3, points: 0, nrr: "-2.890" },
];
