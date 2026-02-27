const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String, // Tambahkan baris ini
}, { timestamps: true });
