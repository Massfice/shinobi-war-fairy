module.exports = (req, res, next) => {
    const parts = req.url.split('/');

    req.url = parts.reduce((accumulator, current) => {
        if (current !== '') {
            const separator = current[0] !== '?' ? '/' : '';

            accumulator = accumulator + separator + current
        }

        return accumulator;
    }, '')

    next();
}