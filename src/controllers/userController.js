class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(req, res) {
        const { username, password } = req.body;
        try {
            const newUser = await this.userModel.create({ username, password });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await this.userModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await this.userModel.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default UserController;