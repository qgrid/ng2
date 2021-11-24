import { Matrix } from './matrix';

describe('Matrix builder', () => {
    it('should have unique identifiers', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1"></td>
                        <td id="2"></td>
                    </tr>
                    <tr>
                        <td id="3"></td>
                        <td id="4"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(2);

        expect(result[0].length).to.equal(2);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');

        expect(result[1].length).to.equal(2);
        expect(result[1][0].id).to.equal('3');
        expect(result[1][1].id).to.equal('4');
    });

    it('should not include q-grid-align', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr class="q-grid-align">
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="1"></td>
                        <td id="2"></td>
                    </tr>
                    <tr>
                        <td id="3"></td>
                        <td id="4"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(2);

        expect(result[0].length).to.equal(2);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');

        expect(result[1].length).to.equal(2);
        expect(result[1][0].id).to.equal('3');
        expect(result[1][1].id).to.equal('4');
    });

    it('should notice colspan', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1" colspan="2"></td>
                    </tr>
                    <tr>
                        <td id="3"></td>
                        <td id="4"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(2);

        expect(result[0].length).to.equal(2);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('1');

        expect(result[1].length).to.equal(2);
        expect(result[1][0].id).to.equal('3');
        expect(result[1][1].id).to.equal('4');
    });

    it('should notice rowspan', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1" rowspan="2"></td>
                        <td id="2"></td>
                    </tr>
                    <tr>
                        <td id="3"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(2);

        expect(result[0].length).to.equal(2);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');

        expect(result[1].length).to.equal(2);
        expect(result[1][0].id).to.equal('1');
        expect(result[1][1].id).to.equal('3');
    });

    it('should stop rowspan', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1"></td>
                        <td id="2" rowspan="2"></td>
                        <td id="3"></td>
                    </tr>
                    <tr>
                        <td id="4"></td>
                        <td id="5"></td>
                    </tr>
                    <tr>
                        <td id="6"></td>
                        <td id="7"></td>
                        <td id="8"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(3);

        expect(result[0].length).to.equal(3);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');
        expect(result[0][2].id).to.equal('3');

        expect(result[1].length).to.equal(3);
        expect(result[1][0].id).to.equal('4');
        expect(result[1][1].id).to.equal('2');
        expect(result[1][2].id).to.equal('5');

        expect(result[2].length).to.equal(3);
        expect(result[2][0].id).to.equal('6');
        expect(result[2][1].id).to.equal('7');
        expect(result[2][2].id).to.equal('8');
    });

    it('should handle nested rowspan', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1" rowspan="4"></td>
                        <td id="2"></td>
                        <td id="3"></td>
                        <td id="4"></td>
                    </tr>
                    <tr>
                        <td id="5" rowspan="3"></td>
                        <td id="6"></td>
                        <td id="7"></td>
                    </tr>
                    <tr>
                        <td id="8"></td>
                        <td id="9"></td>
                    </tr>
                    <tr>
                        <td id="10"></td>
                        <td id="11"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(4);

        expect(result[0].length).to.equal(4);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');
        expect(result[0][2].id).to.equal('3');
        expect(result[0][3].id).to.equal('4');

        expect(result[1].length).to.equal(4);
        expect(result[1][0].id).to.equal('1');
        expect(result[1][1].id).to.equal('5');
        expect(result[1][2].id).to.equal('6');
        expect(result[1][3].id).to.equal('7');

        expect(result[2].length).to.equal(4);
        expect(result[2][0].id).to.equal('1');
        expect(result[2][1].id).to.equal('5');
        expect(result[2][2].id).to.equal('8');
        expect(result[2][3].id).to.equal('9');

        expect(result[3].length).to.equal(4);
		expect(result[3][0].id).to.equal('1');
		expect(result[3][1].id).to.equal('5');
        expect(result[3][2].id).to.equal('10');
        expect(result[3][3].id).to.equal('11');
    });

    it('should notice rowspan & colspan rectangle', () => {
        const table = new DOMParser().parseFromString(`
            <table>
                <tbody>
                    <tr>
                        <td id="1"></td>
                        <td id="2" rowspan="2" colspan="2"></td>
                        <td id="3"></td>
                    </tr>
                    <tr>
                        <td id="4"></td>
                        <td id="5"></td>
                    </tr>
                </tbody>
            </table>`, 'text/html').body.firstChild;

        const result = new Matrix(tr => !tr.classList.contains('q-grid-align')).build(table);

        expect(result.length).to.equal(2);

        expect(result[0].length).to.equal(4);
        expect(result[0][0].id).to.equal('1');
        expect(result[0][1].id).to.equal('2');
        expect(result[0][2].id).to.equal('2');
        expect(result[0][3].id).to.equal('3');

        expect(result[1].length).to.equal(4);
        expect(result[1][0].id).to.equal('4');
        expect(result[1][1].id).to.equal('2');
        expect(result[1][2].id).to.equal('2');
        expect(result[1][3].id).to.equal('5');
    });
});
