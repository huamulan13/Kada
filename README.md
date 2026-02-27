# Simple Express.js MongoDB CRUD API

Proyek ini adalah API sederhana untuk mengelola data 'Post' menggunakan **Node.js**, **Express.js**, dan **MongoDB** dengan library **Mongoose**. Dibuat sebagai bagian dari pembelajaran pengembangan backend yang efisien dan terstruktur.

## 🚀 Fitur Utama
* **Create**: Menambahkan post baru.
* **Read**: Mengambil semua post atau satu post spesifik berdasarkan ID.
* **Update**: Memperbarui judul atau isi post yang sudah ada.
* **Delete**: Menghapus post dari database.

## 🛠️ Teknologi yang Digunakan
* **Node.js**: Runtime environment.
* **Express.js**: Framework web untuk routing.
* **MongoDB & Mongoose**: Database NoSQL dan Object Data Modeling (ODM).
* **ES Modules**: Menggunakan syntax `import/export`.

## 📦 Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username-kamu/nama-repo.git](https://github.com/username-kamu/nama-repo.git)
   cd nama-repo

```

2. **Install dependencies:**
```bash
npm install

```


3. **Konfigurasi Database:**
Pastikan MongoDB sudah berjalan di lokal atau gunakan MongoDB Atlas. Sesuaikan koneksi di file konfigurasi/index.js kamu.
4. **Jalankan Aplikasi:**
```bash
npm start

```



## 🔌 Endpoint API

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/` | Mengambil semua post |
| `GET` | `/:id` | Mengambil satu post berdasarkan ID |
| `POST` | `/` | Membuat post baru (Body: title, content) |
| `PUT` | `/:id` | Update post (Body: title, content) |
| `DELETE` | `/:id` | Menghapus post |

---

Dibuat dengan ☕ oleh Ileanna
