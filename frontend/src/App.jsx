import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage'));
const GroupDetailPage = lazy(() => import('./pages/GroupDetailPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const SafetyPage = lazy(() => import('./pages/SafetyPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AIChatPage = lazy(() => import('./pages/AIChatPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const MentorshipPage = lazy(() => import('./pages/MentorshipPage'));
const BusinessDashboard = lazy(() => import('./pages/BusinessDashboard'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/auth" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/groups" element={<PrivateRoute><GroupsPage /></PrivateRoute>} />
            <Route path="/groups/:id" element={<PrivateRoute><GroupDetailPage /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventsPage /></PrivateRoute>} />
            <Route path="/marketplace" element={<PrivateRoute><MarketplacePage /></PrivateRoute>} />
            <Route path="/safety" element={<PrivateRoute><SafetyPage /></PrivateRoute>} />
            <Route path="/support" element={<PrivateRoute><SupportPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/ai-assistant" element={<PrivateRoute><AIChatPage /></PrivateRoute>} />
            <Route path="/mentorship" element={<PrivateRoute><MentorshipPage /></PrivateRoute>} />
            <Route path="/business" element={<PrivateRoute><BusinessDashboard /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminPanel /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ style: { background: '#7c3aed', color: '#fff' } }} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
