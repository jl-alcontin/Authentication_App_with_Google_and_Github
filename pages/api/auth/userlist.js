import connectMongo from '../../../database/conn'
import User from '../../../model/Schema'

connectMongo().catch(error => { error: "Connection Failed...!"})
module.exports = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };