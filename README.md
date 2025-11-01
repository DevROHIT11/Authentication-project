# 🔐 Authentication System using Node.js, Express, MySQL, and JWT

This project is a **basic authentication system** built using Node.js and Express with MySQL as the database.  
It includes user **signup and login functionality**, **password hashing (bcrypt)**, and **JWT-based authentication**.  
The frontend uses simple HTML, CSS, and JavaScript for interaction.

---
## 1. Access in Browser

Go to 👉 http://localhost:3000

---
## 2.  Features

- User **Signup** with data stored securely in MySQL
- Passwords hashed using **bcrypt**
- **JWT token** generation and cookie storage for authentication
- Login verification using stored hashed passwords
- Error handling for duplicate users and invalid credentials
- Frontend built with HTML, CSS, and JS
- Mobile responsive signup & signin forms
- MySQL schema creation automated via backend
- Ready for deployment on **Railway**

---

## 3. Required Packages

a) Install these dependencies before running the project:
``` bash 
npm install express mysql2 bcrypt jsonwebtoken cookie-parser dotenv path

```

b) Development Dependencies (optional) :
``` bash
npm install --save-dev nodemon

```
---
## 4.  Deploying on Railway

1. Push your code to GitHub.

2. Go to Railway.app and create a new project.

3. Connect your GitHub repo.

4. Add MySQL Plugin in Railway.

5. In your Railway environment variables, add:
``` ini
HOSTNAME=<Railway MySQL host>
USER=<your MySQL username>
PASSWORD=<your MySQL password>
DATABASE=<your database name>
JWT_SECRET_KEY=<your secret>
```

6. Deploy Railway will auto-detect the Node.js project and host it.

## 🧑‍💻 Author

**Rohit Bhalekar**\
Node.js | Express | MySQL | Web Developer

## 🪪 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this software with proper attribution.

See the [LICENSE](./LICENSE) file for more details.
