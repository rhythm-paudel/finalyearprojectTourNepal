import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { getAllUser, getAccessToken, getReviews } from '../api/authService';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

// Constants
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];
const AGE_GROUPS = {
  '0-18': 0,
  '19-30': 0,
  '31-45': 0,
  '46+': 0
};

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [reviewsByPlace, setReviewsByPlace] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);

  
  const handleTokenRefresh = async (fetchData) => {
    const newToken = await getAccessToken();
    if (newToken?.status === 200) {
      setUser(newToken.data);
      return await fetchData(newToken.data.accessToken);
    }
    return null;
  };

  // Process user ages into groups
  const processAgeGroups = (data) => {
    const date = new Date();
    const groups = { ...AGE_GROUPS };
    data.forEach((u) => {
      if (u.dateOfBirth) {
        const age = date.getFullYear() - new Date(u.dateOfBirth).getFullYear();
        if (age <= 18) groups['0-18']++;
        else if (age <= 30) groups['19-30']++;
        else if (age <= 45) groups['31-45']++;
        else groups['46+']++;
      }
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  };

  // Process reviews into latest list and counts
  const processReviewsData = (resData) => {
    const allReviews = [];
    for (let loc of resData.reviews) {
      for (let r of loc.reviews) {
        allReviews.push({ placeName: loc.name, comment: r.text });
      }
    }
  
 
    const latest = allReviews.slice().reverse().slice(0, 5);
  

    const counts = {};
    for (let r of allReviews) {
      counts[r.placeName] = (counts[r.placeName] || 0) + 1;
    }
  
    const topPlaces = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  
    return { latest, topPlaces };
  };

  // Fetch users
  const fetchUsers = async () => {
    let res = await getAllUser(user.accessToken);
    if (res?.status === 403) res = await handleTokenRefresh(getAllUser);
    if (res?.status === 200) {
      setUsers(res.data);
      setAgeGroups(processAgeGroups(res.data));
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    let res = await getReviews(user.accessToken);
    if (res?.status === 403) res = await handleTokenRefresh(getReviews);
    if (res?.status === 200) {
      const { latest, topPlaces } = processReviewsData(res.data);
      setLatestReviews(latest);
      setReviewsByPlace(topPlaces);
    }
  };

  useEffect(() => {
    fetchUsers(), fetchReviews();
  }, [user]);

  // Cards
  const UserStatsCard = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>Total Users</Typography>
        <Typography variant="h3" color="primary">{users.length}</Typography>
      </CardContent>
    </Card>
  );

  const AgeChartCard = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>Users by Age Group</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={ageGroups} dataKey="value" nameKey="name" outerRadius={80} label={({ name}) => `${name}`}>
              {ageGroups.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={value => [`${value} users`, 'Count']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const TopPlacesCard = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>Top Reviewed Places</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={reviewsByPlace} margin={{ bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-90} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip formatter={value => [`${value} reviews`, 'Count']} />
            <Bar dataKey="count" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const ReviewsCard = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>Latest Reviews</Typography>
        <Box sx={{ height: '30vh', overflowY: 'auto', mt: 2 }}>
          {latestReviews.map((r, i) => (
            <Box key={i} sx={{ mb: 2, borderBottom: i < latestReviews.length-1 ? '1px solid #eee' : 'none', pb: 1 }}>
              <Typography variant="subtitle2" color="primary">{r.placeName}</Typography>
              <Typography variant="body2" color="text.secondary">{r.comment}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 4, width: '100%', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      {/* Top row as flex to equally distribute */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Box sx={{ flex: 1 }}><UserStatsCard /></Box>
        <Box sx={{ flex: 1 }}><AgeChartCard /></Box>
        <Box sx={{ flex: 1 }}><TopPlacesCard /></Box>
      </Box>
      {/* Reviews full width line */}
      <Box>
        <ReviewsCard />
      </Box>
    </Box>
  );
};

export default Home;
