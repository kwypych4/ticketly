import express, { Request, Response } from 'express';
import { UserSchema } from 'models';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.find();
    res.json(user);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
    res.status(500).json({ message: error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.find({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
    res.status(500).json({ message: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const user = new UserSchema({
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,
    department: req.body?.department,
    position: req.body?.position,
    roleId: req.body?.roleId,
    ddd: req.body?.roleId,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ message: error.message });
    res.status(400).json({ message: error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserSchema.deleteOne({ _id: req.params.id });
    res.json({ message: `Deleted user ${req.params.id}` });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
    res.status(500).json({ message: error });
  }
});

export const usersRouter = router;
