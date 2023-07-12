import React, { useEffect, useState } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import logoImg from './logo/zambia-coats-of-arm.jpg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiaries } from 'app/redux/actions';

const selectBeneficiaries = state => state.beneficiaries.beneficiaryList

const LearnerPDFGenerator = () => {
  const [schools, setSchools] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const beneficiaries = useSelector(selectBeneficiaries)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeneficiaries());
  }, [dispatch]);

  useEffect(() => {
    // fetchLearners();
    fetchProvinces();
  }, []);
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}api/provinces`);
      const provincesData = response.data.data;
      const provincesOptions = provincesData.map((province) => {
        return { label: province.attributes.name, value: province.id };
      });
      setProvinces(provincesOptions);
    } catch (error) {
      console.log('Error fetching provinces:', error);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const param = encodeURI(`?filters[province][id][$eq]=${provinceId}`);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/districts${param}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const districtsData = await response.json();
      const districtsOptions = districtsData.data.map((district) => {
        return { label: district.attributes.name, value: district.id };
      });
      setDistricts(districtsOptions);
    } catch (error) {
      console.log('Error fetching districts:', error);
    }
  };

  const fetchSchools = async (districtId) => {
    try {
      const param = encodeURI(`?filters[district][id][$eq]=${districtId}`);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/schools${param}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const schoolsData = await response.json();
      const schoolsOptions = schoolsData.data.map((school) => {
        return { label: school.attributes.name, value: school.id };
      });
      setSchools(schoolsOptions);
    } catch (error) {
      console.log('Error fetching schools:', error);
    }
  };

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchSchools(selectedDistrict);
    }
  }, [selectedDistrict]);

  const getProvinceName = () => {
    const province = provinces.find((p) => p.value === selectedProvince);
    return province ? province.label : '';
  };

  const getDistrictName = () => {
    const district = districts.find((d) => d.value === selectedDistrict);
    return district ? district.label : '';
  };
  const getSchoolName = () => {
    const school = schools.find((s) => s.value === selectedSchool);
    return school ? school.label : '';
  };

 const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set font styles
  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);

  
  const imgWidth = 25;
  const imgHeight = 25;
  const imgX = 10;
  const imgY = 2;
  doc.addImage(logoImg, "JPEG", imgX, imgY, imgWidth, imgHeight);

  // Add title at the top center
  const title = 'Beneficiary List';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, 10);
  
  
  const signature = '.................................'
  const signText = `Signature: ${signature}`;
  const signTextWidth = doc.getTextWidth(signText);

  // Add province and district information
  const province = getProvinceName();
  const district = getDistrictName();
  const school = getSchoolName();
  doc.setFontSize(10);
  doc.text(`Province: ${province}`, 10, 35);
  doc.text(`District: ${district}`, 10, 40);
  doc.text(`School: ${school}`, 10, 45);
    // Filter beneficiaries based on the selected school
    const filteredBeneficiaries = beneficiaries.filter(
      (beneficiary) => beneficiary.attributes.school?.data?.id === selectedSchool
    );
  // Generate the table headers
  const headers = ['No.', 'Name', 'Grade', 'DOB', 'Present'];
  const data = filteredBeneficiaries.map((beneficiary, index) => [
    index + 1,
    beneficiary?.attributes?.user?.data?.attributes?.firstName + ' ' + beneficiary?.attributes?.user?.data?.attributes?.lastName,
    beneficiary?.attributes?.grade?.data?.attributes?.name,
    beneficiary?.attributes?.user?.data?.attributes?.dateOfBirth,
  ]);
  // Generate the table using autotable plugin
  doc.autoTable({
    startY: 50,
    head: [headers],
    body: data,
    theme: 'grid',
    didDrawCell: (data) => {
      // cell borders 
      doc.setLineWidth(0.1);
      doc.setDrawColor(0, 0, 0);
      doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y); // Top border
      doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Bottom border
    },
  });

  const signX = pageWidth - signTextWidth - 10; // Subtracting 10 for some padding
  doc.text(signText, signX, 45);
    // Generate the PDF preview URL
    setPdfPreviewUrl(doc.output('datauristring'));
  };
  const downloadPDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set font styles
  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);


  const imgWidth = 25;
  const imgHeight = 25;
  const imgX = 10;
  const imgY = 2;
  doc.addImage(logoImg, "JPEG", imgX, imgY, imgWidth, imgHeight);

  // Add title at the top center
  const title = 'Beneficiary List';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, 10);
  
  
  const signature = '.................................'
  const signText = `Signature: ${signature}`;
  const signTextWidth = doc.getTextWidth(signText);

  // Add province and district information
  const province = getProvinceName();
  const district = getDistrictName();
  const school = getSchoolName();
  doc.setFontSize(10);
  doc.text(`Province: ${province}`, 10, 35);
  doc.text(`District: ${district}`, 10, 40);
  doc.text(`School: ${school}`, 10, 45);

  const docname = school;
    // Filter beneficiaries based on the selected school
    const filteredBeneficiaries = beneficiaries.filter(
      (beneficiary) => beneficiary.attributes.school?.data?.id === selectedSchool
    );
  // Generate the table headers
  const headers = ['No.', 'Name', 'Grade', 'DOB', 'Present'];
  const data = filteredBeneficiaries.map((beneficiary, index) => [
    index + 1,
    beneficiary?.attributes?.user?.data?.attributes?.firstName + ' ' + beneficiary?.attributes?.user?.data?.attributes?.lastName,
    beneficiary?.attributes?.grade?.data?.attributes?.name,
    beneficiary?.attributes?.user?.data?.attributes?.dateOfBirth,
  ]);
  // Generate the table using autotable plugin
  doc.autoTable({
    startY: 50,
    head: [headers],
    body: data,
    theme: 'grid',
    didDrawCell: (data) => {
      // cell borders 
      doc.setLineWidth(0.1);
      doc.setDrawColor(0, 0, 0);
      doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y); // Top border
      doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Bottom border
    },
  });

  const signX = pageWidth - signTextWidth - 10; // Subtracting 10 for some padding
  doc.text(signText, signX, 45);

    // Save the PDF
    doc.save(docname);
  };
  return (
    <div>
      <h1>Beneficiary List</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="province-label">Select Province</InputLabel>
            <Select
              labelId="province-label"
              id="province-select"
              value={selectedProvince || ''}
              onChange={(e) => setSelectedProvince(e.target.value)}
              label="Select Province"
            >
              <MenuItem value="">
                <em>Select Province</em>
              </MenuItem>
              {provinces.map((province) => (
                <MenuItem key={province.value} value={province.value}>
                  {province.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="district-label">Select District</InputLabel>
            <Select
              labelId="district-label"
              id="district-select"
              value={selectedDistrict || ''}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              label="Select District"
              disabled={selectedProvince === ''}
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.value} value={district.value}>
                  {district.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="school-label">Select School</InputLabel>
            <Select
              labelId="school-label"
              id="school-select"
              value={selectedSchool || ''}
              onChange={(e) => setSelectedSchool(e.target.value)}
              label="Select School"
              disabled={selectedDistrict === ''}
            >
              <MenuItem value="">
                <em>Select School</em>
              </MenuItem>
              {schools.map((school) => (
                <MenuItem key={school.value} value={school.value}>
                  {school.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid> 
      {pdfPreviewUrl && (
        <iframe
          title="PDF Preview"
          src={pdfPreviewUrl}
          width="100%"
          height="500px"
          style={{ border: '1px solid black' }}
        />
      )}
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={generatePDF} style={{ marginRight: '10px' }}>
          Generate Check-List
        </Button>
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download Check-List
        </Button>
      </div>
    </div>
  );
};

export default LearnerPDFGenerator;