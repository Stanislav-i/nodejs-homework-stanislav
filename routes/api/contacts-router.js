import { Router } from "express";

import contactsController from "../../controllers/contacts-controller.js";

import * as contactSchemas from "../../models/Contact.js";

import {validateBody} from "../../decorators/index.js";

import {authenticate, isValidId} from "../../middleware/validation/index.js";

import upload from "../../middleware/upload.js";

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteSchema = validateBody(contactSchemas.contactUpdateFavoriteSchema)

const router = Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", upload.single("avatar"), contactAddValidate, contactsController.add);

router.put("/:id", isValidId, contactAddValidate, contactsController.updateById);

router.patch("/:id/favorite", isValidId, contactUpdateFavoriteSchema, contactsController.updateStatusContact);

router.delete("/:id", isValidId, contactsController.deleteById);

export default router;
