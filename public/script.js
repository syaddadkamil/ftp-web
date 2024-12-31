const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const fileList = document.getElementById('fileList');

uploadBtn.addEventListener('click', async () => {
    console.log('Upload button clicked');
    const formData = new FormData();
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            console.log('Response:', response);
            if (response.ok) {
                fetchFiles();
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        alert('Please select a file first.');
    }
});



async function fetchFiles() {
  const response = await fetch('/files');
  const files = await response.json();
  fileList.innerHTML = '<h3>Uploaded Files:</h3>';
  files.forEach((file) => {
    const fileItem = document.createElement('div');
    fileItem.innerHTML = `
      <span>${file.name}</span>
      <a href="${file.path}" download>
        <button>Download</button>
      </a>
    `;
    fileList.appendChild(fileItem);
  });
}

fetchFiles();
