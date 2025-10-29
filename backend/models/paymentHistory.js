import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    appointmentId: { type: String, required: true },
    paymentId: { type: String, required: true },
    payment_through: { type: String, required: true },
    patient_name: { type: String, required: true },
    doctor_name: { type: String, required: true },
}, { 
    timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" } 
})

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default paymentModel;