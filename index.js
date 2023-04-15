var express = require('express');
var cors = require('cors');
require('dotenv').config()
let multer = require('multer')
const app = express();
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  let name = req.file.originalname
  let type = req.file.mimetype
  let size = req.file.size
  
  return req.file ? res.json({ name, type, size }) : res.json("No file found");
  
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
