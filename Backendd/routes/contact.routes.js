import express from "express";
import Contact from "../models/Contact.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;