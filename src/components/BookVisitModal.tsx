import React, { useState } from 'react';

interface BookVisitModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (dateOfBirth: string, fullName: string, nickName: string) => void;
}

const BookVisitModal: React.FC<BookVisitModalProps> = ({ show, onHide, onSave }) => {
  // Form state
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    fullName: '',
    nickName: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date input with automatic formatting
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const numbersOnly = value.replace(/\D/g, '');
    
    let formattedDate = '';
    if (numbersOnly.length > 0) {
  
      formattedDate = numbersOnly.substring(0, 2);
      
      if (numbersOnly.length > 2) {
    
        formattedDate += '/' + numbersOnly.substring(2, 4);
        
        if (numbersOnly.length > 4) {

          formattedDate += '/' + numbersOnly.substring(4, 8);
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      dateOfBirth: formattedDate
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!formData.dateOfBirth || !formData.fullName.trim() || !formData.nickName.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Save the data
    onSave(formData.dateOfBirth, formData.fullName.trim(), formData.nickName.trim());
    
    // Reset form and close modal
    setFormData({
      dateOfBirth: '',
      fullName: '',
      nickName: ''
    });
    onHide();
  };

  // Handle cancel
  const handleCancel = () => {
 
    setFormData({
      dateOfBirth: '',
      fullName: '',
      nickName: ''
    });
    onHide();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // Check if all form fields are filled
  const isFormValid = formData.dateOfBirth.trim() !== '' && 
                      formData.fullName.trim() !== '' && 
                      formData.nickName.trim() !== '';


  if (!show) return null;

  return (
    <div 
      className={`modal fade modal-backdrop-custom ${show ? 'show d-block' : 'hide'}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="bookVisitModalLabel"
      aria-hidden={!show}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className="modal-header border-0">
            <h4 className="modal-title mb-0 font-weight-bold" id="bookVisitModalLabel">Book Visit</h4>
            <button
              type="button"
              className="close text-white"
              onClick={handleCancel}
              aria-label="Close"
              data-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Modal Body with Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body p-4">
              {/* Date of Birth Field */}
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="field-label form-label font-weight-bold text-dark small">Date of Birth</label>
                <input
                  type="text"
                  className="form-control underlined-text-input"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="DD / MM / YYYY"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  maxLength={10}
                  required
                  autoFocus
                  aria-describedby="dateOfBirthHelp"
                  pattern="\d{2}/\d{2}/\d{4}"
                />
              </div>

              {/* Full Name Field */}
              <div className="mb-4">
                <label htmlFor="fullName" className="field-label form-label font-weight-bold text-dark small">Full Name</label>
                <input
                  type="text"
                  className="form-control underlined-text-input"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  aria-describedby="fullNameHelp"
                  autoComplete="name"
                />
              </div>

              {/* Nick Name Field */}
              <div className="mb-4">
                <label htmlFor="nickName" className="field-label form-label font-weight-bold text-dark small">Nick Name</label>
                <input
                  type="text"
                  className="form-control underlined-text-input"
                  id="nickName"
                  name="nickName"
                  placeholder="Enter a nickname"
                  value={formData.nickName}
                  onChange={handleInputChange}
                  required
                  minLength={1}
                  maxLength={20}
                  aria-describedby="nickNameHelp"
                  autoComplete="nickname"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer d-flex justify-content-end p-4 border-0">
              <button
                type="button"
                className="btn cancel-button me-3 px-4 py-2 text-uppercase font-weight-bold small"
                onClick={handleCancel}
                title="Cancel and close modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn save-button text-white px-4 py-2 text-uppercase font-weight-bold small"
                disabled={!isFormValid}
                title={isFormValid ? 'Save new task' : 'Please fill all required fields'}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookVisitModal;
