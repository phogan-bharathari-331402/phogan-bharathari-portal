# फोगां भारथरी पोर्टल — Phogan Bharathari 331402

वेबसाइट: https://phogan-bharathari-331402.github.io/phogan-bharathari-portal/

यह React + Vite आधारित ग्राम विकास पोर्टल है।

## चलाने के लिए
- Node.js 20+
- `npm install`
- `.env.example` को `.env` नाम से कॉपी करें
- `VITE_SUPABASE_URL` और `VITE_SUPABASE_ANON_KEY` भरें
- `npm run dev`

## जरूरी सुरक्षा नोट
- केवल Publishable/anon key browser में रखें। service_role key कभी नहीं।
- Supabase Email OTP/Magic Link के लिए सार्वजनिक ईमेल भेजना हो तो custom SMTP सेट करना पड़ सकता है।
- मौजूदा RLS policies और table schema की जाँच के बाद ही complaint/suggestion forms और admin dashboard जोड़ें।
- अभी SMS OTP नहीं जोड़ा गया है।
