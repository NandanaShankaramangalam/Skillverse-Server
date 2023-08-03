import mongoose from "mongoose";

export interface review {
    review ?: string,
    rating ?: number,
    // student ?: string,
    courseId : string,
    studId : mongoose.Types.ObjectId,
    // studId : string,
} 