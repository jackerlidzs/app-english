# English Anki Clone - React

Một ứng dụng học tiếng Anh kiểu Anki được xây dựng với React. Ứng dụng cho phép người dùng tạo các bộ thẻ từ vựng (decks), thêm thẻ (flashcards), và học tập bằng cách sử dụng thuật toán间隔重复 (Spaced Repetition).

## Tính Năng

### 1. Quản Lý Bộ Thẻ (Deck Management)
- ✅ Tạo bộ thẻ mới
- ✅ Xóa bộ thẻ
- ✅ Xem thống kê bộ thẻ (tổng số thẻ, thẻ mới, đang học, ôn tập)
- ✅ Chọn bộ thẻ để học

### 2. Quản Lý Thẻ Flashcard
- ✅ Thêm thẻ mới (mặt trước/mặt sau)
- ✅ Chỉnh sửa thẻ
- ✅ Xóa thẻ
- ✅ Lọc thẻ (Tất cả, Mới, Đang học, Ôn tập)
- ✅ Xem trước thẻ với khả năng lật (flip)

### 3. Phiên Học Tập (Study Session)
- ✅ Giao diện học tập tương tác
- ✅ Lật thẻ để xem đáp án
- ✅ 4 tùy chọn đáp ứng (Again, Hard, Good, Easy)
- ✅ Theo dõi tiến độ trong phiên học
- ✅ Thống kê phản hồi theo phiên

### 4. Thuật Toán Spaced Repetition
- ✅ Tính toán khoảng thời gian ôn tập dựa trên độ khó
- ✅ Cập nhật trạng thái thẻ (new/learning/review)
- ✅ Lưu trữ số lần ôn tập
- ✅ Theo dõi lỗi

### 5. Lưu Trữ Dữ Liệu
- ✅ Lưu trữ tất cả dữ liệu cục bộ (LocalStorage)
- ✅ Dữ liệu không bị mất khi tắt trình duyệt

## Công Nghệ Sử Dụng

- **React 18.2.0** - Thư viện UI
- **CSS3** - Styling với gradient và animation
- **LocalStorage API** - Lưu trữ dữ liệu
- **JavaScript ES6+** - Ngôn ngữ lập trình

## Cài Đặt

### Yêu Cầu
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Bước Cài Đặt

1. Clone repository:
```bash
git clone <repository-url>
cd english-anki-clone
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng:
```bash
npm start
```

4. Mở trình duyệt và truy cập:
```
http://localhost:3000
```

## Cấu Trúc Dự Án

```
src/
├── components/
│   ├── Header/                 # Header component
│   ├── DeckList/              # Danh sách bộ thẻ
│   ├── DeckCard/              # Thẻ bộ thẻ
│   ├── DeckForm/              # Form tạo bộ thẻ
│   ├── StudyView/             # View chính khi học
│   ├── CardForm/              # Form thêm/sửa thẻ
│   ├── CardList/              # Danh sách thẻ
│   ├── CardItem/              # Thẻ trong danh sách
│   ├── StudySession/          # Phiên học tập
│   └── StudyCard/             # Thẻ trong phiên học
├── App.js                      # Component chính
├── App.css                     # Styling chính
├── index.js                    # Entry point
└── index.css                   # Global styling
```

## Cách Sử Dụng

### 1. Tạo Bộ Thẻ
- Nhấp nút "+ New Deck"
- Nhập tên bộ thẻ
- Nhấp "Create"

### 2. Thêm Thẻ
- Chọn bộ thẻ
- Nhấp "+ Add Card"
- Nhập câu hỏi (Front) và đáp án (Back)
- Nhấp "Add Card"

### 3. Học Tập
- Chọn bộ thẻ có thẻ cần học
- Nhấp "Study Now"
- Xem câu hỏi
- Nhấp để lật thẻ và xem đáp án
- Chọn mức độ khó (Again/Hard/Good/Easy)
- Tiếp tục cho đến khi hoàn thành phiên

### 4. Quản Lý Thẻ
- Xem danh sách tất cả thẻ với bộ lọc
- Nhấp vào thẻ để lật xem
- Sử dụng ✏️ để chỉnh sửa
- Sử dụng 🗑️ để xóa

## Thuật Toán Spaced Repetition

Ứng dụng sử dụng phiên bản đơn giản của SM-2 Algorithm:

- **Again** (1): Reset interval về 1 ngày, giảm ease
- **Hard** (2): Tăng interval 1.2x, giảm ease
- **Good** (3): Tăng interval theo ease factor
- **Easy** (4): Tăng interval nhiều hơn, tăng ease

## Scripts Khả Dụng

```bash
# Chạy ứng dụng trong chế độ development
npm start

# Build ứng dụng cho production
npm build

# Chạy test
npm test

# Eject cấu hình (không thể hoàn tác)
npm eject

# Format code
npm run format

# Lint code
npm run lint
```

## Tính Năng Sắp Tới

- 🔜 Export/Import decks dưới dạng JSON
- 🔜 Hỗ trợ đa ngôn ngữ
- 🔜 Thống kê chi tiết
- 🔜 Keyboard shortcuts
- 🔜 Dark mode
- 🔜 Phát âm từ vựng

## License

MIT License

## Người Phát Triển

Xây dựng với ❤️ để giúp học tiếng Anh hiệu quả hơn
