import { refreshAccessToken } from "../services/user.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction, // true only in production
      maxAge: expiresIn * 1000,
      sameSite: isProduction ? "None" : "Lax", // None for prod with secure cookies, Lax for dev
    });

    res.status(200).json({ message: "Access token refreshed" });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
