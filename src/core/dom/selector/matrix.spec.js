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

        const result = new Matrix(table).build();

        expect(result.length).toEqual(2);
        
        expect(result[0].length).toEqual(2);
        expect(result[0][0].id).toEqual('1');
        expect(result[0][1].id).toEqual('2');

        expect(result[1].length).toEqual(2);
        expect(result[1][0].id).toEqual('3');
        expect(result[1][1].id).toEqual('4');
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
            
        const result = new Matrix(table).build();

        expect(result.length).toEqual(2);
        
        expect(result[0].length).toEqual(2);
        expect(result[0][0].id).toEqual('1');
        expect(result[0][1].id).toEqual('1');

        expect(result[1].length).toEqual(2);
        expect(result[1][0].id).toEqual('3');
        expect(result[1][1].id).toEqual('4');
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
            
        const result = new Matrix(table).build();

        expect(result.length).toEqual(2);
        
        expect(result[0].length).toEqual(2);
        expect(result[0][0].id).toEqual('1');
        expect(result[0][1].id).toEqual('2');

        expect(result[1].length).toEqual(2);
        expect(result[1][0].id).toEqual('1');
        expect(result[1][1].id).toEqual('3');
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
            
        const result = new Matrix(table).build();

        expect(result.length).toEqual(3);
        
        expect(result[0].length).toEqual(3);
        expect(result[0][0].id).toEqual('1');
        expect(result[0][1].id).toEqual('2');
        expect(result[0][2].id).toEqual('3');

        expect(result[1].length).toEqual(3);
        expect(result[1][0].id).toEqual('4');
        expect(result[1][1].id).toEqual('2');
        expect(result[1][2].id).toEqual('5');

        expect(result[2].length).toEqual(3);
        expect(result[2][0].id).toEqual('6');
        expect(result[2][1].id).toEqual('7');
        expect(result[2][2].id).toEqual('8');
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
            
        const result = new Matrix(table).build();

        expect(result.length).toEqual(2);
        
        expect(result[0].length).toEqual(4);
        expect(result[0][0].id).toEqual('1');
        expect(result[0][1].id).toEqual('2');
        expect(result[0][2].id).toEqual('2');
        expect(result[0][3].id).toEqual('3');

        expect(result[1].length).toEqual(4);
        expect(result[1][0].id).toEqual('4');
        expect(result[1][1].id).toEqual('2');
        expect(result[1][2].id).toEqual('2');
        expect(result[1][3].id).toEqual('5');
    });
});
