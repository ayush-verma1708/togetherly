import Questionnaire from '../models/Questionnaire.js';

// Create or Update Questionnaire
export const createOrUpdateQuestionnaire = async (req, res) => {
  const { questions, partnerId, dueDate } = req.body;

  try {
    let questionnaire = await Questionnaire.findOne({
      user: req.user._id,
      partner: partnerId,
    });

    if (questionnaire) {
      questionnaire.questions = questions;
      questionnaire.dueDate = dueDate;
      await questionnaire.save();
    } else {
      questionnaire = await Questionnaire.create({
        user: req.user._id,
        partner: partnerId,
        questions,
        dueDate,
      });
    }

    res.status(201).json(questionnaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Questionnaire
export const getQuestionnaire = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const questionnaire = await Questionnaire.findOne({
      user: req.user._id,
      partner: partnerId,
    });

    if (questionnaire) {
      res.json(questionnaire);
    } else {
      res.status(404).json({ message: 'Questionnaire not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
