# 📝 Personal Blog Website

**Project URL:** https://roadmap.sh/projects/personal-blog

A full-stack personal blog application built with **HTML**, **CSS**, **JavaScript**, **Node.js**, **Express.js**, and **EJS** that allows users to read blog articles while providing an admin panel to manage posts through full CRUD operations.

---

## 🚀 Features

### 🌍 Guest Section

Accessible to all visitors:

* View all published blog posts
* Read full article content
* Display publication dates
* Dynamically rendered pages using EJS
* Responsive and clean UI

---

### 🔐 Admin Section

Accessible only to the administrator:

* Secure login system
* Admin dashboard
* Create new articles
* Edit existing articles
* Delete articles
* Manage article publication dates
* Cookie-based authentication

---

## 📦 Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Node.js
* Express.js
* EJS (Embedded JavaScript Templates)
* cookie-parser

---

## 📂 Project Structure

```bash
personal-blog/
│
├── public/
│   └── css/
│       ├── delete-post-style.css
│       ├── form-style.css
│       ├── login-style.css
│       ├── post-style.css
│       ├── posts-admin-style.css
│       └── posts-style.css
│
├── views/
│   ├── admin/
│   │   └── index.ejs
│   │
│   ├── article/
│   │   ├── delete.ejs
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   └── new.ejs
│   │
│   ├── login/
│   │   └── index.ejs
│   │
│   └── index.ejs
│
├── .gitignore
├── article.json
├── helper.js
├── index.js
├── package.json
└── package-lock.json
```

---

## ▶️ Installation & Usage

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

---

### 2. Open the Project Folder

```bash
cd personal-blog
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Server

```bash
npm start
```

---

### 5. Open in Browser

```text
http://localhost:3000
```

---

## 🧠 How It Works

### 🏠 Home Page

The home page displays all published articles.

Each article preview contains:

* Title
* Publication date
* Link to read the full article

---

### 📄 Article Page

Users can open a specific article to read the complete content.

Displayed information:

```text
Title
Publication Date
Article Content
```

---

### 🔑 Login Page

The login page authenticates the administrator before granting access to the admin section.

Features:

* Username and password validation
* Custom error messages
* Cookie-based session handling

Example validation messages:

```text
The field is required.
Invalid username or password.
```

---

### 📋 Admin Dashboard

The admin dashboard displays all blog articles along with management options.

Available actions:

```text
Create Article
Edit Article
Delete Article
```

---

### ➕ Add Article Page

The add article page contains a form for creating a new article.

Form fields:

```text
Title
Content
Publication Date
```

---

### ✏️ Edit Article Page

The edit article page allows the admin to modify an existing article.

Editable fields:

```text
Title
Content
Publication Date
```

---

### 🗑 Delete Article Page

The delete article page allows the administrator to remove articles from the blog.

Features:

* Delete confirmation
* Protected delete route

---

## 🔐 Authentication

The admin section is protected using cookies.

When the login credentials are correct:

```javascript
res.cookie("user", JSON.stringify({ user }));
```

Protected routes verify if the cookie exists:

```javascript
if (!req.cookies.user) return res.redirect("/");
```

If the user is not authenticated, they are redirected to the home page.

---

## 📄 CRUD Operations

The application supports complete CRUD functionality for articles.

| Operation | Description                |
| --------- | -------------------------- |
| Create    | Add new articles           |
| Read      | Display published articles |
| Update    | Edit existing articles     |
| Delete    | Remove articles            |

---

## 🛣 Route Structure

### 🌍 Public Routes

```javascript
GET /
GET /login
GET /article/:id
```

---

### 🔐 Admin Routes

```javascript
GET /admin
GET /article/new
GET /article/:id/edit
GET /article/:id/delete
```

---

### 📨 Form Submission Routes

```javascript
POST /sign-in
POST /article/add
POST /article/:id/modify
POST /article/delete/:id
```

---

## 🧩 Middleware Usage

The application uses several Express middlewares:

### Parse Form Data

```javascript
app.use(express.urlencoded({ extended: true }));
```

---

### Parse JSON Requests

```javascript
app.use(express.json());
```

---

### Cookie Parsing

```javascript
app.use(cookieParser());
```

---

### Static Files

```javascript
app.use(express.static("public"));
```

This allows CSS and other static assets to be served from the `public` folder.

---

## 💾 Data Persistence

Articles are stored locally in:

```text
article.json
```

The application uses helper functions to:

* Read article data
* Write article data
* Initialize the data file
* Find articles by ID

Example helper functions:

```javascript
readData()
writeData()
getArticle()
initDataFile()
```

---

## 🧩 Dynamic Rendering with EJS

The application uses EJS templates to dynamically render content.

Example:

```ejs
<%= article.title %>
```

Loop example:

```ejs
<% articles.forEach(article => { %>
    <h2><%= article.title %></h2>
<% }) %>
```

---

## 🎨 UI Features

* Responsive design
* Minimalist interface
* Custom CSS styling
* Dynamic article rendering
* Organized admin dashboard
* Form validation feedback
* Reusable EJS templates

---

## 💡 Future Improvements

* Add database integration (MongoDB/PostgreSQL)
* Add password hashing
* Add JWT authentication
* Add user roles
* Add image upload support
* Add markdown editor
* Add article categories and tags
* Add comments section
* Add search functionality
* Add pagination
* Add dark mode
* Improve mobile responsiveness

---

## 🧑‍💻 Author

Tommy Contreras

---

## 📄 License

MIT
