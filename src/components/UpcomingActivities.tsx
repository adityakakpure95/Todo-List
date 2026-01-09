import React, { useState } from 'react';
import { Activity } from '../App';

interface UpcomingActivitiesProps {
  activities: Activity[];
  onShowModal: () => void;
  onMarkAsDone: (id: string) => void;
  onDelete: (id: string) => void;
}

const UpcomingActivities: React.FC<UpcomingActivitiesProps> = ({
  activities,
  onShowModal,
  onMarkAsDone,
  onDelete
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Toggle dropdown for specific activity
  const toggleDropdown = (activityId: string) => {
    setDropdownOpen(dropdownOpen === activityId ? null : activityId);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = () => {
    setDropdownOpen(null);
  };


  return (
    <div className="upcoming-activities card shadow-sm bg-white rounded" onClick={handleOutsideClick}>
      {/* Header with title  */}
      <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center activities-header">
        <h3 className="mb-0 text-truncate font-weight-bold">Upcoming Activities</h3>
        <button 
          className="add-task-button btn btn-sm d-flex align-items-center justify-content-center" 
          onClick={(e) => {
            e.stopPropagation();
            onShowModal();
          }}
          aria-label="Add new task"
          title="Click to add new task"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <hr className="m-0 header-divider" />

      {/* Main content area */}
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="text-center py-5 px-3">
            <i className="fas fa-calendar-check display-1 text-muted mb-3 opacity-50"></i>
            <h5 className="mb-2 text-dark">No activities yet</h5>
            <p className="text-muted mb-0 small">Click the + button to add your first activity</p>
          </div>
        ) : (
          /* Task List*/
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`task-item task-item-hover d-flex justify-content-between align-items-center p-3 border-bottom ${activity.completed ? 'completed' : ''}`}
            >
              {/* Task Information Section */}
              <div className="flex-grow-1">
                <div>
                  <h6 className={`mb-1 font-weight-bold ${activity.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                    {activity.title}
                  </h6>
                  <p className="mb-0 small text-muted">
                    {activity.date} <span className="separator">|</span> {activity.nickName}
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                {activity.completed && (
                  <div className="completion-badge rounded-circle d-flex align-items-center justify-content-center me-2">
                      <i className="fas fa-check text-white small"></i>
                  </div>
                )}


                <div className="dropdown position-relative ml-2">
                  <button
                    className="btn btn-sm btn-link text-decoration-none p-2 action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(activity.id);
                    }}
                    aria-label="Activity options"
                    title="More actions"
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen === activity.id && (
                    <div className="dropdown-menu show shadow border-0 rounded p-2 dropdown-positioned">
                      <button
                        className="dropdown-item d-flex align-items-center py-2 px-3 border-0 menu-item-with-border"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsDone(activity.id);
                          setDropdownOpen(null);
                        }}
                        title={activity.completed ? 'Mark as pending' : 'Mark as completed'}
                      >
                        {activity.completed ? 'Mark as Pending' : 'Mark as Done'}
                      </button>
                      <button
                        className="dropdown-item d-flex align-items-center py-2 px-3 border-0 menu-item-no-border"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(activity.id);
                          setDropdownOpen(null);
                        }}
                        title="Delete this task"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingActivities;
