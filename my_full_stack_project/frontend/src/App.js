import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTrainer from './components/AddTrainer';
import AssignUser from './components/AssignUser';
import ClientWorkoutPlan from './components/ClientWorkoutPlan';
import ClientAdd from './components/ClientAdd';
import ClientFeedback from './components/ClientFeedback';
import ClientOverview from './components/ClientOverview';
import ClientProfile from './components/ClientProfile';
import ClientRating from './components/ClientRating';
import Feedback from './components/Feedback';
import Home from './components/Home';
import RatingComplete from './components/RatingComplete';
import SelectPage from './components/SelectPage';
import SigninPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import TrainerLogInPage from './components/TrainerLogInPage';
import TrainerManagementPage from './components/TrainerManagementPage';
import TrainerProfilePage from './components/TrainerProfilePage';
import WorkoutPlans from './components/WorkoutPlans';
import ClientList from './components/ClientList';

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-trainer" element={<AddTrainer />} />
        <Route path="/assign-user" element={<AssignUser />} />
        <Route path="/client-workoutplan" element={<ClientWorkoutPlan />} />
        <Route path="/client-add" element={<ClientAdd />} />
        <Route path="/client-feedback" element={<ClientFeedback />} />
        <Route path="/client-overview" element={<ClientOverview />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/client-rating" element={<ClientRating />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/rating-complete" element={<RatingComplete />} />
        <Route path="/select-page" element={<SelectPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/trainer-login" element={<TrainerLogInPage />} />
        <Route path="/trainer-management" element={<TrainerManagementPage />} />
        <Route path="/trainer-profile" element={<TrainerProfilePage />} />
        <Route path="/workout-plans" element={<WorkoutPlans />} />
        <Route path="/client-list" element={<ClientList />} />
      </Routes>
    </div>
  </Router>
);

export default App;