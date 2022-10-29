import {Skeleton} from "@mui/material";
import React from "react";

export const QPageSkeleton = () => {
    return (
        <>
            <Skeleton animation="wave" width={400} height={60}/>
            <Skeleton animation="wave" width={300} height={300}/>
        </>
    )
}

export const QCategoryCardSkeleton = () => {
    return (
        <>
            <Skeleton animation="wave" variant='rectangular' height={229} />
            <Skeleton animation="wave"  height={85} />
        </>
    )
}