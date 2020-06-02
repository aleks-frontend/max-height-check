function maxHeightCheck(variation = 'primary') {
    const isExportMode = window.location.href.indexOf('exports') > -1;
    const preventExportOverflow = document.body.dataset.preventExportOverflow === 'true';
    const isProjectKit = window.parent.document.querySelector(".preview-frame");

    if ((isExportMode && preventExportOverflow) || isProjectKit) return;

    const textBlocks = document.querySelectorAll('[data-max-height]');

    textBlocks.forEach(block => {
        const dynamicCheck = block.dataset.maxHeight == 'dynamic' || block.dataset.maxHeightDynamic == 'true';
        if (dynamicCheck) dynamicAssign(block);

        const cssCheck = block.dataset.maxHeight == 'css';
        const bodyComputedStyle = window.getComputedStyle(document.body);
        const blockHeight = block.scrollHeight;
        const unit = block.dataset.maxHeightUnit || 'px';
        const maxHeightAlt = block.dataset.maxHeightAlt || block.dataset.maxHeight;
        let maxHeight = (variation == 'primary') ? block.dataset.maxHeight : maxHeightAlt;

        if (cssCheck) {
            const computedBlockStyle = window.getComputedStyle(block);
            maxHeight = parseInt(computedBlockStyle.maxHeight);
        } else {
            // Setting the element's max-height
            block.style.maxHeight = maxHeight + unit;

            // Recalculating maxHeight in case 'rem' is set as a unit
            if (unit == 'rem') maxHeight = maxHeight * parseFloat(bodyComputedStyle.fontSize);
        }

        // Adding an 'overflow' class to an element if it's offset height exceedes the max-line-height
        (blockHeight > maxHeight) ? block.classList.add('overflow') : block.classList.remove('overflow');
    });
}

function dynamicAssign(element) {
    const container = element.parentNode;
    container.style.overflow = 'hidden';
    const containerComputed = {
        height: parseFloat(window.getComputedStyle(container).height),
        top: parseFloat(window.getComputedStyle(container).paddingTop),
        bottom: parseFloat(window.getComputedStyle(container).paddingBottom)
    };
    const containerHeight = Math.floor(containerComputed.height - containerComputed.top - containerComputed.bottom);
    const subtrahends = [...container.querySelectorAll('.js-subtrahend')];

    const subtrahendsHeight = subtrahends.reduce((totalHeight, subtrahend) => {
        const subtrahendMargins = {
            top: parseFloat(window.getComputedStyle(subtrahend).marginTop),
            bottom: parseFloat(window.getComputedStyle(subtrahend).marginBottom)
        };
        return totalHeight + subtrahend.offsetHeight + subtrahendMargins.top + subtrahendMargins.bottom;
    }, 0);

    const dynamicHeight = containerHeight - subtrahendsHeight;

    element.dataset.maxHeightDynamic = 'true';
    element.dataset.maxHeight = dynamicHeight;
    container.style.overflow = 'visible';
}
