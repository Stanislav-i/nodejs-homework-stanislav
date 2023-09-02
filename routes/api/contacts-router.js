import { Router } from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const router = Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
