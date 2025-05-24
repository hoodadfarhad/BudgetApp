# 💰 BudgetApp

![Screenshot 2025-05-24 at 12 38 38 AM (2)](https://github.com/user-attachments/assets/75ef32e0-9db8-4565-a244-2091f0b69aab)


**BudgetApp** is a full-stack personal finance platform that helps users track income and expenses, monitor account balances, and visualize financial trends over time. Built using React, Node.js, and PostgreSQL, and hosted on AWS, it provides a responsive and intuitive user experience for managing budgets with ease.

---

## 🚀 Features

- 📥 Add, edit, and delete **income** and **expense** entries
- 📈 **Compare financial activity** across months
- 🧾 **Recent transaction history** table
- 🧠 **Pie chart** for expense category breakdown
- 🏦 Manage multiple **bank accounts**
- 🔐 Google OAuth-based **secure login**
- 📊 All insights rendered through dynamic charts and tables
- 📱 Mobile-friendly design using Bootstrap

---

![Screenshot 2025-05-24 at 12 41 41 AM (2)](https://github.com/user-attachments/assets/3060c6ae-b0e8-41d7-acbb-013a5cc449c1)

![Screenshot 2025-05-24 at 12 42 00 AM (2)](https://github.com/user-attachments/assets/c13fca03-0900-4471-8889-d20a45f780de)

![Screenshot 2025-05-24 at 12 42 25 AM (2)](https://github.com/user-attachments/assets/4050b721-0c6b-4ca4-9833-6860cc4b792b)




---

## 🛠️ Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | React, Bootstrap 5   |
| Backend     | Node.js, Express     |
| Database    | PostgreSQL           |
| Auth        | Passport.js (OAuth)  |
| Deployment  | AWS (EC2, S3, RDS)   |

---

## ⚙️ Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/hoodadfarhad/BudgetApp.git
   cd BudgetApp
   ```


2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Run the backend**
   
   ```bash
   node index.js
   ```

4. **Run the frontend**
  From the frontend directory:

    ```bash
    npm install
    npm start
    ```

5. **Set environment variables**
Create a .env file in the backend directory with your credentials:

   ```bash
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name
    GOOGLE_CLIENT_ID=your-client-id
    GOOGLE_CLIENT_SECRET=your-client-secret
    SESSION_SECRET=some-random-string
    ```


## 🔌 API Endpoints (Overview)

This project uses 18 backend API routes, all using both POST and GET methods.

Sample routes:

- POST /api/setID
- POST /auth/logout
- POST /api/figureCalc
- POST /api/compareMonthCalc
- POST /api/getCatAmount
- POST /api/getAllTransactions
- POST /api/accountsGetter
- POST /api/newAccountInfo
- POST /api/updateAccountInfo
- POST /api/getCategories
  
- GET  /infoGetter
- GET  /logout

(More routes are available for handling user data, accounts, and transaction logic.)


## 🗄️ Database Schema

You can view the full PostgreSQL schema in [`schema.sql`](https://github.com/hoodadfarhad/BudgetApp/blob/main/schema.sql).

To initialize your local database:

```bash
psql -U hoodadfarhad -d your_db -f schema.sql
```


## 🌍 Deployment

- **Live Version:** [https://budgetapp.it.com](https://budgetapp.it.com)  
- **Hosted via AWS:**
  - Frontend: S3 + CloudFront  
  - Backend: EC2  
  - Database: RDS (PostgreSQL)

## 🤝 Contributing

If you'd like to contribute:

- Fork the repo
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request
  
Made with 💡 by Hoodad Farhad
