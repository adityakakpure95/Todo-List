import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import UpcomingActivities from './components/UpcomingActivities';
import BookVisitModal from './components/BookVisitModal';

// Define the Activity type
export interface Activity {
  id: string;
  title: string;
  date: string;
  nickName: string;
  type: 'call' | 'email' | 'general';
  completed: boolean;
}

// LocalStorage key for activities
const ACTIVITIES_STORAGE_KEY = 'todolist-activities';

// Default activities data
const defaultActivities: Activity[] = [
  {
    id: '1',
    title: 'Call Katie',
    date: 'Aug 27, 2020',
    nickName: 'Katie',
    type: 'call',
    completed: false
  },
  {
    id: '2',
    title: 'Email Katie',
    date: 'Aug 27, 2020',
    nickName: 'Katie',
    type: 'email',
    completed: false
  },
  {
    id: '3',
    title: 'Call Katie',
    date: 'Aug 27, 2020',
    nickName: 'Katie',
    type: 'call',
    completed: false
  }
];

// Load activities from localStorage
const loadActivitiesFromStorage = (): Activity[] => {
  try {
    const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (storedActivities) {
      const parsedActivities = JSON.parse(storedActivities);
      if (Array.isArray(parsedActivities) && parsedActivities.length > 0) {
        return parsedActivities;
      }
    }
  } catch (error) {
    console.error('Error loading activities from localStorage:', error);
  }
  return defaultActivities;
};

// Save activities to localStorage
const saveActivitiesToStorage = (activities: Activity[]): void => {
  try {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  } catch (error) {
    console.error('Error saving activities to localStorage:', error);
  }
};

function App() {
  // State to manage activities 
  const [activities, setActivities] = useState<Activity[]>(() => loadActivitiesFromStorage());
  
  const [showModal, setShowModal] = useState<boolean>(false);

  // Save activities
  useEffect(() => {
    saveActivitiesToStorage(activities);
  }, [activities]);

  // Add new activity
  const addActivity = (dateOfBirth: string, fullName: string, nickName: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title: fullName,
      date: dateOfBirth,
      nickName: nickName,
      type: 'general',
      completed: false
    };
    setActivities([...activities, newActivity]);
  };

  // Mark activity as done
  const markAsDone = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  // Delete activity
  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="App bg-light min-vh-100">
      {/* Main container */}
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* Upcoming Activities Component */}
            <UpcomingActivities
              activities={activities}
              onShowModal={() => setShowModal(true)}
              onMarkAsDone={markAsDone}
              onDelete={deleteActivity}
            />
          </div>
        </div>
      </div>

      {/* Book Visit Modal */}
      <BookVisitModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={addActivity}
      />
    </div>
  );
}

export default App;
