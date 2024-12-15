const mongoose = require('mongoose');

// Define the page schema
const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug_url: {
        type: String,
        trim: true,
        unique: true
    },
    meta_title: {
        type: String,
        trim: true
    },
    meta_description: {
        type: String,
        trim: true
    },
    meta_keywords: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'inactive'],
        default: 'draft'
    },
    created_by: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: String
    },
    updated_date: {
        type: Date
    }
});

// Add text indexes for search
pageSchema.index({ 
    title: 'text', 
    content: 'text', 
    meta_keywords: 'text' 
});

// Pre-save middleware to handle slug generation
pageSchema.pre('save', function(next) {
    if (!this.slug_url && this.title) {
        this.slug_url = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    if (this.isModified()) {
        this.updated_date = new Date();
    }
    next();
});

// Create the model
const Page = mongoose.model('Page', pageSchema);

class PageModel {
    static async add(req, fields, values, admin_id) {
        try {
            console.log('Adding page with:', { fields, values, admin_id });
            
            // Convert fields and values arrays to an object
            const pageData = {};
            fields.forEach((field, index) => {
                if (values[index] !== undefined && values[index] !== '') {
                    pageData[field] = values[index];
                }
            });

            // Add required fields
            pageData.created_by = admin_id;
            pageData.created_date = new Date();
            
            console.log('Page data to save:', pageData);

            const page = new Page(pageData);
            const savedPage = await page.save();
            console.log('Page saved successfully:', savedPage);
            return savedPage;
        } catch (error) {
            console.error('Error saving page:', error);
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                throw new Error(`Validation failed: ${errors.join(', ')}`);
            }
            if (error.code === 11000) {
                throw new Error('A page with this slug URL already exists');
            }
            throw error;
        }
    }

    static async list(req, fields, page = 1, limit = 10, query = {}, operator = 'AND', sort = {}) {
        try {
            const skip = (page - 1) * limit;
            const filter = {};
            
            // Build the filter based on query parameters
            if (Object.keys(query).length > 0) {
                if (operator === 'AND') {
                    filter.$and = Object.entries(query).map(([key, value]) => ({
                        [key]: { $regex: value, $options: 'i' }
                    }));
                } else {
                    filter.$or = Object.entries(query).map(([key, value]) => ({
                        [key]: { $regex: value, $options: 'i' }
                    }));
                }
            }

            // Execute the query with pagination
            const pages = await Page.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select(fields.join(' '));

            const total = await Page.countDocuments(filter);

            return {
                data: pages,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error('Error listing pages:', error);
            throw error;
        }
    }

    static async update(req, pageData, admin_id) {
        try {
            const page = await Page.findById(pageData.id);
            if (!page) {
                throw new Error('Page not found');
            }

            // Update the page data
            Object.keys(pageData).forEach(key => {
                if (key !== 'id' && key !== 'created_by' && key !== 'created_date') {
                    page[key] = pageData[key];
                }
            });

            page.updated_by = admin_id;
            page.updated_date = new Date();

            const updatedPage = await page.save();
            return updatedPage;
        } catch (error) {
            console.error('Error updating page:', error);
            throw error;
        }
    }

    static async getPageDetails(req, id) {
        try {
            const page = await Page.findById(id);
            if (!page) {
                throw new Error('Page not found');
            }
            return page;
        } catch (error) {
            console.error('Error getting page details:', error);
            throw error;
        }
    }

    static async duplicate(req, id) {
        try {
            const page = await Page.findById(id);
            if (!page) {
                throw new Error('Page not found');
            }

            const pageData = page.toObject();
            delete pageData._id;
            pageData.title = `${pageData.title} (Copy)`;
            pageData.slug_url = `${pageData.slug_url}-copy`;
            pageData.status = 'draft';
            pageData.created_by = req.body.admin_id;
            pageData.created_date = new Date();
            delete pageData.updated_by;
            delete pageData.updated_date;

            const newPage = new Page(pageData);
            return await newPage.save();
        } catch (error) {
            console.error('Error duplicating page:', error);
            throw error;
        }
    }

    static async updateStatus(id, status, admin_id) {
        try {
            const page = await Page.findById(id);
            if (!page) {
                throw new Error('Page not found');
            }

            page.status = status;
            page.updated_by = admin_id;
            page.updated_date = new Date();

            return await page.save();
        } catch (error) {
            console.error(`Error updating page status to ${status}:`, error);
            throw error;
        }
    }

    static async activate(req, id) {
        return this.updateStatus(id, 'published', req.body.admin_id);
    }

    static async deactivate(req, id) {
        return this.updateStatus(id, 'inactive', req.body.admin_id);
    }

    static async draft(req, id) {
        return this.updateStatus(id, 'draft', req.body.admin_id);
    }

    static async delete(req, id) {
        try {
            const result = await Page.findByIdAndDelete(id);
            if (!result) {
                throw new Error('Page not found');
            }
            return result;
        } catch (error) {
            console.error('Error deleting page:', error);
            throw error;
        }
    }
}

module.exports = PageModel;