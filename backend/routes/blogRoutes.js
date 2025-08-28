const express = require('express');
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
  searchBlogsController
} = require('../controllers/blogControlller');

const router = express.Router();

// All blog routes
router.get('/all-blog', getAllBlogsController);
router.post('/create-blog', createBlogController);
router.put('/update-blog/:id', updateBlogController);
router.get('/get-blog/:id', getBlogByIdController);
router.delete('/delete-blog/:id', deleteBlogController);
router.get('/user-blog/:id', userBlogControlller);
router.get('/search', searchBlogsController); // ✅ Critical search route

module.exports = router;
