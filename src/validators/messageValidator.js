import Joi from "joi";

export const messageTextSchema = Joi.object({
  text: Joi.string().required(),
});

export const messageFileSchema = Joi.object({
    file: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().required()
    }).required()
  });
