// File Upload Handling
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

if (uploadArea && fileInput) {
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
        handleFiles(e.dataTransfer.files);
    });

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });
}

function handleFiles(files) {
    const placeholder = document.querySelector('.upload-placeholder p');
    if (placeholder) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        placeholder.textContent = fileNames || 'Drop files here or click to select';
    }
}

// Print Job Management
async function submitPrintJob(files, options) {
    const formData = new FormData();
    
    for (let file of files) {
        formData.append('files[]', file);
    }

    Object.entries(options).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response = await fetch('/api/print', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting print job:', error);
        throw error;
    }
}

async function loadActiveJobs() {
    try {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();
        return jobs;
    } catch (error) {
        console.error('Error loading active jobs:', error);
        throw error;
    }
}

async function loadPrintHistory(timeFilter = 'all', searchQuery = '') {
    try {
        const params = new URLSearchParams({
            timeFilter,
            search: searchQuery
        });

        const response = await fetch(`/api/jobs/history?${params}`);
        const history = await response.json();
        return history;
    } catch (error) {
        console.error('Error loading print history:', error);
        throw error;
    }
}

async function reprintJob(jobId) {
    try {
        const response = await fetch(`/api/jobs/${jobId}/reprint`, {
            method: 'POST'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error reprinting job:', error);
        throw error;
    }
}

// Export functions for use in other files
export {
    handleFiles,
    submitPrintJob,
    loadActiveJobs,
    loadPrintHistory,
    reprintJob
};