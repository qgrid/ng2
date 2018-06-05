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

        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(2);
        
        expect(result[0].cells.length).toEqual(2);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');

        expect(result[1].cells.length).toEqual(2);
        expect(result[1].cells[0].id).toEqual('3');
        expect(result[1].cells[1].id).toEqual('4');
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

        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(2);
        
        expect(result[0].cells.length).toEqual(2);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');

        expect(result[1].cells.length).toEqual(2);
        expect(result[1].cells[0].id).toEqual('3');
        expect(result[1].cells[1].id).toEqual('4');
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
            
        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(2);
        
        expect(result[0].cells.length).toEqual(2);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('1');

        expect(result[1].cells.length).toEqual(2);
        expect(result[1].cells[0].id).toEqual('3');
        expect(result[1].cells[1].id).toEqual('4');
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
            
        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(2);
        
        expect(result[0].cells.length).toEqual(2);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');

        expect(result[1].cells.length).toEqual(2);
        expect(result[1].cells[0].id).toEqual('1');
        expect(result[1].cells[1].id).toEqual('3');
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
            
        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(3);
        
        expect(result[0].cells.length).toEqual(3);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');
        expect(result[0].cells[2].id).toEqual('3');

        expect(result[1].cells.length).toEqual(3);
        expect(result[1].cells[0].id).toEqual('4');
        expect(result[1].cells[1].id).toEqual('2');
        expect(result[1].cells[2].id).toEqual('5');

        expect(result[2].cells.length).toEqual(3);
        expect(result[2].cells[0].id).toEqual('6');
        expect(result[2].cells[1].id).toEqual('7');
        expect(result[2].cells[2].id).toEqual('8');
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
            
        const result = new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(4);
        
        expect(result[0].cells.length).toEqual(4);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');
        expect(result[0].cells[2].id).toEqual('3');
        expect(result[0].cells[3].id).toEqual('4');

        expect(result[1].cells.length).toEqual(4);
        expect(result[1].cells[0].id).toEqual('1');
        expect(result[1].cells[1].id).toEqual('5');
        expect(result[1].cells[2].id).toEqual('6');
        expect(result[1].cells[3].id).toEqual('7');

        // expect(result[2].cells.length).toEqual(4);
        expect(result[2].cells[0].id).toEqual('1');
        expect(result[2].cells[1].id).toEqual('5');
        // expect(result[2].cells[2].id).toEqual('8');
        // expect(result[2].cells[3].id).toEqual('9');

        // expect(result[3].cells.length).toEqual(4);
        // expect(result[3].cells[0].id).toEqual('5');
        // expect(result[3].cells[1].id).toEqual('10');
        // expect(result[3].cells[2].id).toEqual('11');
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
            
        const result = new Matrix(table).build();new Matrix(tr => !tr.classList.has('q-grid-align')).build(table);

        expect(result.length).toEqual(2);
        
        expect(result[0].cells.length).toEqual(4);
        expect(result[0].cells[0].id).toEqual('1');
        expect(result[0].cells[1].id).toEqual('2');
        expect(result[0].cells[2].id).toEqual('2');
        expect(result[0].cells[3].id).toEqual('3');

        expect(result[1].cells.length).toEqual(4);
        expect(result[1].cells[0].id).toEqual('4');
        expect(result[1].cells[1].id).toEqual('2');
        expect(result[1].cells[2].id).toEqual('2');
        expect(result[1].cells[3].id).toEqual('5');
    });
});
