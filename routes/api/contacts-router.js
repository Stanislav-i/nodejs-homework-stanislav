import { Router } from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactValidation from "../../middleware/validation/contact-validation.js";

const router = Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactValidation.addContactValidate, contactsController.add);

router.delete("/:contactId", contactsController.deleteById);

router.put("/:contactId", contactValidation.addContactValidate, contactsController.updateById);

export default router;
