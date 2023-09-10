import { Router } from "express";

import contactsController from "../../controllers/contacts-controller.js";

import * as contactSchemas from "../../models/contact.js";

import {validateBody} from "../../decorators/index.js";

import {isValidId} from "../../middleware/validation/index.js";

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteSchema = validateBody(contactSchemas.contactUpdateFavoriteSchema)

const router = Router();

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", contactAddValidate, contactsController.add);

router.put("/:id", isValidId, contactAddValidate, contactsController.updateById);

router.patch("/:id/favorite", isValidId, contactUpdateFavoriteSchema, contactsController.updateById);

router.delete("/:id", isValidId, contactsController.deleteById);

export default router;
