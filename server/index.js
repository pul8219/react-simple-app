// 서버
const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

const { User } = require('./models/User');
const { Board } = require('./models/Board');

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect('mongodb://localhost:27017/testdb')
  .then(() => console.log('MondoDB Connected...'))
  .catch((err) => console.log(err));

// User 등록
app.post('/api/users', (req, res, next) => {
  try {
    const user = new User({
      id: req.body.id,
      password: req.body.password,
    });

    user.save((err, userInfo) => {
      if (err) next(err);
      return res.json({ registerSuccess: true });
    });
  } catch (err) {
    next(err);
  }
});

// 로그인
app.post('/api/users/login', (req, res, next) => {
  try {
    User.findOne({ id: req.body.id }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '가입된 아이디가 아닙니다.',
        });
      }

      if (req.body.password !== user.password) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      // 비밀번호가 맞다면 토큰 생성(로그인 유지)
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  } catch (err) {
    next(err);
  }
});

// auth route
app.get('/api/users/auth', auth, (req, res) => {
  // 미들웨어를 성공적으로 수행했다면 ...
  // 이제 Authentication이 true라는 말이다.

  res.status(200).json({
    _id: req.user._id,
    id: req.user.id,
    password: req.user.password,
    isAuth: true,
  });
});

// 로그아웃
app.get('/api/users/logout', auth, (req, res, next) => {
  try {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
      if (err) next(err);
      return res.status(200).send({ logoutSuccess: true });
    });
  } catch (err) {
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: err,
  });
};

// 포스트 추가
app.post('/api/items', auth, (req, res) => {
  try {
    const item = new Board({
      contents: req.body.contents,
      author: req.user.id,
    });

    item.save((err, itemInfo) => {
      if (err) next(err);
      return res.json({ addItemSuccess: true, itemInfo });
    });
  } catch (err) {
    next(err);
  }
});

// 포스트 조회
app.get('/api/items', (req, res) => {
  try {
    const items = Board.find({}, (err, items) => {
      if (err) next(err);
      if (items.length === 0) {
        return res.json({
          viewItemSuccess: true,
          message: '포스트가 없습니다.',
          items,
        });
      }
      res.status(200).json({
        viewItemSuccess: true,
        message: '포스트 전체 조회 성공',
        items,
      });
    });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
