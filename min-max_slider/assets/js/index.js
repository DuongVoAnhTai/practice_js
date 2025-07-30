const MIN_PRICE = 0;
const MAX_PRICE = 10000;
let currentMin = 2500;
let currentMax = 8500;

const $ = document.querySelector.bind(document)

const sliderContainer = $('.container');
const sliderRange = $('.slider-range');
const minHandle = $('.slider-handle-min');
const maxHandle = $('.slider-handle-max');
const minValue = $('.minimum-value');
const maxValue = $('.maximum-value');
const minTooltip = $('.min-tooltip');
const maxTooltip = $('.max-tooltip');

let isDragging = false;
let currentHandle = null;

function updateSlider() {
    const containerWidth = sliderContainer.offsetWidth;
    const minPercent = (currentMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100;
    const maxPercent = (currentMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100;

    // Cập nhật vị trí handle
    minHandle.style.left = minPercent + '%';
    maxHandle.style.left = maxPercent + '%';

    // Cập nhật thanh range
    sliderRange.style.left = minPercent + '%';
    sliderRange.style.width = (maxPercent - minPercent) + '%';

    // Cập nhật giá trị hiển thị
    minValue.textContent = currentMin;
    maxValue.textContent = currentMax;
    minTooltip.textContent = currentMin;
    maxTooltip.textContent = currentMax;
}

function getValueFromPosition(clientX) {
    const rect = sliderContainer.getBoundingClientRect()
    const percent = (clientX - rect.left) / rect.width
    const value = Math.round(MIN_PRICE + percent * (MAX_PRICE - MIN_PRICE));

    return Math.max(MIN_PRICE, Math.min(MAX_PRICE, value));
}

function handleMouseDown(e, handle) {
    isDragging = true;
    currentHandle = handle;
    
    // Hiển thị tooltip
    if (handle === 'min') {
        minTooltip.style.display = 'block';
    } else {
        maxTooltip.style.display = 'block';
    }
}

function handleMouseMove(e) {
    if (!isDragging) return;

    const newValue = getValueFromPosition(e.clientX);
    

    if (currentHandle === 'min') {
        currentMin = Math.min(newValue, currentMax - 100); // Đảm bảo khoảng cách tối thiểu
    } else {
        currentMax = Math.max(newValue, currentMin + 100); // Đảm bảo khoảng cách tối thiểu
    }

    updateSlider();
}

function handleMouseUp() {
    isDragging = false;
    currentHandle = null;
    
    // Ẩn tooltip
    minTooltip.style.display = 'none';
    maxTooltip.style.display = 'none';
}

minHandle.addEventListener('mousedown', (e) => handleMouseDown(e, 'min'));
minHandle.addEventListener('mousedown', (e) => handleMouseDown(e, 'max'));

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

sliderContainer.addEventListener('click', (e) => {
    if (e.target === sliderContainer || e.target.classList.contains('slider-track')) {
        const newValue = getValueFromPosition(e.clientX);
        
        // Xác định handle nào gần hơn
        const distanceToMin = Math.abs(newValue - currentMin);
        const distanceToMax = Math.abs(newValue - currentMax);
        
        if (distanceToMin < distanceToMax) {
            currentMin = Math.min(newValue, currentMax - 100);
        } else {
            currentMax = Math.max(newValue, currentMin + 100);
        }
        
        updateSlider();
    }
});

updateSlider();
