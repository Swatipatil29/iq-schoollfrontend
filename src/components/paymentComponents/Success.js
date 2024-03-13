import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Swal from "sweetalert2";

export default function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const transactionId = localStorage.getItem("stripeid");
                const body = {
                    transactionId
                };
                const response = await axios.put(`/api/payment-update`, body);
                localStorage.removeItem("stripeid");

                // Display success message using SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Payment has been processed successfully!",
                    showConfirmButton: false,
                    timer: 2000 // Close after 2 seconds
                }).then(() => {
                    navigate('/studentdashboard2'); // Redirect to '/student' after success
                });

            } catch (e) {
                console.log(e);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        })();
    }, []);

    return (
        <div>
            Success
        </div>
    );
}

