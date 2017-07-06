import {Csv} from './csv';

const csv = new Csv();

describe('csv parser', () => {
	it('should return empty array when input is not defined', () => {
		expect(csv.read()).to.eql([]);
	});
	it('should return empty array when passed empty string', () => {
		expect(csv.read('')).to.eql([]);
	});
	it('should return array with one element if one row is passed', () => {
		const text = 'Lue,Laserna,female,1983-09-18,19 Deer Loop,90732,San Pedro,CA,"lue.laserna@nosql-matters.org,laserna@nosql-matters.org",310,"310-8268551,310-7618427",chatting,2011-05-05';
		const lines = csv.read(text);
		expect(lines.length).to.equal(1);
		expect(lines[0]['0']).to.equal('Lue');
		expect(Object.keys(lines[0]).length).to.equal(13);
	});

	it('should return array of rows when passed multiline string', () => {
		const text = `Name First,Name Last,Gender,Birthday,Contact Address Street,Contact Address Zip,Contact Address City,Contact Address State,Contact Email,Contact Region,Contact Phone,Likes,Member Since
Lue,Laserna,female,1983-09-18,19 Deer Loop,90732,San Pedro,CA,"lue.laserna@nosql-matters.org,laserna@nosql-matters.org",310,"310-8268551,310-7618427",chatting,2011-05-05`;

		const lines = csv.read(text);

		expect(lines.length).to.equal(2);
		expect(lines[0]['0']).to.equal('Name First');
		expect(Object.keys(lines[0]).length).to.equal(13);
		expect(lines[1]['0']).to.equal('Lue');
		expect(Object.keys(lines[1]).length).to.equal(13);
	});

	it('should return array value for escaped input', () => {
		const text = 'Jeff,Schmith,male,1977-10-14,14 198th St,72569,Poughkeepsie,AR,jeff.schmith@nosql-matters.org,870,,"chatting,boxing,reading",2011-02-10';
		const lines = csv.read(text);
		expect(lines[0]['11']).to.equal('chatting,boxing,reading');
	});
});