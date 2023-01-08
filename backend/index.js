const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sirsapi'
});

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toString());
  }
});

const upload = multer({ storage: storage });

app.get('/getData', (req, res)=>{
  connection.query('select * from fileholder',((err, result) => err ? res.send(err) : res.send(result)))
});

app.post('/upload', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'adhar', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), (req, res) => {
  console.log(req.files.photo[0].path);
  connection.query(
    'INSERT INTO fileholder (name, mobile, mail, panNo, motherName, fatherName, photo, adhar, bankstatement, signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      req.body.name,
      req.body.mobile,
      req.body.mail,
      req.body.panNo,
      req.body.motherName,
      req.body.fatherName,
      req.files.photo[0].path,
      req.files.adhar[0].path,
      req.files.bankStatement[0].path,
      req.files.signature[0].path
    ],

    function (error, results) {
      if (error) throw error;
      else res.send("data inserted successfully...")
    }
  );
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`the app is running on http://${hostname}:${port}/`)
})