const env = process.env.NODE_ENV || 'development'; // 'dev' or 'test'

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ExpenseTracker';
}
else if (env === 'test') {
    process.env.PORT = 8000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ExpenseTrackerTest';
}