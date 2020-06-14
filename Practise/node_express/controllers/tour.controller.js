const Tour = require('./../models/tour.model');
const ApiFeature = require('./../utils/api.feature');
const catchAsync = require('../utils/catch.async.error');
const AppError = require('../utils/app.error');





exports.getAllTour = catchAsync(async (req, res, next) => {

    const features = new ApiFeature(Tour.find(), req.query);
    features.filter().limit().sort().selectFields();
    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.createTour = catchAsync(async (req, res) => {
    const newTour = await Tour.create(req.body);
    console.log(newTour);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
        return next(new AppError('No Tour Found With that ID',404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

exports.updateTour = catchAsync(async (req, res) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) {
        return next(new AppError('No Tour Found With that ID',404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

exports.deleteTour = catchAsync(async (req, res) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
        return next(new AppError('No Tour Found With that ID',404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.tourStats = catchAsync(async (req, res) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.7 } }
        },
        {
            $group: {
                _id: '$difficulty',
                avgRating: { $avg: '$ratingsAverage' },
                numTours: { $sum: 1 },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.busyMonth = catchAsync(async (req, res) => {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numToursStart: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $sort: { numToursStart: -1 }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: { _id: 0 }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });
});
