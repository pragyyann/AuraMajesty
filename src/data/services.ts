export interface ServiceItem {
  id: string;
  genderGroup: "Ladies" | "Gents" | "Unisex";
  category: string;
  name: string;
  duration: string;
  description?: string;
  consultationBased?: boolean;
}

export const categoryDescriptions: Record<string, string> = {
  "Hair Styling": "Precision cuts, styling and care for everyday elegance.",
  "Make Up & Glam": "Occasion-ready makeup crafted for refined beauty.",
  "Hair Texture": "Texture, smoothing and transformation services for polished hair.",
  "Hair Treatments": "Repair, nourishment and scalp-focused rituals for healthier-looking hair.",
  "Facials & Rituals": "Skin rituals designed for glow, cleanup and rejuvenation.",
  "Hand & Feet": "Grooming and care rituals for hands, feet and skin comfort.",
  "Nail Care": "Clean finishing and stylish nail detailing.",
  "Hair Cut & Finish": "Sharp cuts, styling and finishing for everyday grooming.",
  "Hair Colour": "Colour services for hair and beard with a polished finish.",
  "Skin Care": "Cleanups, facials and grooming rituals for fresh skin.",
  "Beard Grooming": "Beard trimming, shaping and shave rituals for a sharper finish.",
  "Popular Services": "Frequently requested services at Aura Majesty Studio."
};

export const servicesData: ServiceItem[] = [
  // ==================== LADIES SERVICES ====================
  // Hair Styling
  { id: "l-hs-1", genderGroup: "Ladies", category: "Hair Styling", name: "Hair Cut", duration: "45 mins" },
  { id: "l-hs-2", genderGroup: "Ladies", category: "Hair Styling", name: "Hair Cut with Wash & Blow Dry", duration: "60 mins" },
  { id: "l-hs-3", genderGroup: "Ladies", category: "Hair Styling", name: "Blow Dry & Styling", duration: "30 mins" },
  { id: "l-hs-4", genderGroup: "Ladies", category: "Hair Styling", name: "Hair Ironing / Tonging", duration: "30 mins" },
  { id: "l-hs-5", genderGroup: "Ladies", category: "Hair Styling", name: "Global Hair Colouring", duration: "120 mins", consultationBased: true },
  { id: "l-hs-6", genderGroup: "Ladies", category: "Hair Styling", name: "Root Touch Up", duration: "60 mins" },
  { id: "l-hs-7", genderGroup: "Ladies", category: "Hair Styling", name: "Shampoo & Conditioning", duration: "20 mins" },
  { id: "l-hs-8", genderGroup: "Ladies", category: "Hair Styling", name: "Deep Conditioning", duration: "30 mins" },
  { id: "l-hs-9", genderGroup: "Ladies", category: "Hair Styling", name: "Head Massage", duration: "30 mins" },
  { id: "l-hs-10", genderGroup: "Ladies", category: "Hair Styling", name: "Roller Setting", duration: "45 mins" },
  { id: "l-hs-11", genderGroup: "Ladies", category: "Hair Styling", name: "Hair Oiling", duration: "25 mins" },

  // Make Up & Glam
  { id: "l-mug-1", genderGroup: "Ladies", category: "Make Up & Glam", name: "Party Make Up", duration: "90 mins" },
  { id: "l-mug-2", genderGroup: "Ladies", category: "Make Up & Glam", name: "Engagement Make Up", duration: "120 mins" },
  { id: "l-mug-3", genderGroup: "Ladies", category: "Make Up & Glam", name: "Bridal & Reception Make Up", duration: "180 mins", consultationBased: true },
  { id: "l-mug-4", genderGroup: "Ladies", category: "Make Up & Glam", name: "Base Make Up", duration: "45 mins" },
  { id: "l-mug-5", genderGroup: "Ladies", category: "Make Up & Glam", name: "Eye Make Up", duration: "35 mins" },
  { id: "l-mug-6", genderGroup: "Ladies", category: "Make Up & Glam", name: "HD Make Up", duration: "120 mins", consultationBased: true },
  { id: "l-mug-7", genderGroup: "Ladies", category: "Make Up & Glam", name: "Hair Styling for Events", duration: "45 mins" },
  { id: "l-mug-8", genderGroup: "Ladies", category: "Make Up & Glam", name: "Saree Draping", duration: "30 mins" },

  // Hair Texture
  { id: "l-ht-1", genderGroup: "Ladies", category: "Hair Texture", name: "Rebonding", duration: "180 mins", consultationBased: true },
  { id: "l-ht-2", genderGroup: "Ladies", category: "Hair Texture", name: "Permanent Rebonding", duration: "180 mins", consultationBased: true },
  { id: "l-ht-3", genderGroup: "Ladies", category: "Hair Texture", name: "Smoothening", duration: "150 mins", consultationBased: true },
  { id: "l-ht-4", genderGroup: "Ladies", category: "Hair Texture", name: "Keratin Treatment", duration: "150 mins", consultationBased: true },
  { id: "l-ht-5", genderGroup: "Ladies", category: "Hair Texture", name: "Protein Treatment", duration: "150 mins", consultationBased: true },
  { id: "l-ht-6", genderGroup: "Ladies", category: "Hair Texture", name: "Colour Protection Therapy", duration: "90 mins" },
  { id: "l-ht-7", genderGroup: "Ladies", category: "Hair Texture", name: "Glamour Perming", duration: "120 mins" },
  { id: "l-ht-8", genderGroup: "Ladies", category: "Hair Texture", name: "Perming", duration: "120 mins" },

  // Hair Treatments
  { id: "l-htm-1", genderGroup: "Ladies", category: "Hair Treatments", name: "Hair Spa", duration: "60 mins" },
  { id: "l-htm-2", genderGroup: "Ladies", category: "Hair Treatments", name: "Advanced Hair Moisturising", duration: "60 mins" },
  { id: "l-htm-3", genderGroup: "Ladies", category: "Hair Treatments", name: "Scalp Treatment", duration: "60 mins" },
  { id: "l-htm-4", genderGroup: "Ladies", category: "Hair Treatments", name: "Volumizing Treatment", duration: "60 mins" },
  { id: "l-htm-5", genderGroup: "Ladies", category: "Hair Treatments", name: "Anti-Dandruff Treatment", duration: "60 mins" },
  { id: "l-htm-6", genderGroup: "Ladies", category: "Hair Treatments", name: "Hair Fall Control Ritual", duration: "60 mins" },
  { id: "l-htm-7", genderGroup: "Ladies", category: "Hair Treatments", name: "Colour Care Treatment", duration: "60 mins" },
  { id: "l-htm-8", genderGroup: "Ladies", category: "Hair Treatments", name: "Deep Repair Treatment", duration: "75 mins" },

  // Facials & Rituals
  { id: "l-fr-1", genderGroup: "Ladies", category: "Facials & Rituals", name: "Bleach", duration: "30 mins" },
  { id: "l-fr-2", genderGroup: "Ladies", category: "Facials & Rituals", name: "Clean Up", duration: "45 mins" },
  { id: "l-fr-3", genderGroup: "Ladies", category: "Facials & Rituals", name: "Luxury Facial / Ritual", duration: "75 mins" },
  { id: "l-fr-4", genderGroup: "Ladies", category: "Facials & Rituals", name: "Brightening Facial", duration: "60 mins" },
  { id: "l-fr-5", genderGroup: "Ladies", category: "Facials & Rituals", name: "Hydrating Facial", duration: "60 mins" },
  { id: "l-fr-6", genderGroup: "Ladies", category: "Facials & Rituals", name: "Anti-Ageing Facial", duration: "75 mins" },
  { id: "l-fr-7", genderGroup: "Ladies", category: "Facials & Rituals", name: "Body Polishing / Rejuvenation", duration: "90 mins", consultationBased: true },
  { id: "l-fr-8", genderGroup: "Ladies", category: "Facials & Rituals", name: "Threading", duration: "15 mins" },
  { id: "l-fr-9", genderGroup: "Ladies", category: "Facials & Rituals", name: "Face Waxing", duration: "20 mins" },

  // Hand & Feet
  { id: "l-hf-1", genderGroup: "Ladies", category: "Hand & Feet", name: "Manicure", duration: "35 mins" },
  { id: "l-hf-2", genderGroup: "Ladies", category: "Hand & Feet", name: "Spa Manicure", duration: "45 mins" },
  { id: "l-hf-3", genderGroup: "Ladies", category: "Hand & Feet", name: "Pedicure", duration: "40 mins" },
  { id: "l-hf-4", genderGroup: "Ladies", category: "Hand & Feet", name: "Spa Pedicure", duration: "50 mins" },
  { id: "l-hf-5", genderGroup: "Ladies", category: "Hand & Feet", name: "Waxing", duration: "45 mins" },
  { id: "l-hf-6", genderGroup: "Ladies", category: "Hand & Feet", name: "Full Arms Waxing", duration: "30 mins" },
  { id: "l-hf-7", genderGroup: "Ladies", category: "Hand & Feet", name: "Full Legs Waxing", duration: "45 mins" },
  { id: "l-hf-8", genderGroup: "Ladies", category: "Hand & Feet", name: "Underarms Waxing", duration: "15 mins" },

  // Nail Care
  { id: "l-nc-1", genderGroup: "Ladies", category: "Nail Care", name: "Nail Paint", duration: "20 mins" },
  { id: "l-nc-2", genderGroup: "Ladies", category: "Nail Care", name: "Nail Art", duration: "45 mins", consultationBased: true },
  { id: "l-nc-3", genderGroup: "Ladies", category: "Nail Care", name: "Nail Filling", duration: "45 mins" },
  { id: "l-nc-4", genderGroup: "Ladies", category: "Nail Care", name: "Gel Polish", duration: "45 mins" },
  { id: "l-nc-5", genderGroup: "Ladies", category: "Nail Care", name: "Nail Extension", duration: "90 mins", consultationBased: true },
  { id: "l-nc-6", genderGroup: "Ladies", category: "Nail Care", name: "Nail Removal", duration: "30 mins" },


  // ==================== GENTS SERVICES ====================
  // Hair Cut & Finish
  { id: "g-hcf-1", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Cut and Hair Care", duration: "30 mins" },
  { id: "g-hcf-2", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Hair Cut with Wash", duration: "35 mins" },
  { id: "g-hcf-3", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Shampoo & Conditioning", duration: "20 mins" },
  { id: "g-hcf-4", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Head Massage", duration: "30 mins" },
  { id: "g-hcf-5", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Beard Styling", duration: "20 mins" },
  { id: "g-hcf-6", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Hair / Beard Colouring", duration: "45 mins" },
  { id: "g-hcf-7", genderGroup: "Gents", category: "Hair Cut & Finish", name: "Hair Styling", duration: "20 mins" },

  // Hair Colour
  { id: "g-hc-1", genderGroup: "Gents", category: "Hair Colour", name: "Hair Colour", duration: "60 mins" },
  { id: "g-hc-2", genderGroup: "Gents", category: "Hair Colour", name: "Ammonia Free Hair Colour", duration: "75 mins" },
  { id: "g-hc-3", genderGroup: "Gents", category: "Hair Colour", name: "Hi-Lites", duration: "90 mins", consultationBased: true },
  { id: "g-hc-4", genderGroup: "Gents", category: "Hair Colour", name: "Beard Colour", duration: "30 mins" },
  { id: "g-hc-5", genderGroup: "Gents", category: "Hair Colour", name: "Global Hair Colour", duration: "120 mins", consultationBased: true },
  { id: "g-hc-6", genderGroup: "Gents", category: "Hair Colour", name: "Root Touch Up", duration: "45 mins" },

  // Hair Texture
  { id: "g-ht-1", genderGroup: "Gents", category: "Hair Texture", name: "Straightening", duration: "150 mins", consultationBased: true },
  { id: "g-ht-2", genderGroup: "Gents", category: "Hair Texture", name: "Smoothening", duration: "150 mins", consultationBased: true },
  { id: "g-ht-3", genderGroup: "Gents", category: "Hair Texture", name: "Rebonding", duration: "180 mins", consultationBased: true },
  { id: "g-ht-4", genderGroup: "Gents", category: "Hair Texture", name: "Perming", duration: "120 mins" },
  { id: "g-ht-5", genderGroup: "Gents", category: "Hair Texture", name: "Keratin Treatment", duration: "150 mins", consultationBased: true },

  // Hair Treatments
  { id: "g-htm-1", genderGroup: "Gents", category: "Hair Treatments", name: "Hair Spa", duration: "60 mins" },
  { id: "g-htm-2", genderGroup: "Gents", category: "Hair Treatments", name: "Advanced Moisturising", duration: "60 mins" },
  { id: "g-htm-3", genderGroup: "Gents", category: "Hair Treatments", name: "Scalp Treatment", duration: "60 mins" },
  { id: "g-htm-4", genderGroup: "Gents", category: "Hair Treatments", name: "Colour Protection", duration: "60 mins" },
  { id: "g-htm-5", genderGroup: "Gents", category: "Hair Treatments", name: "Anti-Dandruff Treatment", duration: "60 mins" },
  { id: "g-htm-6", genderGroup: "Gents", category: "Hair Treatments", name: "Hair Fall Control Ritual", duration: "60 mins" },

  // Skin Care
  { id: "g-sc-1", genderGroup: "Gents", category: "Skin Care", name: "Clean Up", duration: "45 mins" },
  { id: "g-sc-2", genderGroup: "Gents", category: "Skin Care", name: "Facial", duration: "60 mins" },
  { id: "g-sc-3", genderGroup: "Gents", category: "Skin Care", name: "Organic Treatment", duration: "60 mins" },
  { id: "g-sc-4", genderGroup: "Gents", category: "Skin Care", name: "De-Tan", duration: "30 mins" },
  { id: "g-sc-5", genderGroup: "Gents", category: "Skin Care", name: "Manicure", duration: "35 mins" },
  { id: "g-sc-6", genderGroup: "Gents", category: "Skin Care", name: "Pedicure", duration: "40 mins" },

  // Beard Grooming
  { id: "g-bg-1", genderGroup: "Gents", category: "Beard Grooming", name: "Beard Trim", duration: "15 mins" },
  { id: "g-bg-2", genderGroup: "Gents", category: "Beard Grooming", name: "Beard Colour", duration: "30 mins" },
  { id: "g-bg-3", genderGroup: "Gents", category: "Beard Grooming", name: "Beard Styling", duration: "20 mins" },
  { id: "g-bg-4", genderGroup: "Gents", category: "Beard Grooming", name: "Shave", duration: "20 mins" },
  { id: "g-bg-5", genderGroup: "Gents", category: "Beard Grooming", name: "Luxury Shave", duration: "30 mins" },
  { id: "g-bg-6", genderGroup: "Gents", category: "Beard Grooming", name: "Luxury Shave & Beard Spa", duration: "45 mins" },


  // ==================== UNISEX / POPULAR SERVICES ====================
  // Popular Services
  { id: "u-ps-1", genderGroup: "Unisex", category: "Popular Services", name: "Hair Cut", duration: "45 mins" },
  { id: "u-ps-2", genderGroup: "Unisex", category: "Popular Services", name: "Hair Spa", duration: "60 mins" },
  { id: "u-ps-3", genderGroup: "Unisex", category: "Popular Services", name: "Hair Colour Consultation", duration: "30 mins", consultationBased: true },
  { id: "u-ps-4", genderGroup: "Unisex", category: "Popular Services", name: "Skin Clean Up", duration: "45 mins" },
  { id: "u-ps-5", genderGroup: "Unisex", category: "Popular Services", name: "Party Make Up", duration: "90 mins" },
  { id: "u-ps-6", genderGroup: "Unisex", category: "Popular Services", name: "Beard Styling", duration: "20 mins" },
  { id: "u-ps-7", genderGroup: "Unisex", category: "Popular Services", name: "Bridal Consultation", duration: "45 mins", consultationBased: true },
  { id: "u-ps-8", genderGroup: "Unisex", category: "Popular Services", name: "Hair Smoothening Consultation", duration: "30 mins", consultationBased: true }
];
