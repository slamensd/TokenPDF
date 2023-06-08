document.getElementById('generate-btn').addEventListener('click', () => {
    const tokenId = document.getElementById('token-id-input').value;

    fetch(`https://ipfs.io/ipfs/QmQKfTbGSN1XCYG6djwc4LNq8op5zbVxGzv7Vt8nzU7HGr/${tokenId}.json`)
        .then(response => response.json())
        .then(data => {
            const bookNumber = data.attributes.find(attr => attr.trait_type === "Book").value;
            generatePDF(tokenId, bookNumber);
        })
        .catch(err => console.error(err));
});

function generatePDF(tokenId, bookNumber) {
    const doc = new jspdf.jsPDF();
    doc.text(`This is an agreement between the owner of ${tokenId}, which is licensed to ${bookNumber}`, 10, 10);
    doc.save(`Token_${tokenId}.pdf`);
}
