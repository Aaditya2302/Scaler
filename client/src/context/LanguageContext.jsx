import React, { createContext, useContext, useState } from 'react';

// Basic translations dictionary
const translations = {
  EN: {
    "deliver_to": "Deliver to",
    "search_placeholder": "Search Amazon.in",
    "all": "All",
    "hello": "Hello,",
    "account_lists": "Account & Lists",
    "returns": "Returns",
    "orders": "& Orders",
    "cart": "Cart",
    "deals_saved": "Deals related to items you've saved",
    "revamp_home": "Revamp your home in style",
    "up_to_60": "Up to 60% off | Footwear & handbags",
    "up_to_75": "Up to 75% off | Headphones",
    "see_more": "See more deals",
    "explore_all": "Explore all",
    "see_all": "See all offers",
    "shop_now": "Shop Now"
  },
  HI: {
    "deliver_to": "यहां डिलीवर करें",
    "search_placeholder": "Amazon.in पर खोजें",
    "all": "सभी",
    "hello": "नमस्ते,",
    "account_lists": "खाता और सूचियां",
    "returns": "रिटर्न",
    "orders": "और ऑर्डर",
    "cart": "कार्ट",
    "deals_saved": "आपके द्वारा सहेजी गई वस्तुओं से संबंधित सौदे",
    "revamp_home": "अपने घर को स्टाइल से सजाएं",
    "up_to_60": "60% तक की छूट | जूते और हैंडबैग",
    "up_to_75": "75% तक की छूट | हेडफ़ोन",
    "see_more": "और सौदे देखें",
    "explore_all": "सब देखें",
    "see_all": "सभी ऑफ़र देखें",
    "shop_now": "अभी खरीदें"
  },
  TA: {
    "deliver_to": "வழங்கும் இடம்",
    "search_placeholder": "Amazon.in-ல் தேடுங்கள்",
    "all": "அனைத்தும்",
    "hello": "வணக்கம்,",
    "account_lists": "கணக்கு & பட்டியல்கள்",
    "returns": "திரும்பியவை",
    "orders": "& ஆர்டர்கள்",
    "cart": "கார்ட்",
    "deals_saved": "நீங்கள் சேமித்த பொருட்களை தொடர்பான டீல்கள்",
    "revamp_home": "உங்கள் வீட்டை ஸ்டைலாக மாற்றுங்கள்",
    "up_to_60": "60% வரை சலுகை | காலணிகள் & கைப்பை",
    "up_to_75": "75% வரை சலுகை | ஹெட்ஃபோன்கள்",
    "see_more": "மேலும் டீல்களைக் காண்க",
    "explore_all": "அனைத்தையும் ஆராயுங்கள்",
    "see_all": "அனைத்து சலுகைகளையும் காண்க",
    "shop_now": "இப்போது வாங்கு"
  },
  TE: {
    "deliver_to": "ఇక్కడ డెలివరీ చేయండి",
    "search_placeholder": "Amazon.inలో వెతకండి",
    "all": "అన్నీ",
    "hello": "హలో,",
    "account_lists": "ఖాతా & జాబితాలు",
    "returns": "రిటర్న్స్",
    "orders": "& ఆర్డర్స్",
    "cart": "కార్ట్",
    "deals_saved": "మీరు సేవ్ చేసిన వాటికి సంబంధించిన డీల్స్",
    "revamp_home": "మీ ఇంటికి కొత్త లుక్ ఇవ్వండి",
    "up_to_60": "60% వరకు తగ్గింపు | బూట్లు & హ్యాండ్‌బ్యాగ్‌లు",
    "up_to_75": "75% వరకు తగ్గింపు | హెడ్‌ఫోన్స్",
    "see_more": "మరిన్ని డీల్స్ చూడండి",
    "explore_all": "అన్నీ చూడండి",
    "see_all": "ఆఫర్లు అన్నీ చూడండి",
    "shop_now": "ఇప్పుడే కొనండి"
  },
  KN: {
    "deliver_to": "ಇಲ್ಲಿಗೆ ತಲುಪಿಸಿ",
    "search_placeholder": "Amazon.in ನಲ್ಲಿ ಹುಡುಕಿ",
    "all": "ಎಲ್ಲಾ",
    "hello": "ನಮಸ್ಕಾರ,",
    "account_lists": "ಖಾತೆ ಮತ್ತು ಪಟ್ಟಿಗಳು",
    "returns": "ರಿಟರ್ನ್ಸ್",
    "orders": "ಮತ್ತು ಆರ್ಡರ್‌ಗಳು",
    "cart": "ಕಾರ್ಟ್",
    "deals_saved": "ನೀವು ಉಳಿಸಿದ ವಸ್ತುಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಡೀಲ್‌ಗಳು",
    "revamp_home": "ನಿಮ್ಮ ಮನೆಯನ್ನು ಶೈಲಿಯೊಂದಿಗೆ ಬದಲಾಯಿಸಿ",
    "up_to_60": "60% ವರೆಗೆ ರಿಯಾಯಿತಿ | ಪಾದರಕ್ಷೆ ಮತ್ತು ಕೈಚೀಲಗಳು",
    "up_to_75": "75% ವರೆಗೆ ರಿಯಾಯಿತಿ | ಹೆಡ್‌ಫೋನ್‌ಗಳು",
    "see_more": "ಹೆಚ್ಚು ಡೀಲ್‌ಗಳನ್ನು ನೋಡಿ",
    "explore_all": "ಎಲ್ಲವನ್ನೂ ಅನ್ವೇಷಿಸಿ",
    "see_all": "ಎಲ್ಲಾ ಆಫರ್‌ಗಳನ್ನು ನೋಡಿ",
    "shop_now": "ಈಗಲೇ ಖರೀದಿಸಿ"
  },
  ML: {
    "deliver_to": "ഇവിടെ ഡെലിവർ ചെയ്യുക",
    "search_placeholder": "Amazon.in-ൽ തിരയുക",
    "all": "എല്ലാം",
    "hello": "നമസ്കാരം,",
    "account_lists": "അക്കൗണ്ടും ലിസ്റ്റുകളും",
    "returns": "റിട്ടേണുകൾ",
    "orders": "& ഓർഡറുകൾ",
    "cart": "കാർട്ട്",
    "deals_saved": "നിങ്ങൾ സേവ് ചെയ്തവയുമായി ബന്ധപ്പെട്ട ഡീലുകൾ",
    "revamp_home": "നിങ്ങളുടെ വീടിന് പുതിയ സ്റ്റൈൽ",
    "up_to_60": "60% വരെ കിഴിവ് | പാദരക്ഷകളും ഹാൻഡ്ബാഗുകളും",
    "up_to_75": "75% വരെ കിഴിവ് | ഹെഡ്ഫോണുകൾ",
    "see_more": "കൂടുതൽ ഡീലുകൾ കാണുക",
    "explore_all": "എല്ലാം പരിശോധിക്കുക",
    "see_all": "എല്ലാ ഓഫറുകളും കാണുക",
    "shop_now": "ഇപ്പോൾ വാങ്ങുക"
  },
  BN: {
    "deliver_to": "এখানে ডেলিভার করুন",
    "search_placeholder": "Amazon.in-এ খুঁজুন",
    "all": "সব",
    "hello": "হ্যালো,",
    "account_lists": "অ্যাকাউন্ট এবং তালিকা",
    "returns": "রিটার্ন",
    "orders": "এবং অর্ডার",
    "cart": "কার্ট",
    "deals_saved": "আপনার সংরক্ষিত আইটেম সম্পর্কিত ডিল",
    "revamp_home": "আপনার বাড়ি নতুন করে সাজান",
    "up_to_60": "60% পর্যন্ত ছাড় | জুতো এবং হ্যান্ডব্যাগ",
    "up_to_75": "75% পর্যন্ত ছাড় | হেডফোন",
    "see_more": "আরও ডিল দেখুন",
    "explore_all": "সব এক্সপ্লোর করুন",
    "see_all": "সব অফার দেখুন",
    "shop_now": "এখনই কিনুন"
  },
  MR: {
    "deliver_to": "येथे डिलिव्हर करा",
    "search_placeholder": "Amazon.in वर शोधा",
    "all": "सर्व",
    "hello": "नमस्कार,",
    "account_lists": "खाते आणि याद्या",
    "returns": "रिटर्न",
    "orders": "आणि ऑर्डर्स",
    "cart": "कार्ट",
    "deals_saved": "तुम्ही सेव्ह केलेल्या वस्तूंशी संबंधित डील्स",
    "revamp_home": "तुमचे घर स्टाईलने सजवा",
    "up_to_60": "६०% पर्यंत सूट | पादत्राणे आणि हँडबॅग्ज",
    "up_to_75": "७५% पर्यंत सूट | हेडफोन्स",
    "see_more": "अधिक डील्स पहा",
    "explore_all": "सर्व एक्सप्लोर करा",
    "see_all": "सर्व ऑफर्स पहा",
    "shop_now": "आता खरेदी करा"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN');

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
