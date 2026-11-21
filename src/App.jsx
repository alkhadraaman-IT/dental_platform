import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// الاستيرادات
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './pages/About';
import Features from './components/Features';
import Steps from './components/Steps';
import Specialties from './components/Specialties';
import FAQ from './components/FAQ';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import MyBookings from './pages/MyBookings';
import StudentDashboard from './pages/StudentDashboard';
import CaseDetails from './pages/CaseDetails';
import PatientCaseView from './pages/PatientCaseView';
import CaseManagement from './pages/CaseManagement';
import InstructorReview from './pages/InstructorReview';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UniversityProfile from './pages/UniversityProfile';
import ManageSchedule from './pages/ManageSchedule';
import AddAvailability from './pages/AddAvailability';
import EditProfile from './pages/EditProfile';
import UniversityAdminDashboard from './pages/UniversityAdminDashboard';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('patient'); // 'patient' أو 'student'

  const handleLogout = () => {
    setIsLoggedIn(false);
    // نستخدم التوجيه البرمجي بدلاً من إعادة تحميل الصفحة كاملة
    window.location.href = "/"; 
  };

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col" dir="rtl">
        {/* نمرر الحالة للـ Navbar ليغير أزراره */}
        <Navbar isLoggedIn={isLoggedIn} />
        
        <main className="flex-grow">
          <Routes>
            {/* الصفحة الرئيسية تجمع كل المكونات */}
            <Route path="/" element={
              <>
                <Hero />
                <Partners />
                <About />
                <Features />
                <Steps />
                <Specialties />
                <FAQ />
              </>
            } />

            {/* صفحة الملف الشخصي */}
            <Route path="/profile" element={
              <Profile role="pa" onLogout={handleLogout} />
            } />

            {/* صفحة تسجيل الدخول - نمرر لها دالة التغيير */}
            <Route path="/login" element={
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            } />

            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking-details" element={<BookingDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/case-details/:id" element={<CaseDetails />} />
            <Route path="/patient-case-view/:id" element={<PatientCaseView />} />
            <Route path="/case-management/:id" element={<CaseManagement />} />
            <Route path="/instructor-review/:id" element={<InstructorReview />} />
            <Route path="/instructor-dashboard/:id" element={<InstructorDashboard />} />
            <Route path="/university-profile/:id" element={<UniversityProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-schedule" element={<ManageSchedule />} />
            <Route path="/add-availability" element={<AddAvailability />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/university-admin-dashboard" element={<UniversityAdminDashboard />} />
            <Route path="/edit-profile" element={<EditProfile role="pa" />} />
          </Routes>
        </main>

        <Footer isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}

export default App;