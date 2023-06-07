//dinh nghia cac thao tac co the co
const Controller = require('../controllers/Controller');
const express=require('express');
const router= express.Router();
//thu vien dieu huong
//tham chieu controller
//dinh nghia ac request
router.get('/',Controller.list);//neu goi ve trang chu, liet ke danh sach (hien thi)

router.get('/add',Controller.add_get);//them khach hang
router.post('/add',Controller.add_post);//them khach hang
router.get('/edit/:id', Controller.edit_get);
router.post('/edit/:id', Controller.edit_post);
router.get('/delete/:id',Controller.delete);//xoa
router.get('/search',Controller.search);//xoa
module.exports = router;