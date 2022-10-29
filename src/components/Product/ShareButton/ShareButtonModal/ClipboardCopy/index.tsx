import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./clipboardCopy.module.scss";
import {Button} from "@mui/material";

const cx = classNames.bind(styles);

export default function ClipboardCopy({ copyText }: { copyText: string }) {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text:string) {
        if (navigator.clipboard && window.isSecureContext) {
            return await navigator.clipboard.writeText(text);
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = text;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // here the magic happens
                document.execCommand('copy', true, text);
                textArea.remove();
            });
            //return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
            })
    }

    let timer: NodeJS.Timeout;

    useEffect(() => {
        if(isCopied) {
            timer = setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        }

        return (() => {
            if(timer) {
                clearTimeout(timer);
            }
        })
    },[isCopied])

    return (
        <div className={cx('shareLink')}>
            <span className={cx('linkTitle')}>{copyText}</span>
            <span className={cx('button')}>
                <Button
                    onClick={handleCopyClick}
                    variant='outlined'
                    color='primary'
                    sx={{ml: '2rem'}}
                >
                    {isCopied ? 'Скопировано' : 'Копировать'}
                </Button>
            </span>
        </div>
    );
}
