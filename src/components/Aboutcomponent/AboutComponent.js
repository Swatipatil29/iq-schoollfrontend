import React from 'react';
import  "./About.css"

function AboutComponent() {
  return (
    <div className="about-container">
      <h2>Welcome to IQSKOOL</h2>
      <p>
        At IQSKOOL, we believe in revolutionizing education by fostering creativity, innovation, and entrepreneurship in every student. Our mission is to empower the next generation of leaders, thinkers, and creators to shape a brighter future.
      </p>
      <h3>Our Vision</h3>
      <p>
        Our vision is to create a dynamic learning environment where students are inspired to explore their passions, challenge the status quo, and develop the skills needed to thrive in the modern world. We aim to cultivate a community of lifelong learners who are equipped to adapt to the ever-changing landscape of technology and society.
      </p>
      <h3>What Sets Us Apart</h3>
      <ul>
        <li><strong>Innovative Curriculum:</strong> Our curriculum is designed to go beyond traditional education models, integrating real-world projects, hands-on experiences, and interdisciplinary learning opportunities.</li>
        <li><strong>Entrepreneurial Mindset:</strong> We instill an entrepreneurial mindset in our students, encouraging them to identify problems, think critically, and develop innovative solutions.</li>
        <li><strong>Experienced Instructors:</strong> Our team of experienced educators and industry professionals are dedicated to providing personalized guidance and mentorship to help students reach their full potential.</li>
        <li><strong>Collaborative Community:</strong> IQSKOOL is more than just a school – it's a community. We foster collaboration, creativity, and a supportive network where students can connect, share ideas, and inspire each other.</li>
        <li><strong>State-of-the-Art Facilities:</strong> Our campus features modern facilities equipped with the latest technology to enhance the learning experience and provide students with access to resources that promote academic and personal growth.</li>
        <li><strong>Diverse Learning Opportunities:</strong> We offer a diverse range of extracurricular activities, clubs, and programs to cater to the unique interests and talents of our students, encouraging them to explore new passions and develop well-rounded skills.</li>
      </ul>
      <h3>Our Programs</h3>
      <ul>
        <li><strong>Primary Education:</strong> Our primary education programs lay the foundation for lifelong learning, fostering curiosity, creativity, and critical thinking skills from an early age.</li>
        <li><strong>Secondary Education:</strong> Our secondary education programs provide students with the tools and knowledge needed to excel academically, pursue their passions, and prepare for higher education and beyond.</li>
        <li><strong>Specialized Tracks:</strong> We offer specialized tracks and electives in areas such as technology, entrepreneurship, arts, and sciences, allowing students to explore their interests and develop expertise in their chosen fields.</li>
        <li><strong>College Preparatory:</strong> Our college preparatory programs prepare students for success in higher education by providing comprehensive academic support, college counseling services, and opportunities for personal and professional development.</li>
        <li><strong>Community Engagement:</strong> We actively engage with the local community through service-learning projects, partnerships with organizations, and initiatives that promote social responsibility and civic engagement among our students.</li>

      </ul>
      <h3>Join Us Today!</h3>
      <p>
        Whether you're a student, parent, educator, or supporter of innovative education, we invite you to join us on this journey of exploration, discovery, and growth. Together, we can unlock the potential of every individual and create a brighter future for generations to come.
      </p>
    </div>
  );
}

export default AboutComponent;

// import React from 'react';
// import { Carousel } from 'react-bootstrap'; // Import Carousel component from react-bootstrap
// import "./About.css"

// function AboutComponent() {
//   return (
//     <div className="about-container">
//       <h2>Welcome to IQSKOOL</h2>
//       <Carousel interval={5000}> {/* Set interval to 5000 milliseconds (5 seconds) */}
//         <Carousel.Item>
//           <h3>Our Vision</h3>
//           <p>
//             Our vision is to create a dynamic learning environment where students are inspired to explore their passions, challenge the status quo, and develop the skills needed to thrive in the modern world. We aim to cultivate a community of lifelong learners who are equipped to adapt to the ever-changing landscape of technology and society.
//           </p>
//         </Carousel.Item>
//         <Carousel.Item>
//           <h3>What Sets Us Apart</h3>
//           <ul>
//             <li><strong>Innovative Curriculum:</strong> Our curriculum is designed to go beyond traditional education models, integrating real-world projects, hands-on experiences, and interdisciplinary learning opportunities.</li>
//             {/* More list items */}
//           </ul>
//         </Carousel.Item>
//         <Carousel.Item>
//           <h3>Our Programs</h3>
//           <ul>
//             <li><strong>Primary Education:</strong> Our primary education programs lay the foundation for lifelong learning, fostering curiosity, creativity, and critical thinking skills from an early age.</li>
//             {/* More list items */}
//           </ul>
//         </Carousel.Item>
//       </Carousel>
//       <h3>Join Us Today!</h3>
//       <p>
//         Whether you're a student, parent, educator, or supporter of innovative education, we invite you to join us on this journey of exploration, discovery, and growth. Together, we can unlock the potential of every individual and create a brighter future for generations to come.
//       </p>
//     </div>
//   );
// }

// export default AboutComponent;
