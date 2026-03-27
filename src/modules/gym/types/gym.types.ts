export type GymCategory = 'BASIC' | 'STANDARD' | 'PREMIUM';

export interface GymFacility {
  id: string;
  label: string;
}

export interface GymApplicationData {
  // Section 1: Gym Information
  gymName: string;
  city: string;
  fullAddress: string;
  contactPhone: string;
  officialEmail: string;

  // Section 2: Owner / Representative Details
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;

  // Section 3: Gym Category Request
  category: GymCategory;

  // Section 4: Facilities & Standards
  facilities: string[]; // array of facility IDs

  // Section 5: Document Uploads (mapped to File objects or names)
  documents: {
    businessRegistration: File | null | string;
    ownerIdentityProof: File | null | string;
    addressProof: File | null | string;
    gymLicense: File | null | string;
    gymInsurance: File | null | string;
  };

  // Section 6: Bank Details
  bankDetails: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };

  // Section 7: Confirmation
  agreedToTerms: boolean;
}
