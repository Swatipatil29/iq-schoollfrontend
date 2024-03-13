// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../config/axios";
// import Swal from "sweetalert2";
// import { listStudentsAsync } from "../../action/studentAction";
// import { useSelector,useDispatch } from "react-redux";
// export default function Success() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch()
//     const students = useSelector((state) => state.students.data);

//     useEffect(()=>{
//         dispatch(listStudentsAsync())
//     },[dispatch])

//     useEffect(() => {
//         (async () => {
//             try {
//                 const transactionId = localStorage.getItem("stripeid");
//                 const body = {
//                     transactionId
//                 };
//                 const response = await axios.put(`/api/payment-update`, body);
//                 localStorage.removeItem("stripeid");

//                 // Display success message using SweetAlert
//                 Swal.fire({
//                     icon: "success",
//                     title: "Success",
//                     text: "Payment has been processed successfully!",
//                     showConfirmButton: false,
//                     timer: 2000 // Close after 2 seconds
//                 }).then(() => {
//                     navigate('/studentdashboard2'); // Redirect to '/student' after success
//                 });

//             } catch (e) {
//                 console.log(e);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Something went wrong!",
//                 });
//             }
//         })();
//     }, []);

//     return (
//         <div>
//            <a>Success</a> 
//            <ul>
//             {
//                 students.map((ele)=>{
//                     return <li key={id}>
//                         {ele.email}
//                     </li>
//                 })
//             }
//            </ul>
//         </div>
//     );
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Swal from "sweetalert2";
import { listStudentsAsync } from "../../action/studentAction";
import { useSelector, useDispatch } from "react-redux";
import nodemailer from "nodemailer";

export default function Success() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.data);

    useEffect(() => {
        dispatch(listStudentsAsync());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            try {
                const transactionId = localStorage.getItem("stripeid");
                const body = {
                    transactionId,
                };
                const response = await axios.put(`/api/payment-update`, body);
                localStorage.removeItem("stripeid");

                // Display success message using SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Payment has been processed successfully!",
                    showConfirmButton: false,
                    timer: 2000, // Close after 2 seconds
                }).then(() => {
                    navigate("/studentdashboard2"); // Redirect to '/student' after success
                });

                // Send email notifications to students
                sendEmailNotifications(students);

            } catch (e) {
                console.log(e);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        })();
    }, [students]);

    // Function to send email notifications
    const sendEmailNotifications = async (students) => {
        const transporter = nodemailer.createTransport({
            // Provide your SMTP configuration here
            service: "Gmail",
            auth: {
                user: "your_email@gmail.com", // Your Gmail email address
                pass: "your_password", // Your Gmail password
            },
        });

        // Iterate through students and send email notification
        students.forEach(async (student) => {
            const mailOptions = {
                from: "your_email@gmail.com", // Sender address
                to: student.email, // Receiver's email address
                subject: "Payment Success Notification",
                text: "Dear student, Your payment has been successfully processed.",
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent to", student.email);
            } catch (error) {
                console.error("Error sending email:", error);
            }
        });
    };

    return (
        <div>
            <a>Success</a>
            <ul>
                {students.map((student) => {
                    return <li key={student.id}>{student.email}</li>;
                })}
            </ul>
        </div>
    );
}
