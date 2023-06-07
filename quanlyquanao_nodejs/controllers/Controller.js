// Dinh nghia cac ham
let controller = {};

// 1. Ham doc du lieu (select)
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM products', (err, products) => {
      if (err) {
        res.json(err);
      }
      res.render('home', { data: products });
    });
  });
};
controller.add_get=(req,res) => {
  res.render('add', { Title: 'Thêm sản phẩm' })
}
// 2. Ham luu du lieu (insert)
controller.add_post = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    const query = conn.query('INSERT INTO products SET ?', data, (err, product) => {
      if (err) {
        res.json(err);
      }
      console.log(product);
      console.log(data);
      res.redirect('/');
    });
  });
};
controller.edit_get = (req, res) => {
    const { id } = req.params;
   
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM products WHERE masp=?", [id], (err, rows) => {
        res.render('edit', { object: rows[0] });
      });
    });
  };
  
  controller.edit_post = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    console.log(id);
    req.getConnection((err, conn) => {
      conn.query('UPDATE products SET ? WHERE masp=?', [newProduct, id], (err, rows) => {
        res.redirect('/');
      });
    });
  };
  
  controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM products WHERE masp = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
  };
  controller.search = (req, res) => {
    const { name } = req.query;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM products WHERE tensp LIKE ?', `%${name}%`, (err, products) => {
        if (err) {
          res.json(err);
        }
        res.render('home', { data: products });
      });
    });
  };
  
  
module.exports = controller;
