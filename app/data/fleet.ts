export type VehicleStatus = "Available" | "In use" | "Maintenance" | "Unavailable" | "Overdue";

export type ActiveTrip = {
  id: string;
  vehicle: string;
  shortName: string;
  plate: string;
  type: string;
  color: string;
  employee: string;
  initials: string;
  department: string;
  driver: string;
  timeOut: string;
  elapsed: string;
  purpose: string;
  destination: string;
  expected: string;
  status: "In use" | "Overdue";
};

export const activeTrips: ActiveTrip[] = [
  {
    id: "TRP-2026-0841",
    vehicle: "Toyota Hilux",
    shortName: "HILUX",
    plate: "NCR 1834",
    type: "Pickup",
    color: "slate",
    employee: "Juan Dela Cruz",
    initials: "JD",
    department: "Engineering Division",
    driver: "Ramon Villanueva",
    timeOut: "8:41 AM",
    elapsed: "2h 18m",
    purpose: "Pipeline project inspection",
    destination: "Brgy. San Fermin",
    expected: "1:00 PM",
    status: "In use",
  },
  {
    id: "TRP-2026-0839",
    vehicle: "Mitsubishi L300",
    shortName: "L300",
    plate: "NGS 5678",
    type: "Utility van",
    color: "blue",
    employee: "Maria Santos",
    initials: "MS",
    department: "Administrative Division",
    driver: "Maria Santos",
    timeOut: "7:52 AM",
    elapsed: "3h 07m",
    purpose: "Document delivery",
    destination: "Regional Office IV-A",
    expected: "10:30 AM",
    status: "Overdue",
  },
  {
    id: "TRP-2026-0838",
    vehicle: "Toyota Innova",
    shortName: "INNOVA",
    plate: "NBI 4421",
    type: "MPV",
    color: "sand",
    employee: "Paolo Reyes",
    initials: "PR",
    department: "Commercial Division",
    driver: "Edwin Cruz",
    timeOut: "9:16 AM",
    elapsed: "1h 43m",
    purpose: "Stakeholder meeting",
    destination: "Makati Central Office",
    expected: "2:30 PM",
    status: "In use",
  },
  {
    id: "TRP-2026-0836",
    vehicle: "Isuzu D-Max",
    shortName: "D-MAX",
    plate: "NAQ 7260",
    type: "Pickup",
    color: "green",
    employee: "Liza Mendoza",
    initials: "LM",
    department: "Finance Division",
    driver: "Liza Mendoza",
    timeOut: "10:05 AM",
    elapsed: "0h 54m",
    purpose: "Bank transaction",
    destination: "Landbank — Main Branch",
    expected: "12:00 PM",
    status: "In use",
  },
];

export const vehicles = [
  { name: "Toyota Hilux", plate: "NCR 1834", type: "Pickup", status: "In use" as VehicleStatus, odometer: "48,621 km", dept: "Engineering", color: "slate" },
  { name: "Mitsubishi L300", plate: "NGS 5678", type: "Utility van", status: "Overdue" as VehicleStatus, odometer: "72,884 km", dept: "Administrative", color: "blue" },
  { name: "Toyota Innova", plate: "NBI 4421", type: "MPV", status: "In use" as VehicleStatus, odometer: "31,208 km", dept: "Commercial", color: "sand" },
  { name: "Isuzu D-Max", plate: "NAQ 7260", type: "Pickup", status: "In use" as VehicleStatus, odometer: "26,914 km", dept: "Finance", color: "green" },
  { name: "Nissan Navara", plate: "NDR 9031", type: "Pickup", status: "Available" as VehicleStatus, odometer: "18,440 km", dept: "Engineering", color: "black" },
  { name: "Ford Everest", plate: "NEX 1187", type: "SUV", status: "Maintenance" as VehicleStatus, odometer: "55,017 km", dept: "General Manager", color: "rust" },
];

export const ledger = [
  { id: "TRP-2026-0841", date: "Aug 17, 2026", employee: "Juan Dela Cruz", department: "Engineering", out: "8:41 AM", in: "—", purpose: "Project inspection", destination: "Brgy. San Fermin", start: "48,621", end: "—", distance: "—", status: "Active" },
  { id: "TRP-2026-0794", date: "Aug 12, 2026", employee: "Arnold Bautista", department: "Engineering", out: "7:34 AM", in: "4:18 PM", purpose: "Materials inspection", destination: "Calamba Depot", start: "48,432", end: "48,621", distance: "189 km", status: "Completed" },
  { id: "TRP-2026-0731", date: "Aug 05, 2026", employee: "Juan Dela Cruz", department: "Engineering", out: "8:05 AM", in: "2:46 PM", purpose: "Site validation", destination: "Silang, Cavite", start: "48,248", end: "48,432", distance: "184 km", status: "Completed" },
  { id: "TRP-2026-0688", date: "Jul 29, 2026", employee: "Carlo Manansala", department: "Commercial", out: "9:12 AM", in: "5:03 PM", purpose: "Client coordination", destination: "Batangas City", start: "48,013", end: "48,248", distance: "235 km", status: "Completed" },
];
