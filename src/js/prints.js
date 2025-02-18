document.addEventListener('DOMContentLoaded', () => {
    // File Upload Functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });
    }

    // Print Job Submission
    const submitPrintBtn = document.querySelector('.submit-print');
    if (submitPrintBtn) {
        submitPrintBtn.addEventListener('click', () => {
            const printType = document.getElementById('printType').value;
            const paperSize = document.getElementById('paperSize').value;
            const copies = document.getElementById('copies').value;
            const doubleSided = document.getElementById('doubleSided').checked;

            // Here you would typically send this data to your server
            console.log('Print job submitted:', {
                printType,
                paperSize,
                copies,
                doubleSided
            });

            // Show success message
            alert('Print job submitted successfully!');
        });
    }

    // Track Print Job
    const trackButton = document.getElementById('trackButton');
    if (trackButton) {
        trackButton.addEventListener('click', () => {
            const jobNumber = document.getElementById('trackInput').value;
            // Here you would typically fetch the job status from your server
            console.log('Tracking job:', jobNumber);
        });
    }

    // Print History Filtering
    const timeFilter = document.getElementById('timeFilter');
    const searchHistory = document.getElementById('searchHistory');

    if (timeFilter) {
        timeFilter.addEventListener('change', () => {
            filterHistory();
        });
    }

    if (searchHistory) {
        searchHistory.addEventListener('input', () => {
            filterHistory();
        });
    }

    // Reprint Functionality
    const reprintButtons = document.querySelectorAll('.reprint-btn');
    reprintButtons.forEach(button => {
        button.addEventListener('click', () => {
            const historyItem = button.closest('.history-item');
            const fileName = historyItem.querySelector('.history-name').textContent;
            // Here you would typically send this request to your server
            console.log('Reprinting:', fileName);
            alert(`Reprinting ${fileName}`);
        });
    });
});

// Helper Functions
function handleFiles(files) {
    // Here you would typically process the files
    // For now, we'll just log them
    console.log('Files selected:', files);
    
    // Show file names in the upload area
    const uploadPlaceholder = document.querySelector('.upload-placeholder p');
    if (uploadPlaceholder) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        uploadPlaceholder.textContent = fileNames || 'Drop files here or click to select';
    }
}

function filterHistory() {
    const timeFilter = document.getElementById('timeFilter');
    const searchHistory = document.getElementById('searchHistory');
    
    if (!timeFilter || !searchHistory) return;

    const timeValue = timeFilter.value;
    const searchValue = searchHistory.value.toLowerCase();

    // Here you would typically filter your history items based on these values
    console.log('Filtering history:', { timeValue, searchValue });
}