# HealthCart Project - README

## Overview

HealthCart is an innovative platform designed to assist healthcare professionals and patients with managing health-related data, prescriptions, and user interactions. This project aims to provide a dashboard where doctors can manage prescriptions, view patient information, and interact with a user database. The system implements role-based access control to ensure that different user types (e.g., doctors, admins, patients) have access to appropriate features. The goal of HealthCart is to provide a seamless, efficient, and secure experience for all users involved in the healthcare ecosystem.
Live link :- https://healthcart-sigma.vercel.app/
---

## Goal

The primary goals of the HealthCart project are:

1. **Doctor Dashboard**: A secure dashboard where doctors can:
   - View patients’ health data (excluding admin accounts).
   - Write and manage prescriptions.
   - Track ongoing treatments and health conditions.
   
2. **Role-Based Access Control (RBAC)**: The system uses RBAC to ensure that users can access only the features appropriate for their role (e.g., doctors, admins, patients).
   
3. **Prescription Management**: Doctors can create and submit prescriptions for patients, ensuring the treatment process is tracked efficiently.

4. **User Authentication**: Secure user authentication using JWT tokens to prevent unauthorized access and ensure the privacy of sensitive health information.

5. **System for Patients**: Users (patients) can securely view their prescriptions and health details, ensuring they have all the information they need for their healthcare.

---

## Requirements

To get started with the HealthCart project, you'll need to meet the following requirements:

### **Software Requirements:**
1. **Node.js** (version 14 or higher) - Used for running the backend and frontend servers.
2. **npm** (Node Package Manager) - Required to install the dependencies for the project.
3. **React** (version 17 or higher) - Frontend library used to build the user interface.
4. **Next.js** (version 12 or higher) - React framework used for building the project.
5. **MongoDB** (or any NoSQL Database) - Used for storing user data, prescriptions, and other healthcare-related information.
6. **JWT (JSON Web Tokens)** - For secure user authentication and role-based access control.
7. **Tailwind CSS** - Utility-first CSS framework for styling the frontend.

### **Hardware Requirements:**
1. A computer with at least 4GB of RAM.
2. Stable internet connection to install dependencies and interact with remote databases if necessary.

---

## Setup and Installation

Follow the steps below to set up and install the HealthCart project on your local machine:

### **Step 1: Clone the Repository**
Clone the HealthCart repository from GitHub to your local machine:

```bash
git clone https://github.com/yourusername/healthcart.git
cd healthcart
```

### **Step 2: Install Dependencies**
In the project directory, run the following command to install all necessary dependencies:

```bash
npm install
```

This will install all the required libraries and packages specified in the `package.json` file.

### **Step 3: Set Up Environment Variables**
Create a `.env` file in the root directory and add the following environment variables for configuration:

```
MONGODB_URI=mongodb://localhost:27017/healthcart
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

Make sure to replace `your-jwt-secret-key` with a strong secret key for JWT encryption.

### **Step 4: Start the Development Server**
Run the following command to start the development server:

```bash
npm run dev
```

This will start the application in development mode and you can access it via `http://localhost:3000` in your web browser.

---

## System Architecture

The HealthCart system is built with a client-server architecture:

1. **Frontend (React / Next.js)**: The frontend is responsible for displaying user interfaces and handling user interactions. It communicates with the backend through HTTP requests.
2. **Backend (Node.js / Express)**: The backend handles the business logic, including user authentication, prescription management, and role-based access control. It communicates with the database to store and retrieve data.
3. **Database (MongoDB)**: MongoDB is used as the database to store user data, prescriptions, and other related information.
4. **Authentication (JWT)**: JSON Web Tokens (JWT) are used for user authentication. When a user logs in, they receive a token that must be included in future requests to validate their identity and access permissions.

---

## User Roles and Permissions

### 1. **Admin**:
   - Full access to all system features.
   - Can manage all users (create, update, delete users).
   - Can configure system settings and manage roles.

### 2. **Doctor**:
   - Can view patients' health records, write prescriptions, and submit them to the system.
   - Cannot manage admin accounts or system-wide settings.

### 3. **User (Patient)**:
   - Can view their own prescriptions and health-related data.
   - Cannot create or manage prescriptions.

---

## Key System Features

### 1. **User Authentication**
   - JWT-based authentication system to securely log users in and protect sensitive routes.
   - Users can sign up, log in, and log out with their credentials.

### 2. **Role-Based Access Control (RBAC)**
   - Admins, doctors, and patients have distinct roles and corresponding permissions.
   - Role-specific features ensure that unauthorized users cannot access sensitive information.

### 3. **Doctor Dashboard**
   - A comprehensive interface where doctors can manage prescriptions and monitor patient health details.
   - Doctors can write prescriptions and submit them for patients based on their health data.

### 4. **Prescription Management**
   - Doctors can create detailed prescriptions, specifying the disease, symptoms, and medications.
   - Prescriptions are stored in the system and can be retrieved by the corresponding patients.

### 5. **Database Integration**
   - MongoDB is used to store data related to users (patients and doctors) and prescriptions.
   - Efficient queries and indexing ensure that the system can handle large amounts of data while keeping it secure and accessible.

---

## How It Works

### Authentication and Authorization:
When users (doctors, patients, or admins) log in, they provide their credentials (username/password). The system then generates a JWT token that is sent to the frontend. This token must be included in all subsequent requests to authenticate and authorize the user for access to specific resources.

- **Admin Authentication**: Admins have full control over the system and can manage user roles and settings.
- **Doctor Authentication**: Doctors can only view and write prescriptions for patients.
- **Patient Authentication**: Patients can only view their prescriptions and related health data.

### Writing a Prescription:
When a doctor wants to write a prescription for a patient:
1. They select a patient from the list.
2. They enter the disease name, symptoms, and prescribed medicines.
3. The prescription is then saved in the backend and associated with the patient's profile.

### Viewing Prescriptions:
Patients can view their prescriptions in a secure dashboard that only they have access to.

---

## System Importance

The **HealthCart system** serves a critical role in modern healthcare by improving accessibility, security, and efficiency in managing patient prescriptions and health data. Here’s why this system is important:

### 1. **Improves Doctor-Patient Interaction**
   - The system allows doctors to easily manage and track their patients' health data, which leads to better patient care and treatment. It provides a seamless platform for doctors to interact with their patients' health history and prescribe the necessary treatments.

### 2. **Data Security**
   - With the use of role-based access control and JWT authentication, sensitive health data is securely stored and accessed only by authorized personnel. This ensures privacy and helps comply with data protection regulations (e.g., HIPAA).

### 3. **Efficiency and Organization**
   - HealthCart helps in organizing patient records, prescriptions, and health information in one place. This reduces administrative overhead for doctors and enhances workflow efficiency in healthcare settings.

### 4. **Compliance with Health Regulations**
   - By utilizing secure, encrypted communication channels and adhering to security standards, HealthCart ensures that health data is handled in compliance with relevant healthcare regulations and guidelines.

### 5. **Accessible and Scalable**
   - As a web-based system, HealthCart is accessible to doctors, patients, and administrators from anywhere, making it a versatile solution for healthcare providers. Additionally, the system can be scaled to accommodate more users and more data.

---

## Conclusion

HealthCart is a crucial tool that enhances the way healthcare professionals and patients interact with health data, prescriptions, and each other. By combining secure authentication, role-based access control, and efficient data management, the system provides a comprehensive solution for modern healthcare environments. Whether you're a doctor, a patient, or an administrator, HealthCart helps streamline healthcare management and improve patient outcomes.
