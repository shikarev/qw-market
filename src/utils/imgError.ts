import React from "react";
import placeholder from "../assets/placeHolders/noImagePlaceholder.svg";

// This function is triggered when an image has been loaded
export function imageOnLoadHandler (event: React.SyntheticEvent<HTMLImageElement>) {
    if (event.currentTarget.classList.contains("error")) {
      event.currentTarget.classList.add("success");
    }
}

// This function is triggered if an error occurs while loading an image
export function imageOnErrorHandler (event: React.SyntheticEvent<HTMLImageElement>) {
    event.currentTarget.onerror = null; // prevents looping
    event.currentTarget.src = placeholder;
    event.currentTarget.classList.add("error")
}
