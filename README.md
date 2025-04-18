# MedMonitor 🩺💊

**MedMonitor** is a smart medicine monitoring and counterfeit detection system designed to ensure the authenticity of pharmaceutical products. By integrating barcode scanning, data validation, and secure storage mechanisms, it helps manufacturers, pharmacies, and regulators track and verify medicines throughout the supply chain.

---

## 🔍 Features

- ✅ Unique barcode generation and scanning for each medicine
- 📦 Medicine data storage with batch number, expiry, manufacturer, etc.
- 🔐 Data security through hashing (using Python's `hashlib`)
- 🧠 OpenCV-powered barcode recognition
- 🗃️ Centralized database lookup to detect duplicates or fakes
- 🌐 REST API support for integration with third-party systems
- 🛡️ Blockchain-ready structure for future-proof traceability

---

## 🛠️ Tech Stack

| Component       | Tech Used              |
|----------------|------------------------|
| Frontend       | React.js               |
| Backend        | Node.js + Express      |
| Database       | MySQL / MongoDB        |
| Image Handling | OpenCV (Python)        |
| Security       | Python (`hashlib`)     |
| APIs           | RESTful APIs           |

---

## 🚀 How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/Raghavendransahana/Medmonitor.git
   cd Medmonitor
