import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const SAMPLE_TEAMS = [
  { id: 't1', name: 'Royal Strikers', shortName: 'RS', color: '#FF6B35', players: ['Arjun Sharma','Rohit Verma','Karan Singh','Dev Patel','Amit Kumar'] },
  { id: 't2', name: 'Thunder Kings', shortName: 'TK', color: '#4ECDC4', players: ['Rahul Mehta','Akash Joshi','Nitin Reddy','Harsh Agarwal','Deepak Mishra'] },
  { id: 't3', name: 'Galaxy Warriors', shortName: 'GW', color: '#A855F7', players: ['Sumit Pandey','Ritesh Dubey','Kapil Sharma','Ashok Tiwari','Naveen Choudhary'] },
  { id: 't4', name: 'City Lions', shortName: 'CL', color: '#F59E0B', players: ['Abhishek Roy','Tarun Bose','Nilesh Patil','Sameer Khan','Vikram Negi'] },
];

const SAMPLE_MATCHES = [
  { id: 'm1', team1: 'Royal Strikers', team2: 'Thunder Kings', winner: 'Royal Strikers', date: '2025-06-10', overs: 10, score1: '142/4', score2: '138/7', topPerformer: 'Arjun Sharma (67*)' },
  { id: 'm2', team1: 'Galaxy Warriors', team2: 'City Lions', winner: 'City Lions', date: '2025-06-08', overs: 10, score1: '98/9', score2: '99/3', topPerformer: 'Abhishek Roy (52)' },
];

const load = async (key, fallback) => {
  try {
    const v = await AsyncStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
};

const save = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

const getTheme = (dark) => ({
  bg: dark ? '#0A0E1A' : '#F0F4FF',
  card: dark ? '#111827' : '#FFFFFF',
  text: dark ? '#F1F5F9' : '#0F172A',
  text2: dark ? '#94A3B8' : '#64748B',
  accent: '#FF6B35',
  accent2: '#4ECDC4',
  green: '#22C55E',
  navBg: dark ? '#080C17' : '#1A1F3A',
  border: dark ? '#1E2D4A' : '#D1D9F0',
});

export default function TurfScore() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';
  const T = getTheme(dark);
  
  const [tab, setTab] = useState('home');
  const [teams, setTeams] = useState(SAMPLE_TEAMS);
  const [matches, setMatches] = useState(SAMPLE_MATCHES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const storedTeams = await load('ts_teams', SAMPLE_TEAMS);
      const storedMatches = await load('ts_matches', SAMPLE_MATCHES);
      setTeams(storedTeams);
      setMatches(storedMatches);
      setLoading(false);
    };
    initData();
  }, []);

  useEffect(() => {
    save('ts_teams', teams);
  }, [teams]);

  useEffect(() => {
    save('ts_matches', matches);
  }, [matches]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: T.text2 }}>Loading TurfScore...</Text>
      </View>
    );
  }

  const renderHome = () => (
    <ScrollView style={{ flex: 1, backgroundColor: T.bg, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: T.text, marginBottom: 16 }}>TurfScore</Text>
      <View style={{ backgroundColor: T.card, borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: T.text }}>{teams.length}</Text>
            <Text style={{ color: T.text2, fontSize: 12, marginTop: 4 }}>Teams</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: T.text }}>{matches.length}</Text>
            <Text style={{ color: T.text2, fontSize: 12, marginTop: 4 }}>Matches</Text>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '800', color: T.text, marginBottom: 12 }}>Recent Matches</Text>
      {matches.map((m) => (
        <View key={m.id} style={{ backgroundColor: T.card, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ color: T.text2, fontSize: 11, marginBottom: 8 }}>{m.date}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.text, fontWeight: '700' }}>{m.team1}</Text>
              <Text style={{ color: T.accent, fontWeight: '800', fontSize: 16 }}>{m.score1}</Text>
            </View>
            <Text style={{ color: T.text2, paddingHorizontal: 12 }}>VS</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ color: T.text, fontWeight: '700' }}>{m.team2}</Text>
              <Text style={{ color: T.accent2, fontWeight: '800', fontSize: 16 }}>{m.score2}</Text>
            </View>
          </View>
          {m.winner && <Text style={{ color: T.green, marginTop: 8, fontSize: 11, fontWeight: '600' }}>Winner: {m.winner}</Text>}
        </View>
      ))}
    </ScrollView>
  );

  const renderTeams = () => (
    <ScrollView style={{ flex: 1, backgroundColor: T.bg, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: T.text, marginBottom: 16 }}>My Teams</Text>
      {teams.map((team) => (
        <View key={team.id} style={{ backgroundColor: T.card, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ color: T.text, fontWeight: '700', fontSize: 16 }}>{team.name}</Text>
          <Text style={{ color: T.text2, fontSize: 12, marginTop: 4 }}>{team.players.length} players</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderHistory = () => (
    <ScrollView style={{ flex: 1, backgroundColor: T.bg, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: T.text, marginBottom: 16 }}>Match History</Text>
      {matches.map((m) => (
        <View key={m.id} style={{ backgroundColor: T.card, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ color: T.text2, fontSize: 11, marginBottom: 8 }}>{m.date}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.text }}>{m.team1}</Text>
              <Text style={{ color: T.accent, fontWeight: '800' }}>{m.score1}</Text>
            </View>
            <Text style={{ color: T.text2 }}>VS</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ color: T.text }}>{m.team2}</Text>
              <Text style={{ color: T.accent2, fontWeight: '800' }}>{m.score2}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={{ backgroundColor: T.navBg, paddingTop: 12, paddingBottom: 8, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>TurfScore</Text>
      </View>
      {tab === 'home' && renderHome()}
      {tab === 'teams' && renderTeams()}
      {tab === 'history' && renderHistory()}
      <View style={{ flexDirection: 'row', backgroundColor: T.navBg, borderTopWidth: 1, borderTopColor: T.border }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 12, opacity: tab === 'home' ? 1 : 0.5 }} onPress={() => setTab('home')}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={{ color: T.text2, fontSize: 10 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 12, opacity: tab === 'teams' ? 1 : 0.5 }} onPress={() => setTab('teams')}>
          <Text style={{ fontSize: 20 }}>👥</Text>
          <Text style={{ color: T.text2, fontSize: 10 }}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 12, opacity: tab === 'history' ? 1 : 0.5 }} onPress={() => setTab('history')}>
          <Text style={{ fontSize: 20 }}>📋</Text>
          <Text style={{ color: T.text2, fontSize: 10 }}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}