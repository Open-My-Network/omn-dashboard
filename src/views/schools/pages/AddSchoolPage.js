import React, { useState } from 'react';

const AddSchoolPage = ({ onSchoolAdded }) => {
  const [formData, setFormData] = useState({
    sch_name: '',
    sch_code: '',
    sch_est: '',
    sch_admin: '',
    grades: [{ name: '', sections: [''] }],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const [field, index, subIndex] = id.split('-');
    
    setFormData((prevData) => {
      const newGrades = [...prevData.grades];

      if (field === 'grade') {
        newGrades[index].name = value;
      } else if (field === 'section') {
        newGrades[index].sections[subIndex] = value;
      } else {
        return { ...prevData, [id]: value };
      }

      return { ...prevData, grades: newGrades };
    });
  };

  const addGradeField = () => {
    setFormData((prevData) => ({ ...prevData, grades: [...prevData.grades, { name: '', sections: [''] }] }));
  };

  const addSectionField = (gradeIndex) => {
    setFormData((prevData) => {
      const newGrades = [...prevData.grades];
      newGrades[gradeIndex].sections.push('');
      return { ...prevData, grades: newGrades };
    });
  };

  const handleAddSchool = async (e) => {
    e.preventDefault();
    const { sch_name, sch_code, sch_est, sch_admin, grades } = formData;

    const newSchool = { sch_name, sch_code, sch_est, sch_admin, grades };

    try {
      const response = await fetch('http://localhost:3000/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchool),
      });
      const result = await response.json();
      if (response.ok) {
        onSchoolAdded(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New School</h5>
            <button type="button" className="btn-close" onClick={() => onSchoolAdded(null)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddSchool}>
              <div className="mb-3">
                <label htmlFor="sch_name" className="form-label">School Name</label>
                <input type="text" className="form-control" id="sch_name" value={formData.sch_name} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="sch_code" className="form-label">School Code</label>
                <input type="text" className="form-control" id="sch_code" value={formData.sch_code} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="sch_est" className="form-label">Established Date</label>
                <input type="date" className="form-control" id="sch_est" value={formData.sch_est} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="sch_admin" className="form-label">School Admin</label>
                <input type="text" className="form-control" id="sch_admin" value={formData.sch_admin} onChange={handleInputChange} required />
              </div>
              {formData.grades.map((grade, gradeIndex) => (
                <div key={gradeIndex}>
                  <div className="mb-3">
                    <label htmlFor={`grade-${gradeIndex}`} className="form-label">Grade</label>
                    <input type="text" className="form-control" id={`grade-${gradeIndex}`} value={grade.name} onChange={handleInputChange} required />
                  </div>
                  {grade.sections.map((section, sectionIndex) => (
                    <div className="mb-3" key={sectionIndex}>
                      <label htmlFor={`section-${gradeIndex}-${sectionIndex}`} className="form-label">Section</label>
                      <input type="text" className="form-control" id={`section-${gradeIndex}-${sectionIndex}`} value={section} onChange={handleInputChange} required />
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary mb-3" onClick={() => addSectionField(gradeIndex)}>Add Section</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary mb-3" onClick={addGradeField}>Add Grade</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolPage;
