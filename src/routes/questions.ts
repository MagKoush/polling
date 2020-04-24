import express from "express";

import { Question } from "../mongo";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      body: { text, options },
    } = req;
    const question = new Question({ options, text });

    await question.save();

    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const question = await Question.findById(id);

    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
