import { Routes, Route, Navigate } from 'react-router-dom';

// ─── Layouts ───
import PublicLayout from '../layouts/PublicLayout';
import TouristLayout from '../layouts/TouristLayout';
import AdminLayout from '../layouts/AdminLayout';

// ─── Protected Route Wrapper ───
import ProtectedRoute from '../components/ProtectedRoute';

// ─── Public Pages ───
import HomePage from '../pages/feature1/HomePage';
import AboutPage from '../pages/feature1/AboutPage';
import LoginPage from '../pages/feature1/LoginPage';
import RegisterPage from '../pages/feature1/RegisterPage';
import VerifyEmailPage from '../pages/feature1/VerifyEmailPage';
import ForgotPasswordPage from '../pages/feature1/ForgotPasswordPage';
import NotFoundPage from '../pages/feature1/NotFoundPage';

// ─── Tourist Pages ───
import DashboardPage from '../pages/feature2/DashboardPage';
import DestinationsPage from '../pages/feature3/DestinationsPage';
import SearchPage from '../pages/feature2/SearchPage';
import CategoriesPage from '../pages/feature2/CategoriesPage';
import DestinationDetailPage from '../pages/feature3/DestinationDetailPage';
import ActivitiesPage from '../pages/feature3/ActivitiesPage';
import EnvironmentalDataPage from '../pages/feature5/EnvironmentalDataPage';
import ChatHistoryPage from '../pages/feature2/ChatHistoryPage';
import RecommendationsPage from '../pages/feature2/RecommendationsPage';
import FavouritesPage from '../pages/feature2/FavouritesPage';
import ReviewsPage from '../pages/feature2/ReviewsPage';
import CampaignsPage from '../pages/feature4/CampaignsPage';
import CampaignDetailPage from '../pages/feature4/CampaignDetailPage';
import GuidesPage from '../pages/feature3/GuidesPage';
import ProfilePage from '../pages/feature2/ProfilePage';
import NotificationsPage from '../pages/feature2/NotificationsPage';
import StaysPage from '../pages/feature4/StaysPage';
import StayDetailPage from '../pages/feature4/StayDetailPage';

// ─── Admin Pages ───
import AdminLoginPage from '../pages/feature1/AdminLoginPage';
import AdminDashboardPage from '../pages/feature5/AdminDashboardPage';
import ManageDestinationsPage from '../pages/feature3/ManageDestinationsPage';
import AddDestinationPage from '../pages/feature3/AddDestinationPage';
import ManageCategoriesPage from '../pages/feature3/ManageCategoriesPage';
import ManageGuidesPage from '../pages/feature3/ManageGuidesPage';
import ManageUsersPage from '../pages/feature5/ManageUsersPage';
import ManageCampaignsPage from '../pages/feature4/ManageCampaignsPage';
import ModerationPage from '../pages/feature5/ModerationPage';
import AnalyticsPage from '../pages/feature5/AnalyticsPage';
import ExportPage from '../pages/feature5/ExportPage';
import ManageStaysPage from '../pages/feature4/ManageStaysPage';

// ─── Manager Pages ───
import ManagerDashboardPage from '../pages/feature5/ManagerDashboardPage';
import HealthPage from '../pages/feature5/HealthPage';
import IntegrationsPage from '../pages/feature5/IntegrationsPage';
import SettingsPage from '../pages/feature5/SettingsPage';
import ManagerAnalyticsPage from '../pages/feature5/ManagerAnalyticsPage';

// ─── Support Pages ───
import HelpPage from '../pages/feature1/HelpPage';
import SupportPage from '../pages/feature1/SupportPage';

/**
 * AppRoutes — Central route configuration for EcoLanka.
 *
 * Route hierarchy:
 * 1. Public routes (PublicLayout) — accessible to everyone
 * 2. Tourist routes (TouristLayout + ProtectedRoute) — requires 'tourist' role
 * 3. Admin routes (AdminLayout + ProtectedRoute) — requires 'admin' role
 * 4. Manager routes (AdminLayout + ProtectedRoute) — requires 'manager' role
 * 5. Support routes (PublicLayout) — accessible to everyone
 * 6. Catch-all → 404
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ═══════════════════════════════════════════════════
          🌐 PUBLIC ROUTES — No authentication required
          ═══════════════════════════════════════════════════ */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        {/* Support pages share the public layout */}
        <Route path="help" element={<HelpPage />} />
        <Route path="support" element={<SupportPage />} />

        {/* 404 — explicit path and catch-all */}
        <Route path="error/404" element={<NotFoundPage />} />
      </Route>

      {/* ═══════════════════════════════════════════════════
          🧳 TOURIST ROUTES — Requires 'tourist' authentication
          ═══════════════════════════════════════════════════ */}
      <Route
        element={
          <ProtectedRoute requiredRole="tourist">
            <TouristLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="destinations/:id" element={<DestinationDetailPage />} />
        <Route path="destinations/:id/activities" element={<ActivitiesPage />} />
        <Route path="environmental-data" element={<EnvironmentalDataPage />} />
        <Route path="chat-history" element={<ChatHistoryPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="campaigns/:id" element={<CampaignDetailPage />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="stays" element={<StaysPage />} />
        <Route path="stays/:id" element={<StayDetailPage />} />
      </Route>

      {/* ═══════════════════════════════════════════════════
          🛠️ ADMIN ROUTES — Requires 'admin' authentication
          ═══════════════════════════════════════════════════ */}
      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="admin/profile" element={<ProfilePage />} />
        <Route path="admin/manage-destinations" element={<ManageDestinationsPage />} />
        <Route path="admin/manage-destinations/add" element={<AddDestinationPage />} />
        <Route path="admin/manage-categories" element={<ManageCategoriesPage />} />
        <Route path="admin/manage-guides" element={<ManageGuidesPage />} />
        <Route path="admin/manage-users" element={<ManageUsersPage />} />
        <Route path="admin/manage-campaigns" element={<ManageCampaignsPage />} />
        <Route path="admin/moderation" element={<ModerationPage />} />
        <Route path="admin/analytics" element={<AnalyticsPage />} />
        <Route path="admin/export" element={<ExportPage />} />
        <Route path="admin/manage-stays" element={<ManageStaysPage />} />
      </Route>

      {/* ═══════════════════════════════════════════════════
          ⚙️ MANAGER ROUTES — Requires 'manager' authentication
          ═══════════════════════════════════════════════════ */}
      <Route
        element={
          <ProtectedRoute requiredRole="manager">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="manager" element={<Navigate to="/manager/dashboard" replace />} />
        <Route path="manager/dashboard" element={<ManagerDashboardPage />} />
        <Route path="manager/profile" element={<ProfilePage />} />
        <Route path="manager/health" element={<HealthPage />} />
        <Route path="manager/integrations" element={<IntegrationsPage />} />
        <Route path="manager/settings" element={<SettingsPage />} />
        <Route path="manager/analytics" element={<ManagerAnalyticsPage />} />
      </Route>

      {/* ═══════════════════════════════════════════════════
          🚫 CATCH-ALL — 404 Not Found
          ═══════════════════════════════════════════════════ */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
