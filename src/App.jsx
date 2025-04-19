import 'bootstrap/dist/css/bootstrap.min.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import CertificateTemplate from './components/CertificateTemplate';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/auth/Login';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: 250px;
  transition: all 0.3s;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 25px;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CardTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #4361ee;
  }
`;

const StudentList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StudentInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
  }
  
  p {
    margin: 5px 0 0;
    font-size: 0.85rem;
    color: #666;
  }
`;

const CertificatePreviewContainer = styled.div`
  margin-top: 30px;
`;

const CertificatePreview = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  
  svg {
    font-size: 3rem;
    color: #ccc;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1rem;
  }
`;

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    date: '',
    grade: '',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      ...formData
    };
    setStudents(prev => [...prev, newStudent]);
    setFormData({
      name: '',
      course: '',
      date: '',
      grade: ''
    });
  };

  const viewCertificate = (student) => {
    setSelectedStudent(student);
    setShowPreview(true);
  };

  const downloadCertificate = () => {
    const certificateElement = document.getElementById('certificate-to-download');
    
    html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${selectedStudent.name.replace(/\s+/g, '_')}_Certificate.pdf`);
    });
  };

  return (
    <DashboardLayout>
      <Sidebar />
      
      <MainContent>
        <Header title="Certificate Generator" />
        <Login/>
        <Row>
          <Col md={6}>
            <Card>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Add New Student
              </CardTitle>
              <Form onSubmit={addStudent}>
                <Form.Group className="mb-3">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Completion Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Grade/Score</Form.Label>
                  <Form.Control
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    placeholder="Enter grade or score"
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">
                  Add Student
                </Button>
              </Form>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Student List
              </CardTitle>
              
              <StudentList>
                {students.length === 0 ? (
                  <EmptyState>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>No students added yet.</p>
                  </EmptyState>
                ) : (
                  students.map(student => (
                    <StudentItem key={student.id}>
                      <StudentInfo>
                        <h4>{student.name}</h4>
                        <p>{student.course} {student.grade && `| Grade: ${student.grade}`}</p>
                      </StudentInfo>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => viewCertificate(student)}
                      >
                        View Certificate
                      </Button>
                    </StudentItem>
                  ))
                )}
              </StudentList>
            </Card>
          </Col>
        </Row>
        
        {showPreview && selectedStudent && (
          <CertificatePreviewContainer>
            <Card>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Certificate Preview
              </CardTitle>
              
              <CertificatePreview>
                <div id="certificate-to-download">
                  <CertificateTemplate student={selectedStudent} />
                </div>
              </CertificatePreview>
              
              <ActionButtons>
                <Button variant="success" onClick={downloadCertificate}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Certificate
                </Button>
                <Button variant="secondary" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
              </ActionButtons>
            </Card>
          </CertificatePreviewContainer>
        )}
      </MainContent>
    </DashboardLayout>
  );
}

export default App;