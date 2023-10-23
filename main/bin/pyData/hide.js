// ==UserScript==
// @name         Floating Menu with Progress Text (ImGui Styling)
// @namespace    http://yournamespace.com
// @version      1.0
// @description  Adds a floating menu with a button, progress text, and checkboxes in a black and dark blue ImGui-like theme.
// @match        http://*/* // Specify the URLs where you want this script to run
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let floatingMenu;  // Define floatingMenu here
    let menuVisible = true;

    // Function to update the progress text and handle scrolling
    const updateProgressText = (text) => {
        // Append the text to the progress text area
        progressText.value += '\n' + text;

        // Auto-scroll to the bottom to show the latest progress
        progressText.scrollTop = progressText.scrollHeight;
    };

    // Function to extract the main URL from a given URL
    const extractMainUrl = (url) => {
        const parsedUrl = new URL(url);
        return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}`;
    };

    // Function to toggle menu visibility
    const toggleMenuVisibility = () => {
        menuVisible = !menuVisible;
        floatingMenu.style.display = menuVisible ? 'block' : 'none';
        localStorage.setItem('visibility_stat', menuVisible);
    };

    // Check if the menu was visible in the last session
    if (localStorage.getItem('visibility_stat')) {
        menuVisible = localStorage.getItem('visibility_stat') === 'true';
    }

    // Create the floating menu
    floatingMenu = document.createElement('div');
    floatingMenu.style.position = 'fixed';
    floatingMenu.style.top = '20px';
    floatingMenu.style.right = '20px';
    floatingMenu.style.backgroundColor = '#1e2124';  // Dark blue
    floatingMenu.style.padding = '10px';
    floatingMenu.style.border = '1px solid #000000';  // Black border
    floatingMenu.style.borderRadius = '5px';
    floatingMenu.style.zIndex = "999999999999999999999";
    document.body.appendChild(floatingMenu);

    // Create the header
    const header = document.createElement('div');
    header.innerText = '早报autobot V1.0.0' + '\n';
    header.style.color = '#ffffff';  // White text
    header.style.fontWeight = 'bold';
    header.style.marginBottom = '10px';
    floatingMenu.appendChild(header);

    const subtext = document.createElement('div');
    subtext.innerText = '点击 [ctrl] [shift] [h] 隐藏/显示界面';
    subtext.style.color = '#ffffff';  // White text
    subtext.style.marginBottom = '7px';
    floatingMenu.appendChild(subtext);
    
    // Create the button
    const button = document.createElement('button');
    button.innerText = '开启辅助'; // "Enable Assistance" in Chinese
    button.style.backgroundColor = '#000000';  // Black button
    button.style.color = '#ffffff';  // White text
    button.style.padding = '10px';
    button.style.border = '1px solid #00008b';  // Dark blue border
    button.addEventListener('click', () => {
        // Delay for 1 second before executing each step
        setTimeout(() => {
            // Step 1: Extract the main URL from the current link address
            const current_link = extractMainUrl(window.location.href);
            updateProgressText('提取链接🔗： ' + current_link + '\n');

            // Delay for 1 second before proceeding to the next step
            setTimeout(() => {
                // Step 2: Extract all the raw text content from the class "zbs_sent"
                // and store it as a local storage data "passage_data"
                const passage_data = Array.from(document.querySelectorAll('.zbs_sent'))
                    .map(element => element.textContent)
                    .join('\n');
                localStorage.setItem('passage_data', passage_data);
                updateProgressText('文本材料📕 -> 存入本地缓存' + '\n');

                // Delay for 1 second before proceeding to the next step
                setTimeout(() => {
                    // Step 3: Set a variable called "question_link"
                    // which is "current_link" + /cos/o.x?c=/ca7_zbs/zbs&func=quiz&tid=1&rid=28221
                    const question_link = `${current_link}/cos/o.x?c=/ca7_zbs/zbs&func=quiz&tid=1&rid=28221`;
                    updateProgressText('题目链接🔗： ' + question_link + '\n');

                    // Additional delay for 1 second as the last step
                }, 1000);
            }, 1000);
        }, 1000);
    });
    floatingMenu.appendChild(button);

    // Create a line break for spacing
    const lineBreak = document.createElement('br');
    floatingMenu.appendChild(lineBreak);

    // Create the "鹰眼过检" checkbox
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'checkbox1';
    const label1 = document.createElement('label');
    label1.htmlFor = 'checkbox1';
    label1.innerText = '鹰眼过检';
    label1.style.color = '#ffffff';  // White text
    label1.style.marginRight = '10px';
    checkbox1.checked = localStorage.getItem('checkbox1_checked') === 'true';
    checkbox1.addEventListener('change', () => {
        localStorage.setItem('checkbox1_checked', checkbox1.checked);
        if (checkbox1.checked) {
            alert('鹰眼过检 selected.');
        }
    });
    floatingMenu.appendChild(checkbox1);
    floatingMenu.appendChild(label1);

    // Create the "清除残留" checkbox
    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'checkbox2';
    const label2 = document.createElement('label');
    label2.htmlFor = 'checkbox2';
    label2.innerText = '清除残留';
    label2.style.color = '#ffffff';  // White text
    checkbox2.checked = localStorage.getItem('checkbox2_checked') === 'true';
    checkbox2.addEventListener('change', () => {
        localStorage.setItem('checkbox2_checked', checkbox2.checked);
        if (checkbox2.checked) {
            alert('清除残留 selected.');
        }
    });
    floatingMenu.appendChild(checkbox2);
    floatingMenu.appendChild(label2);

    // Create the progress text area
    const progressText = document.createElement('textarea');
    progressText.style.width = '100%';
    progressText.style.height = '100px';
    progressText.style.marginTop = '10px';
    progressText.placeholder = '进度表'; // Placeholder text
    progressText.style.backgroundColor = '#000000';  // Black background
    progressText.style.color = '#ffffff';  // White text
    progressText.style.border = '1px solid #00008b';  // Dark blue border
    floatingMenu.appendChild(progressText);

    // Create the footer
    const footer = document.createElement('div');
    footer.innerText = '@pw-hxss/zaobaoLibExploit';
    footer.style.color = '#ffffff';  // White text
    footer.style.marginTop = '10px';
    floatingMenu.appendChild(footer);

    // Toggle menu visibility based on the saved state
    floatingMenu.style.display = menuVisible ? 'block' : 'none';

    // Event listener to toggle menu visibility on "Ctrl + Shift + H"
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'H') {
            toggleMenuVisibility();
        }
    });

})();

