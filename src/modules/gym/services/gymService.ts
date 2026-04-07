import axios from "axios";
import type { GymApplicationData } from "../types/gym.types";

const API_URL = "http://localhost:5000/api/gyms"; // Adjust according to your backend

export const submitGymApplication = async (data: GymApplicationData) => {
  const formData = new FormData();

  // Append simple fields
  formData.append("gymName", data.gymName);
  formData.append("city", data.city);
  formData.append("fullAddress", data.fullAddress);
  formData.append("contactPhone", data.contactPhone);
  formData.append("officialEmail", data.officialEmail);
  formData.append("ownerName", data.ownerName);
  formData.append("ownerContact", data.ownerContact);
  formData.append("ownerEmail", data.ownerEmail);
  formData.append("category", data.category);
  formData.append("bankDetails", JSON.stringify(data.bankDetails));
  formData.append("facilities", JSON.stringify(data.facilities));
  formData.append("agreedToTerms", String(data.agreedToTerms));

  // Append documents
  if (data.documents.businessRegistration instanceof File) {
    formData.append("businessRegistration", data.documents.businessRegistration);
  }
  if (data.documents.ownerIdentityProof instanceof File) {
    formData.append("ownerIdentityProof", data.documents.ownerIdentityProof);
  }
  if (data.documents.addressProof instanceof File) {
    formData.append("addressProof", data.documents.addressProof);
  }
  if (data.documents.gymLicense instanceof File) {
    formData.append("gymLicense", data.documents.gymLicense);
  }
  if (data.documents.gymInsurance instanceof File) {
    formData.append("gymInsurance", data.documents.gymInsurance);
  }

  const response = await axios.post(`${API_URL}/apply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ─── Registration Flow ────────────────────────────────────────────────────────

export const verifyRegistrationToken = async (token: string): Promise<any> => {
  const res = await axios.get(`${API_URL}/registration/verify?token=${token}`);
  return res.data.data;
};

export const completeRegistration = async (data: any): Promise<any> => {
  const res = await axios.post(`${API_URL}/registration/complete`, data);
  return res.data;
};
