


// import React, { useState } from 'react';

// export default function Profile() {
//     const token = localStorage.getItem('token');
//     const [showDetails, setShowDetails] = useState(false);

//     const handleImageClick = () => {
//         setShowDetails(!showDetails);
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-brand">
//                 {token && (
//                     <div>
//                         <img
//                             src="../images/prince.jpg"
//                             alt="Profile Image"
//                             style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
//                             onClick={handleImageClick}
//                         />
//                         {showDetails && (
//                             <div>
//                                 {/* Render details here */}
//                                 <p>PrincipleName</p>
//                                 <p>IQSKOOLOwner</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }

// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';

// export default function Profile() {
//     const token = localStorage.getItem('token');
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         profilePic: null,
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         setFormData({ ...formData, profilePic: e.target.files[0] });
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         // Send form data to the server for updating the profile
//         console.log(formData);
//     };

//     const handleImageClick = () => {
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div>
//             {token && (
//                 <div>
//                     <img
//                         src="../images/prince.jpg"
//                         alt="Profile Image"
//                         style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
//                         onClick={handleImageClick}
//                     />
//                     <Modal show={showModal} onHide={handleCloseModal}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Edit Profile</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <form onSubmit={handleFormSubmit}>
//                                 <div>
//                                     <label htmlFor="name">Name</label>
//                                     <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="email">Email</label>
//                                     <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password">Password</label>
//                                     <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="profilePic">Profile Picture</label>
//                                     <input type="file" id="profilePic" name="profilePic" onChange={handleImageChange} />
//                                 </div>
//                                 <Button variant="primary" type="submit">
//                                     Update Profile
//                                 </Button>
//                             </form>
//                         </Modal.Body>
//                     </Modal>
//                 </div>
//             )}
//         </div>
//     );
// }



import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Profile() {
    const token = localStorage.getItem('token');
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {token && (
                    <div> 
                        <img
                            src="../images/prince.jpg"
                            alt="Profile Image"
                            style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
                            onClick={handleImageClick}
                        />
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton >
                                <Modal.Title style={{color:"violet"}}>Profile Details</Modal.Title>
                            </Modal.Header >
                            <Modal.Body   style={{ backgroundColor: 'skyblue' }}>
                                <div>
                                    <p>PrincipleName</p>
                                    <p>IQSKOOLOwner</p>
                                    <p>Principle@gmail.com</p>
                                    {/* Add more profile details here */}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </div>
        </nav>
    );
}

