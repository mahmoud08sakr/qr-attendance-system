import jwt from "jsonwebtoken";
function autAdmin(req, res, next) {
    const { token } = req.headers;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Unauthorized" });
            } else {
                if (decoded.role === "admin") {
                    req.user = decoded;
                    next();
                }else{
                    res.status(401).json({ error: "Unauthorized" });
                }
            }
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}
export default autAdmin