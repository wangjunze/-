const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const multer = require("multer"); //转存表单文件到系统目录下
const fs = require("fs");

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const config = {
  mongourl: "mongodb://127.0.0.1:27017",
  dbname: "test1",
  collection: "stus"
};

const config2 = {
  mongourl: "mongodb://127.0.0.1:27017",
  dbname: "test2",
  collection: "stus2"
};

const config3 = {
  mongourl: "mongodb://127.0.0.1:27017",
  dbname: "test3",
  collection: "stus3"
};

const config4 = {
  mongourl: "mongodb://127.0.0.1:27017",
  dbname: "test4",
  collection: "users"
};

const app = express();

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json()); //为了获取post方式传递过来的json格式的数据 application/json
app.use(bodyParser.urlencoded({ extended: false })); //为了获取post方式传递过来的 application/x-www-form-urlencoded 格式的数据
// 将上传的文件缓存到当前路径下的tmp文件夹内：
app.use(multer({ dest: "tmp/" }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/home.html");
});

app.get("/news", (req, res) => {
  res.sendFile(__dirname + "/static/news.html");
});

app.get("/case", (req, res) => {
  res.sendFile(__dirname + "/static/case.html");
});

app.post("/formpost", (req, res) => {
  console.log("/formpost");
  var data = req.body;
  data.src = [];

  // 系统临时文件目录：
  console.log(os.tmpdir());

  var files = req.files;
  console.log(typeof files); //Object

  console.log(files);

  console.log(data);

  // 2.不存在 -> 先创建目录upload  再转存文件。
  fs.stat(__dirname + "/static/upload", (err, info) => {
    if (err) {
      // 不存在 -> 创建 upload目录 ,再执行if下方的转存业务
      console.log("upload目录不存在，准备创建~");
      fs.mkdirSync(__dirname + "/static/upload");
      console.log("upload创建成功~");
    }

    var arr = []; //存放所有的任务。
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        arr.unshift(
          new Promise(function(resolve, reject) {
            let element = files[key]; //element 表示其中某一具体文件对象
            let random = Math.floor(Math.random() * 99999999);
            let final_path =
              __dirname + "/static/upload/" + random + element.originalname;
            //定义一个静态资源可访问的图片路径
            let src = "/upload/" + random + element.originalname;
            data.src.push(src);

            let tmp_path = __dirname + "/" + element.path;
            fs.readFile(tmp_path, (err, data) => {
              if (err) {
                // res.json({code:0,msg:"文件转存失败！"})
                reject({ code: 0, msg: "文件转存失败！" });
                throw err;
              }
              fs.writeFile(final_path, data, err => {
                if (err) {
                  // res.json({code:2,msg:"文件写入失败！"})
                  reject({ code: 2, msg: "文件写入失败！" });
                  throw err;
                }
                console.log(element.path, "ok");
                resolve({ code: 1, msg: "上传成功!" });
              });
            });
          })
        );
      }
    }
    //arr 存放了所有任务
    Promise.all(arr)
      .then(function(result) {
        // ...
        // 多项任务全部完成后 才会执行此处代码：
        console.log("all ok");
        //此处进行数据库写入操作
        findSome(
          config.mongourl,
          config.dbname,
          config.collection,
          { serial: data.serial },
          (c, d) => {
            if (!(d + "")) {
              insertData(
                config.mongourl,
                config.dbname,
                config.collection,
                [data],
                client => {
                  res.json({ code: 1, msg: "上传成功！" });
                  client.close();
                }
              );
            } else {
              updateSome(
                config.mongourl,
                config.dbname,
                config.collection,
                true,
                { serial: data.serial },
                { $set: data },
                c => {
                  c.close();
                  res.json({ code: 1, msg: "修改成功" });
                },
                err => {
                  res.json({ code: 1, msg: "添加失败" });
                }
              );
            }
            c.close();
          }
        )
      })
      .catch(function(reason) {
        // ...
        console.log(reason);
        res.json(reason);
      });
  });

  //res.json({code:1,msg:"success"})
});

app.post("/userform", (req, res) => {
  var data = req.body;
  var files = req.files;
  // console.log(data);
  fs.stat(__dirname + "/static/userimg", (err, info) => {
    if (err) {
      console.log("userimg目录不存在，准备创建~");
      fs.mkdirSync(__dirname + "/static/userimg");
      console.log("userimg创建成功~");
    }
    var arr = [];
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        arr.push(
          new Promise(function(resolve, reject) {
            let element = files[key];
            let random = Math.floor(Math.random() * 99999999);
            let final_path =
              __dirname + "/static/userimg/" + random + element.originalname;
            let tmp_path = __dirname + "/" + element.path;
            let src = "./userimg/" + random + element.originalname;
            data.img = src;

            fs.readFile(tmp_path, (err, data) => {
              if (err) {
                reject({ code: 0, msg: "文件转存失败！" });
                throw err;
              }
              fs.writeFile(final_path, data, err => {
                if (err) {
                  reject({ code: 2, msg: "文件写入失败！" });
                  throw err;
                }
                console.log(element.path, "ok");
                resolve({ code: 1, msg: "上传成功!" });
              });
            });
          })
        );
      }
    }
    Promise.all(arr)
      .then(function(result) {
        console.log("all ok");
        findSome(
          config.mongourl,
          config.dbname,
          "userform",
          { username: data.username },
          (c, d) => {
            if (!(d + "")) {
              insertData(
                config.mongourl,
                config.dbname,
                "userform",
                [data],
                client => {
                  res.json({ code: 1, msg: "上传成功！" });
                  client.close();
                }
              );
            } else {
              updateSome(
                config.mongourl,
                config.dbname,
                "userform",
                true,
                { username: data.username },
                { $set: data },
                c => {
                  c.close();
                  res.json({ code: 1, msg: "修改成功" });
                },
                err => {
                  res.json({ code: 1, msg: "添加失败" });
                }
              );
            }
            c.close();
          }
        );
      })
      .catch(function(reason) {
        // console.log(reason);

        res.json(reason);
      });
  });
});
app.post("/getuser", (req, res) => {
  var data = req.body.username;
  console.log(data);
  findSome(
    config.mongourl,
    config.dbname,
    "userform",
    { username: data },
    (c, d) => {
      res.json({
        data: d
      });
      c.close();
    }
  );
});
app.post("/zhuc", (req, res) => {
  // 前端传来 username和pwd两个字段
  // 通过req.body拿到post数据
  var data = req.body;

  insertData(
    config4.mongourl,
    config4.dbname,
    config4.collection,
    [data],
    client => {
      client.close();
      res.json({ code: 1, msg: "用户注册成功" });
    }
  );
});

app.get("/dengl", (req, res) => {
  findSome(
    config4.mongourl,
    config4.dbname,
    config4.collection,
    {},
    (c, docs) => {
      res.json({ data: docs });
      c.close();
    }
  );
});

app.post("/add", (req, res) => {
  var data = req.body.data;
  console.log(data);
  removeSome(
    config2.mongourl,
    config2.dbname,
    config2.collection,
    true, //表示只改第一个
    { title: data.title },
    c => {
      c.close();
    }
  );

  insertData(
    config2.mongourl,
    config2.dbname,
    config2.collection,
    [data],
    client => {
      client.close();
      res.json({ code: 1, msg: "上传成功" });
    }
  );
});

app.get("/push", (req, res) => {
  findSome(
    config2.mongourl,
    config2.dbname,
    config2.collection,
    {},
    (c, docs) => {
      res.json({ data: docs });
      c.close();
    }
  );
});

app.post("/del", (req, res) => {
  var data = req.body.item;
  console.log(data);

  removeSome(
    config2.mongourl,
    config2.dbname,
    config2.collection,
    true, //表示只改第一个
    { title: data.title },
    c => {
      res.json({ code: 1, msg: "删除成功" });
      c.close();
    }
  );
});

app.get("/getdata", (req, res) => {

  findSome(config.mongourl, 
    config.dbname, 
    config.collection, 
    {}, 
    (c, docs) => {
    res.json({ data: docs });
    c.close();
  })
});

const removeSome = (dbUrl, dbName, collection, one, filt, cb) => {
  mongoClient.connect(
    dbUrl,
    (err, client) => {
      if (err) {
        throw err;
      }
      //
      console.log("连接成功！");
      //选择db
      const db = client.db(dbName);
      //选择集合
      const col = db.collection(collection);
      //更新：
      if (one) {
        col.deleteOne(filt, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("删除成功！");
          cb(client);
        });
      } else {
        col.deleteMany(filt, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("删除成功！");
          cb(client);
        });
      }
    }
  );
};

const findSome = (dbUrl, dbName, collection, filt = {}, cb) => {
  mongoClient.connect(
    dbUrl,
    (err, client) => {
      if (err) {
        throw err;
      }
      console.log("连接成功");
      // 选择db
      const db = client.db(dbName);
      // 选择collection
      const col = db.collection(collection);
      // 查询数据
      //var res = col.find()
      col.find(filt).toArray((err, docs) => {
        if (err) {
          throw err;
        }
        //console.log(docs);

        cb(client, docs);
      });
    }
  );
};

const updateSome = (dbUrl, dbName, collection, one, filt, set, cb) => {
  mongoClient.connect(
    dbUrl,
    (err, client) => {
      if (err) {
        throw err;
      }
      //
      console.log("连接成功！");
      //选择db
      const db = client.db(dbName);
      //选择集合
      const col = db.collection(collection);
      //更新：
      if (one) {
        col.updateOne(filt, set, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("修改成功！");
          cb(client);
        });
      } else {
        col.updateMany(filt, set, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("修改成功！");
          cb(client);
        });
      }
    }
  );
};
const insertData = (dnurl, dbname, collection, data1 = [], cb) => {
  mongoClient.connect(
    dnurl,
    (err, client) => {
      if (err) {
        throw err;
      }
      console.log("mongodb链接成功");

      //选择数据库
      const db = client.db(dbname); // = use xxx
      //选择集合
      const col = db.collection(collection);
      //插入数据
      col.insertMany(
        // [{name:'jack',sex:'man'}],
        data1,
        (err, result) => {
          if (err) {
            throw err;
          }
          //此处表示插入成功
          console.log("数据添加成功！");
          // client.close();
          cb(client);
        }
      );
    }
  );
};

app.listen(3000, () => console.log("listen @ 3000"));
