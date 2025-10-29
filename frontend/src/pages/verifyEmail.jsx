import React,{ useEffect, useState , useContext} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../assets/success.png";
// import styles from "./styles.module.css";
// import { Fragment } from "react/cjs/react.production.min";
import { AppContext } from "../context/AppContext";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	const { backendUrl } = useContext(AppContext);

	useEffect(() => {
		
		const verifyEmailUrl = async () => {
			try {
				const url = backendUrl + `/api/user/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
			{validUrl ? (
				<div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6fff8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <style>{`
        .checkmark {
          width: 100px;
          height: 100px;
          stroke-width: 3;
          stroke: #4caf50;
          stroke-miterlimit: 10;
          animation: scaleUp 0.3s ease-in-out;
        }
        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke: #4caf50;
          fill: none;
          animation: strokeCircle 0.6s forwards;
        }
        .checkmark-check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke-width: 3;
          stroke: #4caf50;
          fill: none;
          animation: strokeCheck 0.4s 0.6s forwards;
        }
        @keyframes strokeCircle {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes strokeCheck {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scaleUp {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .login-btn {
          background: #4caf50;
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s ease-in-out;
        }
        .login-btn:hover {
          background: #43a047;
        }
      `}</style>

      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark-circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark-check"
          fill="none"
          d="M14 27l7 7 16-16"
        />
      </svg>

      <h1 style={{ marginTop: "20px", color: "#333" }}>
        Email verified successfully
      </h1>

      <Link to="/login">
        <button className="login-btn" style={{ marginTop: "15px" }}>
          Login
        </button>
      </Link>
    </div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default EmailVerify;
