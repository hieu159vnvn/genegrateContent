function renderTemplate() {
    const typeRoom = document.getElementById('typeRoom').value.toUpperCase();
    const location = document.getElementById('location').value;
    const utilities = document.getElementById('utilities').value;
    const near = document.getElementById('near').value.toUpperCase();


    const templateFile = document.getElementById('templateSelect').value;
    const formattedUtilities = utilities.replace(/\n/g, '<br>📄');
    fetch(templateFile)
        .then(response => response.text())
        .then(template => {
            let outputHTML = template.replace('{{typeRoom}}', typeRoom);
            outputHTML = outputHTML.replace('{{location}}', location);
            outputHTML = outputHTML.replace('{{utilities}}', formattedUtilities);
            outputHTML = outputHTML.replace('{{near}}', near);
            document.getElementById('modalOutput').innerHTML = outputHTML;
        })
        .catch(error => console.error('Error loading template:', error));
}

function showModal() {
    // Đảm bảo rằng modal chỉ hiển thị sau khi renderTemplate hoàn thành
    const modal = document.getElementById('outputModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('outputModal');
    modal.style.display = 'none';
}

function copyModalOutput() {
    const outputDiv = document.getElementById('modalOutput');
    const range = document.createRange();
    range.selectNode(outputDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        alert('Output copied to clipboard!');
    } catch (err) {
        alert('Failed to copy output');
    }

    window.getSelection().removeAllRanges();
}

function renderTemplateAndShowModal() {
    renderTemplate();
    showModal();
}