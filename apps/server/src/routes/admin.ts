import express from "express";
import { createManagerValidation, handleMiddleValidation, loginValidation, } from "@middlewares/validation";
import { createManager } from "@controllers/admin";
import { adminLogin } from "@controllers/index";
import { Manager } from "@models/Manager";
import { auth } from "@middlewares/auth";
import { pagination, paginationWithCount } from "@lib/pagination";

const router = express.Router();

router.post("/login", loginValidation, handleMiddleValidation, adminLogin);


// router.use(auth("ADMIN"));
// create manager by admin
router.post("/create", createManagerValidation, handleMiddleValidation, createManager);


router.get('/show', async (req, res) => {
  //@ts-ignore

  // Manager.collection.drop();
  const { page = 1, limit = 12 } = req.query;


  const [data, pageOptions] = await paginationWithCount(Number(page), Number(limit), Manager);


  res.json({ managers: data, pageOptions });
});



export { router };
