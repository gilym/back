const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

// TODO: Sesuaikan konfigurasi database
const connection = mysql.createConnection({
    host: '35.226.249.81',
    user: 'root',
    database: 'cba',
    password: '12345678'
})

router.get('/api/jamur', (req, res) => {
    const sqlQuery = "SELECT * FROM must";
    db.query(sqlQuery, (err, result) => {
  
      if (err) {
        console.log("errorrrrr");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  
  router.get('/api/readJamur/:id_mush', (req, res) => {
    const jamurId = req.params.id_mush;
  
    const sqlQuery = "SELECT * FROM must WHERE id_mush = ?";
    db.query(sqlQuery, jamurId, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  // #####
  
  // create
  router.post('/api/addJamur', (req, res) => {
    const idJamur = req.body.id_mush;
    const nameJamur = req.body.name;
    const latinName = req.body.latin_name;
    const Description = req.body.description;
    const Habit = req.body.habitat;
    const Pict = req.body.pict;
  
    const sqlQuery = "INSERT INTO must (name, latin_name, description, habitat, pict) VALUE (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [nameJamur, latinName, Description, Habit, Pict], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  // #####
  
  // update
  router.put('/api/updateJamur/:id_mush', (req, res) => {
    const idJamur = req.params.id_mush;
    const nameJamur = req.body.name;
    const latinName = req.body.latin_name;
    const Description = req.body.description;
    const Habit = req.body.habitat;
    const Pict = req.body.pict;
  
    const sqlQuery = "UPDATE must SET name = ?, latin_name = ? ,description = ?, habitat = ?, pict = ? WHERE id_mush =?";
    db.query(sqlQuery, [nameJamur, latinName, Description, Habit, Pict, idJamur], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  // #####
  
  // delete
  router.delete('/api/deleteJamur/:id_mush', (req, res) => {
    const idJamur = req.params.id_mush;
  
    const sqlQuery = "DELETE FROM must WHERE id_mush = ?";
    db.query(sqlQuery, [idJamur], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal menghapus jamur.");
      } else {
        console.log(result);
        res.send("Jamur berhasil dihapus.");
      }
    });
  });
  
  // #####
  router.get('/api/users', (req, res) => {
    const sqlQuery = "SELECT * FROM user";
    db.query(sqlQuery, (err, result) => {
  
      if (err) {
        console.log("errorrrrr");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  
  // Get User By Id
  router.get('/api/userById/:user_id', (req, res) => {
    const userId = req.params.user_id;
  
    const sqlQuery = "SELECT * FROM user WHERE user_id = ?";
    db.query(sqlQuery, [userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal mendapatkan pengguna berdasarkan ID.");
      } else {
        console.log(result);
        if (result.length === 0) {
          res.status(404).send("Pengguna tidak ditemukan.");
        } else {
          res.send(result);
        }
      }
    });
  });
  
  // add User 
  router.post('/api/addUsers', (req, res) => {
    const userId = req.body.user_id
    const userName = req.body.username;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
    
    const sqlQuery = "INSERT INTO user (username, user_email, user_password) VALUES (?, ?, ?)";
    db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal menambahkan pengguna.");
      } else {
        console.log(result);
        res.send("Pengguna berhasil ditambahkan.");
      }
    });
  });
  
  //cekUsername
    router.post('/api/checkUsername', (req, res) => {
      const userName = req.body.username;
      const sqlQuery = "SELECT * FROM user WHERE username = ?";
      db.query(sqlQuery, [userName], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Terjadi kesalahan dalam memeriksa username.");
        } else {
          if (result.length > 0) {
            // Username telah ada dalam database
            res.json({ exists: true });
          } else {
            // Username belum ada dalam database
            res.json({ exists: false });
          }
        }
      });
    });
  
  // Update Users
  router.put('/api/updateUser', (req, res) => {
    const userId = req.body.user_id;
    const userName = req.body.username;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
    
    const sqlQuery = "UPDATE user SET username = ?, user_email = ? , user_password = ? WHERE user_id = ?";
    db.query(sqlQuery, [userName, userEmail, userPassword, userId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  
  //delete Users
  router.delete('/api/deleteUser/:user_id', (req, res) => {
    const userId = req.params.user_id;
    
    const sqlQuery = "DELETE FROM user WHERE user_id = ?";
    db.query(sqlQuery, [userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal menghapus user.");
      } else {
        console.log(result);
        res.send("User berhasil dihapus.");
      }
    });
  });
  
  
  //login
  router.post('/api/userLogin', (req, res) => {
    const userName = req.body.username;
    const userPassword = req.body.user_password;
  
    const sqlQuery = "SELECT * FROM user WHERE username = ?";
    db.query(sqlQuery, [userName], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Terjadi kesalahan saat login.");
      } else {
        if (result.length > 0) {
          // Verifikasi kata sandi
          const storedPassword = result[0].user_password;
          if (userPassword === storedPassword) {
            // Login berhasil
            res.send("Login berhasil.");
          } else {
            // Kata sandi salah
            res.status(401).send("Kata sandi salah.");
          }
        } else {
          // Pengguna tidak ditemukan
          res.status(404).send("Pengguna tidak ditemukan.");
        }
      }
    });
  })

module.exports = router