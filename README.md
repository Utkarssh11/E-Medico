# E-Medico — Smart Online Pharmacy Platform

**E-Medico** is a modern, secure, and fully responsive web application that enables users to search, upload prescriptions, and order medicines online. It features real-time pharmacy availability, prescription verification, and a smooth, animated UI designed for a professional medical experience.

---

## Features

### User Management
- Register/Login with email, phone, or social accounts
- Profile dashboard with order history, saved addresses, and payment methods
- Password encryption and secure authentication

### Medicine Catalog & Cart
- Search medicines by name, symptoms, or brand
- Add/edit/delete items in a dynamic cart
- Show alternatives, pricing, and availability

### Prescription Upload
- Upload or capture a doctor's prescription
- OCR integration to read medicine names and dosages
- Manual review and correction supported
- Secure and compliant prescription storage (GDPR-ready)

### Nearby Pharmacy Locator
- Use geolocation to find nearby pharmacies
- Filters: delivery available, open now, ratings
- Maps API integrated for a visual location view

### Checkout & Payment
- Choose between delivery or pickup
- Pay using cards, wallets, UPI (via Stripe/Razorpay/Paytm)
- Realtime order tracking and email/SMS notifications

### Theme Support
- Light/Dark mode toggle with smooth transitions
- LocalStorage saves preferred theme
- Fully styled and responsive in both modes

## Project Structure

```

/src
│
├── index.html                # Base HTML file
├── index.tsx                 # Main React app entry
├── auth.tsx                  # Login/Register components
├── cart.tsx                  # Cart logic and display
├── data\_object.ts            # Sample medicine and pharmacy data
├── metadata.json             # Config, themes, prescription rules
├── uploadPrescription.tsx    # OCR + image upload
├── pharmacyLocator.ts        # Geolocation logic
├── notifications.ts          # Push/email setup
├── components/
│   ├── HomePage.tsx          # Landing page with hero/search
│   ├── MedicineCatalog.tsx   # Medicine listing page
│   └── SearchBar.tsx         # Modern search input (used globally)
└── styles/
└── index.css             # Global styles and overrides

