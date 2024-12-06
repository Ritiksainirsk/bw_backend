const Component = require('../models/Component');

// Create new component
exports.createComponent = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        
        if (!req.body.name || !req.body.type || !req.body.content) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, type, and content are required'
            });
        }

        const component = new Component({
            name: req.body.name,
            type: req.body.type,
            content: req.body.content,
            status: req.body.status || 'draft',
            createdBy: req.body.createdBy || 'system'
        });

        console.log('Component to save:', component);
        
        const savedComponent = await component.save();
        console.log('Saved component:', savedComponent);
        
        res.status(201).json({
            success: true,
            data: savedComponent
        });
    } catch (error) {
        console.error('Error creating component:', error);
        res.status(400).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Get all components
exports.getAllComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.status(200).json({
            success: true,
            count: components.length,
            data: components
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get single component
exports.getComponent = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }
        res.status(200).json({
            success: true,
            data: component
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update component
exports.updateComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }
        res.status(200).json({
            success: true,
            data: component
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete component
exports.deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
