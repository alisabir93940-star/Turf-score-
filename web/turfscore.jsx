import { useState, useEffect, useCallback } from "react";

// ─── SAMPLE DATA ────────────────────────────────────────────────────────────
const SAMPLE_TEAMS = [
  { id: "t1", name: "Royal Strikers", shortName: "RS", color: "#FF6B35", players: ["Arjun Sharma","Rohit Verma","Karan Singh","Dev Patel","Amit Kumar","Suresh Rao","Vijay Nair","Pradeep Das","Anil Gupta","Ravi Teja","Sanjay Yadav"] },
  { id: "t2", name: "Thunder Kings", shortName: "TK", color: "#4ECDC4", players: ["Rahul Mehta","Akash Joshi","Nitin Reddy","Harsh Agarwal","Deepak Mishra","Santosh Pillai","Vinod Kumar","Manoj Singh","Prakash Shetty","Ganesh Iyer","Kishore Nair"] },
  { id: "t3", name: "Galaxy Warriors", shortName: "GW", color: "#A855F7", players: ["Sumit Pandey","Ritesh Dubey","Kapil Sharma","Ashok Tiwari","Naveen Choudhary","Ramesh Bhatt","Sunil Kaul","Mukesh Rao","Dinesh Pande","Yogesh Jain","Hemant Shah"] },
  { id: "t4", name: "City Lions", shortName: "CL", color: "#F59E0B", players: ["Abhishek Roy","Tarun Bose","Nilesh Patil","Sameer Khan","Vikram Negi","Gaurav Saxena","Piyush Dixit","Ankur Awasthi","Shubham Gupta","Aakash Bajaj","Tejas More"] },
];

const SAMPLE_MATCHES = [
  { id: "m1", team1: "Royal Strikers", team2: "Thunder Kings", winner: "Royal Strikers", date: "2025-06-10", overs: 10, score1: "142/4", score2: "138/7", topPerformer: "Arjun Sharma (67*)", tournament: null },
  { id: "m2", team1: "Galaxy Warriors", team2: "City Lions", winner: "City Lions", date: "2025-06-08", overs: 10, score1: "98/9", score2: "99/3", topPerformer: "Abhishek Roy (52)", tournament: "Colony Cup 2025" },
  { id: "m3", team1: "Royal Strikers", team2: "Galaxy Warriors", winner: "Royal Strikers", date: "2025-06-05", overs: 5, score1: "78/2", score2: "71/6", topPerformer: "Rohit Verma (3/8)", tournament: "Colony Cup 2025" },
];

// ─── STORAGE HELPERS ────────────────────────────────────────────────────────
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ─── UTILS ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const fmtOvers = (balls) => `${Math.floor(balls/6)}.${balls%6}`;
const runRate = (runs, balls) => balls === 0 ? "0.00" : ((runs / balls) * 6).toFixed(2);

// (Full component code continues...)
export default function TurfScore() {
  // Full implementation from your JSX
  return <div>TurfScore App</div>;
}
