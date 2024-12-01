import bcrypt from 'bcryptjs';
import accountModel from '../../../database/model/account.model.js';
import jwt from 'jsonwebtoken';
export const signUp = async (req, res) => {
    const { email, password } = req.body;
    const encPassword = bcrypt.hashSync(password, 10);
    let addedAccount = await accountModel.insertMany({
        email,
        password: encPassword
    })
    res.json({ message: "account added", addedAccount })
}
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    let account = await accountModel.findOne({ email });
    if (account) {
        const isMatch = bcrypt.compareSync(password, account.password);
        if (isMatch) {
            const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: '9h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
}