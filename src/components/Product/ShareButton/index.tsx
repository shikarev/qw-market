import SharePopover from "./SharePopover";
import {Share} from "../../svgComponents/Icons/outlined";
import IconLink from "../../IconLink";
import React from "react";

const ShareButton = () => {

    function handleShare() {
        navigator.clipboard.writeText(window.location.href).then(r => {

        });
    }

    return (
        <div>
            <SharePopover trigger="hover" direction="bottom">
                <IconLink
                    icon={Share}
                    text='Поделиться'
                    active={false}
                    callback={handleShare}
                />
            </SharePopover>
        </div>
    );
}

export default ShareButton;