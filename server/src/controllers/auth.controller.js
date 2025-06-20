import { refreshAccessToken } from "../services/user.service";

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);

    res.status(200).json({
      accessToken,
      expiresIn,
    });
  } catch (err) {
    next(err);
  }
};
