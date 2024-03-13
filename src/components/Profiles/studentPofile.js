import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Modal, Form, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import _ from "lodash";

function StudentProfile() {
  const token = localStorage.getItem('token');
  const { student } = jwtDecode(token);
  console.log(student, "student123");

  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [img ,setImg] = useState({});
  
  useEffect(() => {
    if( student && student.length > 0){
      (async () => {
        try {
          const { data} = await axios.get(`/api/liststudent/${student}/student`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          console.log("Data123", data)

          setImg({...img, ...data})
      } catch(err){
        console.log(err, "ERRORUPLOAD IMAGE")
      }
    })()
   }
  }, [student])

  const handleImageChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const studentId = student; // Ensure studentId is correctly obtained

  const handleUpload = (e) => {
    e.preventDefault();

    if (profile) {
      const formData = new FormData();
      formData.append("file", profile);

      axios
        .put("/api/student/studentId/profilePic", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data, "ProfilePic")
          setShowModal(false);
          setImg({ ...img, ...res.data });
        })
        .catch((err) => console.log(err))
    }
  };

  const handleImageClick = () => {
    setShowModal(true);
  };
  console.log(!_.isEmpty(img), "Image")
  return (
    <div>
      {token && (
        <img
          src= {!_.isEmpty(img) ? `http://localhost:3050/images/${img.profilePic}` : process.env.PUBLIC_URL + "/images/dumyimage.jpg"}
          alt="Profile Image"
          style={{ width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer' }}
          onClick={handleImageClick}
        />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentProfile;
