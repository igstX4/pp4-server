const Spoiler = require('../models/spoiler.model');

class SpoilerService {
    async create(spoilerData) {
        const spoiler = new Spoiler(spoilerData);
        return await spoiler.save();
    }

    async getAll() {
        return await Spoiler.find().sort('order');
    }

    async getById(id) {
        return await Spoiler.findById(id);
    }

    async update(id, spoilerData) {
        return await Spoiler.findByIdAndUpdate(id, spoilerData, { new: true });
    }

    async delete(id) {
        return await Spoiler.findByIdAndDelete(id);
    }
}

module.exports = new SpoilerService(); 