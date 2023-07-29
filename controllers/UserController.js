import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "Dfhufcvfrttdrf20",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json([
      {
        success: false,
        msg: err.msg,
      },
    ]);
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json([
        {
          success: false,
          msg: "не удалось авторизоваться",
        },
      ]);
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!validPassword) {
      return res.status(400).json([
        {
          success: false,
          msg: "Неверный логин или пароль",
        },
      ]);
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "Dfhufcvfrttdrf20",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json([
      {
        success: false,
        msg: "Не удалось авторизоваться",
      },
    ]);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Неn доступа",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Неn доступа",
    });
  }
};

export const getPined = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    }

    res.json(user.pined);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Неn доступа",
    });
  }
};

export const userUpdateAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;
    const avatar = req.body.avatar;
    if (!userId) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    }

    UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: { avatarUrl: avatar },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "не удалось обновить аватар",
          });
        }

        if (!doc) {
          return res.status(404).json({
            success: false,
            msg: "пользотватель не найден",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Неn доступа",
    });
  }
};

export const userSavePin = async (req, res) => {
  try {
    const userId = req.body.userId;

    console.log(req.body);
    if (!userId) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    }

    const post = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      author: req.body.author,
      viewsCount: req.body.viewsCount,
    };

    UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: { pined: post },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "не удалось поставить дизлайк",
          });
        }

        if (!doc) {
          return res.status(404).json({
            success: false,
            msg: "пост не найдена",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Нет доступа",
    });
  }
};

export const userRemovePin = async (req, res) => {
  try {
    const userId = req.body.userId;
    const pinId = req.body.pinId;
    if (!userId) {
      return res.status(404).json({
        success: false,
        msg: "Пользователь не найден",
      });
    } else if (!pinId) {
      return res.status(404).json({
        success: false,
        msg: "Пин не найден",
      });
    }

    await UserModel.findById(userId).updateOne(
      { _id: userId },
      { $pull: { pined: { _id: pinId } } }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Нет доступа",
    });
  }
};
