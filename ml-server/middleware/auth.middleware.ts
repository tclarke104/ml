export const ensureAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) return next();
    else res.status(503).send('UNAUTHORIZED');
}