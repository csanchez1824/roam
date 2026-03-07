import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'
import Landing         from './pages/Landing'
import Explore         from './pages/Explore'
import Profile         from './pages/Profile'
import CreateTrip      from './pages/CreateTrip'
import Auth            from './pages/Auth'
import EditProfile     from './pages/EditProfile'
import Discover        from './pages/Discover'
import UserProfile     from './pages/UserProfile'
import NotFound        from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Landing />}    />
        <Route path="/explore"      element={<Explore />}    />
        <Route path="/user/:id"     element={<UserProfile />} />
        <Route path="/discover"     element={<Discover />}   />
        <Route path="/auth"         element={<Auth />}       />
        <Route path="/profile"      element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/create"       element={
          <ProtectedRoute><CreateTrip /></ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute><EditProfile /></ProtectedRoute>
        } />
        <Route path="*"             element={<NotFound />}   />
      </Routes>
    </BrowserRouter>
  )
}

export default App