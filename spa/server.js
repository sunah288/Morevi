import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080'
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'morevi_db'
});

connection.connect(err => {
  if (err) {
    console.error('DB 연결 실패:', err);
    process.exit(1);
  }
  console.log('DB 연결 성공');
});

// ✅ 회원가입
app.post('/api/register', (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요." });
  }

  const checkSql = `SELECT * FROM users WHERE username = ?`;
  connection.query(checkSql, [username], (err, result) => {
    if (err) return res.status(500).json({ message: "DB 오류" });

    if (result.length > 0) {
      return res.status(409).json({ message: "이미 사용 중인 아이디입니다." });
    }

    const insertSql = `
      INSERT INTO users (name, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(insertSql, [name, username, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "회원가입 실패", error: err });
      }
      return res.json({ success: true, message: "회원가입 성공!" });
    });
  });
});

// ✅ 로그인 기능 추가
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요." });
  }

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("❌ 로그인 쿼리 실패:", err);
      return res.status(500).json({ message: "서버 오류" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    const user = result[0];
    console.log("✅ 로그인 성공:", user.username);
    return res.json({ success: true, message: "로그인 성공!", user });
  });
});

// ✅ 공통 날짜 포맷 함수
const formatDate = date => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ✅ 예약 내역 조회 - 이메일로
app.get('/reservations/email/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT * FROM reservations WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB 에러' });
    if (results.length === 0) return res.status(404).json({ message: '예약 없음' });

    // ✅ 날짜 포맷 적용
    const formattedResults = results.map(r => ({
      ...r,
      date: formatDate(r.date)
    }));

    res.json(formattedResults);
  });
});

// ✅ 예약 내역 조회 - 예약번호 + PIN
app.get('/reservations/id/:resvId', (req, res) => {
  const { resvId } = req.params;
  const { pin } = req.query;

  const query = 'SELECT * FROM reservations WHERE resv_id = ? AND pin = ?';
  connection.query(query, [resvId, pin], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB 에러' });
    if (results.length === 0) return res.status(404).json({ message: '예약 없음' });

    // ✅ 날짜 포맷 적용
    const result = {
      ...results[0],
      date: formatDate(results[0].date)
    };

    res.json(result);
  });
});

// ✅ 숙박 검색
app.get('/search/lodging', (req, res) => {
  const { destination, checkin, checkout, adult, child } = req.query;

  // ✅ 'checkout'은 필수에서 제외하고, checkin은 필수로 유지
  if (!destination || !checkin || !adult || !child) {
    return res.status(400).send("필수 검색 조건이 없습니다.");
  }

  const sql = `
    SELECT * FROM lodgings 
    WHERE destination = ?
      AND checkin <= ?
      AND checkout >= ?
      AND adult >= ?
      AND child >= ?
  `;

  connection.query(sql, [destination, checkin, checkout || checkin, adult, child], (err, results) => {
    if (err) {
      return res.status(500).send('서버 오류');
    }

    const safeResults = results.map(item => ({
      ...item,
      checkin: item.checkin ? formatDate(item.checkin) : null,
      checkout: item.checkout ? formatDate(item.checkout) : null
    }));

    res.render('lodging_results', { results: safeResults, query: req.query });
  });
});


// ✅ 교통 검색
app.get('/search/transport', (req, res) => {
  const { departure, arrival, travelD, travelDD } = req.query;

  if (!departure || !arrival || !travelD) {
    return res.status(400).send('필수 검색 조건이 없습니다.');
  }

  const sql = `
    SELECT * FROM transports
    WHERE departure = ?
    AND arrival = ?
    AND travelD <= ?
    AND travelDD >= ?
  `;

  connection.query(sql, [departure, arrival, travelD, travelDD || travelD,], (err, results) => {
    if (err) {
      return res.status(500).send('서버 오류');
    }

    // ✅ 날짜 포맷 적용
    const safeResults = results.map(item => ({
      ...item,
      travelD: item.travelD ? formatDate(item.travelD) : null,
      travelDD: item.travelDD ? formatDate(item.travelDD) : null
    }));

    res.render('transport_results', { results: safeResults, query: req.query });
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중 http://localhost:${PORT}`);
});
