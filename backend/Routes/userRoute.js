import express from 'express';

import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  addData,
  getUserData,
  patchUser
} from '../Controllers/backControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/new', createUser);
router.get('/user/:id', getUser);
router.put('/update/:id', updateUser);
router.patch('/add-data/:id', addData);
router.patch('/patch-user/:id', patchUser);
router.get('/get-user-data/:userId', getUserData);
router.delete('/delete/:id', deleteUser);

export default router;