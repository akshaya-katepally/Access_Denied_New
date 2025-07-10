
### **Title**

**Access Denied: A Role-Based User Authentication and Intrusion Simulation System**

---

### **Abstract**

This paper presents *Access Denied*, a lightweight role-based access control system designed to simulate unauthorized access attempts and basic intrusion detection. The system supports login validation for multiple user roles (admin, user), logs access attempts, and can be extended for additional authentication features such as OTP or facial recognition. Developed in Python, the system demonstrates foundational concepts in cybersecurity, user authentication, and access management.

---

### **Keywords**

authentication, access control, intrusion simulation, login system, cybersecurity, Python

---

### **I. Introduction**

Unauthorized access is a common threat across digital systems, leading to data theft, corruption, or system exploitation. Traditional authentication mechanisms provide access based on credentials, but often lack simulation environments for testing security resilience. This project, *Access Denied*, is built to address this by offering a console-based login system that not only validates credentials but also simulates failed login scenarios and records them for audit purposes.

---

### **II. System Features**

The system was built to serve as a foundational cybersecurity tool, focusing on:

* Role-based login: supports both admin and general user roles
* Credential storage using JSON or CSV
* Input validation and hardcoded protection against basic brute-force
* Intrusion simulation through fake or incorrect login attempts
* Activity logging for all failed accesses
* Extendable design for GUI or additional authentication factors

---

### **III. Methodology**

**A. Login Authentication**
Users are prompted to enter usernames and passwords. Depending on their role, access is granted to different menus or command paths.

**B. Credential Storage**
A local file (e.g., `credentials.json`) stores login data. Passwords may be stored in plain text for simplicity, but the system can be extended with hash-based encryption.

**C. Intrusion Logging**
Every failed login attempt is written to a `logs.txt` file with timestamp and attempted credentials (obfuscated if needed).

**D. GUI Integration (Optional)**
Tkinter was optionally used to develop a graphical interface that replicates the console version.

---

### **IV. Implementation**

* **Language Used:** Python 3.x
* **Libraries:** JSON, Logging, Tkinter (optional)
* **Authentication Design:** Hardcoded user-role mappings (can be converted to database)
* **Security Model:** Single-factor with simulation, but extendable

Sample command-line output:

```
Enter username: guest
Access Denied.
[2025-07-10 10:23] Failed login attempt by guest
```

---

### **V. Results and Discussion**

The system successfully demonstrates:

* Clear differentiation between authorized and unauthorized users
* Logging of unauthorized access attempts
* Modular design for future improvements
* Can be used in academic or training environments for cybersecurity basics

While simple in nature, it is an ideal platform to build more secure authentication systems or demonstrate the flaws in naïve security logic.

---

### **VI. Future Work**

Planned enhancements include:

* Password hashing using bcrypt or hashlib
* OTP-based two-factor authentication
* Biometric authentication (face recognition)
* Integration with SQLite for scalable credential management
* Real-time alert system for repeated intrusion attempts

---

### **Acknowledgment**

I would like to thank the faculty of \[Your Institution Name] for their guidance in understanding authentication systems and system-level security. This project also benefited from resources provided by the Python community.

---

### **References**

1. W. Stallings, *Cryptography and Network Security*, Pearson, 2016.
2. Python Docs - `logging` module: [https://docs.python.org/3/library/logging.html](https://docs.python.org/3/library/logging.html)
3. OWASP Authentication Cheat Sheet: [https://cheatsheetseries.owasp.org/](https://cheatsheetseries.owasp.org/)
4. Tkinter GUI Reference: [https://docs.python.org/3/library/tkinter.html](https://docs.python.org/3/library/tkinter.html)
