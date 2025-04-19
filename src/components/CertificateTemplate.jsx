import React from 'react';
import styled from 'styled-components';

const CertificateContainer = styled.div`
  width: 100%;
  aspect-ratio: 1.414 / 1; /* A4 landscape ratio */
  background-color: white;
  position: relative;
  overflow: hidden;
`;

const CertificateContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  background: linear-gradient(90deg, #1e3344 0%, #1e3344 35%, white 35%);
`;

const CertificateHeader = styled.div`
  text-align: center;
  margin-top: 50px;
  
  h1 {
    font-size: 3rem;
    color: #333;
    margin: 0;
    letter-spacing: 5px;
  }
  
  h2 {
    color: #d35536;
    font-size: 1.2rem;
    margin: 5px 0 0;
  }
`;

const CertificateBody = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const PresentedTo = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const StudentName = styled.h2`
  font-family: 'Brush Script MT', cursive;
  font-size: 3rem;
  color: #d35536;
  margin: 10px 0 30px;
`;

const CourseCompletion = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 50px;
`;

const CertificateFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding: 0 50px;
`;

const DateSection = styled.div`
  text-align: center;
  width: 200px;
`;

const SignatureSection = styled.div`
  text-align: center;
  width: 200px;
`;

const DateLine = styled.div`
  font-size: 1rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
`;

const SignatureLine = styled.div`
  font-size: 1rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
`;

const DateLabel = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 5px;
`;

const SignatureLabel = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 5px;
`;

const CertificateSeal = styled.div`
  position: absolute;
  right: 40px;
  top: 40%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  background-color: #d4af37;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 90%;
    border: 2px solid #222;
    border-radius: 50%;
  }
  
  &::after {
    content: 'CODEWARES';
    font-size: 0.6rem;
    font-weight: bold;
    color: #222;
  }
`;

const CertificateTemplate = ({ student }) => {
  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <CertificateContainer>
      <CertificateContent>
        <CertificateHeader>
          <h1>CERTIFICATE</h1>
          <h2>OF ACHIEVEMENT</h2>
        </CertificateHeader>
        
        <CertificateBody>
          <PresentedTo>THIS CERTIFICATE IS PROUDLY PRESENTED TO:</PresentedTo>
          <StudentName>{student.name}</StudentName>
          <CourseCompletion>
            SUCCESSFULLY COMPLETED {student.course.toUpperCase()}
            {student.grade && <span> WITH GRADE: {student.grade}</span>}
          </CourseCompletion>
        </CertificateBody>
        
        <CertificateFooter>
          <DateSection>
            <DateLine>{formatDate(student.date)}</DateLine>
            <DateLabel>DATE</DateLabel>
          </DateSection>
          
          <SignatureSection>
            <SignatureLine>Munawer Aziz</SignatureLine>
            <SignatureLabel>FOUNDER & CEO, CODEWARES</SignatureLabel>
          </SignatureSection>
        </CertificateFooter>
        
        <CertificateSeal />
      </CertificateContent>
    </CertificateContainer>
  );
};

export default CertificateTemplate;