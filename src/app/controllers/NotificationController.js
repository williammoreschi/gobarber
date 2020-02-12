import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsprovider = User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkIsprovider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifcation' });
    }

    const notifcations = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifcations);
  }

  async update(req, res) {
    /**
     * A opcao new:true depois de atalizar o registro
     * ele vai devolver o mesmo atualizado
     * */
    const notifcation = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json({ notifcation });
  }
}
export default new NotificationController();
