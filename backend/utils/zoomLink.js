import fetch from "node-fetch";
import base64 from "base-64";

const zoomAccountId = process.env.zoomAccountId;
const zoomClientId = process.env.zoomClientId;
const zoomClientSecret = process.env.zoomClientSecret;

const getAuthHeaders = () => {
    return {
        Authorization: `Basic ${base64.encode(
            `${zoomClientId}:${zoomClientSecret}`
        )}`,
        "Content-Type": "application/json",
    };
};

const generateZoomAccessToken = async () => {
    try {
        const response = await fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
            }
        );

        const jsonResponse = await response.json();

        return jsonResponse?.access_token;
    } catch (error) {
        // console.log("generateZoomAccessToken Error --> ", error);
        throw error;
    }
};

export const generateZoomMeeting = async (patientEmail, doctorEmail) => {
    try {
        const zoomAccessToken = await generateZoomAccessToken();

        const response = await fetch(
            `https://api.zoom.us/v2/users/me/meetings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${zoomAccessToken}`,
                },
                body: JSON.stringify({
                    agenda: "Appointment Call from Docontap",
                    default_password: false,
                    duration: 600,
                    password: "12345",

                    settings: {
                        allow_multiple_devices: true,
                        alternative_hosts: "",
                        alternative_hosts_email_notification: true,
                        breakout_room: {
                            enable: true,
                            rooms: [
                                {
                                    name: "Appointment Room",
                                    participants: [
                                        `"${patientEmail}"`,
                                        `"${doctorEmail}"`,
                                    ],
                                },
                            ],
                        },
                        calendar_type: 1,
                        contact_email: "docontap.dev@gmail.com",
                        contact_name: "Docontap",
                        email_notification: true,
                        encryption_type: "enhanced_encryption",
                        focus_mode: true,
                        // global_dial_in_countries: ["US"],
                        host_video: true,
                        join_before_host: true,
                        meeting_authentication: true,
                        meeting_invitees: [
                            {
                                email: `"${patientEmail}"`,
                            },
                            {
                                email: `"${doctorEmail}"`,
                            },
                        ],
                        mute_upon_entry: true,
                        participant_video: true,
                        private_meeting: true,
                        waiting_room: false,
                        watermark: false,
                        continuous_meeting_chat: {
                            enable: true,
                        },
                    },
                    start_time: new Date().toLocaleDateString(),
                    timezone: "Asia/Kolkata",
                    topic: "Appointment on Docontap",
                    type: 1, // 1 -> Instant Meeting, 2 -> Scheduled Meeting
                }),
            }
        );

        const jsonResponse = await response.json();
        return jsonResponse.join_url;
    } catch (error) {
        // console.log("generateZoomMeeting Error --> ", error);
        throw error;
    }
};
