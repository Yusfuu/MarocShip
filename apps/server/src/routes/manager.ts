import express from 'express';
import {
  handleMiddleValidation,
  loginValidation,
  createDriverValidation,
  createDeliveryManagerValidation,
} from '@middlewares/validation';
import {
  createDeliveryManager,
  createDriver,
  getStats,
  login,
} from '@controllers/manager';
import { auth } from '@middlewares/auth';
import { paginationWithCount } from '@lib/pagination';
import { Driver, DeliveryManager } from '@models/index';

const router = express.Router();

router.post('/login', loginValidation, handleMiddleValidation, login);
// router.use(auth('MANAGER'));

router.post(
  '/create/deliverymanager',
  createDeliveryManagerValidation,
  handleMiddleValidation,
  createDeliveryManager
);
router.post(
  '/create/driver',
  createDriverValidation,
  handleMiddleValidation,
  createDriver
);
router.get('/stats', getStats);

router.get('/drivers', async (req, res) => {
  //@ts-ignore

  // Manager.collection.drop();
  const { page = 1, limit = 12 } = req.query;

  const [data, pageOptions] = await paginationWithCount(
    Number(page),
    Number(limit),
    Driver
  );

  res.json({ drivers: data, pageOptions });
});

router.get('/deliverymanagers', async (req, res) => {
  //@ts-ignore

  // Manager.collection.drop();
  const { page = 1, limit = 12 } = req.query;

  const [data, pageOptions] = await paginationWithCount(
    Number(page),
    Number(limit),
    DeliveryManager
  );

  res.json({ deliverymanagers: data, pageOptions });
});

export { router };
