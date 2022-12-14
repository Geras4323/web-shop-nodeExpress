const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');


class UserService {
  constructor() {}

  async find(query) {
    const options = {
      where: {}
    };
    const { limit, offset } = query;
    if (limit || offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { active } = query;
    if (active) {
      options.where.active = active;
    }
    const { role } = query;
    if (role) {
      options.where.role = role;
    }

    const users = await models.User.findAll(options);
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['orders']
    });
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      return user;
    }
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const user of data) {
        await models.User.create(user);
      }
      return { message: 'Users created' }
    } else {
      const newUser = await models.User.create(data);
      return newUser;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updated = await user.update(changes);
    return updated;
  }

  async updatePartially(id, changes) {
    const user = await this.findOne(id);
    const updated = await user.update(changes);
    return updated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id, message: 'Successfully deleted' };
  }
}

module.exports = UserService;