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
    doc.setFontSize(22);
    doc.text('LICENSE AGREEMENT', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    let content = `
This License Agreement (the “Agreement”) is made effective as of August 30th, 2022 (the “Effective Date”) by and between Thrifty Supply, LLC (the “Licensor”) and {insert wallet address} (“Licensee”), owner of Nippy ${tokenId}

1.	Grant of License. The Licensor hereby grants to Licensee an exclusive, perpetual license to sell its Assets are used in the storyline, narrative, and illustration of a children's book, titled: ${bookNumber} (the “Licensed Materials”). The territory of the license will be worldwide. Licensor retains the rights, title and ownership of the Licensed Materials.

2.	Term. This Agreement is effective as of the Effective Date and will remain in effect perpetually.

3.	Royalties. Licensee shall pay royalties {insert term} to the Licensor for the use of the Licensed Materials. Royalties shall be paid according to the following: Profit-sharing on daily sales on licensed titled book. Profit sharing is distributed Licensee is required to maintain adequate records of the quantity sold of and the revenue acquired from the Licensed Materials. Licensor has the right to view these records to ensure that the calculation of royalties is accurate.

4.	Warranties. The Licensor hereby warrants that the Licensor has all rights necessary to grant to the license granted in Section 1 and to enter into this Agreement.

5.	Modifications to Licensed Materials. Licensee may not make any changes or modifications to the Licensed Materials.

6.	Limitation of Liability. IN NO EVENT SHALL ANY PARTY BE LIABLE TO THE OTHER PARTY FOR COSTS OF PROCUREMENT OF SUBSTITUTE GOODS, LOSS OF PROFITS, OR FOR ANY INDIRECT, SPECIAL, CONSEQUENTIAL OR INCIDENTAL DAMAGES, HOWEVER CAUSED, WHETHER FOR BREACH OF WARRANTY, BREACH OF CONTRACT, REPUDIATION OF CONTRACT, NEGLIGENCE OR OTHERWISE. LICENSEE UNDERSTANDS AND ACKNOWLEDGES THAT LICENSOR MAKES NO REPRESENTATION AS TO THE OPERABILITY OR FITNESS FOR ANY USE, MARKETABILITY OR MERCHANTABILITY OF THE LICENSED MATERIALS. LICENSEE HAS ADEQUATE KNOWLEDGE AND EXPERTISE, OR HAS UTILIZED KNOWLEDGEABLE AND EXPERT CONSULTANTS, TO ADEQUATELY CONDUCT THE DUE DILIGENCE AND AGREES TO ACCEPT ALL RISKS INHERENT HEREIN.

7.	Indemnity. The Licensor will defend, at its expense, any action brought against Licensee based upon the claim that the Licensed Materials, as used within the scope of the license granted under this Agreement, infringes upon intellectual property or proprietary rights of a third party. The Licensor agrees to pay all damages and costs finally awarded against Licensee attributable to such claim.

8.	Confidentiality. Licensee agrees that all non-public information provided by Licensor to Licensee related to the Licensed Material shall be (i) received in strict confidence; (ii) be used only for the purpose of this Agreement; and (iii) not be disclosed by Licensee without consent of the Licensor.

9.	General.

a.	Assignment. This Agreement may not be assigned without the prior written consent of the other party and no sub-licenses may be issued by Licensee without the express written consent of Licensor.

b.	Survival. The provisions of Sections 4, 6, 7, 8 and 9 shall survive any termination of this Agreement.

c.	Governing Law. This Agreement shall be governed, construed and interpreted in accordance with the laws of the State of New Jersey, without reference to conflicts of law principles.

d.	Dispute Resolution. Any Dispute arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation or validity thereof, shall be determined by arbitration in Delaware and before a single arbitrator. In any arbitration arising out of or related to this Agreement, the parties agree the arbitrator is not empowered to award punitive or exemplary damages, and the parties waive any right to recover any such damages. Each party shall bear their own costs in connection with the arbitration, although the arbitrator shall award the prevailing party its reasonable costs and attorneys’ fees.

e.	Severability; Waiver. If any of the provisions of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable under any applicable statute or rule of law, it shall be replaced with the valid provision that most closely reflects the intent of the parties and the remaining provisions shall continue in full force and effect.  No failure of either party to exercise or enforce any of its rights under this Agreement will act as a waiver of any rights hereunder.

f.	Entire Agreement. This Agreement constitutes the entire agreement between such parties pertaining to the subject matter hereof.  Any other written or oral agreements existing between the parties hereto regarding such subject matter are expressly canceled.
`;

const splitText = doc.splitTextToSize(content, 180);
doc.text(splitText, 15, 30);
doc.save('LicenseAgreement.pdf');
}
