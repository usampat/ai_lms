import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Dashboard.css'

const mockOrganizations = [
  {
    id: 1,
    name: 'Organization 1',
    classes: [
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' },
    ],
  },
  {
    id: 2,
    name: 'Organization 2',
    classes: [
      { id: 3, name: 'Class 3' },
      { id: 4, name: 'Class 4' },
      { id: 5, name: 'Class 5' },
    ],
  },
  {
    id: 3,
    name: 'Organization 3',
    classes: [
      { id: 6, name: 'Class 6' },
      { id: 7, name: 'Class 7' },
      { id: 8, name: 'Class 8' },
      { id: 9, name: 'Class 9' },
    ],
  },
  {
    id: 4,
    name: 'Organization 4',
    classes: [
      { id: 10, name: 'Class 10' },
      { id: 11, name: 'Class 11' },
      { id: 12, name: 'Class 12' },
      { id: 13, name: 'Class 13' },
      { id: 14, name: 'Class 14' },
    ],
  },
]

const mockAssignments = [
  { id: 1, name: 'Assignment 1' },
  { id: 2, name: 'Assignment 2' },
  { id: 3, name: 'Assignment 3' },
]

const mockStudents = [
  { id: 1, name: 'Student 1', classId: 1, grades: { 1: 'A', 2: 'B' } },
  { id: 2, name: 'Student 2', classId: 2, grades: { 1: 'B' } },
  { id: 3, name: 'Student 3', classId: 1, grades: { 1: 'C' } },
  { id: 4, name: 'Student 4', classId: 3, grades: {} },
  { id: 5, name: 'Student 5', classId: 4, grades: {} },
]

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [joinedOrgs, setJoinedOrgs] = useState([])
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])
  const [showOrgModal, setShowOrgModal] = useState(false)
  const [showClassModal, setShowClassModal] = useState(false)
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [availableClasses, setAvailableClasses] = useState([])
  const [currentStudent, setCurrentStudent] = useState(null)
  const [newGrade, setNewGrade] = useState('')
  const [newAssignmentName, setNewAssignmentName] = useState('')

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))?.user
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, [])

  useEffect(() => {
    if (selectedOrg) {
      const org = mockOrganizations.find(
        (org) => org.id === parseInt(selectedOrg)
      )
      setAvailableClasses(org ? org.classes : [])
    } else {
      setAvailableClasses([])
    }
  }, [selectedOrg])

  const handleJoinOrganization = (orgId) => {
    setJoinedOrgs([...joinedOrgs, orgId])
    toast.success('Joined organization successfully!')
    setShowOrgModal(false)
  }

  const handleJoinClass = (classId) => {
    mockStudents.push({
      id: mockStudents.length,
      name: user.username,
      classId: Number(classId),
      grades: {},
    })

    toast.success('Joined class successfully!')
    setShowClassModal(false)
  }

  const handleApplyFilters = () => {
    if (selectedOrg && selectedClass) {
      const studentsInClass = mockStudents.filter(
        (student) => student.classId === parseInt(selectedClass)
      )
      if (studentsInClass.length === 0) toast.error('No students found')
      setFilteredStudents(studentsInClass)
    } else {
      toast.error(
        'Please select both organization and class to filter students.'
      )
    }
  }

  const handleGradeAssignment = (student) => {
    setCurrentStudent(student)
    setShowGradeModal(true)
  }

  const handleSaveGrade = () => {
    const updatedStudents = filteredStudents.map((student) => {
      if (student.id === currentStudent.id) {
        const updatedGrades = {
          ...student.grades,
          [selectedAssignment]: newGrade,
        }
        return { ...student, grades: updatedGrades }
      }
      return student
    })
    setFilteredStudents(updatedStudents)
    toast.success('Grade saved successfully!')
    setShowGradeModal(false)
  }

  const handleSaveAssignment = () => {
    const newAssignment = {
      id: mockAssignments.length + 1,
      name: newAssignmentName,
    }
    mockAssignments.push(newAssignment)
    setSelectedAssignment(newAssignment.id.toString())
    setShowAssignmentModal(false)
    toast.success('Assignment added successfully!')
  }

  return (
    <div className='dashboard-container page'>
      <h2>Dashboard</h2>

      <div className='top-section'>
        {user?.role === 'teacher' ? (
          <>
            <button onClick={() => setShowOrgModal(true)}>
              Join Organization
            </button>
            <button onClick={() => setShowAssignmentModal(true)}>
              Add New Assignment
            </button>
          </>
        ) : (
          <button onClick={() => setShowClassModal(true)}>Join Class</button>
        )}
      </div>

      {showOrgModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowOrgModal(false)}>
              &times;
            </span>
            <h3>Select Organization</h3>
            <select onChange={(e) => setSelectedOrg(e.target.value)}>
              <option value=''>Select Organization</option>
              {mockOrganizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            <button onClick={() => handleJoinOrganization(selectedOrg)}>
              Join
            </button>
          </div>
        </div>
      )}

      {showClassModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowClassModal(false)}>
              &times;
            </span>
            <h3>Select Class</h3>
            <select onChange={(e) => setSelectedClass(e.target.value)}>
              <option value=''>Select Class</option>
              {availableClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <button onClick={() => handleJoinClass(selectedClass)}>Join</button>
          </div>
        </div>
      )}

      {showGradeModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowGradeModal(false)}>
              &times;
            </span>
            <h3>Grade Assignment</h3>
            <p>
              Grading {currentStudent?.name} for{' '}
              {
                mockAssignments.find(
                  (a) => a.id === parseInt(selectedAssignment)
                )?.name
              }
            </p>
            <input
              type='text'
              placeholder='Enter grade'
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
            />
            <button onClick={handleSaveGrade}>Save</button>
          </div>
        </div>
      )}

      {showAssignmentModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span
              className='close'
              onClick={() => setShowAssignmentModal(false)}
            >
              &times;
            </span>
            <h2>Add New Assignment</h2>
            <label htmlFor='assignmentName'>Assignment Name:</label>
            <input
              type='text'
              id='assignmentName'
              value={newAssignmentName}
              onChange={(e) => setNewAssignmentName(e.target.value)}
              placeholder='Enter assignment name'
            />
            <button onClick={handleSaveAssignment}>Save</button>
          </div>
        </div>
      )}

      <div className='filter-section'>
        <div className='filters'>
          <select onChange={(e) => setSelectedOrg(e.target.value)}>
            <option value=''>Select Organization</option>
            {mockOrganizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            disabled={!selectedOrg}
          >
            <option value=''>Select Class</option>
            {availableClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <select onChange={(e) => setSelectedAssignment(e.target.value)}>
            <option value=''>Select Assignment</option>
            {mockAssignments.map((assgn) => (
              <option key={assgn.id} value={assgn.id}>
                {assgn.name}
              </option>
            ))}
          </select>
          <button onClick={handleApplyFilters}>Apply</button>
        </div>

        <div className='students-list'>
          {filteredStudents.map((student) => (
            <div key={student.id} className='student'>
              <span>
                {student.name} - Grade:{' '}
                {student.grades[selectedAssignment] || 'NONE'}
              </span>
              {user?.role === 'teacher' && (
                <button onClick={() => handleGradeAssignment(student)}>
                  Grade Assignment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
